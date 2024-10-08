/* Copyright - 2024 aymenthedeveloper (Aymen developer) 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

import styled from "styled-components"
import { Box,  Center, useColorMode, ColorMode } from "@yamada-ui/react"
import { useThemeContext } from "../../Themes/ThemeContext"
import { useEffect } from "react"

export const ColorModeButton = () => {
    const { setTheme } = useThemeContext()
    const { colorMode, changeColorMode } = useColorMode()

    useEffect(() => {
        const systemPreferDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const defaultMode = systemPreferDark ? "dark" : "light"
        changeColorMode(defaultMode)
    }, [changeColorMode])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const handleSystemColorModeChange = (e: MediaQueryListEvent) => {
            const newMode = e.matches ? "dark" : "light"
            changeColorMode(newMode as ColorMode)
        }

        mediaQuery.addEventListener("change", handleSystemColorModeChange)

        return () => {
            mediaQuery.removeEventListener("change", handleSystemColorModeChange)
        }
    }, [changeColorMode])

    const toggleColorMode = () => {
        const newMode = colorMode === "light" ? "dark" : "light"
        changeColorMode(newMode as ColorMode)
        setTheme(newMode as string)
    }

    return(
        <StyledWrapper>
            <Center>
                <Box display="flex" gap="md">
                    <button 
                        className={`toggle-btn ${colorMode === 'light' ? 'toggled' : ''}`}
                        onClick={toggleColorMode}
                    >
                        <div className="sun-rays"/>
                        <div className="main-circle"/>
                    </button>
                </Box>
            </Center>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`

.toggle-btn {
    --bg: #e8e8e8;
    --fg: #212121;
    background-color: var(--bg);
    border-radius: 50%;
    --dimensions: 50px;
    width: var(--dimensions);
    height: var(--dimensions);
    border: 2px solid;
    border-color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    cursor: pointer;
    position: relative;
    transition: transform 0.45s ease, background-color 0.4s ease, border-color 0.6s ease ;
}

.toggle-btn:hover {
    transform: rotate(360deg);
    background-color: var(--fg);
    border-color: var(--bg);
    color: var(--bg);
}

.toggle-btn:hover .main-circle::after{
    background-color: var(--fg);
}

.toggle-btn:hover .main-circle
{
    background-color: var(--bg);
}

.toggle-btn:hover .sun-rays,
.toggle-btn:hover .sun-rays::after,
.toggle-btn:hover .sun-rays::before {
    background-color: var(--bg);
    box-shadow: 0 16px 0 var(--bg), 0 -16px 0 var(--bg);
}

.toggle-btn .main-circle {
    --dimensions: 20px;
    width: var(--dimensions);
    height: var(--dimensions);
    background-color: var(--fg);
    border-radius: 50%;
    position: absolute;
    transition: transform 0.4s ease 0.2s !important; /* !importantを追加 */
}

.toggle-btn .main-circle::after {
    content: "";
    background-color: var(--bg);
    border-radius: 50%;
    --dimensions: 15px;
    width: var(--dimensions);
    height: var(--dimensions);
    position: absolute;
    top: 1px;
    right: -1px;
    transform-origin: right top;
    transform: scale(0);
    transition: transform 0.4s ease 0.2s !important; /* !importantを追加 */
}

.toggle-btn .sun-rays {
    display: grid;
    place-items: center;
    transform: scale(1) !important; /* !importantで初期状態を強制 */
    transition: transform 0.4s ease 0.2s !important;
}

.toggle-btn .sun-rays,
.toggle-btn .sun-rays::after,
.toggle-btn .sun-rays::before {
    --width: 3px;
    --height: 6px;
    width: var(--width);
    height: var(--height);
    background-color: var(--fg);
    position: absolute;
    box-shadow: 0 16px 0 var(--fg), 0 -16px 0 var(--fg);
    transition: transform 0.4s ease 0.2s !important;
}

.toggle-btn .sun-rays::after {
    content: "";
    transform: rotate(120deg);
}

.toggle-btn .sun-rays::before {
    content: "";
    transform: rotate(240deg);
}

.toggle-btn.toggled .main-circle {
    transform: scale(1.2) !important; /* !importantでスタイル適用を強制 */
}

.toggle-btn.toggled .main-circle::after {
    transform: scale(1) !important;
}

.toggle-btn.toggled .sun-rays {
    transform: scale(0) !important; 
    transition: transform 0.4s ease 0.2s !important;
}

@media (prefers-color-scheme: dark) {
    .toggle-btn {
        --bg: #212121;
        --fg: #e8e8e8;
    }
}

`