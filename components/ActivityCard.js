import Image from "next/image";

export default function ActivityCard({ title, imageSource, categories }) {
  return (
    <>
      <p>{title}</p>
      <Image src={imageSource} alt={title} width={240} height={330} />
      {categories.map((category) => (
        <p key={category._id}>{category.name}</p>
      ))}
    </>
  );
}
