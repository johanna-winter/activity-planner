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
      console.error("GET /activites error: ".error);
      return response.status(500).json({ error: error.message });
    }
  }
  if (request.method === "POST") {
    try {
      const activityData = request.body;
      // Turn categories input from string into array
      if (typeof activityData.categories === "string") {
        activityData.categories = [activityData.categories];
        console.log("request.body: ", request.body);
      }
      const newActivity = await Activity.create(activityData);
      const newActivityWithCategories = await Activity.findById(
        newActivity._id
      ).populate("categories");
      return response.status(201).json({
        status: "Activity successfully created!",
        activity: newActivityWithCategories,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
  response.status(405).json({ status: "Method not allowed" });
}
