/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FlagFilled } from '@ant-design/icons';
import { useRef } from 'react';

export const WorkLabel = ({ work, onMouseEnter, onMouseLeave, onClick }) => {
  const workLabelRef = useRef(null);

  return (
    <div
      css={workLabelStyle(work.styleColorVal)}
      ref={workLabelRef}
      onMouseEnter={() => onMouseEnter(workLabelRef, work)}
      onMouseLeave={onMouseLeave}
      onClick={(e) => onClick(e, work)}
    >
      <div css={workLabelContentStyle}>
        <span css={workLabelTextStyle}>{work.title}</span>
        {work.flagYN && <FlagFilled css={flagIconStyle} />}
      </div>
    </div>
  );
};

// CSS variables
const workLabelStyle = (backgroundColor: string) => css`
  background-color: ${backgroundColor};
  border-radius: 3px;
  border: 1px solid #dddddd;
  padding: 3px 5px;
  color: black;
  display: flex;
  align-items: center;
  margin: 3px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
`;

const workLabelContentStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
`;

const workLabelTextStyle = css`
  flex-grow: 1;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const flagIconStyle = css`
  color: #00c2c2;
  flex-shrink: 0;
`;
