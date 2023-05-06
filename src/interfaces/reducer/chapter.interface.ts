import { Chapter } from "../author/chapter.interface";

export interface ChapterStoreInterface {
    newChapter: Chapter,
    selectedChapter: Chapter,
}