import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Nav } from "@/components/shared/nav";
import { BodyText, Heading } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DateInput } from "@/components/ui/date-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    type EditProfileFormData,
    editProfileSchema,
} from "@/schema/edit-profile";
import { useUserStore } from "@/store/user-store";
import { COLORS, FONT_SIZES, SPACING } from "@/styles/theme";

export default function EditProfile() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const user = useUserStore((state) => state.user);

    const updateUser = useUserStore((state) => state.updateUser);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editProfileSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            dateOfBirth: user?.dateOfBirth || "",
            number: user?.number || "",
            gender: user?.gender || "male",
        },
    });

    const onSubmit = async (data: EditProfileFormData) => {
        console.log("Signup Data:", data);

        setIsLoading(true);

        await updateUser({
            name: data.name,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            number: data.number,
            gender: data.gender,
        });

        setIsLoading(false);

        Alert.alert("Profile Updated", "Your profile has been updated successfully.", [
            { text: "OK" },
        ]);
    };

    if (!user) {
        return <Redirect href="/(onboarding)/welcome" />;
    }

    return (
        <CustomView>
            <ScrollView horizontal={false} contentContainerStyle={styles.container}>
                <Nav title="My Profile" onBack={() => router.back()} />

                <View style={{ alignItems: "center", gap: SPACING.lg }}>
                    <TouchableOpacity style={{ position: "relative" }}>
                        <Image
                            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            width={156}
                            height={156}
                            style={{ borderRadius: "100%" }}
                        />

                        <AntDesign
                            name="camera"
                            size={24}
                            color="black"
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: "2%",
                                backgroundColor: COLORS.dark.primary,
                                padding: SPACING.xs,
                                borderRadius: "100%",
                            }}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            gap: SPACING.sm,
                            alignItems: "center",
                            backgroundColor: COLORS.dark.white,
                            width: "100%",
                            padding: SPACING.sm,
                            borderRadius: SPACING.md,
                        }}
                    >
                        <Heading style={{ color: COLORS.dark.background }}>
                            {user.name}
                        </Heading>

                        <BodyText style={{ color: COLORS.dark.background }}>
                            ID: {user.id}
                        </BodyText>
                    </View>
                </View>

                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Full Name"
                                autoCapitalize="words"
                                placeholder="Joe Doe"
                                returnKeyType="next"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Text style={styles.errorText}>{errors.name?.message || ""}</Text>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Email"
                                keyboardType="email-address"
                                inputMode="email"
                                autoCapitalize="none"
                                placeholder="joe@gmail.com"
                                returnKeyType="next"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Text style={styles.errorText}>{errors.email?.message || ""}</Text>

                    <Controller
                        control={control}
                        name="dateOfBirth"
                        render={({ field: { onChange, value } }) => (
                            <DateInput
                                label="Date of Birth"
                                onChange={onChange}
                                value={value ? new Date(value) : undefined}
                            />
                        )}
                    />
                    <Text style={styles.errorText}>
                        {errors.dateOfBirth?.message || ""}
                    </Text>

                    <Controller
                        control={control}
                        name="number"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Phone Number"
                                keyboardType="phone-pad"
                                inputMode="tel"
                                autoCapitalize="none"
                                placeholder="+1 234 567 8901"
                                returnKeyType="next"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Text style={styles.errorText}>{errors.number?.message || ""}</Text>

                    <View style={{ gap: SPACING.sm }}>
                        <Label label="Gender" />

                        <Controller
                            control={control}
                            name="gender"
                            render={({ field: { onChange, value } }) => (
                                <View style={{ flexDirection: "row", gap: SPACING.lg }}>
                                    <Checkbox
                                        onValueChange={onChange}
                                        label="Male"
                                        checked={value === "male"}
                                        value="male"
                                    />

                                    <Checkbox
                                        onValueChange={onChange}
                                        label="Female"
                                        checked={value === "female"}
                                        value="female"
                                    />
                                </View>
                            )}
                        />
                        <Text style={styles.errorText}>{errors.gender?.message || ""}</Text>
                    </View>

                    <Button onPress={handleSubmit(onSubmit)} variant="secondary" disabled={isLoading} style={{ flexDirection: "row", position: "relative", justifyContent: "center", gap: SPACING.sm }}>
                        {isLoading && <ActivityIndicator color={COLORS.dark.white} style={{ marginRight: SPACING.sm, position: "absolute", left: "35%" }} />}

                        <BodyText style={{ color: COLORS.dark.primary }}>Update Profile</BodyText>
                    </Button>
                </View>
            </ScrollView>
        </CustomView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.sm,
        paddingBottom: SPACING.lg,
        gap: SPACING.lg,
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: SPACING.sm,
        marginTop: SPACING.lg,
    },
    formActions: {
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 24,
    },

    errorText: {
        color: COLORS.dark.error,
        minHeight: 18,
        fontSize: FONT_SIZES.sm,
    },
});
