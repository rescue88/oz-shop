// whole state type(mostly for selectors)
export type StateType = {
    auth: AuthStateType;
    admin: AdminStateType;
    user: UserStateType;
    snackbar: SnackbarStateType;
}

// user roles
export enum UserPermissions {
    'user',
    'moder',
    'admin'
}
// auth reducer initial state
export type AuthStateType = {
    token: string | null;
    userId: string | null;
    isAuth: boolean;
    isLoading: boolean;
}

// admin reducer initial state
export type ChangeUsersPageType = {
    _id: string;
    login: string;
    email: string;
    name: string;
    permissions: string;
    phone: string
}
export type AdminStateType = {
    changeUsers: Array<ChangeUsersPageType> | []
}

// user reducer initial state
export type UserStateType = {
    avatar: any,
    name: string | null;
    email: string | null;
    login: string | null;
    permissions: keyof typeof UserPermissions;
    phone: string | null;
    created: number | null;
    favorites: Array<any>;
}

// material ui snakcbar types
export enum SnackbarType {
    'error',
    'warning',
    'info',
    'success'
}
// snackbar reducer initial state
export type SnackbarStateType = {
    snackbarOpen: boolean;
    snackbarType: keyof typeof SnackbarType;
    snackbarMessage: string;
}