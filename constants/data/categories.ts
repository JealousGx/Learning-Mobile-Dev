import BedroomIcon from "@/assets/icons/categories/bedroom.svg";
import DiningRoomIcon from "@/assets/icons/categories/dining-room.svg";
import KitchenIcon from "@/assets/icons/categories/kitchen.svg";
import LivingRoomIcon from "@/assets/icons/categories/living-room.svg";
import OfficeIcon from "@/assets/icons/categories/office.svg";

export const CATEGORIES = [
  {
    id: 1,
    name: "Living Room",
    Icon: LivingRoomIcon,
  },
  {
    id: 2,
    name: "Office",
    Icon: OfficeIcon,
  },
  {
    id: 3,
    name: "Bedroom",
    Icon: BedroomIcon,
  },
  {
    id: 4,
    name: "Kitchen",
    Icon: KitchenIcon,
  },
  {
    id: 5,
    name: "Dining Room",
    Icon: DiningRoomIcon,
  },
];

export type Category = (typeof CATEGORIES)[number];
