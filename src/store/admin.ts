import { ServerInfo } from "@/api/services/adminService";
import { create } from "zustand";

type NativeServices = {
  purchase?: boolean;
  updater?: boolean;
  lockPortrait?: boolean;
};

export interface AdminStoreState {
  connectedUsers: User[];
  connectedSockets: number;
  nativeServices: NativeServices;
  serverInfo?: ServerInfo;
  setNativeServices: (v: NativeServices) => void;
  setConnectedUsers: (v: User[]) => void;
  setServerInfo: (v: ServerInfo) => void;
  setConnectedSockets: (v: number) => void;
}

export const useAdminStore = create<AdminStoreState>()((set) => ({
  connectedUsers: [],
  serverInfo: undefined,
  nativeServices: {},
  connectedSockets: 0,
  setConnectedSockets: (v) => set(() => ({ connectedSockets: v })),
  setNativeServices: (v) =>
    set((s) => ({ nativeServices: { ...s.nativeServices, ...v } })),
  setServerInfo: (v) => set(() => ({ serverInfo: v })),
  setConnectedUsers: (v) => set(() => ({ connectedUsers: v })),
}));
