import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavButton";

export default function ActivityCard({
  title,
  imageSource,
  categories,
  id,
  onClick,
  favourites,
}) {
  const isFavourite = favourites.includes(id);

  return (
    <>
      <p>{title}</p>
      <FavoriteButton
        favourites={favourites}
        isFavourite={isFavourite}
        id={id}
        onClick={() => onClick(id)}
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
