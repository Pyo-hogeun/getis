import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import iconCaution from '../../assets/images/icon_caution.png';
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const Uploader = () => {
  return(<Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <img src={iconCaution} /> 이곳을 클릭 또는 파일을 드래그 하세요.
    </p>
  </Dragger>)
}

// Clear the existing HTML content
const uploader = document.querySelector('#uploader');

// Render your React component instead
const root = createRoot(uploader);

root.render(<Uploader />);