import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { BodyText } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { COLORS } from "@/styles/theme";

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <CustomView>
            <View style={styles.center}>
                <Image
                    source={require("@/assets/icons/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <BodyText style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod.
                </BodyText>
            </View>

            <View style={styles.actions}>
                <Pressable
                    style={styles.loginBtn}
                    onPress={() => router.push("/(auth)/login")}
                >
                    <BodyText style={styles.loginText}>Log In</BodyText>
                </Pressable>

                <Pressable
                    style={styles.signupBtn}
                    onPress={() => router.push("/(auth)/signup")}
                >
                    <BodyText style={styles.signupText}>Sign Up</BodyText>
                </Pressable>
            </View>
        </CustomView>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    description: {
        textAlign: "center",
        color: "#fff",
        fontSize: 14,
        marginTop: 8,
        paddingHorizontal: 20,
    },
    actions: {
        paddingBottom: 40,
        paddingHorizontal: 60,
    },
    loginBtn: {
        backgroundColor: "#F4B5A4",
        paddingVertical: 14,
        borderRadius: 30,
        marginBottom: 12,
    },
    loginText: {
        textAlign: "center",
        color: COLORS.dark["primary-foreground"],
        fontWeight: "600",
    },
    signupBtn: {
        backgroundColor: "#4B4544",
        paddingVertical: 14,
        borderRadius: 30,
    },
    signupText: {
        textAlign: "center",
        color: COLORS.dark["primary-foreground"],
        fontWeight: "600",
    },
});
