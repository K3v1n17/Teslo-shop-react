import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";



type AuthState = {
  /// propierties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;


  // getters
  isAdmin: () => boolean;

  //Action
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // implementacion del Store
  user: null,
  token: null,
  authStatus: "checking",



  /// Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes("admin");
  },


  // Actions
  login: async (email: string, password: string) => {
    // console.log({ email, password });
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },



  register: async (name: string, email: string, password: string) => {
    try {
      const data = await registerAction(name, email, password);

      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },


  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {

    try {
      const { user, token } = await checkAuthAction();
      set({ user: user, token: token, authStatus: "authenticated" });
      // console.log({ user, token });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: undefined, token: undefined, authStatus: "not-authenticated" });
      return false;
    }
  }
}));
