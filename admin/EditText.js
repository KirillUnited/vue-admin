export default function EditText(element, virtualElement) {
    this.element = element;
    this.virtualElement = virtualElement;
    //bind events
    this.element.addEventListener("click", this.onClick.bind(this));
    if (this.element.parentNode.nodeName === "A" || this.element.parentNode.nodeName === "BUTTON") this.element.addEventListener("contextmenu", this.onCtxMenu.bind(this));
    this.element.addEventListener("blur", this.onBlur.bind(this));
    this.element.addEventListener("input", this.onTextEdit.bind(this));
    this.element.addEventListener("keypress", this.onKeypress.bind(this));
}

EditText.prototype = {
    onClick() {
        this.element.contentEditable = true;
        this.element.focus();
    },
    onCtxMenu(e) {
        e.preventDefault();
        this.onClick();
    },
    onBlur() {
        this.element.removeAttribute("contentEditable");
    },
    onKeypress(e) {
        if (e.keyCode === 13) {
            this.element.blur();
        }
    },
    onTextEdit() {
        this.virtualElement.innerHTML = this.element.innerHTML;
    }
}