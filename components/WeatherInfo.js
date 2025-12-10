import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function WeatherInfo({ location }) {
  const {
    data: weatherData,
    isLoading,
    error,
  } = useSWR(`/api/weather?location=${location}`, fetcher);

  if (!location) return null;

  if (isLoading) return <p>Loading weather...</p>;

  if (error) return <p>Weather data unavailable. Please try again later.</p>;

  return;
}
