import { create } from 'zustand';
import type { AuthStoreType } from './types';


export const useAuthStore = create<AuthStoreType>((set) => ({
    isUserLoggedIn: false,
    setLoggedInStatus: (status: boolean) => set(() => ({ isUserLoggedIn: status }))
}));