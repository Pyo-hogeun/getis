/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface TooltipProps {
  visible: boolean;
  content: string;
  position: { x: number; y: number };
}

export const Tooltip: React.FC<TooltipProps> = ({
  visible,
  content,
  position,
}) => {
  if (!visible) return null;

  return (
    <div
      css={tooltipStyle}
      style={{
        top: position.y + 10,
        left: position.x,
      }}
    >
      {content}
    </div>
  );
};

const tooltipStyle = css`
  position: fixed;
  background-color: #666d84;
  color: #ffffff;
  text-align: left;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  z-index: 1000;
  white-space: pre-line;
  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 8px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #666d84 transparent;
  }
`;
