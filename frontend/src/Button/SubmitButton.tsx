// Copyright - 2024 0xnihilism (0xNihilist ) 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { useColorMode } from "@yamada-ui/react";
import { FC } from "react";
import styled from "styled-components";

interface SubmitButtonProps {
    onClick: () => void
}

const SubmitButton: FC<SubmitButtonProps> = ({onClick}) => {
    const { colorMode } = useColorMode()

  return (
    <StyledWrapper >
      <div className="button-container">
        <button onClick={onClick} className={`brutalist-button sharebutton ${colorMode}`}>
          <div className="sharebutton-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"/>
                <circle cx="64" cy="128" r="32" fill="none" stroke="#10A37F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                <circle cx="176" cy="200" r="32" fill="none" stroke="#10A37F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                <circle cx="176" cy="56" r="32" fill="none" stroke="#10A37F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                <line x1="149.09" y1="73.3" x2="90.91" y2="110.7" fill="none" stroke="#10A37F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                <line x1="90.91" y1="145.3" x2="149.09" y2="182.7" fill="none" stroke="#10A37F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
            </svg>
          </div>
          <div className={`button-text ${colorMode}`}>
            <span>Create Share URL</span>
            <span>PUSH ME</span>
          </div>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* Adjust this value to increase or decrease space between buttons */
  padding: 20px;
}

.brutalist-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid #000000;
  border-radius: 12px;
  padding: 0;
  text-decoration: none;
  color: #000000;
  font-weight: bold;
  position: relative;
  box-shadow: 4px 4px 0px #000000;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 130px;
  width: 130px;
  cursor: pointer;
}

.brutalist-button.sharebutton.dark{
   background-color: #356854;
}

.brutalist-button.sharebutton.light {
   background-color: #cc9b7a;
}

.brutalist-button::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -150%;
  width: 300%;
  height: 300%;
  border-radius: 50%;
  transform: translateX(-50%) scale(0);
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 1;
}

.brutalist-button.sharebutton.dark::before{
  background-color: #316b58;
}
.brutalist-button.sharebutton.light::before {
  background-color: #cc9b7a;
}

.brutalist-button.claude.dark::before {
  background-color: #e3d19c;
}
.brutalist-button.claude.light::before {
  background-color: #cc9b7a;
}

.brutalist-button:hover::before {
  transform: translateX(-50%) scale(1);
}

.brutalist-button:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px #000000;
}

.brutalist-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #000000;
}

.sharebutton-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.sharebutton-logo {
  align-items: center;
  justify-content: center;
  background-color: #0f1715; /* sharebutton's green color */
  border-radius: 50%; /* This creates the circular background */
}

.sharebutton-icon {
  width: 54px;
  height: 54px;
  fill: #ffffff; /* White color for the SVG */
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.brutalist-button:hover .sharebutton-logo {
  animation: spin 5s linear infinite;
  width: 50px;
  height: 50px;
  top: 28%;
}

.brutalist-button:hover .sharebutton-icon {
  transform: scale(0.6);
}

.button-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.3;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  z-index: 2;
  position: absolute;
  bottom: 18px;
  left: 0;
  right: 0;
}

.button-text span:first-child {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
}

.button-text span:last-child {
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #ffffff;
}

.brutalist-button:hover .button-text {
  opacity: 1;
  transform: translateY(0);
}

.brutalist-button.sharebutton:hover .button-text.dark {
  color: #d3d3d3;
}
.brutalist-button.sharebutton:hover .button-text.light {
  color: #000000;
}

.brutalist-button.sharebutton:hover .button-text.dark span:last-child {
  color: #d6cbbf;
}
.brutalist-button.sharebutton:hover .button-text.light span:last-child {
  color: #ffffff;
}

@media (hover: hover) and (pointer: fine) {
  .brutalist-button:hover {
    transform: translate(-4px, -4px);
    box-shadow: 8px 8px 0px #000000;
  }
}

`;

export default SubmitButton;
