import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { Dot } from "../ui/dot";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 32;
const GAP = 8;
const ITEM_WIDTH = width - HORIZONTAL_PADDING; // full-width card look
const PAGE_WIDTH = ITEM_WIDTH + GAP; // account for gap between items

type Props = {
    images: string[];
    height?: number;
    autoPlay?: boolean;
};

export function ImageCarousel({ images, height = 180, autoPlay = false }: Props) {
    const [index, setIndex] = useState(0);
    const ref = useRef<FlatList<string> | null>(null);
    const isInteractingRef = useRef(false);


    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        isInteractingRef.current = false;
        const offsetX = Math.max(0, e.nativeEvent.contentOffset.x - HORIZONTAL_PADDING / 2);
        const newIndex = Math.round(offsetX / PAGE_WIDTH);
        setIndex(newIndex);
    };

    const goTo = (i: number) => {
        ref.current?.scrollToOffset({ offset: i * PAGE_WIDTH + HORIZONTAL_PADDING / 2, animated: true });

        setIndex(i);
    };

    useEffect(() => {
        if (!autoPlay || images.length <= 1) return;

        const id = setInterval(() => {
            if (isInteractingRef.current) return;

            setIndex((prev) => {
                const next = (prev + 1) % images.length;
                ref.current?.scrollToOffset({ offset: next * PAGE_WIDTH + HORIZONTAL_PADDING / 2, animated: true });
                return next;
            });
        }, 3000);

        return () => clearInterval(id);
    }, [autoPlay, images.length]);

    return (
        <View>
            <FlatList
                ref={ref}
                data={images}
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
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => {
                    const source = typeof item === "number" || typeof item === "object" ? item : { uri: item };

                    return (
                        <View style={[styles.itemContainer, { width: ITEM_WIDTH, height }]}>
                            <Image
                                source={source}
                                style={[styles.imageFull]}
                                resizeMode="cover"
                            />
                        </View>
                    )
                }}
            />

            <View style={styles.dots}>
                {images.map((_, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => goTo(i)}
                        style={styles.dotTouchable}
                    >
                        <Dot active={i === index} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: HORIZONTAL_PADDING / 2,
    },
    itemContainer: {
        borderRadius: 12,
        marginRight: GAP,
        backgroundColor: "#eee",
        overflow: "hidden",
    },
    imageFull: {
        width: "100%",
        height: "100%",
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
