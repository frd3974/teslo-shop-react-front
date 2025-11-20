import { create } from 'zustand'
import type {User} from "@/interfaces/user.interface.ts";
import {loginAction} from "@/auth/actions/login.action.ts";
import {checkAuthAction} from "@/auth/actions/check-auth-action.ts";

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,
    isAdmin: () => boolean,
    login: (email:string, password:string) => Promise<boolean>,
    logout: () => void,
    checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',
    isAdmin: () => {
        const roles = get().user?.roles ?? [];
        return roles.includes('admin');
    },
    login: async(email:string, password:string) => {
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            set({user: data.user, token: data.token, authStatus: 'authenticated'});
            return true;
        } catch (e) {
            localStorage.removeItem('token');
            set({user: null, token: null, authStatus: 'not-authenticated'});
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({user: null, token: null, authStatus: 'not-authenticated'});
    },
    checkAuthStatus: async() => {
        try {
            const {user,token} = await checkAuthAction();
            set({
                user, token, authStatus: 'authenticated'
            })
            return true;
        } catch (e) {
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            });
            return false;
        }
    }
}))
