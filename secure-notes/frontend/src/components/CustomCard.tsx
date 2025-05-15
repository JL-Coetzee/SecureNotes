// CustomCard.tsx
import React, { ReactNode } from "react";
import { getThemeClasses } from "../theme/themeConfig";

type CardColor = "white" | "gray" | "blue" | "red" | "green" | string;
type CardRadius = "none" | "sm" | "base" | "lg" | "full" | string;
type CardShadow = "none" | "sm" | "md" | "lg" | "xl" | string;
type CardSize = "xs" | "sm" | "base" | "lg" | "xl" | string;

interface CustomCardProps {
  children: ReactNode;
  theme: "dark" | "light";
  className?: string;
  bordered?: boolean; 
  borderColour?: string;
  color?: CardColor;
  radius?: CardRadius;
  shadow?: CardShadow;
  size?: CardSize;
  withDivider?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  theme,
  className = "",
  bordered = true,
  borderColour = "gray",
  color = "white",
  radius = "base",
  shadow = "sm",
  size = "base",
  withDivider = true,
}) => {
  const classes = getThemeClasses(theme);

  // Define dynamic classes based on props
  const borderClass = bordered ? `border ${borderColour}` : "";
  const colorClass = `bg-${color}`;
  const radiusClass = `rounded-${radius}`;
  const shadowClass = `shadow-${shadow}`;
  const sizeClass = size === "base" ? "p-6" : size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-6"; // Example padding based on size
  const dividerClass = withDivider ? "divide-y" : "";

  return (
    <div
      className={`flex flex-col justify-start ${classes.transition} ${classes.text} ${colorClass} ${radiusClass} ${shadowClass} ${sizeClass} ${borderClass} ${dividerClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default CustomCard;
