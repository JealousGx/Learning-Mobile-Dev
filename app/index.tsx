import { Redirect } from "expo-router";

import { useUserStore } from "@/store/user-store";

export default function IndexRedirect() {
    const { user, hasOnboarded } = useUserStore();

    if (!hasOnboarded) return <Redirect href="/(onboarding)" />;
    if (!user) return <Redirect href="/(onboarding)/welcome" />;

    return <Redirect href="/(tabs)" />;

}
