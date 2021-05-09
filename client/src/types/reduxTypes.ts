import { UserStateType, ChangeUsersPageType } from './stateTypes';

// local storage name for storing id and token
export const OZshop: string = 'OZshop';

// get a message with a mistake description
export type DefaultResponse = {
    message: string;
    success: boolean;
}

// login response data type
export type LoginResponse = {
    token: string;
    userId: string;
} & DefaultResponse;

// array of users for ChangeUsers admin page
export type GetUsersResponse = {
    users: Array<ChangeUsersPageType>;
} & DefaultResponse;

export type UserDataResponse = {
    user: UserStateType;
} & DefaultResponse;
