import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Modal,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { Slider } from "@/components/shared/slider";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CATEGORIES } from "@/constants/data/categories";
import { PRODUCTS } from "@/constants/data/products";

import { COLORS, FONT_SIZES, SPACING } from "@/styles/theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.8;

const FILTER_COLORS = {
    red: "#FF6B6B",
    blue: "#4D96FF",
    green: "#6BCB77",
    yellow: "#FFD93D",
    purple: "#9D4EDD",
}

const TOP_SEARCHES = [
    "Bed",
    "Lamp",
    "Plastic Plants",
    "Carpet",
    "Sofa",
    "Blue Chairs",
];

type Filter = {
    priceRange: number;
    category: string;
    product: string;
    color: string;
}

export default function Search() {
    const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

    const [query, setQuery] = useState("");
    const router = useRouter();

    const onSearch = (query: string) => {
        if (query.length === 0) return;

        console.log("Searching for:", query);
    };

    const handleFilters = (filters: Filter) => {
        console.log("Applying filters:", filters);
    };

    return (
        <CustomView style={styles.container}>
            <Nav onBack={() => router.back()} />

            <SearchInput
                initialQuery={query}
                onSearch={onSearch}
                handleFilters={handleFilters}
                initialFilters={{
                    priceRange: 500,
                    category: CATEGORIES.find((c) => c.id === parseInt(categoryId || "1", 10))?.name || CATEGORIES[0].name,
                    product: PRODUCTS[0].name,
                    color: FILTER_COLORS.blue,
                }}
            />

            <TopSearches onClick={setQuery} />
        </CustomView>
    );
}

function Nav({ onBack }: { onBack?: () => void }) {
    return (
        <View style={styles.nav}>
            <Pressable onPress={onBack} style={styles.navAction}>
                <Ionicons name="arrow-back" size={24} color={COLORS.dark.white} />
            </Pressable>

            <BodyText style={styles.navText}>Search</BodyText>
        </View>
    );
}

function SearchInput({
    initialQuery,
    onSearch,
    handleFilters,
    initialFilters,
}: {
    initialQuery: string;
    onSearch: (query: string) => void;
    handleFilters: (filters: Filter) => void;
    initialFilters?: Filter;
}) {
    const [filtersOpen, setFiltersOpen] = useState(false);

    return (
        <View style={styles.searchInput}>
            <Input
                style={{ color: COLORS.dark.background }}
                defaultValue={initialQuery}
                placeholder="Search for products, brands and more"
                returnKeyType="search"
                rightIcon={
                    <View
                        style={{
                            padding: 6,
                            backgroundColor: COLORS.dark.primary,
                            borderRadius: 18,
                        }}
                    >
                        <Ionicons
                            name="options-outline"
                            size={20}
                            color={COLORS.dark.background}
                        />
                    </View>
                }
                onRightIconPress={() => setFiltersOpen(true)}
                onSubmitEditing={(event) => onSearch(event.nativeEvent.text.trim())}
            />

            <FiltersSection
                visible={filtersOpen}
                onClose={() => setFiltersOpen(false)}
                onApplyFilters={handleFilters}
                initialFilters={initialFilters}
            />
        </View>
    );
}

