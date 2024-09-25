import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface MuteContextType {
    isMuted: boolean;
    toggleMute: () => void;
}

// Create the context with a default value
const MuteContext = createContext<MuteContextType | undefined>(undefined);

interface MuteProviderProps {
    children: ReactNode; // Type for the children prop
}

// Create the provider component
export const MuteProvider: React.FC<MuteProviderProps> = ({ children }) => {
    const [isMuted, setIsMuted] = useState<boolean>(false); // initial value

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <MuteContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </MuteContext.Provider>
    );
};

// Custom hook to use the MuteContext
export const useMuteState = (): MuteContextType => {
    const context = useContext(MuteContext);
    if (context === undefined) {
        throw new Error('useMuteState must be used within a MuteProvider');
    }
    return context;
};
