const getConfig = require("vuepress-bar");

module.exports = {
  title: "Protocol Designer",
  description: "Web app for creating Opentrons protocols",
  themeConfig: {
    ...getConfig(`${__dirname}/..`),
  },
};
