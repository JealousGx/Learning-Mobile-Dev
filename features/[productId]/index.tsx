import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

import { BottomSheet } from "@/components/shared/bottom-sheet";
import { Nav } from "@/components/shared/nav";
import { BodyText, Heading, Subheading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

import { ITEMS } from "@/constants/data/items";

import { BORDER_RADIUS, COLORS, SPACING } from "@/styles/theme";

export default function ProductInfo({ productId, visible, onClose }: { productId: string, visible: boolean, onClose: () => void }) {
    const router = useRouter();

    const id = Number(productId);
    const item = ITEMS.find((item) => item.id === id);

    if (!productId || Number.isNaN(id) || !item) {
        return (
            <CustomView style={styles.container}>
                <BodyText>Product not found.</BodyText>

                <Button
                    onPress={() => router.push("/(tabs)")}
                    style={{ marginTop: 16 }}
                >
                    Go back to home
                </Button>
            </CustomView>
        );
    }

    return (
        <BottomSheet visible={visible} onClose={onClose}>
            <Nav title={item.name} />

            <View style={{ flex: 1 }}>
                <Image
                    source={item.image}
                    style={{
                        width: "100%",
                        backgroundColor: COLORS.dark["secondary-foreground"],
                        borderRadius: BORDER_RADIUS.lg,
                        marginBottom: SPACING.xl,
                    }}
                    resizeMode="cover"
                />

                <Heading
                    style={{ color: COLORS.dark.primary, marginBottom: SPACING.md }}
                >
                    {item.name}
                </Heading>

                <BodyText
                    style={{
                        color: COLORS.dark["secondary-foreground"],
                        marginBottom: SPACING.md,
                    }}
                >
                    {item.description}
                </BodyText>

                <Divider style={{ height: 1 }} />

                <View
                    style={{
                        gap: SPACING.sm,
                        marginTop: SPACING.md,
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Subheading>${item.price}</Subheading>

                        <View style={{ flexDirection: "row", gap: SPACING.sm }}>
                            <Button size="icon-sm">
                                <Entypo name="heart" size={20} color={COLORS.dark.white} />
                            </Button>

                            <Button size="icon-sm" variant="outline">
                                <AntDesign name="plus" size={18} color={COLORS.dark.primary} />
                            </Button>
                        </View>
                    </View>

                    <View
                        style={{
                            alignItems: "flex-end",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <BodyText>Users reviews ({item.rating} / 5)</BodyText>

                        <StarRating rating={item.rating} />
                    </View>
                </View>

                <Button style={{ marginTop: SPACING.xxl }} variant="secondary">
                    <Subheading style={{ color: COLORS.dark.primary }}>
                        Add To Cart
                    </Subheading>
                </Button>
            </View>
        </BottomSheet>
    );
}

function StarRating({ rating }: { rating: number }) {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        const fill = Math.max(0, Math.min(1, rating - i));

        stars.push(
            <View
                key={i}
                style={{
                    position: "relative",
                    width: 20,
                    height: 20,
                    marginRight: 4,
                }}
            >
                {/* Outline Star (Border) */}
                <AntDesign
                    name="star"
                    size={20}
                    color={COLORS.dark["secondary-foreground"]}
                    style={{ position: "absolute" }}
                />

                {/* Filled Star (Clipped) */}
                <View
                    style={{
                        position: "absolute",
                        width: `${fill * 100}%`,
                        overflow: "hidden",
                    }}
                >
                    <AntDesign name="star" size={20} color={COLORS.dark.primary} />
                </View>
            </View>,
        );
    }

    return <View style={{ flexDirection: "row", marginTop: 8 }}>{stars}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: SPACING.xl,
    },
});
