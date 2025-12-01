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

      response.status(200).json(activity);
      return;
    } catch (error) {
      return response.status(500).json({ status: "Error fetching activity" });
    }
  }

  if (request.method === "PUT") {
    try {
      const { title } = request.body;

      if (!title || !title.trim()) {
        return response.status(400).json({ status: "Title is required" });
      }

      const updatedActivity = await Activity.findByIdAndUpdate(
        id,
        { title },
        { new: true }
      );

      if (!updatedActivity) {
        return response.status(404).json({ status: "Activity not found" });
      }

      response.status(200).json(updatedActivity);
      return;
    } catch (error) {
      return response.status(500).json({ status: "Error updating activity" });
    }
  }

  response.status(405).json({ status: "Method not allowed" });
}
