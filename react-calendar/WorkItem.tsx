/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  WorkItemProps,
  WorkStatusLabels,
  WorkStatusType,
} from '@lib/apis/press/workplace/Calendar/WorkCalendarType';
import { FlagFilled } from '@ant-design/icons';

export const WorkItem = ({
  date,
  title,
  flagOn,
  tileColor,
  workStatus,
}: WorkItemProps) => {
  return (
    <div css={workItemStyle}>
      <div css={workDateStyle(tileColor)}>
        <div>
          <FlagFilled
            style={{ color: flagOn ? 'red' : 'gray', padding: '0px' }}
          />
        </div>
        <div>{date}</div>
      </div>
      <div css={workTitleStyle(workStatus)}>{title}</div>
      <div css={workStatusStyle(workStatus)}>
        {WorkStatusLabels[workStatus]}
      </div>
    </div>
  );
};

const workItemStyle = css`
  border: 1px solid #dddddd;
  display: flex;
`;

const workDateStyle = (tileColor: string) => css`
  width: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 5px;
  background-color: ${tileColor};
  & > div {
    margin: 4px;
  }
`;

const workTitleStyle = (workStatus: WorkStatusType) => css`
  display: flex;
  align-items: center;
  text-align: left;
  flex-grow: 1;
  padding: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${workStatus === WorkStatusType.COMPLETED && `background-color: lightgray;`}
`;

const workStatusStyle = (workStatus: WorkStatusType) => css`
  padding: 5px;
  margin: 3px 10px;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
  ${workStatus === WorkStatusType.SCHEDULED &&
  `background-color: #ffd900; color: white;`}
  ${workStatus === WorkStatusType.INPROGRESSED &&
  `background-color: blue; color: white;`}
  ${workStatus === WorkStatusType.COMPLETED &&
  `background-color: green; color: white;`}
  ${workStatus === WorkStatusType.INCOMPLETE &&
  `background-color: red; color: white;`}
`;
