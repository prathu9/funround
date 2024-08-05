import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type UserContextType = {
  userDetail: UserDetailType;
  setUserDetail: Dispatch<SetStateAction<UserDetailType>>;
};

export const UserContext = createContext<UserContextType>({
  userDetail: {
    username: "",
    email: "",
    password: "",
    termsOfUse: false,
    isLoggedIn: false,
  },
  setUserDetail: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

interface UserDetailType {
  username: string;
  email: string;
  password: string;
  termsOfUse: boolean;
  isLoggedIn: boolean;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [userDetail, setUserDetail] = useState<UserDetailType>({
    username: "",
    email: "",
    password: "",
    termsOfUse: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user-detail")!));
    const storedData = localStorage.getItem("user-detail");
    if(storedData){
        setUserDetail(JSON.parse(storedData));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
