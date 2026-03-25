import { create } from "zustand";

type MenuStore = {
	isOpen: boolean;
	toggleMenu: () => void;
	setIsOpen: (value: boolean) => void;
};

/**
 * Hook para controlar o estado do menu lateral
 * Optei pelo zustand por ser leve e fácil de usar
 */
export const useMenu = create<MenuStore>((set) => ({
	isOpen: false,
	toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
	setIsOpen: (value) => set({ isOpen: value }),
}));
