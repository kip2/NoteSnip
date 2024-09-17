import React, { FC } from 'react';
import styled from 'styled-components';
import { useLanguageContext } from '../Languages/LanguageProvider';

interface CodeEditorWrapperProps {
  children: React.ReactNode;
}

const CodeEditorWrapper: FC<CodeEditorWrapperProps> = ({ children }) => {
  const { language } = useLanguageContext()
  return (
    <StyledWrapper>
      <div className="header">
        <span className="title">{language}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="icon">
          <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
          <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <path strokeLinecap="round" strokeWidth="2" stroke="#4C4F5A" d="M6 6L18 18"></path>
            <path strokeLinecap="round" strokeWidth="2" stroke="#4C4F5A" d="M18 6L6 18"></path>
          </g>
        </svg>
      </div>
      <div className="editor-content">{children}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: #1d1e22;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 2px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
  }

  .title {
    font-family: Lato, sans-serif;
    font-weight: 900;
    font-size: 14px;
    letter-spacing: 1.57px;
    color: rgb(212, 212, 212);
  }

  .icon {
    width: 20px;
    transition: 0.2s ease;
  }

  .icon:hover {
    cursor: pointer;
    border-radius: 50px;
    background-color: #6e7281;
  }

  .editor-content {
    margin: 0 10px 10px;
    color: white;
    padding: 10px;
  }
`;

export default CodeEditorWrapper;
