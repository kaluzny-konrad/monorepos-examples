"use client";

import React, { PropsWithChildren, useState } from "react";
import { createTrpcClient, trpc } from "../client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TrpcProviderProps extends PropsWithChildren {
  url: string;
}

export default function TrpcProvider({ children, url }: TrpcProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createTrpcClient(url));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
