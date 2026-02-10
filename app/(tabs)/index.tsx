import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { Carousel } from "@/components/shared/carousel";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";

import { BEST_SELLERS, type BestSeller } from "@/constants/data/best-sellers";
import { CATEGORIES, type Category } from "@/constants/data/categories";

import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from "@/styles/theme";

export default function Home() {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(1);

    return (
        <CustomView>
            <ScrollView horizontal={false} contentContainerStyle={styles.container}>
                <Header />

                <Carousel
                    data={[
                        require("@/assets/images/home/headline-1.webp"),
                        require("@/assets/images/home/headline-1.webp"),
                        require("@/assets/images/home/headline-1.webp"),
                        require("@/assets/images/home/headline-1.webp"),
                    ]}
                    height={132}
                    autoPlay
                    renderItem={({ item }) => {
                        const source =
                            typeof item === "number" || typeof item === "object"
                                ? item
                                : { uri: item };
                        return (
                            <Image
                                source={source}
                                style={{ width: "100%", height: "100%" }}
                                resizeMode="cover"
                            />
                        );
                    }}
                />

                <Categories
                    categories={CATEGORIES}
                    activeCategoryIndex={activeCategoryIndex}
                    setActiveCategoryIndex={setActiveCategoryIndex}
                />

                <BestSellers items={BEST_SELLERS} />
            </ScrollView>
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

function Categories({
    categories,
    activeCategoryIndex,
    setActiveCategoryIndex,
}: {
    categories: Category[];
    activeCategoryIndex: number;
    setActiveCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
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
                        style={[
                            styles.categoryIconContainer,
                            {
                                backgroundColor:
                                    activeCategoryIndex === category.id
                                        ? COLORS.dark.primary
                                        : COLORS.dark.secondary,
                            },
                        ]}
                    >
                        <category.Icon
                            width={42}
                            height={42}
                            color={
                                activeCategoryIndex === category.id
                                    ? COLORS.dark["primary-foreground"]
                                    : COLORS.dark.foreground
                            }
                            fill="none"
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

function BestSellers({ items }: { items: BestSeller[] }) {
    return (
        <View style={{ gap: SPACING.xs }}>
            <Heading style={{ color: COLORS.dark.primary }}>Best Sellers</Heading>

            <Carousel
                data={items}
                height={180}
                itemWidth={330}
                gap={SPACING.xl}
                showDots={false}
                renderItem={({ item }) => (
                    <View style={styles.bestSellerItem}>
                        <View style={styles.bestSellerInfo}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: SPACING.xs,
                                }}
                            >
                                <Heading
                                    style={{
                                        color: COLORS.dark.background,
                                        fontWeight: "500",
                                        fontSize: FONT_SIZES.xl,
                                    }}
                                >
                                    {item.name}
                                </Heading>

                                <BodyText
                                    style={{
                                        fontSize: FONT_SIZES.sm,
                                        color: COLORS.dark.background,
                                    }}
                                >
                                    (${item.price.toFixed(2)})
                                </BodyText>
                            </View>

                            <BodyText
                                style={{
                                    color: COLORS.dark.background,
                                    fontSize: FONT_SIZES.sm,
                                    marginBottom: SPACING.md,
                                }}
                            >
                                {item.description}
                            </BodyText>

                            <View
                                style={{
                                    flex: 1,
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: SPACING.xs,
                                        backgroundColor: COLORS.dark.background,
                                        paddingHorizontal: SPACING.sm,
                                        paddingVertical: SPACING.xs,
                                        borderRadius: SPACING.md,
                                    }}
                                >
                                    <AntDesign
                                        name="star"
                                        size={12}
                                        color={COLORS.dark.primary}
                                    />

                                    <BodyText style={{ fontSize: FONT_SIZES.md }}>
                                        {item.rating}
                                    </BodyText>
                                </View>

                                <Pressable
                                    style={{
                                        backgroundColor: COLORS.dark.background,
                                        paddingHorizontal: SPACING.sm,
                                        paddingVertical: SPACING.xs,
                                        borderRadius: SPACING.md,
                                    }}
                                >
                                    <BodyText style={{ fontSize: FONT_SIZES.md }}>
                                        Shop Now
                                    </BodyText>
                                </Pressable>
                            </View>
                        </View>

                        <Image source={item.image} style={styles.bestSellerImage} />
                    </View>
                )}
            />
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

    bestSellerItem: {
        flexDirection: "row",
        gap: SPACING.lg,
        height: "100%",
        backgroundColor: COLORS.dark.primary,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        overflow: "visible",
    },
    bestSellerInfo: {
        maxWidth: "60%",
    },
    bestSellerImage: {
        position: "absolute",
        right: -SPACING.lg,
        top: 0,
        width: 160,
        height: 180,
    },
});
