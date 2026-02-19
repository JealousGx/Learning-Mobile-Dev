import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { Nav } from "@/components/shared/nav";
import { Product } from "@/components/shared/product";
import { BodyText, Subheading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";

import { CATEGORIES } from "@/constants/data/categories";
import { CATEGORIZED_ITEMS } from "@/constants/data/items";

import { BORDER_RADIUS, COLORS, SPACING } from "@/styles/theme";

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState(1);
    const router = useRouter();

    const products = CATEGORIZED_ITEMS[selectedCategory] || [];

    return (
        <CustomView style={styles.container}>
            <Nav
                title="Our Products"
                onBack={() => router.back()}
                onSearch={() => router.navigate("/search")}
            />

            <FlatList
                data={CATEGORIES}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0 }}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ alignItems: "center", paddingHorizontal: SPACING.md }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.item, selectedCategory === item.id ? styles.selectedItem : null]}
                        onPress={() => setSelectedCategory(item.id)}
                    >
                        <BodyText>{item.name}</BodyText>
                    </TouchableOpacity>
                )}
            />


            {products.length > 0 ? <FlatList
                data={products}
                numColumns={2}
                columnWrapperStyle={{ gap: SPACING.lg, marginBottom: SPACING.lg, }}
                renderItem={({ item }) => <Product item={item} />}
            /> : <View>
                <Subheading style={{ textAlign: "center", marginTop: SPACING.xl }}>No products found for this category.</Subheading>
            </View>}
        </CustomView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        gap: SPACING.xl,
    },

    item: {
        paddingHorizontal: SPACING.md,
        paddingVertical: 6,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: SPACING.sm,
    },
    selectedItem: {
        backgroundColor: COLORS.dark.primary,
        borderRadius: BORDER_RADIUS.md,
    },
    separator: {
        width: 1,
        backgroundColor: COLORS.dark.primary,
        marginVertical: SPACING.xs,
    },
});
