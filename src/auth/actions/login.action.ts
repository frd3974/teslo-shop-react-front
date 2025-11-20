import {tesloApi} from "@/api/tesloApi.ts";
import type {AuthResponse} from "@/auth/interfaces/auth.response.ts";

export const loginAction = async(email:string, password:string):Promise<AuthResponse> => {
    try {
        const {data} = await tesloApi.post<AuthResponse>('/auth/login', {
            email, password
        });
        console.log({data});
        return data;
    } catch (e) {
        console.log({e})
        throw e;
    }
};