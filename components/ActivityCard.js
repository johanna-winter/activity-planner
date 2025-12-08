import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavButton";

export default function ActivityCard({
  title,
  imageSource,
  categories,
  id,
  toggleFavourite,
  isFavourite,
  favourites,
}) {
  return (
    <>
      <p>{title}</p>
      <FavoriteButton
        isFavourite={isFavourite}
        id={id}
        onClick={() => toggleFavourite(id)}
        favourites={favourites}
      />
      <Link href={`/activities/${id}`}>
        <Image src={imageSource} alt={title} width={240} height={330} />
      </Link>
      {categories.map((category) => (
        <p key={category._id}>{category.name}</p>
      ))}
    </>
  );
}
