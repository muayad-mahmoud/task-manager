import { User } from "firebase/auth";
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware";
type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
