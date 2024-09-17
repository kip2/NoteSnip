// Copyright - 2024 jeremyssocial (nr.bln) 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


import React, { FC } from "react";
import styled from "styled-components";

interface TerminalWrapperProps {
  children: React.ReactNode;
}

const TerminalWrapper: FC<TerminalWrapperProps> = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="terminal">
        <div className="terminal-header">
          <div className="buttons">
            <span className="close"></span>
            <span className="minimize"></span>
            <span className="maximize"></span>
          </div>
          <div className="title">Editor</div>
        </div>
        <div className="terminal-body">{children}</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Terminal Window */
  .terminal {
    background-color: #000;
    color: #0f0;
    font-family: "Courier New", Courier, monospace;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  }

  /* Terminal Header */
  .terminal-header {
    background-color: #333;
    padding: 5px;
    display: flex;
    align-items: center;
    color: #fff;
  }

  .buttons {
    display: flex;
    margin-right: 15px;
  }

  .buttons span {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
  }

  .close {
    background-color: #ff605c;
  }

  .minimize {
    background-color: #ffbd44;
  }

  .maximize {
    background-color: #00ca4e;
  }

  .title {
    flex-grow: 1;
    text-align: center;
  }

  /* Terminal Body */
  .terminal-body {
    padding: 10px;
    color: #0f0;
    min-height: 100px; /* コンテンツが少ない場合の高さ */
  }
`;

export default TerminalWrapper;
