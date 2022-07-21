import { getHtmlDOM, getText } from "../../lib/http";
import { deDuplicate } from "../../lib/rule";
import { Book } from "../../main/Book";
import { mkRuleClass } from "./template";

export const dizishu1 = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector(".book-text > h1") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(".book-text > span") as HTMLElement
    ).innerText
      .replace("著", "")
      .trim(),
    introDom: document.querySelector(".intro") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl: (document.querySelector("#fengmian img") as HTMLImageElement)
      ?.src,
    aList: document.querySelectorAll("#list > .book-chapter-list .cf li > a"),
    sections: document.querySelectorAll("#list > .book-chapter-list > h3"),
    getSName: (sElem) => (sElem as HTMLElement).innerText.trim(),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
      const doc = await getHtmlDOM(chapterUrl, charset);
      return doc.querySelector(".txt") as HTMLElement;
    },
    contentPatch: (content) => content,
    overrideConstructor: (classThis) => {
      const rawBookParse = classThis.bookParse;
      classThis.bookParse = async () => {
        const book = (await Reflect.apply(rawBookParse, classThis, [])) as Book;
        const chapters = book.chapters;
        book.chapters = deDuplicate(chapters);
        return book;
      };
      return classThis;
    },
  });
