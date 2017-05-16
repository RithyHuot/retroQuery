module.exports = {
  entry: {
    lib: "./lib/main.js",
    js : "./js/main.js"
  },
  output: {
    path: __dirname,
    filename: "./lib/[name].rQuery.js"
	},
	devtool: "source-map"
};
