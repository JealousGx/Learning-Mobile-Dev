import {
    Pressable,
    StyleSheet,
    type Text,
    TextInput,
    type TextInputProps,
    View,
} from "react-native";

import { COLORS } from "@/styles/theme";

import { Label } from "./label";

type Props = TextInputProps & {
    label?: string;
    labelProps?: Text["props"];
    wrapperProps?: View["props"];
    required?: boolean;

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
};

export const Input = ({
    label,
    labelProps,
    wrapperProps,
    required,

    leftIcon,
    rightIcon,
    onLeftIconPress,
    onRightIconPress,

    ...props
}: Props) => {
    const { style: wrapperStyle, ...restWrapperProps } = wrapperProps ?? {};
    const { style: inputStyle, ...restProps } = props ?? {};

    return (
        <View {...restWrapperProps} style={[inputStyles.wrapper, wrapperStyle]}>
            {label && (
                <Label label={label} required={required} labelProps={labelProps} />
            )}

            <View style={inputStyles.inputContainer}>
                {leftIcon && (
                    <Pressable
                        onPress={onLeftIconPress}
                        style={inputStyles.iconLeft}
                        hitSlop={8}
                    >
                        {leftIcon}
                    </Pressable>
                )}
                <TextInput
                    {...restProps}
                    style={[inputStyles.input, inputStyle]}
                    placeholderTextColor={COLORS.dark.foreground}
                ></TextInput>

                {rightIcon && (
                    <Pressable
                        onPress={onRightIconPress}
                        style={inputStyles.iconRight}
                        hitSlop={8}
                    >
                        {rightIcon}
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export const inputStyles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.dark["secondary-foreground"],
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 4
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
    label: {
        color: COLORS.dark.white,
    },
    inputWithLeftIcon: {
        marginLeft: 8,
    },

    inputWithRightIcon: {
        marginRight: 8,
    },
    iconLeft: {
        justifyContent: "center",
        alignItems: "center",
    },

    iconRight: {
        justifyContent: "center",
        alignItems: "center",
    },
});
