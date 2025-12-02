import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    const { title, imageUrl, categories, description, area, country } =
      request.body;

    if (!title || !categories || categories.length === 0) {
      return response
        .status(400)
        .json({
          status: "error",
          message: "Title and categories are required.",
        });
    }

    try {
      const updatedActivity = await Activity.findByIdAndUpdate(
        id,
        {
          title,
          imageUrl,
          categories,
          description,
          area,
          country,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate("categories");

      if (!updatedActivity) {
        return response
          .status(404)
          .json({ status: "error", message: "Activity not found." });
      }

      return response.status(200).json(updatedActivity);
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: "Database update failed.",
      });
    }
  }

  return response.status(405).json({ status: "Method not allowed" });
}
