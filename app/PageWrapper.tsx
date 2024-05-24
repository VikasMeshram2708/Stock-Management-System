"use client";

import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProductState } from "./context/ProductState";

const queryClient = new QueryClient();

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductState>
        <Navbar />
        {children}
      </ProductState>
    </QueryClientProvider>
  );
}
