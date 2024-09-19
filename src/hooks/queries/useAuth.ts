import { RouterContext } from "@/context/router-context"
import { UserContext } from "@/context/user-context"
import { createUser, forgotPassword, getUser, loginUser, logoutUser, resendOTP, resetPassword, verifyEmail } from "@/services/userServices"
import { forgotPasswordDataType, GetUserResponseDataType, LoginDataType, LoginResponseType, OTPResendDataType, resetPasswordDataType, SignUpDataType, UserDataType, VerifyEmailType } from "@/type/authRequestType"
import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { usePathname, useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useContext } from "react"
import { WalletContext } from "@/context/wallet-context"
import { BalanceContext } from "@/context/balance-context"
import walletBalanceData from "@/data/walletBalanceData";

/** Mutations **/
// hook to create user
export const useCreateUser = () => {
    const router = useRouter();
    const { setUserDetail } = useContext(UserContext);

    return useMutation({
        mutationFn: (userData: SignUpDataType) => createUser(userData),
        onSuccess: (data) => {
           
            const { data: { user } } = data;
            console.log("signup",data, user)
            setUserDetail({
                userId: user.userId,
                username: user.username,
                email: user.email,
                dateOfBirth: new Date(user.dateOfBirth),
                termsOfUse: user.termsOfUse,
                emailVerified: false
            });

            router.push(`/signup/confirm?email=${user.email}`);
        },
    })
}

// hook to login user
export const useLoginUser = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: LoginDataType) => loginUser(userData),
        onSuccess: (data, userData) => {
            const {email} = userData;
console.log("login", data)
            localStorage.setItem("otp-time", data.data.otpCreatedAt)
            
            router.push(`/login/confirm?email=${email}`);
        }
    })
}

// hook to verify user
export const useVerifyEmail = (setErrorMessage: React.Dispatch<SetStateAction<string>>) => {
    const router = useRouter();
    const { parentRoute } = useContext(RouterContext);
    const {userDetail, setUserDetail} = useContext(UserContext);

    return useMutation({
        mutationFn: (verifyEmailData: VerifyEmailType) => verifyEmail(verifyEmailData),
        onSuccess: (data) => {
            console.log("verified", data);
            setUserDetail({
                ...userDetail,
                emailVerified: true
            })
            router.push(parentRoute);
        },
        onError: (error) => {
            console.log("e", error)
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.message);
            }
        }
    })
}

// hook to logout user
export const useLogoutUser = () => {
    const router = useRouter();
    const {parentRoute} = useContext(RouterContext);
    const {setWalletDetail} = useContext(WalletContext);
    const {setUserDetail} = useContext(UserContext);
    const {setWalletBalance} = useContext(BalanceContext);

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: (data) => {
            console.log("logout", data)
            setWalletBalance(walletBalanceData);
            setWalletDetail({
                email: "",
                firstname: "",
                lastname: "",
              });
          
              setUserDetail({
                userId:"",
                username: "",
                email: "",
                dateOfBirth: null,
                termsOfUse: false,
                emailVerified: false
              });
              router.push(parentRoute);
        },
        onError: (error) => {
            console.log("error", error);
        }
    })
}

// hook to send new otp
export const useResendOTP = () => {
    return useMutation({
        mutationKey: ["resend-otp"],
        mutationFn: (userData: OTPResendDataType) => resendOTP(userData),
        onSuccess: (data) => {
            const {data: {otpCreatedAt}} = data;
            localStorage.setItem('otp-time', otpCreatedAt)
        }
    })
}


// hook to send forgot password request
export const useForgotPassword = () => {
    const {setParentRoute} = useContext(RouterContext);
    return useMutation({
        mutationKey: ["forgot-password"],
        mutationFn: (userData: forgotPasswordDataType) => forgotPassword(userData),
        onSuccess: (data) => {
            const {data: {otpCreatedAt}} = data;
            localStorage.setItem('otp-time', otpCreatedAt)
            setParentRoute("/login/reset-password");
        }
    })
}

// hook to send reset password request
export const useResetPassword = () => {
    return useMutation({
        mutationKey: ["reset-password"],
        mutationFn: (userData: resetPasswordDataType) => resetPassword(userData),
        onSuccess: (data) => {
            console.log("password updated", data);
        }
    })
}



/** Queries **/
// hook to get user
export const useGetUser = (queryOptions?: Omit<UseQueryOptions<GetUserResponseDataType>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...queryOptions,
        queryKey: ["get-user"],
        queryFn: getUser,
        staleTime: Infinity,
        refetchOnWindowFocus: false, 
    })
}
