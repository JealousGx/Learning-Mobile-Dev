import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Image, StyleSheet, View } from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";

import { useCartStore } from "@/store/cart-store";

import { COLORS, SPACING } from "@/styles/theme";

export default function Favourites() {
    const router = useRouter();

    const favItems = useCartStore((s) => s.favoriteItems);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFav = useCartStore((state) => state.removeFromFavorites);

    if (!favItems || favItems.length === 0) {
        return (
            <CustomView style={styles.container}>
                <Nav onBack={() => router.back()} title="My Favourites" />

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        gap: SPACING.sm,
                    }}
                >
                    <MaterialCommunityIcons
                        name="playlist-star"
                        size={256}
                        color={COLORS.dark.primary}
                    />

                    <BodyText>No favorite items yet</BodyText>
                </View>
            </CustomView>
        );
    }

    return (
        <CustomView style={styles.container}>
            <Nav onBack={() => router.back()} title="My Favourites" rightComponent={<ClearFavListButton />} />

            <FlatList
                data={favItems}
                horizontal={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap: SPACING.md }}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", paddingVertical: SPACING.md, gap: SPACING.md, alignItems: "center" }}>
                        <Image
                            source={item.image}
                            style={{
                                width: 108,
                                height: 108,
                                borderRadius: 8,
                                backgroundColor: COLORS.dark.white,
                            }}
                        />

                        <View style={{ flex: 1, gap: SPACING.sm }}>
                            <BodyText numberOfLines={1} style={{ flex: 1, color: COLORS.dark.primary }}>{item.name}</BodyText>

                            <BodyText numberOfLines={2}>{item.description}</BodyText>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <BodyText style={{ color: COLORS.dark.primary }}>${item.price.toFixed(2)}</BodyText>

                                <View style={{ flexDirection: "row", marginTop: SPACING.sm, alignItems: "center", justifyContent: "flex-end", gap: SPACING.sm }}>
                                    <Button size="icon-sm" onPress={() => removeFav(item.id)}>
                                        <MaterialCommunityIcons name="heart-outline" size={20} color={COLORS.dark.white} />
                                    </Button>

                                    <Button size="icon-sm" onPress={() => addToCart(item)}>
                                        <MaterialCommunityIcons name="cart-outline" size={20} color={COLORS.dark.white} />
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
        </CustomView>
    );
}

function ClearFavListButton() {
    const clearFavList = useCartStore((state) => state.clearFavorites);

    return (
        <Button
            size="icon-sm"
            onPress={clearFavList}
        >
            <AntDesign name="delete" size={16} color={COLORS.dark.white} />
        </Button>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        paddingBottom: SPACING.lg,
        gap: SPACING.xl,
    },
});
