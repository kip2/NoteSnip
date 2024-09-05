import { createContext, useContext, useState, ReactNode } from "react";

interface ExpirationContextType {
    expiration: string;
    setExpiration: (theme: string) => void;
}

const ExpirationContext = createContext<ExpirationContextType>({
    expiration: "",
    setExpiration: () => {},
});

export const ExpirationProvider = ({ children }: { children: ReactNode }) => {
    const [expiration, setExpiration] = useState<string>("");

    return (
        <ExpirationContext.Provider value={{ expiration, setExpiration }}>
            {children}
        </ExpirationContext.Provider>
    );
};

export const useExpirationContext = () => {
    return useContext(ExpirationContext);
};
