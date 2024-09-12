import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { createRoot } from 'react-dom/client';
import { css } from '@emotion/css';
import iconCalendar from '../../assets/images/icon_calendar.png';
import iconPrev from '../../assets/images/icon_calendar_prev.svg';
import iconNext from '../../assets/images/icon_calendar_next.svg';
// import 'react-calendar/dist/Calendar.css';
// import {
//   WorkCalendarRequest,
//   WorkCalendarInfo,
//   emptyWorkCalendarInfo,
// } from '@lib/apis/press/workplace/Calendar/WorkCalendarType';
import { FlagFilled } from '@ant-design/icons';
import iconFlag from '../../assets/images/icon_flag.png';
import dayjs from 'dayjs';
const WorkLabel = ({ work, onMouseEnter, onMouseLeave, onClick }) => {
  const workLabelRef = useRef(null);

  return (
    <div
      className={workLabelStyle(work.styleColorVal)+' work-label'}
      ref={workLabelRef}
      onMouseEnter={() => onMouseEnter(workLabelRef, work)}
      onMouseLeave={onMouseLeave}
      onClick={(e) => onClick(e, work)}
    >
      <div className={workLabelContentStyle+' label-flex'}>
        <span className={workLabelTextStyle+' title'}>{work.title}</span>
        {work.flagYN && <img src={iconFlag} alt="주요" />}
      </div>
    </div>
  );
};
const Tooltip = ({
  visible,
  content,
  position,
}) => {
  if (!visible) return null;

  return (
    <div
      className={tooltipStyle+' tooltip'}
      style={{
        top: position.y + 10,
        left: position.x,
      }}
    >
      {content}
    </div>
  );
};

const workColorVariables = {
  yellow: '#ffe32d',
  skyblue: '#7ecff2',
  lightgray: '#e2e2e2',
  pink: '#eabcf2',
  lightgreen: '#d4f2c7',
}



