import { loginUser, logout, registerUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { 
    LoginRequestProps, 
    RegisterRequstProps, 
    AuthHookReturn, 
    AuthResult 
} from "@/types/auth.dt";
import { useCallback } from "react";
import { toast } from "sonner";

export function useAuth(): AuthHookReturn {
    const dispatch = useAppDispatch();

    const {
        user,
        token,
        isLoading,
        isAuthenticated,
        error
    } = useAppSelector((state) => state.auth)

    const login = useCallback(async (credentials: LoginRequestProps): Promise<AuthResult> => {
        try {
            const result = await dispatch(loginUser(credentials));
            
            if (loginUser.fulfilled.match(result)) {
                toast.success("Login successful!");
                return { success: true, data: result.payload }
            } else if (loginUser.rejected.match(result)) {
                const errorMessage = result.payload || 'Login failed';
                toast.error(`Login failed: ${errorMessage}`);
                return { 
                    success: false, 
                    error: errorMessage
                }
            } else {
                toast.error("Login failed");
                return { success: false, error: 'Login failed' }
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            toast.error(`Login failed: ${errorMessage}`);
            return { success: false, error: errorMessage }
        }
    }, [dispatch])

    const logOut = useCallback(() => {
        dispatch(logout());
        toast.success("Logged out successfully");
        // Note: localStorage cleanup is now handled in the logout reducer
    }, [dispatch])

    const register = useCallback(async (credentials: RegisterRequstProps): Promise<AuthResult> => {
        try {
            const result = await dispatch(registerUser(credentials))
            
            if (registerUser.fulfilled.match(result)) {
                toast.success("Registration successful!");
                return { success: true, data: result.payload }
            } else if (registerUser.rejected.match(result)) {
                const errorMessage = result.payload || 'Registration failed';
                toast.error(`Registration failed: ${errorMessage}`);
                return { 
                    success: false, 
                    error: errorMessage
                }
            } else {
                toast.error("Registration failed");
                return { success: false, error: 'Registration failed' }
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            toast.error(`Registration failed: ${errorMessage}`);
            return { success: false, error: errorMessage }
        }
    }, [dispatch])

    return {
        // State
        isLoading,
        isAuthenticated,
        error,
        token,
        user,

        // Actions
        login,
        logOut,
        register
    }
}