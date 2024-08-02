import { createContext, ReactNode, useState } from "react";

type UserContextType = {
    username: string,
    email: string,
    password: string,
    termsOfUse: boolean,
    updateInputField?: (key: string, value: string) => void
}

export const UserContext = createContext<UserContextType>({
    username: "",
    email: "",
    password: "",
    termsOfUse: false
});

type UserProviderProps = {
    children: ReactNode
}

const UserProvider = ({children}: UserProviderProps) => {
    const [userDetail, setUserDetail] = useState<UserContextType>({
        username: "",
        email: "",
        password: "",
        termsOfUse: false
    });

    const updateInputField = (key: string, value: string) => {
        setUserDetail({
            ...userDetail,
            [key]: value
        })
    }

    return(
        <UserContext.Provider value={{...userDetail, updateInputField}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;