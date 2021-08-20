import "./iframe-load.js";
import { parseStrToDom, wrapTextNodes, serializeDomToStr, unwrapTextNodes } from "./dom-helper.js";
import EditText from "./EditText.js";

export default function Editor() {
    this.iframe = document.querySelector('iframe');
};

Editor.prototype = {
    open(page, cb) {
        this.currentPage = page;
        axios.get("../" + page + "?v=" + Math.random())
            .then(response => parseStrToDom(response.data))
            .then((dom) => wrapTextNodes(dom))
            .then((dom) => {
                this.virtualDom = dom;
                return dom;
            })
            .then((dom) => serializeDomToStr(dom))
            .then((html) => {
                axios.post("./api/saveTempPage.php", { html })
            })
            .then(() => this.iframe.load("../sdbdbs8979s7db97_sdv89.html"))
            .then((html) => {
                axios.post("./api/deleteTempPage.php")
            })
            .then(() => this.enableEditing())
            .then(() => this.injectStyles())
            .then(cb);
    },
    enableEditing() {
        this.iframe.contentDocument.body.querySelectorAll("textEditor").forEach((element) => {
            const id = element.getAttribute("nodeid");
            const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${id}"]`);

            new EditText(element, virtualElement);
        });
    },
    injectStyles() {
        const style = this.iframe.contentDocument.createElement("style");

        this.iframe.contentDocument.head.appendChild(style);
        style.innerHTML = `
        texteditor {
            transition: 0.6s all;
        }
        texteditor:hover {
            display: inline-block;
            transform: scale(1.2);
        }
        texteditor:focus {
            outline: 1px solid red;
            outline-offset: 4px;
            transform: scale(1);
        }
        `;
    },
    onTextEdit(element) {
        const id = element.getAttribute("nodeid");

        this.virtualDom.body.querySelector(`[nodeid="${id}"]`).innerHTML = element.innerHTML;
    },
    save(onSuccess, onFailure) {
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        unwrapTextNodes(newDom);
        const html = serializeDomToStr(newDom);
        axios.post("./api/savePage.php", { pageName: this.currentPage, html })
            .then(() => onSuccess())
            .catch(() => onFailure());
    }
}