function FiltersSection({
    visible,
    onClose,
    onApplyFilters,
    initialFilters,
}: {
    visible: boolean;
    onClose: () => void;
    onApplyFilters: (filters: Filter) => void;
    initialFilters?: Filter;
}) {
    const [selectedFilters, setSelectedFilters] = useState<Filter>({
        priceRange: initialFilters?.priceRange || 0,
        category: initialFilters?.category || CATEGORIES[0].name,
        product: initialFilters?.product || PRODUCTS[0].name,
        color: initialFilters?.color || FILTER_COLORS.blue,
    });
    const [isMounted, setIsMounted] = useState(visible);

    const DISCRETE_VALUES = [100, 500, 1000, 1500];
    const progress = useSharedValue(DISCRETE_VALUES.indexOf(selectedFilters.priceRange) || 0);
    const minValue = useSharedValue(0);
    const maxValue = useSharedValue(DISCRETE_VALUES.length - 1);

    const steps = DISCRETE_VALUES.length - 1;

    const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            setIsMounted(true);

            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 0.5,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: SHEET_HEIGHT,
                    duration: 350,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(backdropOpacity, {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsMounted(false);
            });
        }
    }, [visible]);

    if (!isMounted) return null;

    function handleFilters() {
        onApplyFilters(selectedFilters);
        onClose();
    }

    return (
        <Modal transparent visible animationType="none">
            <View style={{ flex: 1 }}>
                {/* Backdrop */}
                <Pressable style={{ flex: 1 }} onPress={onClose}>
                    <Animated.View
                        style={{
                            flex: 1,
                            backgroundColor: "black",
                            opacity: backdropOpacity,
                        }}
                    />
                </Pressable>

                <Animated.View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: SHEET_HEIGHT,
                        backgroundColor: COLORS.dark.background,
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        padding: SPACING.xl,
                        transform: [{ translateY }],
                        flex: 1,
                        gap: 32
                    }}
                >
                    <Heading style={{ color: COLORS.dark.primary, textAlign: "center" }}>
                        Filters
                    </Heading>

                    <View style={{ height: 64 }}>
                        <Slider
                            label="Price Range"
                            labelProps={{
                                style: {
                                    color: COLORS.dark.primary,
                                    fontSize: FONT_SIZES.md,
                                    fontWeight: "600",
                                },
                            }}
                            required
                            minimumValue={minValue}
                            maximumValue={maxValue}
                            progress={progress}
                            steps={steps}
                            snapToStep
                            onSlidingComplete={(val) =>
                                setSelectedFilters((prev) => ({ ...prev, priceRange: DISCRETE_VALUES[val] }))
                            }
                            markWidth={45}
                            renderMark={({ index }) => (
                                <BodyText style={{ marginTop: 48 }}>
                                    ${DISCRETE_VALUES[index]}
                                </BodyText>
                            )}
                        />
                    </View>

                    <View style={{ gap: 16 }}>
                        <Heading style={{ color: COLORS.dark.primary }}>Categories</Heading>

                        <View style={{ flexWrap: "wrap", gap: 12, flexDirection: "row" }}>
                            {CATEGORIES.map((category) => (
                                <Button
                                    key={category.id}
                                    size="sm"
                                    variant="secondary"
                                    style={{ paddingVertical: 6, paddingHorizontal: 16, backgroundColor: selectedFilters.category === category.name ? COLORS.dark.primary : COLORS.dark.secondary, }}
                                    onPress={() => setSelectedFilters((prev) => ({ ...prev, category: category.name }))}
                                >
                                    <BodyText style={{ color: selectedFilters.category === category.name ? COLORS.dark.background : COLORS.dark.white }}>
                                        {category.name}
                                    </BodyText>
                                </Button>
                            ))}
                        </View>
                    </View>

                    <View style={{ gap: 16 }}>
                        <Heading style={{ color: COLORS.dark.primary }}>Products</Heading>

                        <View style={{ flexWrap: "wrap", gap: 12, flexDirection: "row" }}>
                            {PRODUCTS.map((product) => (
                                <Button
                                    key={product.id}
                                    size="sm"
                                    variant="secondary"
                                    style={{ paddingVertical: 6, paddingHorizontal: 16, backgroundColor: selectedFilters.product === product.name ? COLORS.dark.primary : COLORS.dark.secondary, }}
                                    onPress={() => setSelectedFilters((prev) => ({ ...prev, product: product.name }))}
                                >
                                    <BodyText style={{ color: selectedFilters.product === product.name ? COLORS.dark.background : COLORS.dark.white }}>
                                        {product.name}
                                    </BodyText>
                                </Button>
                            ))}
                        </View>
                    </View>

                    <View style={{ gap: 16 }}>
                        <Heading style={{ color: COLORS.dark.primary }}>Colors</Heading>

                        <View style={{ flexWrap: "wrap", gap: 12, flexDirection: "row" }}>
                            {Object.entries(FILTER_COLORS).map(([colorName, colorValue]) => (
                                <Pressable
                                    key={colorName}
                                    onPress={() => setSelectedFilters((prev) => ({ ...prev, color: colorValue }))}
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 16,
                                        backgroundColor: colorValue,
                                        borderWidth: selectedFilters.color === colorValue ? 3 : 0,
                                        borderColor: COLORS.dark.primary,
                                    }}
                                />
                            ))}
                        </View>
                    </View>

                    <Button variant="secondary" onPress={handleFilters}>
                        <BodyText style={{ fontSize: FONT_SIZES.md, color: COLORS.dark.primary }}>Apply Filters</BodyText>
                    </Button>
                </Animated.View>
            </View>
        </Modal>
    );
}

function TopSearches({ onClick }: { onClick: (query: string) => void }) {
    return (
        <View>
            <Heading style={{ color: COLORS.dark.primary }}>Top Searches</Heading>

            <View style={{ marginTop: 16, gap: 12 }}>
                {TOP_SEARCHES.map((query) => (
                    <TopSearch key={query} query={query} onClick={onClick} />
                ))}
            </View>
        </View>
    );
}

function TopSearch({
    query,
    onClick,
}: {
    query: string;
    onClick: (query: string) => void;
}) {
    return (
        <Pressable
            onPress={() => onClick(query)}
            style={{
                padding: 8,
                backgroundColor: COLORS.dark["secondary-foreground"],
                borderRadius: 24,
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <Button size="icon-sm">
                    <SimpleLineIcons name="magnifier" size={16} color="black" />
                </Button>

                <BodyText style={{ color: COLORS.dark.background }}>{query}</BodyText>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",

        paddingHorizontal: 20,
        paddingVertical: 16,
    },

    nav: {
        position: "relative",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    navAction: {
        position: "absolute",
        left: 0,
    },
    navText: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: "bold",
        color: COLORS.dark.primary,
    },

    searchInput: {
        marginTop: 32,
        marginBottom: 48,
    },
});
