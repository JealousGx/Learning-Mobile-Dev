import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/styles/theme";

import { formatDate } from "@/utils";

import { BodyText } from "../shared/text";

type Props = {
    value?: Date;
    onChange: (date: Date) => void;
    label?: string;
    labelProps?: Text["props"];
    required?: boolean;
};

export function DateInput({ value, label, onChange, labelProps, required }: Props) {
    const [open, setOpen] = useState(false);
    const [tempDate, setTempDate] = useState(value ?? new Date(2000, 0, 1));

    const { style: labelStyle, ...restLabelProps } = labelProps ?? {};


    return (
        <View style={styles.wrapper}>
            {label && (
                <BodyText {...restLabelProps} style={[styles.label, labelStyle]}>
                    {label}

                    {required && (
                        <BodyText style={{ color: COLORS.dark.error, marginLeft: 4 }}>
                            *
                        </BodyText>
                    )}
                </BodyText>
            )}

            {/* Input */}
            <Pressable style={styles.input} onPress={() => setOpen(true)}>
                <Text style={styles.text}>
                    {value ? formatDate(value) : "Date of birth"}
                </Text>
            </Pressable>

            {/* Picker */}
            {open && (
                <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={new Date()}
                    onChange={(_, selectedDate) => {
                        if (Platform.OS === "android") {
                            setOpen(false);
                            if (selectedDate) onChange(selectedDate);
                        } else if (selectedDate) {
                            setTempDate(selectedDate);
                        }
                    }}
                />
            )}

            {/* iOS actions */}
            {open && Platform.OS === "ios" && (
                <View style={styles.iosActions}>
                    <Pressable onPress={() => setOpen(false)}>
                        <Text style={styles.cancel}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            onChange(tempDate);
                            setOpen(false);
                        }}
                    >
                        <Text style={styles.done}>Done</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    input: {
        borderWidth: 1,
        justifyContent: "center",
        backgroundColor: COLORS.dark["secondary-foreground"],
        color: COLORS.dark.background,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 18,
        fontSize: 16,
    },
    text: {
        fontSize: 16,
    },
    iosActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.dark["secondary-foreground"],
    },
    cancel: {
        fontSize: 16,
        color: COLORS.dark.error,
    },
    done: {
        fontSize: 16,
        fontWeight: "600",
    },
    label: {
        color: COLORS.dark.white,
    },
});
