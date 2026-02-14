import { BodyText } from "@/components/shared/text";
import { CustomView } from "@/components/shared/view";

export default function Products() {
    return <CustomView>
        <BodyText>
            Paginated products list with infinite scroll and filters. Each product should have a "View Details" button that navigates to the product details page.
        </BodyText>
    </CustomView>
}