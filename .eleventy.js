module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  const markdownIt = require("markdown-it");
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(dateObj);
  });

  eleventyConfig.addGlobalData("year", () => {
    return new Date().getFullYear();
  });

  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/*.md").reverse();
  });

  eleventyConfig.addCollection("docs", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/docs/*.md").reverse();
  });

  eleventyConfig.addCollection("ref", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/reference/*.md").reverse();
  });

  eleventyConfig.addLayoutAlias("default", "index.html");

  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlight);

  const pluginNavigation = require("@11ty/eleventy-navigation");
  eleventyConfig.addPlugin(pluginNavigation);

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
