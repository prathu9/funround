import { forgotPasswordDataType, forgotPasswordResponseDataType, GetUserResponseDataType, LoginDataType, LoginResponseType, OTPResendDataType, OTPResendResponseDataType, resetPasswordDataType, resetPasswordResponseDataType, SignUpDataType, SignUpResponseType, VerifyEmailType } from "@/type/authRequestType"
import axiosInstance from "./api"

// function sends request to create user
export const createUser = async (userData: SignUpDataType) => {
    return (await axiosInstance.post<SignUpResponseType>("auth/create", userData)).data;
}


// function sends request to verify user email
export const verifyEmail = async (verifyEmailData: VerifyEmailType) => {
    return (await axiosInstance.post("auth/verify-email", verifyEmailData)).data;
}

// function sends request to login user
export const loginUser = async (userData: LoginDataType) => {
    return (await axiosInstance.post<LoginResponseType>("auth/login", userData)).data;
}

// function sends request to verify login email
export const verifyLoginEmail = async (verifyEmailData: VerifyEmailType) => {
    return (await axiosInstance.post("auth/verify-login-otp", verifyEmailData)).data;
}


// function sends request to get user data
export const getUser = async () => {
    return (await axiosInstance.get<GetUserResponseDataType>("auth/get-user")).data;
}

// function sends request to logout user
export const logoutUser = async () => {
    return (await axiosInstance.post("auth/logout")).data;
}

// function send otp request
export const resendOTP = async (userData: OTPResendDataType) => {
    return (await axiosInstance.post<OTPResendResponseDataType>("auth/resend-otp", userData)).data;
}

// function to send forgot password request
export const forgotPassword = async (userData: forgotPasswordDataType) => {
    return (await axiosInstance.post<forgotPasswordResponseDataType>("auth/forgot-password", userData)).data;
}

// function to send reset password request
export const resetPassword = async (userData: resetPasswordDataType) => {
    return (await axiosInstance.post<resetPasswordResponseDataType>("auth/reset-password", userData)).data;
}
