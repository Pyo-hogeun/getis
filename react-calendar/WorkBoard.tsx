/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  WorkCalendarInfo,
  WorkBoardType,
  WorkBoardTypeLabels,
} from '@lib/apis/press/workplace/Calendar/WorkCalendarType';
import { WorkItem } from './WorkItem';
import dayjs from 'dayjs';

export const WorkBoard = ({
  type,
  works,
}: {
  type: WorkBoardType;
  works: WorkCalendarInfo[];
}) => {
  const title = getLabelByType(type)[0];
  const subTitle = getLabelByType(type)[1];
  let filteredWorks: WorkCalendarInfo[] = [];

  filteredWorks = works.filter((work) => work.workBoardType === type);

  return (
    <div css={workBoard}>
      <div css={titleBox}>
        <h5>{title}</h5>
        <span>{subTitle}</span>
      </div>
      <div css={workBoardContents}>
        {filteredWorks.map((work, index) => (
          <WorkItem
            key={index}
            date={dayjs(new Date(work.startDate || '')).format('MM/DD')}
            title={work.title}
            flagOn={work.flagYN}
            tileColor={work.styleColorVal}
            workStatus={work.workStatus}
          />
        ))}
      </div>
    </div>
  );
};

const workBoard = css`
  /* padding: 10px; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const titleBox = css`
  display: flex;
  width: 100%;
  gap: 5px;
  align-items: center;
  h5 {
    font-weight: bold;
    text-align: left;
  }
  span {
    font-size: 12px;
    color: #666666;
  }
`;

const workBoardContents = css`
  border: 1px solid #dddddd;
  height: 150px;
  overflow-y: auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const getLabelByType = (type: WorkBoardType): [string, string] | null => {
  const labels = WorkBoardTypeLabels.find((label) => label[0] === type);
  return labels ? [labels[1], labels[2]] : null;
};
