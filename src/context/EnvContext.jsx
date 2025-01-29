import {createContext, useContext} from "react";

const env = {
    baseApiUrl: "http://145.24.223.82:8088/",
};

const EnvContext = createContext(env);

export function useEnv() {
    return useContext(EnvContext);
}

export function EnvProvider({children}) {

    return (

        <EnvContext.Provider value={env}>
            {children}
        </EnvContext.Provider>

    )

}