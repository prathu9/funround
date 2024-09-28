"use client";
import { useGetUser } from "@/hooks/queries/useAuth";
import { getFormattedDate } from "@/utils/getFormattedDate";
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
  isFetchingUser: boolean;
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
  isFetchingUser: false
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
  
  const { data, isFetching } = useGetUser({
    enabled: !Boolean(userDetail.email),
  });

  useEffect(() => {
    if (data) {
      console.log("d",data, data.data.dateOfBirth)
      const dateOfBirth = new Date(data.data.dateOfBirth.split("/").reverse().join("/"));
      setUserDetail({
        userId: data.data.userId,
        username: data.data.username,
        email: data.data.email,
        dateOfBirth: dateOfBirth,
        termsOfUse: data.data.termsOfUse,
        emailVerified: true
      });
    }
  }, [data]);


  return (
    <UserContext.Provider value={{ userDetail, setUserDetail, isFetchingUser: isFetching }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
