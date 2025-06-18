import React from "react";

export function LineShadowText({ children, className = "", shadowColor = "black" }: {
  children: React.ReactNode;
  className?: string;
  shadowColor?: string;
}) {
  return (
    <span
      className={className}
      style={{
        textShadow: `0 2px 8px ${shadowColor}, 0 1px 0 ${shadowColor}`,
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </span>
  );
} 