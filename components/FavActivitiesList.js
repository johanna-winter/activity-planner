import ActivityCard from "@/components/ActivityCard";
import { useFavourites } from "@/hooks/useFavourites";


export default function FavActivityList({ activities, favourites }) {
  const { toggleFavourite } = useFavourites();

  return (
    <>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            <ActivityCard
              title={activity.title}
              imageSource={activity.imageUrl}
              categories={activity.categories}
              id={activity._id}
              favourites={favourites}
              toggleFavourite={toggleFavourite}

            />
          </li>
        ))}
      </ul>
    </>
  );
}
