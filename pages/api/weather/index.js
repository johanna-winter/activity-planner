export default async function handler(request, response) {
  const { location } = request.query;
  console.log("Weather API called with location:", location);

  if (!location) {
    return response.status(400).json({ error: "Please provide a location." });
  }

  const apiKey = process.env.WEATHERAPI_KEY;

  try {
    const fetchResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
        location
      )}&aqi=no`
    );

    console.log("WeatherAPI status:", fetchResponse.status);
    const data = await fetchResponse.json();

    if (!fetchResponse.ok) {
      if (data.error?.message === "No matching location found.") {
        return response.status(404).json({
          error: "Weather information is not available for this location.",
        });
      }
      return response.status(500).json({
        error:
          "Weather service is currently unavailable. Please try again later.",
      });
    }
    return response.status(200).json(data);
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Unable to fetch weather data at the moment." });
  }
}
