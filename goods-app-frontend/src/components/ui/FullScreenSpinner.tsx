import React from 'react';
import { Spin } from 'antd';

export default function FullScreenSpinner() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Spin size="large" />
    </div>
  );
}