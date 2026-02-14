import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Input } from "@/components/ui/input";

import { COLORS, FONT_SIZES } from "@/styles/theme";

export default function SignUpScreen() {
    const router = useRouter();

    return (
        <CustomView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Nav onBack={() => router.back()} title="Sign Up" />

                <Header />

                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        autoCapitalize="words"
                        placeholder="Joe Doe"
                        returnKeyType="next"
                        required
                    />

                    <Input
                        label="Email"
                        keyboardType="email-address"
                        inputMode="email"
                        autoCapitalize="none"
                        placeholder="joe@gmail.com"
                        returnKeyType="next"
                        required
                    />

                    <DateInput label="Date of Birth" onChange={() => { }} required />

                    <Input
                        label="Password"
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="********"
                        required
                        textContentType="password"
                        returnKeyType="next"
                    />

                    <Input
                        label="Confirm Password"
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="********"
                        required
                        textContentType="password"
                        returnKeyType="done"
                    />

                    <View style={styles.formActions}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                            <BodyText>
                                By continuing, you agree to our{" "}
                            </BodyText>

                            <Pressable>
                                <BodyText
                                    style={{
                                        color: COLORS.dark.primary,
                                        textDecorationLine: "underline",
                                        textDecorationStyle: "dashed",
                                    }}
                                >
                                    Terms of Use
                                </BodyText>
                            </Pressable>

                            <BodyText>and</BodyText>

                            <Pressable>
                                <BodyText
                                    style={{
                                        color: COLORS.dark.primary,
                                        textDecorationLine: "underline",
                                        textDecorationStyle: "dashed",
                                    }}
                                >
                                    Privacy Policy
                                </BodyText>
                            </Pressable>
                        </View>

                        <Button onPress={() => router.push("/(tabs)")}>Sign Up</Button>

                    </View>
                </View>

                <Footer onLogin={() => router.push("/(auth)/login")} />
            </ScrollView>
        </CustomView>
    );
}

function Header() {
    return (
        <View>
            <Heading>Welcome!</Heading>
            <BodyText style={styles.headerText}>
                Please enter your details to create a new account.
            </BodyText>
        </View>
    );
}

function Footer({ onLogin }: { onLogin?: () => void }) {
    return (
        <View style={styles.footer}>
            <BodyText>Already have an account?</BodyText>

            <Pressable onPress={onLogin}>
                <BodyText
                    style={{
                        color: COLORS.dark.primary,
                        textDecorationLine: "underline",
                        textDecorationStyle: "dashed",
                    }}
                >
                    Login
                </BodyText>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 40,
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
        gap: 18,
    },
    formActions: {
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 24,
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
