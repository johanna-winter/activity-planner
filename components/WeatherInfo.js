import Image from "next/image";
import styled from "styled-components";
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

  if (!weatherData || !weatherData.location || !weatherData.current) {
    return <p>Weather data unavailable.</p>;
  }

  const { current, location: dataLocation } = weatherData;

  function formatDayTime(localtimeString) {
    const date = new Date(localtimeString.replace(" ", "T"));
    const day = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
    }).format(date);
    const time = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    return `${day}, ${time}`;
  }

  return (
    <WeatherWrapper>
      <Header>Current weather in {dataLocation.name}:</Header>
      <Row>
        <Image
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          width={50}
          height={50}
        />
        <Temp>{current.temp_c} °C</Temp>
      </Row>

      <Condition>{current.condition.text}</Condition>
      <Time>{formatDayTime(dataLocation.localtime)}</Time>
    </WeatherWrapper>
  );
}

const WeatherWrapper = styled.section`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  max-width: 250px;
  margin-bottom: 1rem;
`;

const Header = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Temp = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Condition = styled.p`
  margin: 0.25rem 0 0;
  font-weight: 500;
`;

const Time = styled.p`
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
`;
