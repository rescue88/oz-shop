// whole state type(mostly for selectors)
export type StateType = {
    auth: AuthStateType;
    admin: AdminStateType;
    user: UserStateType;
    snackbar: SnackbarStateType;
    product: ProductStateType;
}

// auth reducer initial state
export type AuthStateType = {
    isAuth: boolean;
}

// admin reducer initial state(users)
export type ChangeUsersPageType = {
    _id: string;
    login: string;
    email: string;
    name: string;
    permissions: string;
    phone: string
}
// admin reducer initial state(discounts)
export type ChangeDiscountsPageType = {
    image: any;
    _id: string;
    name: string;
    description: string;
    percent: number;
}
export type AdminStateType = {
    changeUsers: Array<ChangeUsersPageType>
    changeDiscounts: Array<ChangeDiscountsPageType>
}

// user roles
export type UserPermissionType = 'user' | 'admin' | 'moder';
// user's favorites type
export type UserFavoritesType = {
    _id: string;
    image: any;
    name: string;
    price: number;
    amount: number;
}
// user reducer initial state
export type UserStateType = {
    avatar: any,
    name: string | null;
    email: string | null;
    login: string | null;
    permissions: UserPermissionType;
    phone: string | null;
    created: number | null;
    favorites: Array<UserFavoritesType>;
}

// material ui snakcbar types
export type SnackbarType = 'error' | 'warning' | 'info' | 'success';
// snackbar reducer initial state
export type SnackbarStateType = {
    snackbarOpen: boolean;
    snackbarType: SnackbarType;
    snackbarMessage: string;
}

// categories
export type CategoryNameType = 'kitchen' | 'home' | 'climate' | 'accessorie' | 'hygiene';
// product state type
export type ProductItemType = {
    _id: string;
    name: string;
    description: string;
    image: any;
    category: string;
    price: number;
    amount: number;
    producer: string;
    size: string;
    created: string;
    discounts: string;
}

export type ProductStateType = {
    products: Array<ProductItemType>;
    singleProduct: ProductItemType | null;
    filters: any;
}