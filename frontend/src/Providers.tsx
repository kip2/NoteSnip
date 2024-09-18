import { UIProvider } from "@yamada-ui/react";
import { ReactNode } from "react";
import { SelectedThemeProvider } from "./Themes/ThemeProvider";
import { LanguageProvider } from "./Languages/LanguageProvider";
import { ThemeProvider } from "./Themes/ThemeContext";
import { ExpirationProvider } from "./Pulldown/ExpirationProvider";
import { CodeProvider } from "./Editor/CodeProvider";
import { EditorHeightProvider } from "./Editor/EditorHeightProvider";

interface ProvidersProps {
    children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <UIProvider>
            <ThemeProvider>
                <SelectedThemeProvider>
                    <LanguageProvider>
                        <ExpirationProvider>
                            <CodeProvider>
                                <EditorHeightProvider>
                                    {children}
                                </EditorHeightProvider>
                            </CodeProvider>
                        </ExpirationProvider>
                    </LanguageProvider>
                </SelectedThemeProvider>
            </ThemeProvider>
        </UIProvider>
    )
}

export default Providers