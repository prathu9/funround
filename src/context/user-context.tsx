"use client";
import { useGetUser } from "@/hooks/queries/useAuth";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// type of user detail
interface UserDetailType {
  userId: string;
  username: string;
  email: string;
  dateOfBirth: Date | null;
  termsOfUse: boolean;
  emailVerified: boolean;
}

// type for user context
interface UserContextType {
  userDetail: UserDetailType;
  setUserDetail: Dispatch<SetStateAction<UserDetailType>>;
}

// user context to store user information
export const UserContext = createContext<UserContextType>({
  userDetail: {
    userId: "",
    username: "",
    email: "",
    dateOfBirth: null,
    termsOfUse: false,
    emailVerified: false
  },
  setUserDetail: () => {},
});

// props type for use provider
interface UserProviderProps {
  children: ReactNode;
}

// user provider
const UserProvider = ({ children }: UserProviderProps) => {
  const [userDetail, setUserDetail] = useState<UserDetailType>({
    userId: "",
    username: "",
    email: "",
    dateOfBirth: null,
    termsOfUse: false,
    emailVerified: false
  });
  
  const { data } = useGetUser({
    enabled: !Boolean(userDetail.email),
  });

  useEffect(() => {
   console.log(data)
    if (data) {
      setUserDetail({
        userId: data.data.userId,
        username: data.data.username,
        email: data.data.email,
        dateOfBirth: new Date(data.data.dateOfBirth),
        termsOfUse: data.data.termsOfUse,
        emailVerified: true
      });
    }
  }, [data]);


  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
