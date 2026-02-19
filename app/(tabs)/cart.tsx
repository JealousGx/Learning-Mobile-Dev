import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { ComponentType } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    type TextProps,
    TouchableOpacity,
    View,
} from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText, Heading, Subheading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

import { type CartItem, useCartStore } from "@/store/cart-store";

import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from "@/styles/theme";

export default function Cart() {
    const router = useRouter();
    const totalCartItems = useCartStore((state) => state.totalItems());
    const subtotal = useCartStore((state) => state.subtotal());
    const tax = useCartStore((state) => state.tax());
    const delivery = useCartStore((state) => state.deliveryFee());
    const total = useCartStore((state) => state.total());

    const items = useCartStore((state) => state.items);

    if (!totalCartItems) {
        return (
            <CustomView>
                <ScrollView horizontal={false} contentContainerStyle={styles.container}>
                    <Nav onBack={() => router.back()} title="My Cart" />

                    <View
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                        <AntDesign
                            name="shopping-cart"
                            size={256}
                            color={COLORS.dark.white}
                        />

                        <Subheading style={{ fontSize: FONT_SIZES.xl }}>
                            There are no items in your cart.
                        </Subheading>
                    </View>
                </ScrollView>
            </CustomView>
        );
    }

    return (
        <CustomView style={styles.container}>
            <Nav
                onBack={() => router.back()}
                title="My Cart"
                rightComponent={<ClearCartButton />}
            />

            <View style={{ flex: 1, gap: SPACING.md }}>
                {items.map((item) => (
                    <CartProduct key={item.id} item={item} />
                ))}

                <Divider />

                <View style={{ gap: SPACING.sm }}>
                    <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />

                    <SummaryRow label="Tax & Fees" value={`$${tax.toFixed(2)}`} />

                    <SummaryRow label="Delivery" value={`$${delivery.toFixed(2)}`} />
                </View>

                <Divider />

                <SummaryRow
                    label="Total"
                    value={`$${total.toFixed(2)}`}
                    LabelComp={Heading}
                    ValueComp={Heading}
                />

                <Button onPress={() => router.navigate("/checkout")} style={{ marginTop: SPACING.lg }} variant="secondary"><BodyText style={{ color: COLORS.dark.primary, fontWeight: FONT_WEIGHTS.medium, fontSize: FONT_SIZES.md }}>Checkout</BodyText></Button>
            </View>
        </CustomView>
    );
}

function CartProduct({ item }: { item: CartItem }) {
    const incrementQuantity = useCartStore((state) => state.incrementQuantity);
    const decrementQuantity = useCartStore((state) => state.decrementQuantity);

    return (
        <View style={styles.productContainer}>
            <View
                style={{ flexDirection: "row", gap: SPACING.sm, alignItems: "center" }}
            >
                <Image
                    source={item.image}
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 8,
                        backgroundColor: COLORS.dark.white,
                    }}
                />

                <View style={{ gap: SPACING.xs }}>
                    <Subheading style={{ color: COLORS.dark.primary }}>
                        {item.name}
                    </Subheading>
                    <BodyText>${item.price.toFixed(2)}</BodyText>
                </View>
            </View>

            <View
                style={{ flexDirection: "row", alignItems: "center", gap: SPACING.sm }}
            >
                <TouchableOpacity
                    style={{
                        padding: SPACING.xs,
                        backgroundColor: COLORS.dark.primary,
                        borderRadius: "100%",
                    }}
                    onPress={() => incrementQuantity(item.id)}
                >
                    <AntDesign name="plus" size={16} color={COLORS.dark.white} />
                </TouchableOpacity>

                <Subheading>{item.quantity}</Subheading>

                <TouchableOpacity
                    style={{
                        padding: SPACING.xs,
                        backgroundColor: COLORS.dark.secondary,
                        borderRadius: "100%",
                    }}
                    onPress={() => decrementQuantity(item.id)}
                >
                    <AntDesign name="minus" size={16} color={COLORS.dark.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function ClearCartButton() {
    const clearCart = useCartStore((state) => state.clearCart);

    return (
        <Button
            size="icon-sm"
            onPress={clearCart}
        >
            <AntDesign name="delete" size={16} color={COLORS.dark.white} />
        </Button>
    );
}

function SummaryRow({
    label,
    value,
    LabelComp,
    ValueComp,
}: {
    label: string;
    value: string;
    LabelComp?: ComponentType<TextProps>;
    ValueComp?: ComponentType<TextProps>;
}) {
    const Label = LabelComp ?? Subheading;
    const Value = ValueComp ?? Subheading;

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: SPACING.sm,
            }}
        >
            <Label>{label}</Label>

            <Value style={{ color: COLORS.dark.primary }}>{value}</Value>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        gap: SPACING.xl,
    },

    productContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: SPACING.sm,
    },
});
