import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const activities = await Activity.find().populate("categories");
      response.status(200).json(activities);
    } catch (error) {
      console.error("GET /activites error: ".error);
      return response.status(500).json({ error: error.message });
    }
  }
  if (request.method === "POST") {
    console.log("request.body: ", request.body);
    const activityData = request.body;
    await Activity.create(activityData);
    response.status(201).json({ status: "Activity successfully created!" });
    return;
  }

  response.status(405).json({ status: "Method not allowed" });
}
