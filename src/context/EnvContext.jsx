import {createContext, useContext} from "react";

const baseApiUrl = "http://145.24.223.82:8088/";

const EnvContext = createContext(null);

export function useEnv() {
    return useContext(EnvContext);
}

export function EnvProvider({children}) {

    return (

        <EnvContext.Provider value={{
            baseApiUrl
        }}>
            {children}
        </EnvContext.Provider>

    )

}