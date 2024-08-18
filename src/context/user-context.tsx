import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// type for user context
interface UserContextType{
  userDetail: UserDetailType;
  setUserDetail: Dispatch<SetStateAction<UserDetailType>>;
};

// user context to store user information
export const UserContext = createContext<UserContextType>({
  userDetail: {
    username: "",
    email: "",
    password: "",
    birthDate: null,
    termsOfUse: false,
    isLoggedIn: false,
  },
  setUserDetail: () => {},
});

// props type for use provider
interface UserProviderProps {
  children: ReactNode;
};

// type of user detail
interface UserDetailType {
  username: string;
  email: string;
  password: string;
  birthDate: Date | null;
  termsOfUse: boolean;
  isLoggedIn: boolean;
}

// user provider
const UserProvider = ({ children }: UserProviderProps) => {
  const [userDetail, setUserDetail] = useState<UserDetailType>({
    username: "",
    email: "",
    birthDate: null,
    password: "",
    termsOfUse: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    // get user detail from localstorage
    const storedData = localStorage.getItem("user-detail");

    // check if data is available and set the userdetail state
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
