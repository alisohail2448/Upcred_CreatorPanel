import { v4 as uuid } from "uuid";

export const creators = [
  {
    id: uuid(),
    address: {
      country: "USA",
      state: "West Virginia",
      city: "Parkersburg",
      street: "2849 Fulton Street",
    },
    avatarUrl: "/static/images/avatars/avatar_3.png",
    createdAt: 1555016400000,
    email: "ekaterina.tankova@devias.io",
    name: "Ekaterina Tankova",
    phone: "304-428-3097",
    platform: "Facebook",
    socialId: "ekatrina",
    followerCount: 400000,
    category: ["Travel", "Fashion", "Art"],
  },
];
