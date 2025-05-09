import { Button } from 'antd';
import { COLORS } from '../constants/theme';
import type { CSSProperties } from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  htmlType?: 'button' | 'submit' | 'reset';
  block?: boolean;
  loading?: boolean;
}

export const PrimaryButton = ({
  children,
  onClick,
  style,
  htmlType = 'button',
  block = false,
}: PrimaryButtonProps) => {
  return (
    <Button
      type="primary"
      onClick={onClick}
      htmlType={htmlType}
      block={block}
      style={{
        backgroundImage: COLORS.gradientPrimary,
        borderColor: COLORS.primary,
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.primaryHover;
        (e.currentTarget as HTMLElement).style.borderColor = COLORS.primaryHover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.primary;
        (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
      }}
    >
      {children}
    </Button>
  );
};
