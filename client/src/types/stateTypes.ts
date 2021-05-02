// whole state type(mostly for selectors)
export type StateType = {
    auth: AuthStateType;
    user: UserStateType;
    snackbar: SnackbarStateType;
}

// auth reducer initial state
export type AuthStateType = {
    isAuth: boolean,
    isLoading: boolean
}

// user roles
export enum UserPermissions {
    'user',
    'moder',
    'admin'
}
// user reducer initial state
export type UserStateType = {
    avatar: any,
    permissons: keyof typeof UserPermissions | null;
    name: string | null;
    email: string | null;
    login: string | null;
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