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
      return response.status(400).json({ status: "Invalid ID format" });
    }
  }

  if (request.method === "DELETE") {
    await Activity.findByIdAndDelete(id);

    response.status(200).json({ status: "Activity successfully deleted." });
    return;
  }

  return response.status(405).json({ status: "Method not allowed" });
}
