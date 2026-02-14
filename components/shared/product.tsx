import { AntDesign, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

import type { Item } from "@/constants/data/items";
import ProductInfo from "@/features/[productId]";
import { BORDER_RADIUS, COLORS, SPACING } from "@/styles/theme";
import { Button } from "../ui/button";
import { Divider } from "../ui/divider";
import { BodyText, Heading, Subheading } from "./text";

export function Product({ item }: { item: Item }) {
    const [displayProductInfo, setDisplayProductInfo] = useState(false);

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                gap: SPACING.sm,
            }}
            onPress={() => setDisplayProductInfo((prev) => !prev)}
        >
            <Image
                source={item.image}
                style={{
                    width: "100%",
                    backgroundColor: COLORS.dark["secondary-foreground"],
                    borderRadius: BORDER_RADIUS.lg,
                }}
                resizeMode="cover"
            />

            <View
                style={{ gap: SPACING.xs, flex: 1, justifyContent: "space-between" }}
            >
                <View style={{ gap: SPACING.xs, flex: 1 }}>
                    <Heading
                        style={{
                            color: COLORS.dark.primary,
                            fontWeight: "500",
                        }}
                    >
                        {item.name}
                    </Heading>

                    <BodyText>{item.description}</BodyText>
                </View>

                <Divider />

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Subheading>${item.price.toFixed(2)}</Subheading>

                    <View style={{ flexDirection: "row", gap: SPACING.sm }}>
                        <Button size="icon-sm">
                            <Entypo name="heart" size={20} color={COLORS.dark.white} />
                        </Button>

                        <Button size="icon-sm">
                            <AntDesign name="plus" size={20} color={COLORS.dark.white} />
                        </Button>
                    </View>
                </View>
            </View>

            <ProductInfo productId={item.id.toString()} visible={displayProductInfo} onClose={() => setDisplayProductInfo(false)} />
        </TouchableOpacity>
    );
}
