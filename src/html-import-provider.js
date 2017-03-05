"use strict";

const parse5 = require("parse5");
const dom5 = require("dom5");
const predicates = dom5.predicates;
const fs = require("fs");
const path = require("path");


const htmlImport = predicates.AND(
    predicates.hasTagName("link"),
    predicates.hasAttrValue("rel", "import"),
    predicates.hasAttr("href"),
    predicates.OR(
        predicates.hasAttrValue("type", "text/html"),
        predicates.hasAttrValue("type", "html"),
        predicates.NOT(predicates.hasAttr("type"))));

class HtmlImportProvider {

    getDependencies(modulePath) {
        const htmlString = fs.readFileSync(modulePath, "utf-8");
        const document = parse5.parse(htmlString);
        return dom5.queryAll(document, htmlImport)
            .map(_import => this.getHref(_import))
            .filter(href => !path.isAbsolute(href));
    }

    getHref(_import) {
        const href = _import.attrs
            .filter(attr => attr.name.toLowerCase() === "href")
            .map(attr => attr.value);

        return href.length === 1 ? href[0] : "";
    }
}

module.exports = function() {
    return new HtmlImportProvider();
};