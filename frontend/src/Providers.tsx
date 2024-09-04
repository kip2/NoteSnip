import { UIProvider } from "@yamada-ui/react";
import { ReactNode } from "react";
import { SelectedThemeProvider } from "./Themes/ThemeProvider";
import { LanguageProvider } from "./Languages/LanguageProvider";
import { ThemeProvider } from "./Themes/ThemeContext";

interface ProvidersProps {
    children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <UIProvider>
            <ThemeProvider>
                <SelectedThemeProvider>
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </SelectedThemeProvider>
            </ThemeProvider>
        </UIProvider>
    )
}

export default Providers