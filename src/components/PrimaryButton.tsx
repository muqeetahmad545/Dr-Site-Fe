import { Button } from "antd";
import { COLORS } from "../constants/theme";
import type { CSSProperties, ReactNode } from "react";
import type { ButtonType } from "antd/es/button";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  htmlType?: "button" | "submit" | "reset";
  type?: ButtonType;
  block?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

export const PrimaryButton = ({
  children,
  onClick,
  style,
  htmlType = "button",
  type = "primary",
  block = false,
  loading = false,
  icon,
}: PrimaryButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      htmlType={htmlType}
      block={block}
      icon={icon}
      loading={loading}
      style={{
        backgroundImage:
          type === "primary" ? COLORS.gradientPrimary : undefined,
        borderColor: COLORS.primary,
        ...style,
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget as HTMLElement;
        btn.style.backgroundColor = COLORS.primaryHover;
        btn.style.borderColor = COLORS.primaryHover;
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLElement;
        btn.style.backgroundColor = COLORS.primary;
        btn.style.borderColor = COLORS.primary;
      }}
    >
      {children}
    </Button>
  );
};
