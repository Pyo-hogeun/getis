import React from 'react';
import { createRoot } from 'react-dom/client';
import { css } from '@emotion/css';
import { DatePicker } from 'antd';
import dayjs from "dayjs";
import "dayjs/locale/ko";
import locale from 'antd/es/date-picker/locale/ko_KR';
import { ConfigProvider } from "antd";
import iconCalendar from '../../assets/images/icon_calendar.png';

dayjs.locale("ko");
const IconCalender = () => {
  return <img src={iconCalendar} />
}
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const DatePickerCustom = () => {

  return (<>
    <DatePicker
      onChange={onChange}
      className={DatePickerStyle}
      style={{
        width: '350px',
      }}
      locale={locale}
      placeholder='날짜를 선택하세요'
      suffixIcon={<IconCalender />} />
  </>)
}

const DatePickerStyle = css`
  height: 32px;
  background-color: #FFF;
  border-radius: 3px;
  border: 1px solid #dddddd;
`;

// Clear the existing HTML content
const $datepicker = document.querySelector('#gtsDatepicker');

// Render your React component instead
const root = createRoot($datepicker);

root.render(<DatePickerCustom />);