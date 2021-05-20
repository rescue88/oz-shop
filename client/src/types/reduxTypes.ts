import { UserStateType, ChangeUsersPageType, ProductItemType, DiscountItemType, CommentProductType, CommentUserType } from './stateTypes';

// local storage name for storing id and token
export const OZshop: string = 'OZshop';
// local storage name for storing user's cart
export const OZshopCart: string = 'OZshopCart';

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

// products
export type GetProductsResponse = {
    products: Array<ProductItemType>
} & DefaultResponse;

export type GetSingleProductResponse = {
    product: ProductItemType;
} & DefaultResponse;

// add to favorites server response
export type FavoritesResponse = {
    productId: string;
} & DefaultResponse;

// get discounts response
export type GetDiscountsResponse = {
    discounts: Array<DiscountItemType>
} & DefaultResponse;

// add/update rating
export type RatingResponse = {
    rating: number | null;
} & DefaultResponse;

// comments responses
export type CommentProductResponseType = {
    comments: Array<CommentProductType>;
} & DefaultResponse;

export type CommentUserResponseType = {
    comments: Array<CommentUserType>;
} & DefaultResponse;