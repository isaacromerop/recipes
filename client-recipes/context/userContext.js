import create from "zustand";
import Cookie from "js-cookie";

const userCookie = Cookie.getJSON("user");

const useUserStore = create((set) => ({
  user: userCookie || "",
  setUser: (userName) => set(() => ({ user: userName })),
  removeUser: () => set(() => ({ user: "" })),
}));

export default useUserStore;
