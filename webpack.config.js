const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: ["./src/index"],
    devtool: 'source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],//hot-loader do not work with REDUX
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env", "@babel/preset-react"],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx", "*.html"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        port: 3000,
        hotOnly: true,//hot-loader do not work with REDUX
        contentBase: [path.join(__dirname, "public/")],
        watchContentBase: true,
        compress: true,
        publicPath: "/dist/"
    }
};

//"webpack": "^4.19.1",
//"webpack-dev-server": "^3.1.8"