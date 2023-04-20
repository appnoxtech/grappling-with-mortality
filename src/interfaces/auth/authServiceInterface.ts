export interface ssoData {
    email?: string;
    SSO: string;
    facebookId?: number;
    googleId?: number;
    fullName: string | null;
    image?: string | null
  }
  
  export interface loginData {
    email: string;
    password: string;
  }
  
  export interface signupData {
    fullName: string,
    email: string,
    password: string,
  }
  export interface resetPassword {
    email: string;
    otp: number;
    password: string;
  }
  
  export interface OTPData {
    email: string;
    otp: number;
    type: string;
  }
  
  export interface generateOTP {
    email: string;
    type: string;
  }
  
  export interface user {
    email: string;
    accessToken: string;
    fullName: string,
  }
  