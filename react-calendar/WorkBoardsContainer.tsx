/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import {
  WorkBoardType,
  WorkCalendarInfo,
} from '@lib/apis/press/workplace/Calendar/WorkCalendarType';
import { WorkBoard } from './WorkBoard';

interface WorkBoardsContainerProps {
  works: WorkCalendarInfo[];
}

export const WorkBoardsContainer: React.FC<WorkBoardsContainerProps> = ({
  works,
}) => {
  return (
    <div css={boardsContainerStyle}>
      <WorkBoard type={WorkBoardType.IMPORTANT} works={works} />
      <WorkBoard type={WorkBoardType.WORKLIST} works={works} />
      <WorkBoard type={WorkBoardType.RECEIVE} works={works} />
      <WorkBoard type={WorkBoardType.OUTGOING} works={works} />
    </div>
  );
};

const boardsContainerStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;

  span {
    padding: 0px 10px;
  }
`;
