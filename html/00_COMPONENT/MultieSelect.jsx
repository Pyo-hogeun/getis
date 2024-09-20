import React from 'react';
import { createRoot } from 'react-dom/client';
import { Select, Space } from 'antd';
import { css } from '@emotion/css';
import iconArrowSelect from '../../assets/images/icon_select_arrow.png';
const IconArrowSelect = () => {
  return <img src={iconArrowSelect} />
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const options = [
  {
    label: 'China',
    value: 'china',
    emoji: '🇨🇳',
    desc: 'China (中国)',
  },
  {
    label: 'USA',
    value: 'usa',
    emoji: '🇺🇸',
    desc: 'USA (美国)',
  },
  {
    label: 'Japan',
    value: 'japan',
    emoji: '🇯🇵',
    desc: 'Japan (日本)',
  },
  {
    label: 'Korea',
    value: 'korea',
    emoji: '🇰🇷',
    desc: 'Korea (韩国)',
  },
];
const MultieSelect = () => {
  return (<>
    {/* 필요한 형태로 모드를 변경해서 사용하세요 */}
    <Select
      mode="tags"
      style={{
        width: '300px',
      }}
      className={multieSelectStyle}
      placeholder="select one country"
      defaultValue={['china']}
      onChange={handleChange}
      options={options}
      optionRender={(option) => (
        <Space>
          <span role="img" aria-label={option.data.label}>
            {option.data.emoji}
          </span>
          {option.data.desc}
        </Space>
      )}
      suffixIcon={<IconArrowSelect />}
    />
  </>)
}
const multieSelectStyle = css`
  && .ant-select-selector{
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 3px;
    height: 32px;
    padding-left: 10px;
    color: #333333;
    font-size: 14px;
  }
`
// Clear the existing HTML content
const $multieSelect = document.querySelector('#gtsMultieSelect');

// Render your React component instead
const root = createRoot($multieSelect);

root.render(<MultieSelect />);