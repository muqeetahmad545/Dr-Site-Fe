// src/components/Header.tsx
import React from 'react';
import '../css/Header.css';  // Assuming you have CSS for your header styling

interface HeaderProps {
  title?: string; // Allows you to optionally pass a title prop
}

export const Header: React.FC<HeaderProps> = ({ title = 'Dr Site' }) => {
  return (
    <header className="app-header">
      <h1>{title}</h1>
    </header>
  );
};
