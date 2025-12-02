import Image from "next/image";
import Link from "next/link";

export default function ActivityCard({ title, imageSource, categories, id }) {
  return (
    <>
      <p>{title}</p>
      <Link href={`/activities/${id}`}>
        <Image src={imageSource} alt={title} width={240} height={330} />
      </Link>
      {categories.map((category) => (
        <p key={category._id}>{category.name}</p>
      ))}
    </>
  );
}
