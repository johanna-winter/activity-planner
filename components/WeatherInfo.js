import Image from "next/image";
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

  return (
    <>
      <h3>Current weather in {weatherData.location.name}</h3>
      <ul>
        <li>Local Time: {weatherData.location.localtime}</li>
        <li>Temperature: {weatherData.current.temp_c} °C</li>
        <li>
          {weatherData.current.condition.text}{" "}
          <Image
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
            width={25}
            height={25}
          />
        </li>
      </ul>
    </>
  );
}
