import React from "react";

const logoStyle = {
  width: "17px",
  height: "17px",
};

let platformIcons = {
  Facebook: <img src="/assets/icons/facebook.png" alt="facebook" style={logoStyle} />,
  Youtube: <img src="/assets/icons/youtube.png" alt="youtube" style={logoStyle} />,
  Instagram: <img src="/assets/icons/instagram.png" alt="instagram" style={logoStyle} />,
  Twitter: <img src="/assets/icons/twitter.png" alt="twitter" style={logoStyle} />,
  Quora: <img src="/assets/icons/quora.png" alt="quora" style={logoStyle} />,
  Tiktok: <img src="/assets/icons/tiktok.png" alt="tiktok" style={logoStyle} />,
  Sharechat: <img src="/assets/icons/sharechat.jpeg" alt="sharechat" style={logoStyle} />,
};

function getSocialIcon(platform) {
  return platformIcons[platform];
}

export default getSocialIcon;
