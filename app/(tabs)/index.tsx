import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import BedroomIcon from "@/assets/icons/categories/bedroom.svg";
import DiningRoomIcon from "@/assets/icons/categories/dining-room.svg";
import KitchenIcon from "@/assets/icons/categories/kitchen.svg";
import LivingRoomIcon from "@/assets/icons/categories/living-room.svg";
import OfficeIcon from "@/assets/icons/categories/office.svg";

import { ImageCarousel } from "@/components/shared/image-carousel";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";

import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from "@/styles/theme";

const CATEGORIES = [
    {
        id: 1,
        name: "Living Room",
        Icon: LivingRoomIcon,
    },
    {
        id: 2,
        name: "Office",
        Icon: OfficeIcon,
    },
    {
        id: 3,
        name: "Bedroom",
        Icon: BedroomIcon,
    },
    {
        id: 4,
        name: "Kitchen",
        Icon: KitchenIcon,
    },
    {
        id: 5,
        name: "Dining Room",
        Icon: DiningRoomIcon,
    },
];

type Category = typeof CATEGORIES[number];

export default function Home() {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(1);

    return (
        <CustomView style={styles.container}>
            <Header />

            <ImageCarousel
                images={[
                    require("@/assets/images/home/headline-1.webp"),
                    require("@/assets/images/home/headline-1.webp"),
                    require("@/assets/images/home/headline-1.webp"),
                    require("@/assets/images/home/headline-1.webp"),
                ]}
                height={132}
                autoPlay
            />

            <Categories categories={CATEGORIES} activeCategoryIndex={activeCategoryIndex} setActiveCategoryIndex={setActiveCategoryIndex} />
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

function Categories({ categories, activeCategoryIndex, setActiveCategoryIndex }: { categories: Category[], activeCategoryIndex: number, setActiveCategoryIndex: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <View style={{ gap: SPACING.xs }}>
            <Heading style={{ color: COLORS.dark.primary }}>Categories</Heading>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        onPress={() => setActiveCategoryIndex(category.id)}
                        style={[styles.categoryIconContainer, { backgroundColor: activeCategoryIndex === category.id ? COLORS.dark.primary : COLORS.dark.secondary }]}>
                        <category.Icon
                            width={42}
                            height={42}
                            color={activeCategoryIndex === category.id ? COLORS.dark["primary-foreground"] : COLORS.dark.foreground}
                            fill="none"
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        gap: SPACING.xl,
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

    categoriesContainer: {
        marginTop: SPACING.md,
    },
    categoryIconContainer: {
        width: 72,
        height: 72,
        alignItems: "center",
        padding: SPACING.md,
        borderRadius: SPACING.md,
        justifyContent: "center",
        marginRight: SPACING.md,
    },
});
