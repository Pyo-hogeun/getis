import React from 'react';
import { createRoot } from 'react-dom/client';
import { css } from '@emotion/css';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import "dayjs/locale/ko";
import locale from 'antd/es/date-picker/locale/ko_KR';
import iconCalendar from '../../assets/images/icon_calendar.png';

dayjs.locale("ko");
const IconCalender = () => {
  return <img src={iconCalendar} />
}
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const RangePickerCustom = () => {

  return (<>
    <RangePicker
      onChange={onChange}
      className={RangePickerStyle}
      style={{
        width: '350px',
      }}
      locale={locale}
      placeholder='날짜를 선택하세요'
      suffixIcon={<IconCalender />} />
  </>)
}

const RangePickerStyle = css`
  height: 32px;
  background-color: #FFF;
  border-radius: 3px;
  border: 1px solid #dddddd;
  &.size-sm{
    height: 24px;
    font-size: 12px;
  }
`;

// Clear the existing HTML content
const $rangepicker = document.querySelector('#gtsRangepicker');

// Render your React component instead
const root = createRoot($rangepicker);

root.render(<RangePickerCustom />);