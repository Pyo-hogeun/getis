import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { generate, green, presetPalettes, red } from '@ant-design/colors';
import { ColorPicker, theme } from 'antd';
const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));
const ColorPickerCustom = () => {
  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
  });
  return(<ColorPicker presets={presets} defaultValue="#1677ff" />)
};
// Clear the existing HTML content
const colorPicker = document.querySelector('#colorPicker');

// Render your React component instead
const root = createRoot(colorPicker);

root.render(<ColorPickerCustom />);