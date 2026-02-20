import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    type ImageSourcePropType,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Dot } from "@/components/ui/dot";
import { useUserStore } from "@/store/user-store";
import { COLORS, FONT_SIZES } from "@/styles/theme";

type Step = 1 | 2 | 3 | 4;

const data: Record<
    Step,
    {
        image: ImageSourcePropType;
        title: string;
        description: string;
    }
> = {
    1: {
        image: require("@/assets/images/onboarding/screen-1.webp"),
        title: "Comfortable Space",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    },
    2: {
        image: require("@/assets/images/onboarding/screen-2.webp"),
        title: "Modern Design",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    },
    3: {
        image: require("@/assets/images/onboarding/screen-3.webp"),
        title: "Styled Living",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    },
    4: {
        image: require("@/assets/images/onboarding/screen-4.webp"),
        title: "Relaxing Furniture",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    },
};

export default function Onboarding() {
    const [step, setStep] = useState<Step>(1);
    const [isAnimating, setIsAnimating] = useState(false);

    const router = useRouter();

    const completeOnboarding = useUserStore((state) => state.completeOnboarding);

    const pageOpacity = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const { width } = Dimensions.get("window");

    const switchStep = (nextStep: Step | null) => {
        if (isAnimating) return;
        if (!nextStep) {
            router.push("/welcome");
            return;
        }

        if (nextStep === step) return;

        const direction = nextStep > step ? 1 : -1; // 1 = forward (slide left), -1 = backward
        setIsAnimating(true);

        // slide + fade current page out
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: -direction * width,
                duration: 220,
                useNativeDriver: true,
            }),
            Animated.timing(pageOpacity, {
                toValue: 0,
                duration: 220,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // put animated values off-screen and transparent for the new page
            translateX.setValue(direction * width);
            pageOpacity.setValue(0);
            setStep(nextStep);

            // slide + fade new page in
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 260,
                    useNativeDriver: true,
                }),
                Animated.timing(pageOpacity, {
                    toValue: 1,
                    duration: 260,
                    useNativeDriver: true,
                }),
            ]).start(() => setIsAnimating(false));
        });
    };

    return (
        <CustomView>
            <View style={styles.imageContainer}>
                <Animated.Image
                    source={data[step].image}
                    style={[
                        styles.image,
                        { transform: [{ translateX }], opacity: pageOpacity },
                    ]}
                    resizeMode="cover"
                />

                <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={async () => {
                        await completeOnboarding();

                        router.push("/welcome")
                    }}
                >
                    <BodyText style={{ color: COLORS.dark.secondary }}>Skip</BodyText>

                    <AntDesign name="arrow-right" size={18} color="black" />
                </TouchableOpacity>
            </View>

            <Animated.View
                style={[
                    styles.content,
                    { transform: [{ translateX }], opacity: pageOpacity },
                ]}
            >
                <Heading style={styles.title}>{data[step].title}</Heading>
                <BodyText style={styles.description}>{data[step].description}</BodyText>
            </Animated.View>

            <View style={styles.footer}>
                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                    {[1, 2, 3, 4].map((s) => (
                        <TouchableOpacity
                            key={s}
                            onPress={() => switchStep(s as Step)}
                            style={{ cursor: "pointer" }}
                            disabled={isAnimating}
                        >
                            <Dot active={s === step} />
                        </TouchableOpacity>
                    ))}
                </View>

                <Button
                    onPress={async () => {
                        if (step < 4) {
                            switchStep((step + 1) as Step);
                        } else {
                            await completeOnboarding();
                            router.push("/welcome");
                        }
                    }}
                    style={{ paddingVertical: 8 }}
                    disabled={isAnimating}
                >
                    {step < 4 ? "Next" : "Get Started"}
                </Button>
            </View>
        </CustomView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        position: "relative",
        backgroundColor: COLORS.dark.secondary,
        paddingBottom: 40,
        borderBottomLeftRadius: 24,
        overflow: "hidden",
    },
    image: {
        width: "100%",
    },
    skipBtn: {
        position: "absolute",
        top: 32,
        right: 16,
        display: "flex",
        flexDirection: "row",
        gap: 6,
        cursor: "pointer",
    },

    content: {
        paddingHorizontal: 16,
        paddingVertical: 56,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    title: {
        color: COLORS.dark.primary,
        fontSize: 28,
    },
    description: {
        textAlign: "center",
        fontSize: FONT_SIZES.md,
    },

    footer: {
        flex: 1,
        paddingHorizontal: 24,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
