import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { COLORS, FONT_SIZES } from "@/styles/theme";

export default function LoginScreen() {
    const router = useRouter();

    return (
        <CustomView style={styles.container}>
            <Nav onBack={() => router.back()} />

            <Header />

            <View style={styles.form}>
                <Input
                    label="Email"
                    keyboardType="email-address"
                    inputMode="email"
                    autoCapitalize="none"
                    placeholder="joe@gmail.com"
                    returnKeyType="next"
                    required
                />

                <Input
                    label="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    placeholder="********"
                    required
                    textContentType="password"
                />

                <View style={styles.formActions}>
                    <Button onPress={() => router.push("/(tabs)/home")}>
                        Login
                    </Button>

                    <Pressable style={{ marginTop: 16, alignSelf: "flex-end" }} onPress={() => router.push("/(onboarding)/(auth)/forgot-password")}>
                        <BodyText style={{ fontSize: FONT_SIZES.sm }}>
                            Forgot Password?
                        </BodyText>
                    </Pressable>
                </View>
            </View>

            <Footer onSignup={() => router.push("/(onboarding)/(auth)/signup")} />
        </CustomView>
    );
}


function Nav({ onBack }: { onBack?: () => void }) {
    return (
        <View style={styles.nav}>
            <Pressable onPress={onBack} style={styles.navAction}>
                <Ionicons name="arrow-back" size={24} color={COLORS.dark.white} />
            </Pressable>

            <BodyText style={styles.navText}>Login</BodyText>
        </View>
    );
}

function Header() {
    return (
        <View>
            <Heading>Welcome Back</Heading>
            <BodyText style={styles.headerText}>
                Please enter your email and password to continue.
            </BodyText>
        </View>
    );
}

function Footer({ onSignup }: { onSignup?: () => void }) {
    return (
        <View style={styles.footer}>
            <BodyText>
                Don't have an account?
            </BodyText>

            <Pressable onPress={onSignup}>
                <BodyText style={{ color: COLORS.dark.primary, textDecorationLine: "underline", textDecorationStyle: "dashed" }}>Sign up</BodyText>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 72,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    description: {
        textAlign: "center",
        color: COLORS.dark.primary,
        fontSize: 14,
        marginTop: 8,
        paddingHorizontal: 20,
    },

    nav: {
        position: "relative",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    navAction: {
        position: "absolute",
        left: 0,
    },
    navText: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: "bold",
        color: COLORS.dark.primary,
    },

    headerText: {
        fontSize: FONT_SIZES.sm,
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: 24,
    },
    formActions: {
        marginTop: 44,
    },

    footer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        flex: 1,
    },
});
