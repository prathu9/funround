import { RouterContext } from "@/context/router-context"
import { UserContext } from "@/context/user-context"
import { createUser, forgotPassword, getUser, loginUser, logoutUser, resendOTP, resetPassword, verifyEmail, verifyLoginEmail } from "@/services/userServices"
import { forgotPasswordDataType, GetUserResponseDataType, LoginDataType, OTPResendDataType, resetPasswordDataType, SignUpDataType, VerifyEmailType } from "@/type/authRequestType"
import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { WalletContext } from "@/context/wallet-context"
import { BalanceContext } from "@/context/balance-context"
import walletBalanceData from "@/data/walletBalanceData";
import { getWalletAddress } from "@/utils/wallet-utils"
import { useAssociateWallet } from "./useWallet"

/** Mutations **/
// hook to create user
export const useCreateUser = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: SignUpDataType) => createUser(userData),
        onSuccess: (createUserResData) => {

            const { data: { user } } = createUserResData;

            router.push(`/signup/confirm?email=${user.email}`);
        },
        onError: (error) => {
            console.log("error", error);
        }
    })
}

// hook to verify user
export const useVerifyEmail = () => {
    const router = useRouter();
    const { setUserDetail } = useContext(UserContext);

    return useMutation({
        mutationFn: (verifyEmailData: VerifyEmailType) => verifyEmail(verifyEmailData),
        onSuccess: (data) => {

            const { data: user } = data;
            setUserDetail({
                userId: user.userId,
                username: user.username,
                email: user.email,
                dateOfBirth: new Date(user.dateOfBirth),
                termsOfUse: user.termsOfUse,
                emailVerified: user.emailVerified
            });
            console.log("verified", data);
            router.push("/wallet-setup");
        },
    })
}

// hook to login user
export const useLoginUser = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: LoginDataType) => loginUser(userData),
        onSuccess: (loginResData, userData) => {
            const { email } = userData;
            console.log("login success", loginResData)

            router.push(`/login/confirm?email=${email}`);
        }
    })
}

// hook to verify login email
export const useVerifyLoginEmail = () => {
    const router = useRouter();
    const { parentRoute } = useContext(RouterContext);
    const { setUserDetail, setWalletDetail } = useContext(UserContext);

    const { mutate: associateMutate } = useAssociateWallet();

    return useMutation({
        mutationFn: (verifyEmailData: VerifyEmailType) => verifyLoginEmail(verifyEmailData),
        onSuccess: async (verifyloginResData) => {
            console.log("verified", verifyloginResData);
            const { data: user } = verifyloginResData;
            setUserDetail({
                userId: user.userId,
                username: user.username,
                email: user.email,
                dateOfBirth: new Date(user.dateOfBirth),
                termsOfUse: user.termsOfUse,
                emailVerified: user.emailVerified
            });

            if (user.walletId) {
                try {
                    const walletAddress = await getWalletAddress();
                    if (!walletAddress) {
                        throw new Error("Wallet address not found");
                    }
                    setWalletDetail({
                        walletId: user.walletId,
                        walletAddress: walletAddress
                    });
                    associateMutate({ walletAddress })
                }
                catch (error) {
                    console.log("err", error);
                    setWalletDetail({
                        walletId: user.data.walletId,
                        walletAddress: null
                    })
                }
                router.push(parentRoute);
            }
            else {
                router.push("/wallet-setup")
            }

        },
    })
}


// hook to logout user
export const useLogoutUser = () => {
    const router = useRouter();
    const { parentRoute } = useContext(RouterContext);
    const { setUserDetail, setWalletDetail } = useContext(UserContext);
    const { setWalletBalance } = useContext(BalanceContext);

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: (logoutResData) => {
            console.log("logout", logoutResData)
            setWalletBalance(walletBalanceData);
            setWalletDetail({
                walletId: "",
                walletAddress: ""
            });

            setUserDetail({
                userId: "",
                username: "",
                email: "",
                dateOfBirth: null,
                termsOfUse: false,
                emailVerified: false,
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
    })
}


// hook to send forgot password request
export const useForgotPassword = () => {
    const { setParentRoute } = useContext(RouterContext);
    return useMutation({
        mutationKey: ["forgot-password"],
        mutationFn: (userData: forgotPasswordDataType) => forgotPassword(userData),
        onSuccess: () => {
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
        retry: false
    })
}
