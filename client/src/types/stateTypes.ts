// user roles
export enum UserPermissions {
    'user',
    'moder',
    'admin'
}

export type StateType = {
    auth: AuthStateType;
    user: UserStateType;
}

// auth reducer initial state
export type AuthStateType = {
    isAuth: boolean,
    isLoading: boolean
}

// user reducer initial state
export type UserStateType = {
    avatar: any,
    permissons: typeof UserPermissions | null;
    name: string | null;
    email: string | null;
    login: string | null;
    phone: string | null;
    created: number | null;
    favorites: Array<any>;
}