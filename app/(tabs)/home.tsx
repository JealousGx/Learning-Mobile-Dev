import { BodyText } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";

export default function Home() {
    return <CustomView style={{ flex: 1, height: "auto" }}>
        <BodyText>This is home tab</BodyText>
    </CustomView>
}