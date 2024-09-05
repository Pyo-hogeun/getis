import React from 'react';
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
const calendar = document.querySelector('#calendar');

// Render your React component instead
const root = createRoot(calendar);
 
root.render(<h1>Hello, world</h1>);