import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Input } from "@/components/ui/input";

import { type SignupFormData, signupSchema } from "@/schema/signup";

import { useUserStore } from "@/store/user-store";

import { COLORS, FONT_SIZES } from "@/styles/theme";

export default function SignUpScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const signup = useUserStore((state) => state.signup);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        console.log("Signup Data:", data);

        setIsLoading(true);

        await signup({
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            password: data.password,
        });

        setIsLoading(false);

        router.navigate("/(tabs)");
    };

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
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Full Name"
                                autoCapitalize="words"
                                placeholder="Joe Doe"
                                returnKeyType="next"
                                onChangeText={onChange}
                                value={value}
                                required
                            />
                        )}
                    />
                    <Text style={styles.errorText}>{errors.name?.message || ""}</Text>

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
                        name="dateOfBirth"
                        render={({ field: { onChange, value } }) => (
                            <DateInput
                                label="Date of Birth"
                                onChange={onChange}
                                value={value ? new Date(value) : undefined}
                                required
                            />
                        )}
                    />
                    <Text style={styles.errorText}>
                        {errors.dateOfBirth?.message || ""}
                    </Text>

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
                                returnKeyType="next"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Text style={styles.errorText}>{errors.password?.message || ""}</Text>

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Confirm Password"
                                secureTextEntry
                                autoCapitalize="none"
                                placeholder="********"
                                required
                                textContentType="password"
                                returnKeyType="done"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Text style={styles.errorText}>
                        {errors.confirmPassword?.message || ""}
                    </Text>

                    <View style={styles.formActions}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 4,
                                flexWrap: "wrap",
                            }}
                        >
                            <BodyText>By continuing, you agree to our </BodyText>

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

                        <Button onPress={handleSubmit(onSubmit)} disabled={isLoading}>
                            Sign Up
                        </Button>
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
        gap: 12,
    },
    formActions: {
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 24,
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
