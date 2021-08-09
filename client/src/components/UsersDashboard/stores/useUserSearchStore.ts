import create from "zustand";
import { UserSearchStorage } from "../types";

const useUserSearchStore = create<UserSearchStorage>((set, get) => ({
    statistics: {
        activeUsers: 0
    },
    sorting: new Map(),
    pagination: {
        pageNumber: 1,
        pageSize: 20
    }
}));

export default useUserSearchStore;

