// both for admin or default apps
export type AppType = {
    isAuth: boolean;
}

// storage item type
export type StorageItemType = {
    userId: string;
    token: string;
} | null;