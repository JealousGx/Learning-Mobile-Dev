import { TouchableOpacity, View } from "react-native";

import { COLORS, SPACING } from "@/styles/theme";

import { BodyText } from "../shared/text";

type Props = {
    label: string;
    value: string;
    onValueChange: (newValue: string) => void;
    checked?: boolean;
}

export function Checkbox({ label, value, onValueChange, checked }: Props) {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: SPACING.sm,
            }}
            onPress={() => onValueChange(value)}
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
                {checked && (
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
                {label}
            </BodyText>
        </TouchableOpacity>
    )
}