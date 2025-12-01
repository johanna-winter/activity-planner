import Image from "next/image";
import BackButton from "./BackButton";

export default function ActivityInfo({ activity, imageSource, categories }) {
  return (
    <>
      <h1>See more Details of your selected activity</h1>
      <h2>{activity.title}</h2>
      <BackButton />
      <Image alt={activity.title} src={imageSource} width={240} height={330} />
      <p>{activity.description}</p>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
      <h2>Location:</h2>
      <p>📍 Area: {activity.area}</p>
      <p>🌍 Country: {activity.country}</p>
    </>
  );
}
