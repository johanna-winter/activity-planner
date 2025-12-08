import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const activities = await Activity.find()
        .populate("categories")
        .sort({ _id: -1 });
      return response.status(200).json(activities);
    } catch (error) {
      console.error("GET /activities error: ", error);
      return response.status(500).json({ error: error.message });
    }
  }
  if (request.method === "POST") { 
    try {
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

      let coords = coordinates || null;

      if (!coords && lat && lng) {
        coords = {
          lat: Number(lat),
          lng: Number(lng),
        };
      }

      const activityData = {
        title,
        imageUrl,
        categories,
        description,
        area,
        country,
        ...(coords && { coordinates: coords }),
      }

      await Activity.create(activityData);

      return response.status(201).json({
        status: "Activity successfully created!",
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
  response.status(405).json({ status: "Method not allowed" });
}
