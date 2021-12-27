import { SaveOptions } from "../save/save";
import { AttachmentClass } from "./Attachment";
import { Chapter } from "./Chapter";
export interface BookAdditionalMetadate {
    cover?: AttachmentClass;
    attachments?: AttachmentClass[];
    tags?: string[];
    lastModified?: number;
    serires?: string;
    seriresNumber?: number;
    ids?: string[] | string;
    publisher?: string;
    languages?: string;
}
export declare class Book {
    private _bookUrl;
    private _ToCUrl?;
    bookname: string;
    author: string;
    introduction: string | null;
    introductionHTML: HTMLElement | null;
    additionalMetadate: BookAdditionalMetadate;
    chapters: Chapter[];
    saveOptions: SaveOptions;
    constructor(bookUrl: string, bookname: string, author: string, introduction: string | null, introductionHTML: HTMLElement | null, additionalMetadate: BookAdditionalMetadate, chapters: Chapter[]);
    set bookUrl(v: string);
    get bookUrl(): string;
    set ToCUrl(v: string | undefined);
    get ToCUrl(): string | undefined;
    private toJSON;
}
