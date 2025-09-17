import { InputHTMLAttributes } from "react";

export interface CloseModelType{
    closeModal:()=>void;
    setActiveModel:(modal: 'login' | 'signup' | null)=>void;
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
}

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

export interface UserProps {
  id:string;
  username: string;
  first_name:string;
  last_name:string;
  email:string;
  role: 'artist' | 'buyer';
  bio?: string;
}

export interface LoginResponseProps{
  user: UserProps;
  refresh:string;
  access: string;
}

// Updated to make username optional for email-based login
export interface LoginRequestProps {
  email:string;
  username?: string; // Made optional
  password: string;
}

export interface RegisterRequstProps{
  username: string;
  first_name:string;
  last_name:string;
  email:string;
  password:string;
  confirm_password: string;
  role: 'artist' | 'buyer';
  bio?:string;
}

export interface RegisterResponseProps{
  user:UserProps;
  refresh:string;
  access:string
}

export interface AuthState {
  user: UserProps | null;
  token:{
    refresh: string;
    access: string;
  }| null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error:null | string
}

// Auth hook return type
export interface AuthHookReturn {
  // State
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  token: { refresh: string; access: string } | null;
  user: UserProps | null;
  
  // Actions
  login: (credentials: LoginRequestProps) => Promise<AuthResult>;
  logOut: () => void;
  register: (credentials: RegisterRequstProps) => Promise<AuthResult>;
}

export interface AuthResult {
  success: boolean;
  data?: LoginResponseProps | RegisterResponseProps;
  error?: string;
}

// Form values types
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  first_name: string;  
  last_name: string;   
  email: string;
  password: string;
  confirm_password: string;  
  role: 'artist' | 'buyer' | '';  
  bio: string;
}