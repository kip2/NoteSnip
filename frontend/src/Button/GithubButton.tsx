// Copyright - 2024 McHaXYT (McHaXYT) 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { FC } from "react";
import styled from "styled-components";

interface GithubButtonProps {
    url:  string
}

const GithubButton: FC<GithubButtonProps> = ({ url }) => {
  return (
    <StyledWrapper>
      <div className="button-container">
        <a href={url} className="button flex-center">
          <svg
            viewBox="0 0 20 20"
            width="33px"
            className="btn-svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            stroke="#fff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <title>github [#fff142]</title>
              <desc>Created with Sketch.</desc>
              <defs />
              <g
                id="Page-1"
                stroke="none"
                strokeWidth={1}
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-140.000000, -7559.000000)"
                  fill="#fff"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                      id="github-[#fff142]"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </a></div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.button {
  cursor: pointer;
  text-decoration: none;
  color: #ffff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2d2e32;
  border: 2px solid #2d2e32;
  transition: all 0.45s;
}

.button:hover {
  transform: rotate(360deg);
  transform-origin: center center;
  background-color: #ffff;
  color: #2d2e32;
}

.button:hover .btn-svg {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(305deg)
    brightness(103%) contrast(103%);
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

`;

export default GithubButton;

