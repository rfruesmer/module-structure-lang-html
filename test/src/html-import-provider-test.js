const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const assert = require("chai").assert;
const path = require("path");

const HtmlImportProvider = require("../../src/html-import-provider");

describe("html-import-provider", function() {

    let rootPath ="";
    let htmlFile = "";
    let actualDependencies = "";
    let htmlImportProvider;
    let expectedDependencies;


    it("parses index.html imports", function() {
        givenRootPath();
        givenIndexHtml();
        whenGettingDependencies();
        thenDependenciesShouldMatchExpectedDependencies();
    });

    function givenRootPath() {
        rootPath = path.join(__dirname, "..", "resources");
    }

    function givenIndexHtml() {
        htmlFile = path.join(rootPath, "index.html");
        expectedDependencies = ["package-a/stuff-a.html", "package-b/stuff-b.html"]
    }

    function whenGettingDependencies() {
        htmlImportProvider = new HtmlImportProvider();
        actualDependencies = htmlImportProvider.getDependencies(htmlFile, rootPath);
    }

    function thenDependenciesShouldMatchExpectedDependencies() {
        assert.deepEqual(actualDependencies, expectedDependencies);
    }

    it("parses stuff-a.html imports", function() {
        givenRootPath();
        givenStuffAHtml();
        whenGettingDependencies();
        thenDependenciesShouldMatchExpectedDependencies();
    });

    function givenStuffAHtml() {
        htmlFile = path.join(rootPath, "package-a", "stuff-a.html");
        expectedDependencies = ["../package-b/stuff-b.html"]
    }

    it("parses stuff-b.html imports", function() {
        givenRootPath();
        givenStuffBHtml();
        whenGettingDependencies();
        thenDependenciesShouldMatchExpectedDependencies();
    });

    function givenStuffBHtml() {
        htmlFile = path.join(rootPath, "package-b", "stuff-b.html");
        expectedDependencies = []
    }
});
