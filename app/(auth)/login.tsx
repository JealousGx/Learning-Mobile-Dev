import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { type LoginFormData, loginSchema } from "@/schema/login";

import { useUserStore } from "@/store/user-store";

import { COLORS, FONT_SIZES } from "@/styles/theme";

export default function LoginScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const login = useUserStore((state) => state.login);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        console.log("Login Data:", data);

        setIsLoading(true);
        await login(data.email, data.password);
        setIsLoading(false);

        router.navigate("/(tabs)");
    };

    return (
        <CustomView style={styles.container}>
            <Nav onBack={() => router.back()} title="Login" />

            <Header />

            <View style={styles.form}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Email"
                            keyboardType="email-address"
                            inputMode="email"
                            autoCapitalize="none"
                            placeholder="joe@gmail.com"
                            returnKeyType="next"
                            onChangeText={onChange}
                            value={value}
                            required
                        />
                    )}
                />
                <Text style={styles.errorText}>{errors.email?.message || ""}</Text>

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Password"
                            secureTextEntry
                            autoCapitalize="none"
                            placeholder="********"
                            required
                            textContentType="password"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Text style={styles.errorText}>{errors.password?.message || ""}</Text>

                <View style={styles.formActions}>
                    <Button onPress={handleSubmit(onSubmit)} disabled={isLoading}>
                        Login
                    </Button>

                    <Pressable
                        style={{ marginTop: 16, alignSelf: "flex-end" }}
                        onPress={() => router.push("/(auth)/forgot-password")}
                    >
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
            <BodyText>Don't have an account?</BodyText>

            <Pressable onPress={onSignup}>
                <BodyText
                    style={{
                        color: COLORS.dark.primary,
                        textDecorationLine: "underline",
                        textDecorationStyle: "dashed",
                    }}
                >
                    Sign up
                </BodyText>
            </Pressable>
        </View>
    );
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
        gap: 12,
    },
    formActions: {
        marginTop: 44,
    },

    errorText: {
        color: COLORS.dark.error,
        minHeight: 18,
        fontSize: FONT_SIZES.sm,
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
