import { createContext, useContext, useState, ReactNode } from "react";
import { defaultExpirationValue } from "./Expiration";

interface ExpirationContextType {
    expiration: string;
    setExpiration: (theme: string) => void;
}

const ExpirationContext = createContext<ExpirationContextType>({
    expiration: defaultExpirationValue,
    setExpiration: () => {},
});

export const ExpirationProvider = ({ children }: { children: ReactNode }) => {
    const [expiration, setExpiration] = useState<string>(defaultExpirationValue);

    return (
        <ExpirationContext.Provider value={{ expiration, setExpiration }}>
            {children}
        </ExpirationContext.Provider>
    );
};

export const useExpirationContext = () => {
    return useContext(ExpirationContext);
};
