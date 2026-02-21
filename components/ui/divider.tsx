import {
    StyleSheet,
    View,
    type ViewProps
} from "react-native";

import { COLORS } from "@/styles/theme";


export function Divider(props: ViewProps) {
    return (
        <View
            {...props}
            style={[
                {
                    marginVertical: 8,
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: COLORS.dark.primary,
                },
                props.style,
            ]}
        />
    );
}

export function VerticalDivider(props: ViewProps) {
    return (
        <View
            {...props}
            style={[
                {
                    marginHorizontal: 8,
                    width: StyleSheet.hairlineWidth,
                    height: "100%",
                    backgroundColor: COLORS.dark.primary,
                },
                props.style,
            ]}
        />
    );
}


