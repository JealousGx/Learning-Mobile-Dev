import { Entypo, EvilIcons, Feather, FontAwesome, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText, Heading, Subheading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { VerticalDivider } from "@/components/ui/divider";

import { useUserStore } from "@/store/user-store";

import { COLORS, SPACING } from "@/styles/theme";

export default function Profile() {
    const router = useRouter();

    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);

    if (!user) {
        return <Redirect href="/(onboarding)/welcome" />;
    }

    const handleEditProfile = () => {
        // Handle edit profile action
    };

    return (
        <CustomView style={styles.container}>
            <Nav
                title="My Profile"
                onBack={() => router.back()}
                rightComponent={<EditProfileButton onPress={handleEditProfile} />}
            />

            <View style={{ alignItems: "center", gap: SPACING.lg }}>
                <Image
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    width={156}
                    height={156}
                    style={{ borderRadius: "100%" }}
                />

                <View style={{ gap: SPACING.sm, alignItems: "center" }}>
                    <BodyText>ID: {user.id}</BodyText>
                    <Heading>{user.name}</Heading>
                    <BodyText>{user.email}</BodyText>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    gap: SPACING.lg,
                    backgroundColor: COLORS.dark.primary,
                    padding: SPACING.md,
                    borderRadius: SPACING.md,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View style={{ alignItems: "center", gap: SPACING.sm }}>
                    <Feather name="user" size={36} color="black" />

                    <BodyText style={{ color: COLORS.dark.background }}>Profile</BodyText>
                </View>

                <VerticalDivider style={{ backgroundColor: COLORS.dark.white }} />

                <TouchableOpacity
                    style={{ alignItems: "center", gap: SPACING.sm }}
                    onPress={() => router.navigate("/(tabs)/favourites")}
                >
                    <Fontisto name="favorite" size={36} color="black" />

                    <BodyText style={{ color: COLORS.dark.background }}>
                        Favourites
                    </BodyText>
                </TouchableOpacity>

                <VerticalDivider style={{ backgroundColor: COLORS.dark.white }} />

                <View style={{ alignItems: "center", gap: SPACING.sm }}>
                    <Entypo name="price-tag" size={36} color="black" />

                    <BodyText style={{ color: COLORS.dark.background }}>
                        My Orders
                    </BodyText>
                </View>
            </View>

            <View style={{ gap: SPACING.md }}>
                <Option label="Privacy Policy" IconComp={<Feather name="key" size={24} color="black" />} />
                <Option label="Payment Methods" IconComp={<FontAwesome name="credit-card" size={24} color="black" />} />
                <Option label="Notifications" IconComp={<Feather name="bell" size={24} color="black" />} />
                <Option label="Settings" IconComp={<EvilIcons name="gear" size={24} color="black" />} />
                <Option label="Help" IconComp={<MaterialIcons name="support-agent" size={24} color="black" />} />
                <Option label="Logout" IconComp={<MaterialIcons name="logout" size={24} color="black" />} onPress={logout} />
            </View>
        </CustomView>
    );
}

function EditProfileButton({ onPress }: { onPress: () => void }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <FontAwesome
                    name="pencil-square-o"
                    size={24}
                    color={COLORS.dark.primary}
                />
            </TouchableOpacity>
        </View>
    );
}

function Option({ onPress, IconComp, label }: { onPress?: () => void, IconComp: React.ReactNode, label: string }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: SPACING.lg }}>
            <View style={{ backgroundColor: COLORS.dark.primary, padding: SPACING.sm, borderRadius: "100%" }}>
                {IconComp}
            </View>

            <Subheading>{label}</Subheading>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        gap: SPACING.lg,
    },
});
