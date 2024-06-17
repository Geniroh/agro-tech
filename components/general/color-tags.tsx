import React from "react";

interface ColorTagProps {
  name: string;
  type: "yellow" | "purple" | "blue" | "green" | "ash";
}

const tagStyles = {
  yellow: {
    bgcolor: "#EFF2CE",
    textcolor: "#60661A",
  },
  purple: {
    bgcolor: "#FFD9FF",
    textcolor: "#661A66",
  },
  blue: {
    bgcolor: "#1A4666",
    textcolor: "#D9EFFF",
  },
  green: {
    bgcolor: "#33661A",
    textcolor: "#E5FFD9",
  },
  ash: {
    bgcolor: "#F2F2F2",
    textcolor: "#242424",
  },
};

export const ColorTag: React.FC<ColorTagProps> = ({ name, type }) => {
  const styles = tagStyles[type];

  return (
    <span
      className="py-1 px-3 rounded-xl text-[9px] font-bold text-nowrap"
      style={{ backgroundColor: styles.bgcolor, color: styles.textcolor }}
    >
      {name}
    </span>
  );
};
