import React, { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, createTrpcClient } from "@repo/trpc/client";

// Use your local machine IP for development when testing on physical devices
// For Android emulator, use 10.0.2.2 instead of localhost
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3001/trpc";

export default function TrpcClientProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createTrpcClient(BACKEND_URL));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

