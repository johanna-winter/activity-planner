export default async function handler(request, response) {
  const { location } = request.query;
  console.log("Weather API called with location:", location);

  if (!location) {
    return response.status(400).json({ error: "Location is required" });
  }

  const apiKey = process.env.WEATHERAPI_KEY;

  try {
    const fetchResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
        location
      )}&aqi=no`
    );

    console.log("WeatherAPI status:", response.status);

    if (!fetchResponse.ok) {
      return response
        .status(500)
        .json({ error: "Failed to fetch weather data" });
    }
    const data = await fetchResponse.json();
    console.log("WeatherAPI data:", data);

    return response.status(200).json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return response.status(500).json({ error: "Unable to fetch weather data" });
  }
}
