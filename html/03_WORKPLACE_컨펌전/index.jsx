import React from 'react';
import { createRoot } from 'react-dom/client';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';

const Toolbar = (props) => {
  const {
    date,
  } = props;
  const navigate = (action) => {
    props.onNavigate(action);
  };
  return (
    <div className="gts-calendar-toolbar">
      <div className="prefix">
        <button
          type="button"
          onClick={navigate.bind(null, 'PREV')}
          class="gts-calendar-prev-month"
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={navigate.bind(null, 'NEXT')}
          class="gts-calendar-next-month"
        >
          &gt;
        </button>
        <button type="button" onClick={navigate.bind(null, 'TODAY')}>
          오늘
        </button>
      </div>
      <div className="center">
        <span className="rbc-btn-group">
          <img src="../../assets/images/icon_calendar.png" className="icon-calendar"/>
          <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
        </span>
      </div>
      <div className="suffix">
        <a href="" class="btn tertiary">
          <i class="icon-excel-download prefix"></i>
          엑셀다운로드
        </a>
        <a href="" class="btn tertiary">
          <i class="icon-excel-upload prefix"></i>
          엑셀업로드
        </a>
        <a href="" class="btn tertiary">
          <i class="icon-printer prefix"></i>
          프린터
        </a>
      </div>
    </div>
  );
}
const message = {
  week: '주',
  work_week: '평일',
  day: '일',
  month: '월',
  previous: '전',
  next: '후',
  today: '오늘',
  agenda: '아젠다',

  showMore: (total) => `+${total} 더보기`,
}
const DayHeader = (props) => {
  return(props.date);
}
const MyCalendar = (props) => {
  moment.locale('ko');
  const localizer = momentLocalizer(moment);
  return(
    <div className="myCustomHeight">
      <Calendar
        localizer={localizer}
        // events={myEventsList}
        message={message}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: Toolbar,
          day: {
            header: DayHeader,
          }
        }}
      />
    </div>
  );
}

// Clear the existing HTML content
const calendar = document.querySelector('#calendar');

// Render your React component instead
const root = createRoot(calendar);
 
root.render(<MyCalendar/>);