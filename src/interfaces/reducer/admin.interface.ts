export interface user {
   _id: string,
   fullName: string,
   email: string,
   userType: string,
   createdAt: number,
   image?: string
}

export interface AdminStore {
    userList: Array<user>,
    authorList: Array<user>
}