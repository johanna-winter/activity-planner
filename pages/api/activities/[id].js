import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

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
    await Activity.findByIdAndDelete(id);

    response.status(200).json({ status: "Activity successfully deleted." });
    return;
  }

  if (request.method === "PUT") {
    const {
      title,
      imageUrl,
      categories,
      description,
      area,
      country,
      coordinates,
      lat,
      lng,
    } = request.body;

    if (!title || !categories || categories.length === 0) {
      return response.status(400).json({
        status: "error",
        message: "Title and categories are required.",
      });
    }

    let coords = coordinates || null;

    if (!coords && lat && lng) {
      coords = {
        lat: Number(String(lat).replace(",", ".")),
        lng: Number(String(lng).replace(",", ".")),
      };
    }

    const updateData = {
      title,
      imageUrl,
      categories,
      description,
      area,
      country,
    };

    if (coords && Number.isFinite(coords.lat) && Number.isFinite(coords.lng)) {
      updateData.coordinates = coords;
    }

    try {
      const updatedActivity = await Activity.findByIdAndUpdate(
        id,
        updateData,
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
