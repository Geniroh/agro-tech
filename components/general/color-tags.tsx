import React from "react";

interface ColorTagProps {
  name: string;
  type?: "yellow" | "purple" | "blue" | "green" | "ash";
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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FFE9D0",
  "#BBE9FF",
  "#402E7A",
  "#3DC2EC",
  "#FFF455",
];

const VALUE_CHAIN_OPTIONS = [
  "Input Supply",
  "Production",
  "Harvesting",
  "Processing",
  "Logistics",
  "Export",
];

const getColorForValueChain = (name: string) => {
  const index = VALUE_CHAIN_OPTIONS.indexOf(name);
  if (index !== -1) {
    return COLORS[index % COLORS.length];
  }
  return "#FFFFFF"; // default color if name is not found
};

export const ColorTag: React.FC<ColorTagProps> = ({ name, type }) => {
  let styles;

  if (VALUE_CHAIN_OPTIONS.includes(name)) {
    const color = getColorForValueChain(name);
    styles = {
      bgcolor: color,
      textcolor: "#FFFFFF", // default text color for predefined options
    };
  } else if (type) {
    styles = tagStyles[type];
  } else {
    const randomColor = getColorForValueChain(name);
    styles = {
      bgcolor: randomColor,
      textcolor: "#FFFFFF", // default text color for random colors
    };
  }

  return (
    <span
      className="px-3 py-[1px] rounded-xl text-[9px] font-bold text-nowrap"
      style={{ backgroundColor: styles.bgcolor, color: styles.textcolor }}
    >
      {name}
    </span>
  );
};
