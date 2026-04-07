import { create } from "zustand";

type ModalType = "login" | "signup" | "comment" | null;
type PostData = {
  name: string
  username: string
  text: string
  id:string
}
type ModalStore = {
  modaltype: ModalType;
  selectedPost: PostData | null;
  openModal: (type: ModalType, post:  PostData) => void;
  closeModal: () => void;
};

export const useGlobalStore = create<ModalStore>((set) => ({
  modaltype: null,
  selectedPost: null,
  openModal: (type, post) =>
    set({ 
          modaltype: type,
          selectedPost: type === "comment" ? post || null : null
       }),
  closeModal: () => 
    set({ 
          modaltype: null, 
          selectedPost: null 
      }),
}));
