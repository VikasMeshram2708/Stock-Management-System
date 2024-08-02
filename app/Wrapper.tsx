"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface WrapperProps {
  children: ReactNode;
}
const queryClient = new QueryClient();

export default function Wrapper({ children }: WrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
