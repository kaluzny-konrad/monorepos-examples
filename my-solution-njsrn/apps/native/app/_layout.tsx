import { Stack } from "expo-router";
import "../global.css";
import TrpcProvider from "@repo/trpc/TrpcProvider";

export default function RootLayout() {
  return (
    <TrpcProvider url={process.env.EXPO_PUBLIC_TRPC_URL || "http://localhost:3000/trpc"}>
      <Stack />
    </TrpcProvider>
  );
}
