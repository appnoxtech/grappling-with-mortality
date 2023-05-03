import { AudioStore } from "./audioStore.interface";
import { AuthStoreInterface } from "./authStore.Interface";
import { AuthorStoreInterface } from "./authorStore.interface";
import { ChapterStoreInterface } from "./chapter.interface";
import { CommonStoreInterface } from "./commonStore.interface";
import { userStore } from "./user.interface";

export interface store {
    user: userStore,
    authDetails: AuthStoreInterface,
    author: AuthorStoreInterface,
    common: CommonStoreInterface,
    chapter: ChapterStoreInterface
    audio: AudioStore
}