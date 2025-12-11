import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const activity = await Activity.findById(id).populate("categories");

      if (!activity) {
        return response.status(404).json({ status: "Activity not found" });
      }

      return response.status(200).json(activity);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const activity = await Activity.findById(id);

      if (!activity) {
        return response.status(404).json({ status: "Activity not found" });
      }

      if (activity.imagePublicId) {
        await cloudinary.v2.uploader.destroy(activity.imagePublicId);
      }

      await activity.deleteOne();

      return response
        .status(200)
        .json({ status: "Activity successfully deleted" });
    } catch (error) {
      return response
        .status(500)
        .json({ status: "error", message: error.message });
    }
  }

  if (request.method === "PUT") {
    const {
      title,
      imageUrl,
      imagePublicId,
      categories,
      description,
      area,
      country,
    } = request.body;

    if (!title || !categories || categories.length === 0) {
      return response.status(400).json({
        status: "error",
        message: "Title and categories are required.",
      });
    }

    try {
      const activity = await Activity.findById(id);
      if (!activity) {
        return response
          .status(404)
          .json({ status: "error", message: "Activity not found." });
      }

      //had to add this because deleting an updated activity kept keeping the new picture in cloudinary and deleting the old one
      //therefore also the error
      if (imagePublicId && imagePublicId !== activity.imagePublicId) {
        if (activity.imagePublicId) {
          try {
            await cloudinary.v2.uploader.destroy(activity.imagePublicId, {
              resource_type: "image",
              invalidate: true,
            });
          } catch (error) {
            console.error(
              "Previous cloudinary image could not be deleted",
              error
            );
          }
        }
        activity.imageUrl = imageUrl;
        activity.imagePublicId = imagePublicId;
      } else {
        activity.imageUrl = imageUrl ?? activity.imageUrl;
      }

      activity.title = title;
      activity.categories = categories;
      activity.description = description;
      activity.area = area;
      activity.country = country;

      await activity.save();
      const populated = await activity.populate("categories");
      return response.status(200).json(populated);
    } catch (error) {
      console.error("PUT /api/activities/[id] error:", error);
      return response.status(500).json({
        status: "error",
        message: "Database update failed.",
      });
    }
  }

  return response.status(405).json({ status: "Method not allowed" });
}
