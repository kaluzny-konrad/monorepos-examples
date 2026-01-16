import React, { PropsWithChildren, useRef } from "react";
import { createTrpcClient, trpc } from "../client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TrpcProviderProps extends PropsWithChildren {
  url: string;
}

export default function TrpcProvider({ children, url }: TrpcProviderProps) {
  // Use useRef with lazy initialization to avoid React Compiler issues
  const queryClientRef = useRef<QueryClient>(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // Mobile doesn't have window focus
          refetchOnReconnect: true, // Refresh when network reconnects
          staleTime: 30 * 1000, // Consider data stale after 30 seconds
        },
      },
    })
  );
  const trpcClientRef = useRef<ReturnType<typeof createTrpcClient>>(createTrpcClient(url));

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          staleTime: 30 * 1000,
        },
      },
    });
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

