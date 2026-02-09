import { Stack } from "expo-router";
import "react-native-reanimated";


export default function Layout() {

    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        </Stack>
    );
}
