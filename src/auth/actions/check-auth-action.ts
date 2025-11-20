import {tesloApi} from "@/api/tesloApi.ts";
import type {AuthResponse} from "@/auth/interfaces/auth.response.ts";

export const checkAuthAction = async ():Promise<AuthResponse> => {
    const token = localStorage.getItem('token');
    if(!token) throw new Error('no hay token');
    try {
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
        localStorage.setItem('token',data.token);
        return data;
    } catch (e) {
        localStorage.removeItem('token');
        throw new Error('token expirado');
    }
};