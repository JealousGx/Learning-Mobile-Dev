import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BORDER_RADIUS, COLORS, FONT_SIZES } from "@/styles/theme";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [step, setStep] = useState<number>(0); // 0: email, 1: otp, 2: reset
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "error" | "info";
        text: string;
    } | null>(null);

    const sendOtp = useCallback(async () => {
        setMessage(null);

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setMessage({
                type: "error",
                text: "Please enter a valid email address.",
            });
            return;
        }

        setLoading(true);

        try {
            // TODO: call your API to send OTP
            await new Promise((r) => setTimeout(r, 800));

            setMessage({ type: "info", text: `OTP sent to ${email}.` });

            setStep(1);
        } catch (e) {
            console.error(e);

            setMessage({ type: "error", text: "Failed to send OTP. Try again." });
        } finally {
            setLoading(false);
        }
    }, [email]);

    const verifyOtp = useCallback(async () => {
        setMessage(null);

        if (!/^\d{4,6}$/.test(otp)) {
            setMessage({ type: "error", text: "Enter a valid OTP." });
            return;
        }

        setLoading(true);

        try {
            // TODO: call your API to verify OTP
            await new Promise((r) => setTimeout(r, 800));
            // For demo: accept '123456' or any 4-6 digit as success
            // Replace with real verification result

            if (otp !== "123456" && otp.length < 6) {
                throw new Error("invalid");
            }

            setMessage({
                type: "info",
                text: "OTP verified. Please set a new password.",
            });

            setStep(2);
        } catch (e) {
            console.error(e);
            setMessage({ type: "error", text: "Invalid OTP. Please try again." });
        } finally {
            setLoading(false);
        }
    }, [otp]);

    const resetPassword = useCallback(async () => {
        setMessage(null);

        if (password.length < 8) {
            setMessage({
                type: "error",
                text: "Password must be at least 8 characters.",
            });
            return;
        }

        if (password !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match." });
            return;
        }

        setLoading(true);

        try {
            // TODO: call your API to reset the password
            await new Promise((r) => setTimeout(r, 800));

            setMessage({
                type: "info",
                text: "Password reset successful. Please log in.",
            });

            router.replace("/(tabs)");
        } catch (e) {
            console.error(e);

            setMessage({
                type: "error",
                text: "Failed to reset password. Try again.",
            });
        } finally {
            setLoading(false);
        }
    }, [password, confirmPassword, router]);

    const handleBack = () => {
        if (step > 0) {
            setMessage(null);

            setStep((s) => s - 1);
        } else {
            router.back();
        }
    };

    return (
        <CustomView style={styles.container}>
            <Nav onBack={handleBack} />

            <Header step={step} />

            <View style={styles.form}>

                {step === 0 && (
                    <View style={styles.step}>
                        <Input
                            label="Email"
                            keyboardType="email-address"
                            inputMode="email"
                            autoCapitalize="none"
                            placeholder="joe@gmail.com"
                            returnKeyType="send"
                            required
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Message message={message} />

                        <View style={styles.formActions}>
                            <Button onPress={sendOtp} disabled={loading}>
                                Send Code
                            </Button>
                        </View>
                    </View>
                )}


                {step === 1 && (
                    <View style={styles.step}>
                        <Input
                            label="OTP"
                            keyboardType="numeric"
                            inputMode="numeric"
                            autoCapitalize="none"
                            placeholder="Enter the 6-digit code"
                            returnKeyType="done"
                            required
                            value={otp}
                            onChangeText={setOtp}
                        />

                        <Message message={message} />

                        <View style={styles.formActions}>
                            <Button onPress={verifyOtp} disabled={loading}>
                                Verify Code
                            </Button>

                            <Pressable onPress={sendOtp} style={{ marginTop: 16, alignSelf: "flex-end" }}>
                                <BodyText style={{ fontSize: FONT_SIZES.sm }}>Resend Code</BodyText>
                            </Pressable>
                        </View>
                    </View>
                )}

                {step === 2 && (
                    <View style={styles.step}>
                        <Input
                            label="New Password"
                            secureTextEntry
                            autoCapitalize="none"
                            placeholder="********"
                            required
                            textContentType="newPassword"
                            value={password}
                            onChangeText={setPassword}
                        />

                        <Input
                            label="Confirm Password"
                            secureTextEntry
                            autoCapitalize="none"
                            placeholder="********"
                            required
                            textContentType="newPassword"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <Message message={message} />

                        <View style={styles.formActions}>
                            <Button onPress={resetPassword} disabled={loading}>
                                Reset Password
                            </Button>
                        </View>
                    </View>
                )}
            </View>
        </CustomView>
    );
}

function Nav({ onBack }: { onBack?: () => void }) {
    return (
        <View style={styles.nav}>
            <Pressable onPress={onBack} style={styles.navAction}>
                <Ionicons name="arrow-back" size={24} color={COLORS.dark.white} />
            </Pressable>

            <BodyText style={styles.navText}>Forgot Password</BodyText>
        </View>
    );
}

function Header({ step }: { step: number }) {

    const titles: Record<number, string> = {
        0: "Reset Password",
        1: "Enter OTP",
        2: "Set New Password",
    };

    const descriptions: Record<number, string> = {
        0: "Please enter your email to receive instructions on how to reset your password.",
        1: "Enter the OTP sent to your email to verify your identity.",
        2: "Choose a new password for your account.",
    }

    return (
        <View style={styles.header}>
            <Heading>
                {titles[step]}
            </Heading>
            <BodyText style={styles.headerText}>
                {descriptions[step]}
            </BodyText>
        </View>
    )
}

function Message({ message }: { message: { type: "error" | "info"; text: string } | null }) {
    return (
        <View style={styles.messageContainer}>
            {message ? (
                <BodyText style={message.type === "error" ? styles.errorText : styles.infoText}>
                    {message.text}
                </BodyText>
            ) : (
                <BodyText style={styles.placeholderText}> </BodyText>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 48,
    },

    nav: {
        width: "100%",
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    navAction: {
        position: "absolute",
        left: 16,
    },
    navText: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: "bold",
        color: COLORS.dark.primary,
    },

    header: {
        paddingHorizontal: 20,
    },

    headerText: {
        fontSize: FONT_SIZES.sm,
    },

    form: {
        height: "100%",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopLeftRadius: BORDER_RADIUS["2xl"],
        borderTopRightRadius: BORDER_RADIUS["2xl"],
        backgroundColor: COLORS.dark.secondary,
        display: "flex",
        flexDirection: "column",
        gap: 24,
    },
    formActions: {
        marginTop: 20,
    },

    step: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },

    messageContainer: {
        minHeight: 20,
        marginTop: 4,
    },
    errorText: {
        color: COLORS.dark.error,
    },
    infoText: {
        color: COLORS.dark.primary,
    },
    placeholderText: {
        color: "transparent",
        fontSize: FONT_SIZES.sm,
    },
});
