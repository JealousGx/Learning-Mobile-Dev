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
                props.style,
                {
                    marginVertical: 8,
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: COLORS.dark.primary,
                }
            ]}
        />
    );
}
