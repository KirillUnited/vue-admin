export function parseStrToDom(str) {
    const parser = new DOMParser();
    return parser.parseFromString(str, "text/html");
}
export function serializeDomToStr(dom) {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(dom);
}
export function wrapTextNodes(dom) {
    const body = dom.body;

    let textNodes = [];

    function recurse(element) {
        element.childNodes.forEach(function (node) {
            if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
                textNodes.push(node);
            } else {
                recurse(node);
            }
        });
    }

    recurse(body);

    textNodes.forEach(function (node, i) {
        const textWrapper = dom.createElement("textEditor");

        node.parentNode.replaceChild(textWrapper, node);
        textWrapper.appendChild(node);
        textWrapper.contentEditable = "true";
        textWrapper.setAttribute("nodeid", i);
    });

    return dom;
}
export function unwrapTextNodes(dom) {
    dom.body.querySelectorAll("textEditor").forEach((element) => {
        element.parentNode.replaceChild(element.firstChild, element);
    });
}