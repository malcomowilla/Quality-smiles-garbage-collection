import { createContext, useContext, useState } from 'react';

const AppSettingsContext = createContext(null);

export const AppSettings = ({ children }) => {
  const [totalHrs, setTotalHrs] = useState(0);
  const [loginWithPasskey, setLoginWithPasskey] = useState(false);

  if (AppSettingsContext === null) {
    console.log("AppSettingsContext is not provided.");
    throw new Error("AppSettingsContext is not provided.");
  }

  return (
    <AppSettingsContext.Provider  value={{ totalHrs, setTotalHrs, loginWithPasskey, setLoginWithPasskey }}>
      {children}
    </AppSettingsContext.Provider>
  );
};


// const useAppSettings = () => useContext(AppSettingsContext);
// export {useAppSettings};


export const useAppSettings = () => useContext(AppSettingsContext);
