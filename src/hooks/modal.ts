"use client";

import { create } from "zustand";

type ModalType = "login" | "register" | "reset-password" | null;

interface ModalStore {
  modalType: ModalType;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  modalType: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, modalType: type }),
  onClose: () => set({ isOpen: false, modalType: null }),
}));
