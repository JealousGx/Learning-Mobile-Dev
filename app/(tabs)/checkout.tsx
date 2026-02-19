import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText, Heading, Subheading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";

import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

import { useCartStore } from "@/store/cart-store";

import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from "@/styles/theme";

const PAYMENT_OPTIONS = [
    "Cash on Delivery",
    "Paypal",
    "Apple Pay",
    "Credit Card",
];

export default function Checkout() {
    const router = useRouter();

    const items = useCartStore((s) => s.items);
    const total = useCartStore((s) => s.total());
    const resetCart = useCartStore((s) => s.resetItems);

    const [selectedPayment, setSelectedPayment] = useState(PAYMENT_OPTIONS[0]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayNow = () => {
        if (!selectedPayment) {
            Alert.alert(
                "Select Payment Method",
                "Please select a payment method before proceeding.",
            );
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing delay
        setTimeout(() => {
            setIsProcessing(false);

            Alert.alert(
                "Payment Successful",
                `Your payment via ${selectedPayment} was successful!`,
            );

            resetCart();

            router.push("/payment-success");
        }, 3000); // 3 seconds
    };

    return (
        <CustomView>
            <ScrollView horizontal={false} contentContainerStyle={styles.container}>
                <Nav title="Checkout" onBack={() => router.back()} />

                <View style={{ gap: SPACING.lg }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Heading style={{ color: COLORS.dark.primary }}>
                            Shipping Address
                        </Heading>

                        <TouchableOpacity>
                            <FontAwesome
                                name="pencil-square-o"
                                size={24}
                                color={COLORS.dark.primary}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            backgroundColor: COLORS.dark.secondary,
                            padding: SPACING.md,
                            borderRadius: SPACING.md,
                            gap: SPACING.sm,
                        }}
                    >
                        <Subheading style={{ color: COLORS.dark.primary }}>
                            Jealous Dev
                        </Subheading>

                        <BodyText>
                            123 Main Street
                            {"\n"}
                            Springfield, IL 62704
                            {"\n"}
                            United States
                        </BodyText>

                        <BodyText>Phone: (555) 123-4567</BodyText>
                    </View>
                </View>

                <View style={{ gap: SPACING.lg }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Heading style={{ color: COLORS.dark.primary }}>
                            Order Summary
                        </Heading>

                        <TouchableOpacity onPress={() => router.back()}>
                            <FontAwesome
                                name="pencil-square-o"
                                size={24}
                                color={COLORS.dark.primary}
                            />
                        </TouchableOpacity>
                    </View>

                    <View>
                        {items.map((item) => (
                            <View
                                key={item.id}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: SPACING.sm,
                                }}
                            >
                                <BodyText>
                                    {item.name} x{item.quantity}
                                </BodyText>
                                <BodyText style={{ color: COLORS.dark.primary }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </BodyText>
                            </View>
                        ))}

                        <Divider />

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: SPACING.sm,
                            }}
                        >
                            <BodyText style={{ fontWeight: "bold" }}>Total</BodyText>
                            <BodyText
                                style={{ color: COLORS.dark.primary, fontWeight: "bold" }}
                            >
                                ${total.toFixed(2)}
                            </BodyText>
                        </View>
                    </View>
                </View>

                <View style={{ gap: SPACING.lg }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Heading style={{ color: COLORS.dark.primary }}>
                            Payment Method
                        </Heading>

                        <TouchableOpacity>
                            <FontAwesome
                                name="pencil-square-o"
                                size={24}
                                color={COLORS.dark.primary}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            backgroundColor: COLORS.dark.secondary,
                            padding: SPACING.md,
                            borderRadius: SPACING.md,
                            gap: SPACING.sm,
                        }}
                    >
                        {PAYMENT_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: SPACING.sm,
                                }}
                                onPress={() => setSelectedPayment(option)}
                            >
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 4,
                                        borderWidth: 2,
                                        borderColor: COLORS.dark.primary,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {selectedPayment === option && (
                                        <View
                                            style={{
                                                width: 12,
                                                height: 12,
                                                backgroundColor: COLORS.dark.primary,
                                            }}
                                        />
                                    )}
                                </View>
                                <BodyText style={{ color: COLORS.dark.primary }}>
                                    {option}
                                </BodyText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ gap: SPACING.lg }}>
                    <Heading style={{ color: COLORS.dark.primary }}>
                        Delivery Time
                    </Heading>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Subheading>Estimated Delivery</Subheading>

                        <BodyText style={{ color: COLORS.dark.primary }}>
                            Monday, September 25th
                        </BodyText>
                    </View>
                </View>

                <Button onPress={handlePayNow} disabled={isProcessing}>
                    {isProcessing ? (
                        <ActivityIndicator color={COLORS.dark["secondary-foreground"]} />
                    ) : (
                        <BodyText
                            style={{
                                fontSize: FONT_SIZES.md,
                                fontWeight: FONT_WEIGHTS.bold,
                                color: COLORS.dark["primary-foreground"],
                            }}
                        >
                            Pay Now
                        </BodyText>)}
                </Button>
            </ScrollView>
        </CustomView>
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
