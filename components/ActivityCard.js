import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import FavoriteButton from "./FavButton";

import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActivityCard({
  id,
  title,
  imageSource,
  categories,
  area,
  country,
  onActivityUpdated,
  toggleFavourite,
  isFavourite,
  favourites,
}) {
  return (
    <div>
      <p>{title}</p>
      <FavoriteButton
        isFavourite={isFavourite}
        id={id}
        onClick={() => toggleFavourite(id)}
        favourites={favourites}
      />
      <Link href={`/activities/${id}`}>
        <StyledImage src={imageSource} alt={title} width={1200} height={900} />
      </Link>

      {(area || country) && (
        <p>
          📍{area && <span>{area}</span>}
          {area && country && ", "}
          {country && <span>{country}</span>}
        </p>
      )}
      {categories.map((category) => (
        <>
          <p key={category._id}>{category.name}</p>
        </>
      ))}
    </div>
  );
}

const StyledImage = styled(Image)`
  width: 100% !important;
  height: auto !important;
  object-fit: cover;
  border-radius: 8px;
  max-width: 500px;
`;
