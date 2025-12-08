import useLocalStorageState from "use-local-storage-state";

export function useFavourites() {
  const [favourites, setFavourites] = useLocalStorageState("favourites", {
    defaultValue: [],
  });

  function getIsFavourite(id) {
    return favourites?.includes(id) ?? false;
  }

  function toggleFavourite(id) {
    setFavourites((prev) => {
      // if (prev === undefined) {
      //   return [id];
      // }
      return prev.includes(id)
        ? prev.filter((favId) => favId !== id) // war drin → entfernen
        : [...prev, id]; // war nicht drin → hinzufügen
    });
  }

  return { favourites, toggleFavourite, getIsFavourite };
}
