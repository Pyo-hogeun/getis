/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import {
  WorkCalendarRequest,
  WorkCalendarInfo,
  emptyWorkCalendarInfo,
} from '@lib/apis/press/workplace/Calendar/WorkCalendarType';
import { getLeftMenuList } from '@pages/common/MainPage';

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'; // 디자인 이미지 배포 시, 삭제 예정
import { Button, Icon } from '@getis/ui';
import { CalendarCreateModal } from '../CalendarCreateModal';
import { CalendarDetailModal } from '../CalendarDetailModal';
import { WorkCalendarApi } from '@lib/apis/press/workplace/Calendar/WorkCalendarApi';
import { useQueryClient } from '@tanstack/react-query';
import { LeftMenuResponse } from '@getis/utils';
import { WorkLabel } from './WorkLabel';
import { Tooltip } from './Tooltip';
import { WorkBoardsContainer } from './WorkBoardsContainer';
import { toast } from 'react-toastify';

export const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date());
  const [calendarCreateModalOpen, setCalendarCreateModalOpen] = useState(false);
  const [calendarDetailModalOpen, setCalendarDetailModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkCalendarInfo>(
    emptyWorkCalendarInfo,
  );

  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    position: { x: 0, y: 0 },
  });

  const QUERY_KEY = `calendar`;
  const [calendarWorks, setCalendarWorks] = useState<WorkCalendarInfo[]>([]);
  const queryClient = useQueryClient();
  const leftMenuList = getLeftMenuList();
  const [calendarAffairsInfo, setCalendarAffairsInfo] =
    useState<LeftMenuResponse>();
  const [calendarAffairsTypecdPairs, setCalendarAffairsTypecdPairs] = useState<
    string[][]
  >([]);

  useEffect(() => {
    if (leftMenuList && leftMenuList.length > 1) {
      const pairs = getcalendarAffairsTypecd(leftMenuList[1]);
      setCalendarAffairsTypecdPairs(pairs);
      setCalendarAffairsInfo(leftMenuList[1]);
    }
  }, [leftMenuList, selectedWork]);

  const fetchWorksForMonth = async (date: Date) => {
    setCalendarWorks([]);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const data = await WorkCalendarApi.GET_WORK_LIST({ year, month });
    setCalendarWorks(data);
  };

  useEffect(() => {
    fetchWorksForMonth(displayedDate);
  }, [displayedDate.getMonth()]);

  useEffect(() => {
    if (!calendarCreateModalOpen) {
      setEditMode(false);
    }
  }, [calendarCreateModalOpen]);

  const updateDate = (date: Date) => {
    setDisplayedDate(date);
    setSelectedDate(date);
  };

  const handleMonthChange = (offset: number) => {
    const newDate = new Date(displayedDate);
    newDate.setMonth(newDate.getMonth() + offset);

    updateDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedWork(emptyWorkCalendarInfo);
    setCalendarCreateModalOpen(true);
  };

  const handleWorkLabelClick = (e, workData: WorkCalendarInfo) => {
    e.stopPropagation();

    setSelectedWork(workData);
    setCalendarDetailModalOpen(true);
  };

  const handleDelete = (workData: WorkCalendarInfo) => {
    WorkCalendarApi.DELETE_WORK(workData.id).then((res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        fetchWorksForMonth(displayedDate);

        toast.info('삭제되었습니다.');
      }
    });
    setCalendarDetailModalOpen(false);
  };

  const handleModify = () => {
    setEditMode(true);
    setCalendarDetailModalOpen(false);
    setCalendarCreateModalOpen(true);
  };

  const handleComplete = () => {
    const workCalendarReqeust: WorkCalendarRequest = {
      ...selectedWork,
    };
    workCalendarReqeust.workCompleteYN = true;

    WorkCalendarApi.UPDATE_WORK(
      workCalendarReqeust.id,
      workCalendarReqeust,
    ).then((res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      fetchWorksForMonth(displayedDate);
    });

    setCalendarDetailModalOpen(false);
  };

  const handleSaveWork = async (workInfo: WorkCalendarInfo) => {
    const attendeeIds =
      workInfo.attendeeInfos?.map((attendeeInfo) => attendeeInfo.userId) || [];
    const workCalendarReqeust: WorkCalendarRequest = {
      ...workInfo,
      companyClasTypecd: 'H',
      toolingAffairsTypecd: 'P',
      attendeeIds: attendeeIds,
      attachmentFileSerialNo: workInfo.calendarSerialNo,
    };
    if (isEditMode) {
      WorkCalendarApi.UPDATE_WORK(
        workCalendarReqeust.id,
        workCalendarReqeust,
      ).then((res) => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        fetchWorksForMonth(displayedDate);
      });
    } else {
      WorkCalendarApi.POST_WORK(workCalendarReqeust).then((res) => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        fetchWorksForMonth(displayedDate);
      });
    }
    setCalendarCreateModalOpen(false);
  };

  const filterWorksByDate = (date: Date): WorkCalendarInfo[] => {
    return calendarWorks.filter((work) => {
      let [year, month, day] = work.startDate.split('-').map(Number);
      const workStartDate = new Date(year, month - 1, day);

      [year, month, day] = work.endDate.split('-').map(Number);
      const workEndDate = new Date(year, month - 1, day);

      return workStartDate <= date && date <= workEndDate;
    });
  };

  const handleMouseEnter = (workLabelRef, workData: WorkCalendarInfo) => {
    const rect = workLabelRef.current.getBoundingClientRect();
    const tooltipContent = `제목: ${workData.title}\n시간: ${workData.startDate} ${workData.startTime} ~ ${workData.endDate} ${workData.endTime}\n`;

    setTooltip({
      visible: true,
      content: tooltipContent,
      position: { x: rect.left, y: rect.bottom },
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: '', position: { x: 0, y: 0 } });
  };

  return (
    <div css={calendarContainerStyle}>
      <div className="buttonContainer">
        <Button varient={'tertiary'} onClick={() => handleMonthChange(-1)}>
          <CaretLeftOutlined style={{ color: '#DDDDDD' }} />
        </Button>
        <Button varient={'tertiary'} onClick={() => handleMonthChange(+1)}>
          <CaretRightOutlined style={{ color: '#DDDDDD' }} />
        </Button>
        <Button varient={'tertiary'} onClick={() => updateDate(new Date())}>
          오늘
        </Button>
        <Icon type={'calendar'}></Icon>
        <span style={{ width: '100%', fontSize: '20px', fontWeight: 'bold' }}>
          {dayjs(selectedDate).format('YYYY년 MM월')}
        </span>
        <Button icon="excelDownload" varient={'tertiary'} onClick={null}>
          엑셀 다운로드
        </Button>
        <Button icon="excelUpload" varient={'tertiary'} onClick={null}>
          엑셀 업로드
        </Button>
        <Button varient={'tertiary'} onClick={null}>
          프린트
        </Button>
      </div>
      <Calendar
        key={displayedDate.getTime()}
        value={selectedDate}
        onChange={updateDate}
        onClickDay={handleDateClick}
        calendarType="gregory"
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
        showNavigation={false}
        tileContent={({ date }) => {
          const filteredWorks = filterWorksByDate(date);

          return (
            <div>
              {filteredWorks.map((work, index) => (
                <WorkLabel
                  key={index}
                  work={work}
                  onMouseEnter={(ref, work) => handleMouseEnter(ref, work)}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e, work) => handleWorkLabelClick(e, work)}
                />
              ))}
            </div>
          );
        }}
        css={calendarStyle}
      />
      <Tooltip
        visible={tooltip.visible}
        content={tooltip.content}
        position={tooltip.position}
      />
      <WorkBoardsContainer works={calendarWorks} />
      {calendarCreateModalOpen && (
        <CalendarCreateModal
          open={calendarCreateModalOpen}
          handleClose={() => {
            setCalendarCreateModalOpen(false);
          }}
          selectedDate={dayjs(selectedDate).format('YYYY-MM-DD')}
          isEditMode={isEditMode}
          selectedWork={selectedWork}
          calendarAffairsTypecdPairs={calendarAffairsTypecdPairs}
          onSave={handleSaveWork}
        />
      )}
      <CalendarDetailModal
        open={calendarDetailModalOpen}
        selectedTask={selectedWork}
        handleClose={() => {
          setCalendarDetailModalOpen(false);
        }}
        handleComplete={() => handleComplete()}
        handleModify={() => handleModify()}
        handleDelete={() => handleDelete(selectedWork)}
        calendarAffairsInfo={calendarAffairsInfo}
      />
    </div>
  );
};

