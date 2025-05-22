import type { ReactNode } from "react";

interface CenteredLayoutProps {
  children: ReactNode;
  maxWidth?: number;
}

export const CenteredLayout = ({
  children,
  maxWidth = 480,
}: CenteredLayoutProps) => {
  return (
    <div
      style={{
        height: "100vh",
        // width: '100vw',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: maxWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
};
