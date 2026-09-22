import homeServicesImg from "../assets/home-services.png";
import technologyImg from "../assets/technology.png";
import beautyWellnessImg from "../assets/beauty.png";
import automotiveImg from "../assets/automotive.png";
import educationImg from "../assets/education.png";

const categoryImages = {
  "home services": homeServicesImg,
  technology: technologyImg,
  "beauty & wellness": beautyWellnessImg,
  automotive: automotiveImg,
  education: educationImg,
};

export const getCategoryImage = (categoryName) => {
  if (!categoryName) return null;

  const key = categoryName.toLowerCase().trim();

  return categoryImages[key] || null;
};