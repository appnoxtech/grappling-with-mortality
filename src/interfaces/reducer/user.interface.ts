export interface notification {
    _id: string,
    message: string,
    createdAt: number,
    bookId: string,
    bookName: string
}

export interface userStore {
    isLogin: boolean,
    userDetails: any,
    notificationList: Array<notification>
}