import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
    type StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    type ViewStyle,
} from "react-native";

import { Dot } from "../ui/dot";

const { width } = Dimensions.get("window");
const DEFAULT_HORIZONTAL_PADDING = 32;
const DEFAULT_GAP = 8;

type CarouselProps<T> = {
    data: T[];
    renderItem: ({
        item,
        index,
    }: {
        item: T;
        index: number;
    }) => React.ReactElement;
    height?: number;
    autoPlay?: boolean;
    gap?: number;
    horizontalPadding?: number;
    itemWidth?: number;
    showDots?: boolean;
    itemContainerStyle?: StyleProp<ViewStyle>;
};

export function Carousel<T>({
    data,
    renderItem,
    height = 180,
    autoPlay = false,
    gap = DEFAULT_GAP,
    horizontalPadding = DEFAULT_HORIZONTAL_PADDING,
    itemWidth,
    showDots = true,
    itemContainerStyle
}: CarouselProps<T>) {
    const ITEM_WIDTH = itemWidth ?? width - horizontalPadding;
    const PAGE_WIDTH = ITEM_WIDTH + gap;

    const [index, setIndex] = useState(0);
    const ref = useRef<FlatList<T> | null>(null);
    const isInteractingRef = useRef(false);

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        isInteractingRef.current = false;
        const offsetX = Math.max(
            0,
            e.nativeEvent.contentOffset.x - horizontalPadding / 2,
        );
        const newIndex = Math.round(offsetX / PAGE_WIDTH);
        setIndex(newIndex);
    };

    const goTo = (i: number) => {
        ref.current?.scrollToOffset({
            offset: i * PAGE_WIDTH + horizontalPadding / 2,
            animated: true,
        });
        setIndex(i);
    };

    useEffect(() => {
        if (!autoPlay || data.length <= 1) return;

        const id = setInterval(() => {
            if (isInteractingRef.current) return;

            setIndex((prev) => {
                const next = (prev + 1) % data.length;
                ref.current?.scrollToOffset({
                    offset: next * PAGE_WIDTH + horizontalPadding / 2,
                    animated: true,
                });
                return next;
            });
        }, 3000);

        return () => clearInterval(id);
    }, [autoPlay, data.length, PAGE_WIDTH, horizontalPadding]);

    return (
        <View>
            <FlatList
                ref={ref}
                data={data}
                horizontal
                pagingEnabled
                snapToInterval={PAGE_WIDTH}
                decelerationRate="fast"
                onMomentumScrollBegin={() => {
                    isInteractingRef.current = true;
                }}
                onScrollBeginDrag={() => {
                    isInteractingRef.current = true;
                }}
                onScrollEndDrag={() => {
                    isInteractingRef.current = false;
                }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, i) => String(i)}
                onMomentumScrollEnd={onMomentumScrollEnd}
                contentContainerStyle={{ paddingHorizontal: horizontalPadding / 2 }}
                renderItem={({ item, index: i }) => {
                    return (
                        <View
                            style={[
                                styles.itemContainer,
                                { width: ITEM_WIDTH, height, marginRight: gap },
                                itemContainerStyle,
                            ]}
                        >
                            {renderItem({ item, index: i })}
                        </View>
                    );
                }}
            />

            {showDots && (
                <View style={styles.dots}>
                    {data.map((_, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => goTo(i)}
                            style={styles.dotTouchable}
                        >
                            <Dot active={i === index} />
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 12,
        backgroundColor: "#eee",
        overflow: "visible",
        justifyContent: "center",
    },
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
        gap: 8,
    },
    dotTouchable: {
        padding: 4,
    },
});
