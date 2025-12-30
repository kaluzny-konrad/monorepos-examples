import React, { PropsWithChildren, useRef } from "react";
import { createTrpcClient, trpc } from "../client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TrpcProviderProps extends PropsWithChildren {
  url: string;
}

export default function TrpcProvider({ children, url }: TrpcProviderProps) {
  // Use useRef with lazy initialization to avoid React Compiler issues
  const queryClientRef = useRef<QueryClient>(new QueryClient());
  const trpcClientRef = useRef<ReturnType<typeof createTrpcClient>>(createTrpcClient(url));

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  if (!trpcClientRef.current) {
    trpcClientRef.current = createTrpcClient(url);
  }

  return (
    <trpc.Provider client={trpcClientRef.current} queryClient={queryClientRef.current}>
      <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

