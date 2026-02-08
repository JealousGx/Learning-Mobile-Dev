import {
    StyleSheet,
    type Text,
    TextInput,
    type TextInputProps,
    View,
} from "react-native";

import { COLORS } from "@/styles/theme";

import { BodyText } from "../shared/text";

type Props = TextInputProps & {
    label?: string;
    labelProps?: Text["props"];
    wrapperProps?: View["props"];
    required?: boolean;
};

export const Input = ({
    label,
    labelProps,
    wrapperProps,
    required,
    ...props
}: Props) => {
    const { style: labelStyle, ...restLabelProps } = labelProps ?? {};
    const { style: wrapperStyle, ...restWrapperProps } = wrapperProps ?? {};
    const { style: inputStyle, ...restProps } = props ?? {};

    return (
        <View {...restWrapperProps} style={[inputStyles.wrapper, wrapperStyle]}>
            {label && (
                <BodyText {...restLabelProps} style={[inputStyles.label, labelStyle]}>
                    {label}

                    {required && (
                        <BodyText style={{ color: COLORS.dark.error, marginLeft: 4 }}>
                            *
                        </BodyText>
                    )}
                </BodyText>
            )}
            <TextInput
                {...restProps}
                style={[inputStyles.input, inputStyle]}
                placeholderTextColor={COLORS.dark.foreground}
            ></TextInput>
        </View>
    );
};

export const inputStyles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    input: {
        backgroundColor: COLORS.dark["secondary-foreground"],
        color: COLORS.dark.foreground,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 18,
        fontSize: 16,
    },
    label: {
        color: COLORS.dark.white,
    },
});
