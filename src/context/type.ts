// wallet detail type
export interface WalletDetailType {
    walletId: string,
    walletAddress: string | null
}

// type of user detail
export interface UserDetailType {
    userId: string;
    username: string;
    email: string;
    dateOfBirth: Date | null;
    termsOfUse: boolean;
    emailVerified: boolean;
  }
  
  