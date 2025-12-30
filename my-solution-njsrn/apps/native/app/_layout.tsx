import { Stack } from "expo-router";
import "../global.css";
import TrpcClientProvider from "../components/providers/TrpcClientProvider";

export default function RootLayout() {
  return (
    <TrpcClientProvider>
      <Stack />
    </TrpcClientProvider>
  );
}
