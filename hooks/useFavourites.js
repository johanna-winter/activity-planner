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
      return prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
    });
  }

  return { favourites, toggleFavourite, getIsFavourite };
}