const getcalendarAffairsTypecd = (menu: LeftMenuResponse) => {
  const pairs: string[][] = [];
  const parentMentionName = menu.mentionName;
  const traverse = (node: LeftMenuResponse, parentName = '') => {
    if (!node.data || node.data.length === 0) {
      if (parentName === parentMentionName) {
        pairs.push([node.mentionName, '']);
      } else {
        pairs.push([parentName, node.mentionName]);
      }
    } else {
      node.data.forEach((child) => {
        traverse(child, node.mentionName || parentName);
      });
    }
  };

  traverse(menu);

  return pairs;
};

const calendarContainerStyle = css`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  gap: 10px;

  .buttonContainer {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .tooltip {
    position: fixed;
    background-color: black;
    color: white;
    text-align: left;
    padding: 5px;
    border-radius: 5px;
    pointer-events: none;
    z-index: 1000;
  }
`;

const calendarStyle = css`
  width: 100%;
  border-right: none;
  border-bottom: none;
  border-top: 1px solid #dddddd;
  border-left: 1px solid #dddddd;

  .react-calendar {
    width: 100%;
    border: none;
  }

  .react-calendar__tile {
    padding: 10px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    border: 0px solid white;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    min-height: 100px;
    align-items: stretch;
    background-color: white;
    text-align: left;
  }

  .react-calendar__tile--active {
    background-color: white;
    color: #000000;
  }

  .react-calendar__tile--now {
    background-color: #fffac7;
    color: black;
  }

  .react-calendar__month-view__weekdays {
    font-weight: bold;
    border-bottom: 1px solid #dddddd;
    background-color: #f4f4f4;
  }

  .react-calendar__month-view__weekdays__weekday {
    border-right: 1px solid #dddddd;
    box-sizing: border-box;
  }
`;

export default CalendarView;
