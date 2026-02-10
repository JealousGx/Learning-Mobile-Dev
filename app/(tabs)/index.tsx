import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { ImageCarousel } from "@/components/shared/image-carousel";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";

import { FONT_SIZES, FONT_WEIGHTS, SPACING } from "@/styles/theme";

export default function Home() {
    return (
        <CustomView style={styles.container}>
            <Header />

            <ImageCarousel
                images={[
                    require("@/assets/images/home/headline-1.webp"),
                    require("@/assets/images/home/headline-1.webp"),
                    require("@/assets/images/home/headline-1.webp"),
                    require("@/assets/images/home/headline-1.webp")
                ]}
                height={132}
                autoPlay
            />
        </CustomView>
    );
}

function Header() {
    return (
        <View style={styles.header}>
            <View>
                <Heading style={styles.heading}>Hello. Welcome Back</Heading>
                <BodyText style={styles.subheading}>
                    Create spaces that bring joy!
                </BodyText>
            </View>

            <Button size="icon-sm">
                <SimpleLineIcons name="magnifier" size={18} color="black" />
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        gap: SPACING.lg,
    },

    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    heading: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
    },
    subheading: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.regular,
    },
});
