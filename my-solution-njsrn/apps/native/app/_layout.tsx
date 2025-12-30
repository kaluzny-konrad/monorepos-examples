import { Stack } from "expo-router";
import "../global.css";
import TrpcProvider from "@repo/trpc/TrpcProvider.native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <TrpcProvider
      url={process.env.EXPO_PUBLIC_TRPC_URL || "http://localhost:3000/trpc"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </TrpcProvider>
  );
}
