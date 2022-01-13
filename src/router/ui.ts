import { sleep } from "../lib/misc";

interface UIObject {
  type: "jump" | "download" | "error";
  jumpFunction?: () => void;
}
const defaultObject: UIObject = {
  type: "download",
};
const errorObject: UIObject = {
  type: "error",
};
export function getUI(): () => UIObject {
  const host: string = document.location.host;
  switch (host) {
    case "wap.shuquge.com": {
      return () => {
        const id = /(\d+)\.html$/.exec(document.location.pathname)?.[1];
        if (!id) {
          return errorObject;
        }
        return {
          type: "jump",
          jumpFunction() {
            document.location.href = `https://www.shuquge.com/txt/${id}/index.html`;
          },
        };
      };
    }
    case "m.xinwanben.com": {
      return () => ({
        type: "jump",
        jumpFunction() {
          document.location.host = "www.xinwanben.com";
        },
      });
    }
    case "www.tadu.com": {
      return () => {
        const re = /^\/book\/\d+\/?$/;
        if (re.test(document.location.pathname)) {
          return defaultObject;
        }
        return errorObject;
      };
    }
    case "www.kanunu8.com": {
      return () => {
        if (
          document.body.innerHTML.includes("作者：") ||
          document.body.innerHTML.includes("作者:") ||
          document.body.innerHTML.includes("内容简介")
        ) {
          return defaultObject;
        }
        return errorObject;
      };
    }
    case "www.ciyuanji.com": {
      return () => {
        if (document.location.pathname === "/bookDetails/info") {
          return {
            type: "jump",
            jumpFunction: () =>
              (document.location.pathname = "/bookDetails/catalog"),
          };
        }
        return defaultObject;
      };
    }
    case "ebook.longmabook.com":
    case "www.longmabookcn.com":
    case "ebook.lmbooks.com":
    case "www.lmebooks.com":
    case "www.haitbook.com":
    case "www.htwhbook.com":
    case "www.myhtebook.com":
    case "www.lovehtbooks.com":
    case "www.myhtebooks.com":
    case "www.myhtlmebook.com":
    case "jp.myhtebook.com":
    case "jp.myhtlmebook.com":
    case "ebook.urhtbooks.com":
    case "www.urhtbooks.com":
    case "www.newhtbook.com":
    case "www.lvhtebook.com":
    case "jp.lvhtebook.com":
    case "www.htlvbooks.com": {
      return () => {
        const params = new URLSearchParams(document.location.search);
        if (
          params.get("act") === "showinfo" &&
          params.has("bookwritercode") &&
          params.has("bookid")
        ) {
          return defaultObject;
        }
        return errorObject;
      };
    }
    case "m.sfacg.com": {
      return () => {
        const bookId = /(\d+)\/?$/.exec(document.location.pathname)?.[1];
        if (bookId) {
          return {
            type: "jump",
            jumpFunction: () =>
              (document.location.href = `https://book.sfacg.com/Novel/${bookId}/MainIndex/`),
          };
        } else {
          return errorObject;
        }
      };
    }
    case "book.sfacg.com": {
      return () => {
        const jump = /^\/Novel\/\d+\/?$/.test(document.location.pathname);
        if (jump) {
          const bookId = /(\d+)\/?$/.exec(document.location.pathname)?.[1];
          if (bookId) {
            return {
              type: "jump",
              jumpFunction: () =>
                (document.location.href = `https://book.sfacg.com/Novel/${bookId}/MainIndex/`),
            };
          } else {
            return errorObject;
          }
        } else {
          return defaultObject;
        }
      };
    }
    case "www.ciweimao.com": {
      return () => {
        const jump = /^\/book\/\d+\/?$/.test(document.location.pathname);
        if (jump) {
          const bookId = /(\d+)\/?$/.exec(document.location.pathname)?.[1];
          if (bookId) {
            return {
              type: "jump",
              jumpFunction: () =>
                (document.location.href = `https://www.ciweimao.com/chapter-list/${bookId}/book_detail`),
            };
          } else {
            return errorObject;
          }
        } else {
          return defaultObject;
        }
      };
    }
    case "m.lusetxt.com": {
      return () => ({
        type: "jump",
        jumpFunction: () => (document.location.host = "www.lusetxt.com"),
      });
    }
    case "manhua.dmzj.com":
    case "www.dmzj.com": {
      return () => {
        // remove ad
        window.addEventListener("load", async () => {
          await sleep(300);
          document
            .querySelectorAll('*[style*="2147483647;"]')
            .forEach((elem) => elem.remove());
        });

        return defaultObject;
      };
    }
    case "www.cool18.com": {
      return () => {
        const url = new URL(document.location.href);
        if (
          url.searchParams.get("act") === "threadview" &&
          url.searchParams.has("tid")
        ) {
          return defaultObject;
        } else {
          return errorObject;
        }
      };
    }
    default: {
      return () => defaultObject;
    }
  }
}
