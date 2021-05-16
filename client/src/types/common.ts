import { FC } from 'react';

// both for admin or default apps
export type AppType = {
    isAuth: boolean;
}

// storage item type
export type StorageItemType = {
    userId: string;
    token: string;
} | null;

// user/admin navbar type
export type NavbarType = {
    pageName: string;
    pageLink: string;
    NavIcon: FC;
}

// all admin panel table items types
export type ChangePagesItemType = {
    isFetching: boolean;
    deleteHandler: (id: string) => void;
}

// add/update form types
export type AddUpdateFormType = {
    header: string;
    closeForm: () => void;
}