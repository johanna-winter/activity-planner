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
  id,
  title,
  imageSource,
  categories,
  toggleFavourite,
  isFavourite,
}) {
  return (
    <Card>
      <Title>{title}</Title>
      <FavoriteButton
        isFavourite={isFavourite}
        id={id}
        onClick={() => toggleFavourite(id)}
      />
      <Link href={`/activities/${id}`}>
        <StyledImage src={imageSource} alt={title} width={1200} height={900} />
      </Link>
      <CategoryList>
        {categories.map((category) => (
          <CategoryTag key={category._id}>{category.name}</CategoryTag>
        ))}
      </CategoryList>
    </Card>
  );
}
