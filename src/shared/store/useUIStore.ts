import { create } from 'zustand';
import type { ModalType } from '../../modules/ganado/types/ganado.types';

interface UIState {
  activeModal: ModalType;
  modalData: Record<string, unknown>;
  searchQuery: string;
  openModal: (modal: NonNullable<ModalType>, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  setSearchQuery: (q: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  activeModal: null,
  modalData: {},
  searchQuery: '',

  openModal(modal, data = {}) {
    set({ activeModal: modal, modalData: data });
  },

  closeModal() {
    set({ activeModal: null, modalData: {} });
  },

  setSearchQuery(q) {
    set({ searchQuery: q });
  },
}));
