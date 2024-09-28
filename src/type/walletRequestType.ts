// Request data type
export interface CreateWalletDataType{
    firstName: string;
    lastName: string;
    password: string;
    dateOfBirth: Date | null;
    country: string;
    postalCode: string;
    residentialAddress: string;
    occupation: string;
    documentType: string;
    documentFrontSide: File[];
    documentBackSide: File[];
}

// Response data type
export interface CreateWalletResponseDataType {
    error: boolean,
    message: string,
    data: {
        walletId: string,
    },
}