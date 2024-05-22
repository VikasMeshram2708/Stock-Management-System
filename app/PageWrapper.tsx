"use client";

import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      {children}
    </QueryClientProvider>
  );
}
