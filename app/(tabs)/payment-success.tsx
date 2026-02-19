import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";

import { Button } from "@/components/ui/button";

import { COLORS, SPACING } from "@/styles/theme";

export default function PaymentSuccess() {
    const router = useRouter();

    return (
        <CustomView style={styles.container}>
            <Nav onBack={() => router.navigate("/")} title="My Cart" />

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: SPACING.lg }}>
                <FontAwesome6
                    name="face-smile-beam"
                    size={256}
                    color={COLORS.dark.primary}
                />

                <Heading style={{ color: COLORS.dark.primary }}>Thank You!</Heading>

                <BodyText>Your payment was successful.</BodyText>

                <Button variant="secondary" style={{ width: "100%" }} onPress={() => router.navigate("/")}>
                    <BodyText
                        style={{ fontSize: 16, color: COLORS.dark.primary }}
                    >
                        Continue Shopping
                    </BodyText>
                </Button>
            </View>
        </CustomView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        gap: SPACING.xl,
    },
});