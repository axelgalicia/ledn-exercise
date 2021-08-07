import { IUserStatistics } from "../interfaces/IUserStatistics";
import { appConfig } from "../../../../configs/AppConfig";

export const fetchUserStatistics = async (): Promise<IUserStatistics> => {
    const res = await fetch(`${appConfig.apiUrl}/users/statistics`);
    if (res.ok) {
        return res.json();
    }
    throw new Error('Could not fetch Users');
}


export const fetchDeleteAllUsers = async (): Promise<void> => {
    const res = await fetch(`${appConfig.apiUrl}/users/`, { method: 'DELETE' });
    if (res.ok) {
        return;
    }
    throw new Error('Could not delete all users');
}

export const fetchLoadFile = async (): Promise<any> => {
    const res = await fetch(`${appConfig.apiUrl}/users/autoload`);
    if (res.ok) {
        return res.json();
    }
    throw new Error('Could not load Users automatically');
}