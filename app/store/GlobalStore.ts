import { create } from "zustand";

type ModalType = "login" | "signup" | "comment" | null;

type PostData = {
  name: string;
  username: string;
  text: string;
  id: string;
};

type ModalStore = {
  modaltype: ModalType;
  selectedPost: PostData | null;

  openModal: {
    (type: "login"): void;
    (type: "signup"): void;
    (type: "comment", post: PostData): void;
  };

  closeModal: () => void;
};

export const useGlobalStore = create<ModalStore>((set) => ({
  modaltype: null,
  selectedPost: null,

 
  openModal: (type: ModalType, post?: PostData) =>
    set({
      modaltype: type,
      selectedPost: type === "comment" ? post ?? null : null,
    }),

  closeModal: () =>
    set({
      modaltype: null,
      selectedPost: null,
    }),
}));