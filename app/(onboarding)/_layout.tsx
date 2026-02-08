import { Stack } from "expo-router";
import "react-native-reanimated";


export default function Layout() {

    return (
        <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        </Stack>
    );
}
