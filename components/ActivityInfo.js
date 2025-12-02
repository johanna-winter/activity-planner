import Image from "next/image";

export default function ActivityInfo({ activity }) {
  return (
    <>
      <h1>See more Details of your selected activity</h1>
      <h2>{activity.title}</h2>
      <Image alt={activity.title} src={activity.imageSource} />
      <p>{activity.description}</p>
      <ul>
        {activity.categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
      <h2>Location:</h2>
      <p>📍 Area: {activity.area}</p>
      <p>🌍 Country: {activity.country}</p>
    </>
  );
}
