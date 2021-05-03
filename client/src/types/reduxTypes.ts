import { UserPermissions, UserStateType } from './stateTypes';

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
    permissions: keyof typeof UserPermissions;
    user: UserStateType;
} & DefaultResponse;
