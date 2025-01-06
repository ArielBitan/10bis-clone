import React from "react";

const UserIcon: React.FC<{
  width?: number;
  height?: number;
  fill?: string;
}> = ({ width = 34, height = 34, fill = "none" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M17 0C7.611 0 0 7.611 0 17s7.611 17 17 17 17-7.611 17-17S26.389 0 17 0m0 7.364a4.76 4.76 0 0 1 4.76 4.686 4.76 4.76 0 1 1-9.52 0A4.76 4.76 0 0 1 17 7.364m8.65 18.36a1.7 1.7 0 0 1-1.36.755H9.785a1.63 1.63 0 0 1-1.4-.755 1.71 1.71 0 0 1-.15-1.59 9.52 9.52 0 0 1 17.605 0c.178.52.108 1.094-.19 1.556z"
      clipRule="evenodd"
    />
  </svg>
);

export default UserIcon;
