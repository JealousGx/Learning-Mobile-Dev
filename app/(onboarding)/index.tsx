import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    type ImageSourcePropType,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Dot } from "@/components/ui/dot";

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
        image: require("@/assets/images/onboarding/screen-1.png"),
        title: "Comfortable Space",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    },
    2: {
        image: require("@/assets/images/onboarding/screen-2.png"),
        title: "Modern Design",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    },
    3: {
        image: require("@/assets/images/onboarding/screen-3.png"),
        title: "Styled Living",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    },
    4: {
        image: require("@/assets/images/onboarding/screen-4.png"),
        title: "Relaxing Furniture",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    },
};

export default function Onboarding() {
    const [step, setStep] = useState<Step>(1);
    const router = useRouter();

    return (
        <CustomView>
            <View style={styles.imageContainer}>
                <Image
                    source={data[step].image}
                    style={styles.image}
                    resizeMode="cover"
                />

                <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={() => router.push("/welcome")}
                >
                    <BodyText style={{ color: COLORS.dark.secondary }}>Skip</BodyText>

                    <AntDesign name="arrow-right" size={18} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Heading style={styles.title}>{data[step].title}</Heading>
                <BodyText style={styles.description}>{data[step].description}</BodyText>
            </View>

            <View style={styles.footer}>
                <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                    {[1, 2, 3, 4].map((s) => (
                        <Dot key={s} active={s === step} />
                    ))}
                </View>

                <Button
                    onPress={() => {
                        if (step < 4) {
                            setStep((prev) => (prev + 1) as Step);
                        } else {
                            router.push("/welcome");
                        }
                    }}
                    style={{ paddingVertical: 8 }}
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
