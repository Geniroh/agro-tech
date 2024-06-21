// import React from "react";

// interface ColorTagProps {
//   name: string;
//   type: "yellow" | "purple" | "blue" | "green" | "ash";
// }

// const tagStyles = {
//   yellow: {
//     bgcolor: "#EFF2CE",
//     textcolor: "#60661A",
//   },
//   purple: {
//     bgcolor: "#FFD9FF",
//     textcolor: "#661A66",
//   },
//   blue: {
//     bgcolor: "#1A4666",
//     textcolor: "#D9EFFF",
//   },
//   green: {
//     bgcolor: "#33661A",
//     textcolor: "#E5FFD9",
//   },
//   ash: {
//     bgcolor: "#F2F2F2",
//     textcolor: "#242424",
//   },
// };

// export const ColorTag: React.FC<ColorTagProps> = ({ name, type }) => {
//   const styles = tagStyles[type];

//   return (
//     <span
//       className="py-1 px-3 rounded-xl text-[9px] font-bold text-nowrap"
//       style={{ backgroundColor: styles.bgcolor, color: styles.textcolor }}
//     >
//       {name}
//     </span>
//   );
// };

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

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};

const VALUE_CHAIN_OPTIONS = [
  "Input Supply",
  "Production",
  "Harvesting",
  "Processing",
  "Logistics",
  "Export",
];

export const ColorTag: React.FC<ColorTagProps> = ({ name, type }) => {
  let styles;

  if (VALUE_CHAIN_OPTIONS.includes(name)) {
    const randomColor = getRandomColor();
    styles = {
      bgcolor: randomColor,
      textcolor: "#FFFFFF", // default text color for random colors
    }; // or any other default style for predefined options
  } else {
    const randomColor = getRandomColor();
    styles = {
      bgcolor: randomColor,
      textcolor: "#FFFFFF", // default text color for random colors
    };
  }

  return (
    <span
      className="py-1 px-3 rounded-xl text-[9px] font-bold text-nowrap"
      style={{ backgroundColor: styles.bgcolor, color: styles.textcolor }}
    >
      {name}
    </span>
  );
};
