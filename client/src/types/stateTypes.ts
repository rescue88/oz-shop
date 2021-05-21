// whole state type(mostly for selectors)
export type StateType = {
    auth: AuthStateType;
    admin: AdminStateType;
    user: UserStateType;
    snackbar: SnackbarStateType;
    product: ProductStateType;
    discount: DiscountStateType;
    rating: RatingStateType;
    comment: CommentStateType;
    cart: CartStateType;
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
export type AdminStateType = {
    changeUsers: Array<ChangeUsersPageType>;
    changeOrders: Array<OrderItemType>;
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
    orders: Array<OrderUserItemType>;
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
    rating: number;
    created: string;
    discounts: string;
}

export type ProductLatestItemType = {
    _id: string;
    name: string;
    image: any;
    price: number;
}

export type ProductStateType = {
    products: Array<ProductItemType>;
    singleProduct: ProductItemType | null;
    latestProducts: Array<ProductLatestItemType>;
    filters: any;
}

// discounts
export type DiscountItemType = {
    image: any;
    _id: string;
    name: string;
    description: string;
    percent: number;
}

export type DiscountStateType = {
    discounts: Array<DiscountItemType>
}

// rating state type
export type RatingStateType = {
    rating: number | null;
}

// comment reducer
type CommentCommonPropsType = {
    _id: string;
    product: string;
    user: string;
    text: string;
    positive: boolean;
    created: string;
}
export type CommentProductType = {
    avatar: any;
    login: string;
} & CommentCommonPropsType;

export type CommentUserType = {
    image: any;
    name: string;
} & CommentCommonPropsType;

export type CommentStateType = {
    product: Array<CommentProductType>;
    user: Array<CommentUserType>;
}

// cart
export type CartStateType = {
    items: {
        [key: string]: Array<CartProdutType>
    };
    totalPrice: number;
    totalCount: number;
}

// product props that are needed in a cart
export type CartProdutType = {
    _id: string;
    image: any;
    name: string;
    price: number;
    amount: number;
}

// orders
export type OrderStatusType = 'У дорозі' | 'Завершено' | 'Очікування' | 'Оформлення';

export type OrderItemType = {
    _id: string;
    user: string;
    products: Array<string>;
    name: string;
    email: string;
    phone: string;
    price: number;
    deliveryAddress: string;
    status: OrderStatusType;
    created: string;
}

export type OrderUserItemType = {
    _id: string;
    amount: number;
    price: number;
    created: string;
    status: OrderStatusType;
}