import { UIProvider } from "@yamada-ui/react";
import { ReactNode } from "react";
import { LanguageProvider } from "./Languages/LanguageProvider";
import { ThemeProvider } from "./Themes/ThemeContext";
import { ExpirationProvider } from "./UI/Pulldown/ExpirationProvider";
import { CodeProvider } from "./UI/Editor/CodeProvider";
import { EditorHeightProvider } from "./UI/Editor/EditorHeightProvider";

interface ProvidersProps {
    children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <UIProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <ExpirationProvider>
                        <CodeProvider>
                            <EditorHeightProvider>
                                {children}
                            </EditorHeightProvider>
                        </CodeProvider>
                    </ExpirationProvider>
                </LanguageProvider>
            </ThemeProvider>
        </UIProvider>
    )
}

export default Providers