const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [calendarCreateModalOpen, setCalendarCreateModalOpen] = useState(false);
  const [calendarDetailModalOpen, setCalendarDetailModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  // const [selectedWork, setSelectedWork] = useState(
  //   emptyWorkCalendarInfo,
  // );
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    position: { x: 0, y: 0 },
  });
  // 스크롤시에도 툴팁이 따라다니게
  const tooltipScroll = () => {
    let now = window.scrollY;
    window.addEventListener('scroll', ()=>{
      let scroll = window.scrollY;
      let newPos = {
        ...tooltip,
        position: {
          x: tooltip.position.x,
          y: (tooltip.position.y + (now - scroll))
        }
      }
      setTooltip(newPos);
    })
  }
  tooltipScroll();
  const [calendarWorks, setCalendarWorks] = useState([{
    "id": 28,
    "companyClasTypecd": "H",
    "toolingAffairsTypecd": "P",
    "calendarSerialNo": "240904660",
    "startDate": "2024-09-11", // --> 시작날짜
    "endDate": "2024-09-11", // --> 종료날짜
    "startTime": "09:00",
    "endTime": "18:00",
    "clasTypecd": "work",
    "calendarAffairs1Typecd": "개발 운영관리",
    "calendarAffairs2Typecd": "",
    "title": "업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무테스트업무",// --> 제목
    "attendeeInfos": [],// --> 참석자 리스트
    "placeVal": "장소테스트", // --> 장소
    "workCalendarContent": "",// --> 내용
    "attachmentFileSerialNo": "240904660",
    "attachments": [],
    "noticeSetUpVal": "",
    "styleColorVal": workColorVariables.lightgray,// --> 라벨 색상
    "flagYN": true,// --> 깃발표시여부
    "workStatus": 3,// --> 예정/진행/완료/미완 업무 상태
    "firstRgstrInfo": {// --> 최초 작성자(상세팝업 내 수정/삭제 버튼 활성화에서 사용하기 위함)
      "userId": "1089617",
      "userKoreanName": "곽상용",
      "userEnglishName": "SANG YONG KWAK",
      "departmentName": "자동화기술부",
      "departmentCode": "TJGD",
      "officiallvCode": "75",
      "finalLoginDatetime": "2024-04-18T16:25:01",
      "dataAuthorityType": "H"
    },
    "workBoardType": 1 //--> 달력 컴포넌트 아래에 표시되는 4가지 타입 (중요 업무, 업무 항목, 수신업무, 발신업무)
  }, {
    "id": 29,
    "companyClasTypecd": "H",
    "toolingAffairsTypecd": "P",
    "calendarSerialNo": "240904738",
    "startDate": "2024-09-12",
    "endDate": "2024-09-12",
    "startTime": "09:00",
    "endTime": "18:00",
    "clasTypecd": "work",
    "calendarAffairs1Typecd": "개발관리",
    "calendarAffairs2Typecd": "",
    "title": "개인등재업무",
    "attendeeInfos": [],
    "placeVal": "",
    "workCalendarContent": "",
    "attachmentFileSerialNo": "240904738",
    "attachments": [
      {
        "sourceFileName": "엔터프라이즈IT개발팀_테스트수행가이드_20240515.pptx",
        "attachmentFileSize": 299214,
        "attachmentFilePath": "/api/raonkuploaddata/148485f15960471c90f9a32c3bbe7323.pptx",
        "finalUpdaterId": "1089617"
      }
    ],
    "noticeSetUpVal": "",
    "styleColorVal": workColorVariables.pink,
    "flagYN": false,
    "workStatus": 1,
    "firstRgstrInfo": {
      "userId": "1089617",
      "userKoreanName": "곽상용",
      "userEnglishName": "SANG YONG KWAK",
      "departmentName": "자동화기술부",
      "departmentCode": "TJGD",
      "officiallvCode": "75",
      "finalLoginDatetime": "2024-04-18T16:25:01",
      "dataAuthorityType": "H"
    },
    "workBoardType": 3
  }, {
    "id": 30,
    "companyClasTypecd": "H",
    "toolingAffairsTypecd": "P",
    "calendarSerialNo": "240904738",
    "startDate": "2024-09-12",
    "endDate": "2024-09-12",
    "startTime": "10:00",
    "endTime": "18:00",
    "clasTypecd": "work",
    "calendarAffairs1Typecd": "개발관리",
    "calendarAffairs2Typecd": "",
    "title": "표준등재업무",
    "attendeeInfos": [],
    "placeVal": "",
    "workCalendarContent": "",
    "attachmentFileSerialNo": "240904738",
    "attachments": [
      {
        "sourceFileName": "엔터프라이즈IT개발팀_테스트수행가이드_20240515.pptx",
        "attachmentFileSize": 299214,
        "attachmentFilePath": "/api/raonkuploaddata/148485f15960471c90f9a32c3bbe7323.pptx",
        "finalUpdaterId": "1089617"
      }
    ],
    "noticeSetUpVal": "",
    "styleColorVal": workColorVariables.lightgreen,
    "flagYN": false,
    "workStatus": 1,
    "firstRgstrInfo": {
      "userId": "1089617",
      "userKoreanName": "곽상용",
      "userEnglishName": "SANG YONG KWAK",
      "departmentName": "자동화기술부",
      "departmentCode": "TJGD",
      "officiallvCode": "75",
      "finalLoginDatetime": "2024-04-18T16:25:01",
      "dataAuthorityType": "H"
    },
    "workBoardType": 3
  }, {
    "id": 31,
    "companyClasTypecd": "H",
    "toolingAffairsTypecd": "P",
    "calendarSerialNo": "240904738",
    "startDate": "2024-09-12",
    "endDate": "2024-09-12",
    "startTime": "11:00",
    "endTime": "18:00",
    "clasTypecd": "work",
    "calendarAffairs1Typecd": "개발관리",
    "calendarAffairs2Typecd": "",
    "title": "표준등재업무",
    "attendeeInfos": [],
    "placeVal": "",
    "workCalendarContent": "",
    "attachmentFileSerialNo": "240904738",
    "attachments": [
      {
        "sourceFileName": "엔터프라이즈IT개발팀_테스트수행가이드_20240515.pptx",
        "attachmentFileSize": 299214,
        "attachmentFilePath": "/api/raonkuploaddata/148485f15960471c90f9a32c3bbe7323.pptx",
        "finalUpdaterId": "1089617"
      }
    ],
    "noticeSetUpVal": "",
    "styleColorVal": workColorVariables.skyblue,
    "flagYN": false,
    "workStatus": 1,
    "firstRgstrInfo": {
      "userId": "1089617",
      "userKoreanName": "곽상용",
      "userEnglishName": "SANG YONG KWAK",
      "departmentName": "자동화기술부",
      "departmentCode": "TJGD",
      "officiallvCode": "75",
      "finalLoginDatetime": "2024-04-18T16:25:01",
      "dataAuthorityType": "H"
    },
    "workBoardType": 3
  }, {
    "id": 31,
    "companyClasTypecd": "H",
    "toolingAffairsTypecd": "P",
    "calendarSerialNo": "240904738",
    "startDate": "2024-09-11",
    "endDate": "2024-09-11",
    "startTime": "10:00",
    "endTime": "18:00",
    "clasTypecd": "work",
    "calendarAffairs1Typecd": "개발관리",
    "calendarAffairs2Typecd": "",
    "title": "표준등재업무",
    "attendeeInfos": [],
    "placeVal": "",
    "workCalendarContent": "",
    "attachmentFileSerialNo": "240904738",
    "attachments": [
      {
        "sourceFileName": "엔터프라이즈IT개발팀_테스트수행가이드_20240515.pptx",
        "attachmentFileSize": 299214,
        "attachmentFilePath": "/api/raonkuploaddata/148485f15960471c90f9a32c3bbe7323.pptx",
        "finalUpdaterId": "1089617"
      }
    ],
    "noticeSetUpVal": "",
    "styleColorVal": workColorVariables.yellow,
    "flagYN": false,
    "workStatus": 1,
    "firstRgstrInfo": {
      "userId": "1089617",
      "userKoreanName": "곽상용",
      "userEnglishName": "SANG YONG KWAK",
      "departmentName": "자동화기술부",
      "departmentCode": "TJGD",
      "officiallvCode": "75",
      "finalLoginDatetime": "2024-04-18T16:25:01",
      "dataAuthorityType": "H"
    },
    "workBoardType": 3
  }]);

  const updateDate = (date) => {
    setDisplayedDate(date);
    setSelectedDate(date);
  };

  const filterWorksByDate = (date) => {
    return calendarWorks.filter((work) => {
      let [year, month, day] = work.startDate.split('-').map(Number);
      const workStartDate = new Date(year, month - 1, day);

      [year, month, day] = work.endDate.split('-').map(Number);
      const workEndDate = new Date(year, month - 1, day);

      return workStartDate <= date && date <= workEndDate;
    });
  };
  const handleMouseEnter = (workLabelRef, workData) => {
    const rect = workLabelRef.current.getBoundingClientRect();
    // const tooltipContent = `<span className="label">제목:<span> ${workData.title}\n시간: ${workData.startDate} ${workData.startTime} ~ ${workData.endDate} ${workData.endTime}\n`;

    const TooltipContent = () => {
      return(<div className="tooltip-wrap">
        <div className="title">
          <span className='label'>제목 :</span>{workData.title}
        </div>
        <div className="time">
          <span className='label'>시간 :</span>
          <span>{workData.startDate} {workData.startTime}</span><span> ~ {workData.endDate} {workData.endTime}</span>
        </div>
        <div className="where">
          <span className="label">장소: </span>{workData.placeVal}
        </div>
      </div>
      )
    }

    setTooltip({
      visible: true,
      content: <TooltipContent />,
      position: { x: rect.left+150, y: rect.top },
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: '', position: { x: 0, y: 0 } });
  };


  return (<>
    <div className={calendarContainerStyle}>
      <div className="gts-calendar-toolbar">
        <div className="prefix">
          <button
            type="button"
            className="gts-calendar-prev-month"
          >
            <img src={iconPrev} />
          </button>
          <button
            type="button"
            className="gts-calendar-next-month"
          >
            <img src={iconNext} alt="" />
          </button>
          <button type="button">
            오늘
          </button>
        </div>
        <div className="center">
          <img src={iconCalendar} className="icon-calendar" />
          <span className="today-label">
            2024년 09월
          </span>
        </div>
        <div className="suffix">
          <a href="" className="btn tertiary">
            <i className="icon-excel-download prefix"></i>
            엑셀다운로드
          </a>
          <a href="" className="btn tertiary">
            <i className="icon-excel-upload prefix"></i>
            엑셀업로드
          </a>
          <a href="" className="btn tertiary">
            <i className="icon-printer prefix"></i>
            프린터
          </a>
        </div>
      </div>
      <Calendar
        key={displayedDate.getTime()}
        value={selectedDate}
        onChange={updateDate}
        // onClickDay={handleDateClick}
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
                  // onMouseLeave={handleMouseLeave}
                  onClick={(e, work) => handleWorkLabelClick(e, work)}
                />
              ))}
            </div>
          );
        }}
        className={calendarStyle}
      />
      <Tooltip
        visible={tooltip.visible}
        content={tooltip.content}
        position={tooltip.position}
      />
    </div>
  </>)
}

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
`;

const calendarStyle = css`
  width: 100%;
  border-right: none;
  border-bottom: none;
  border-top: 1px solid #dddddd;
  border-left: 1px solid #dddddd;

  
`;
const workLabelStyle = (backgroundColor) => css`
  display: flex;
  align-items: center;
  background-color: ${backgroundColor};
  height: 24px;
  font-size: 13px;
  padding: 4px 8px;
  margin: 4px 0;
  overflow: hidden;
  width: 100%;
  border-radius: 4px;
  color: #333;
  box-sizing: border-box;
  &:last-child{
    margin-bottom: 0;
  }
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
const tooltipStyle = css`
  position: absolute;
  display: inline-block;
  width: 200px;
  background-color: #FFF;
  color: #777;
  font-size: 13px;
  text-align: left;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #256ad9;
  pointer-events: none;
  z-index: 1000;
  .tooltip-wrap{
    >div{
      margin-bottom: 10px;
      .label{
        color: #333;
        font-weight: 700;
        margin-right: 4px;
      }
      &.time{
        > span{
          display: inline-block;
        }
      }
    }
  }
`;
// Clear the existing HTML content
const calendar = document.querySelector('#calendar');

// Render your React component instead
const root = createRoot(calendar);

root.render(<CalendarView />);