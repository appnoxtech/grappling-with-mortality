export type BookStatusEnum = 'PENDING' | 'REJECTED' | 'PUBLISHED' | 'ISBN-PENDING' | 'ISBN-VERIFIED';

export interface pendingBookDataInterface {
   bookId: string,
   publishStatus: 'PENDING' | 'REJECTED' | 'PUBLISHED' | 'ISBN-PENDING' | 'ISBN-VERIFIED',
   reason?: string,
}

export interface RebublishBookInterfce {
   bookId: string,
}