import React from 'react';
import { createRoot } from 'react-dom/client';
import { css } from '@emotion/css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import iconCalendar from '../../assets/images/icon_calendar.png';

const IconCalender = () => {
  return <img src={iconCalendar} />
}
const DatePickerCustom = () => {

  return (<>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker className="gts-datepicker" slots={{ openPickerIcon: IconCalender }}/>
    </LocalizationProvider>
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

// Clear the existing HTML content
const $datepicker = document.querySelector('#gtsDatepicker');

// Render your React component instead
const root = createRoot($datepicker);

root.render(<DatePickerCustom />);