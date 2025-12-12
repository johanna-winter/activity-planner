import Link from "next/link";
import FavoriteButton from "@/components/FavouriteButton";
import {
  StyledImage,
  Card,
  Title,
  CategoryList,
  CategoryTag,
} from "./StyledActivityCard";

export default function ActivityCard({
  activity,
  toggleFavourite,
  isFavourite,
}) {
  return (
    <Card>
      <Title>{activity.title}</Title>
      <FavoriteButton
        isFavourite={isFavourite}
        id={activity._id}
        onClick={() => toggleFavourite(activity._id)}
      />
      <Link href={`/activities/${activity._id}`}>
        <StyledImage
          src={activity.imageUrl}
          alt={activity.title}
          width={1200}
          height={900}
        />
      </Link>
      <CategoryList>
        {activity.categories.map((category) => (
          <CategoryTag key={category._id}>{category.name}</CategoryTag>
        ))}
      </CategoryList>
    </Card>
  );
}
