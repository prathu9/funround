export interface SignUpDataType {
    username: string,
    email: string,
    dateOfBirth: string,
    password: string,
    confirmPassword: string,
    termsOfUse: boolean
}

export interface LoginDataType {
    email: string,
    password: string
}

export interface VerifyEmailType {
    email: string,
    verificationCode: string
}

export interface UserDataType {
    userId: string,
    username: string,
    email: string,
    dateOfBirth: string,
    termsOfUse: boolean
}

export interface OTPResendDataType{
    email: string
}

export interface forgotPasswordDataType{
    email: string
}

export interface resetPasswordDataType{
    email: string,
    password: string,
    confirmPassword: string
}

// Response data type

export interface SignUpResponseType{
    error: boolean,
    message: string,
    data: {
        otpCreatedAt: string,
        user: {
            userId: string,
            email: string,
            username: string,
            dateOfBirth: string,
            emailVerified: boolean,
            termsOfUse: boolean
        }
    }
}

export interface LoginResponseType {
    error: boolean,
    message: string,
    data: {
        requiresVerification: string,
        userId: string,
        otpCreatedAt: string,
    }
}

export interface GetUserResponseDataType {
    error: boolean,
    message: string,
    data: UserDataType
}

export interface OTPResendResponseDataType {
    error: boolean,
    message: string,
    data: {
        otpCreatedAt: string
    }
}

export interface forgotPasswordResponseDataType{
    error: boolean,
    message: string,
    data: {
        otpCreatedAt: string
    }
}

export interface resetPasswordResponseDataType{
    error: string,
    message: string,
}