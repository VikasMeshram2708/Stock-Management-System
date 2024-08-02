import { UseQueryResult } from "@tanstack/react-query";
import { createContext } from "react";

interface ContextProps {
  data: {
    name: string;
  };
  // productQuery: UseQueryResult<void, Error>
}
export const ProductContext = createContext<ContextProps | null>(null);
