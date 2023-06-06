export type BookStatusEnum = 'PENDING' | 'REJECTED' | 'PUBLISHED';

export interface pendingBookDataInterface {
   bookId: string,
   publishStatus: 'PENDING' | 'REJECTED' | 'PUBLISHED',
   reason?: string,
}

export interface RebublishBookInterfce {
   bookId: string,
}