import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { COLORS, FONT_SIZES } from "@/styles/theme";

export default function LoginScreen() {
    const router = useRouter();

    return (
        <CustomView style={styles.container}>
            <Nav onBack={() => router.back()} title="Login" />

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
                    <Button onPress={() => router.push("/(tabs)")}>
                        Login
                    </Button>

                    <Pressable style={{ marginTop: 16, alignSelf: "flex-end" }} onPress={() => router.push("/(auth)/forgot-password")}>
                        <BodyText style={{ fontSize: FONT_SIZES.sm }}>
                            Forgot Password?
                        </BodyText>
                    </Pressable>
                </View>
            </View>

            <Footer onSignup={() => router.push("/(auth)/signup")} />
        </CustomView>
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
