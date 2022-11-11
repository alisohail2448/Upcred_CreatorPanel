export const getSocialProfileLink = ({ platform, socialHandle }) => {
  if (platform === "Facebook") {
    return `https://www.facebook.com/${socialHandle?.replaceAll("@", "")}`;
  }
  if (platform === "Instagram") {
    return `https://www.instagram.com/${socialHandle?.replaceAll("@", "")}`;
  }
};
