
import { appConfig } from "../../../configs/AppConfig";
import { SearchFilter, SortingMap } from "../types";
import { UsersResults } from "./types";

export const fetchAllUsers = async (filter?: SearchFilter, sorting?: SortingMap): Promise<UsersResults> => {
    const queryParams = `sortBy[amt]=desc&pageSize=100`;
    const res = await fetch(`${appConfig.apiUrl}/users/?${queryParams}`);
    if (res.ok) {
        return res.json();
    }
    throw new Error('Could not fetch Users');
}