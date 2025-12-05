import { useState, useEffect } from "react";


// UseLocalStorageState hat nicht funktioniert, da unsere Komponente zuerst serverseitig gerendert wird, und localStorage auf dem Server nicht existiert.
// Daher ist localStorage auf dem Server undefined. Habe ChatGPT gefragt, was man tun kann. Der Vorschlag war, als "Workaround" einen eigenen Hook zu schreiben.
// In der function useLocalStorage legen wir die Parameter key und initialValue fest. Diese werden später zu "favourites" und dem initial leeren favourites Array im LS


  // Auf dem Server gibt es kein window.
  // Die Abfrage, ob typeof window undefined ist, verhindert, dass wir auf localStorage zugreifen, bevor der Browser da ist
  // Wir lesen dann zuerst aus localStorage den gespeicherten Wert.
  // Nur wenn etwas im localStorage existiert, wollen wir es übernehmen, sonst bleibt initialValue. (wird sichergestellt durch storedValue !== null)
  // localStorage speichert alles als Text, deswegen muss es noch konvertiert werden in Wert (also wieder Number)

export function useLocalStorage(key) {
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined" || value === undefined) return; // type of window gibt string zurück, daher im ersten in ""

    try {
      window.localStorage.setItem(key, JSON.stringify(value)); // leeres Array wird in LS geschrieben
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue];
}




