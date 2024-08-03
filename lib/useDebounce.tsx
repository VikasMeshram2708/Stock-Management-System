import { useEffect, useState } from "react";

export default function useDebounce(delay = 500, productName: string) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(productName);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [productName, delay]);

  return debouncedValue;
}
