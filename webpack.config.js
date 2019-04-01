const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

module.exports = function(env, options) {
    const isProd = (env && env.production) || options.mode === 'production';
    const cfg = {
        entry: ["./src/index"],
        plugins: [],
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
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ["css-loader", "sass-loader"]
                    })
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
            publicPath: "",
            filename: 'bundle.[hash].js'
        }
    };

    deleteFolderRecursive('dist');
    if (isProd) {
        cfg.plugins.push(new ExtractTextPlugin('style.[hash].css'));
        cfg.plugins.push(new HtmlWebpackPlugin());
        cfg.output = {
            path: path.resolve(__dirname, "dist/"),
            publicPath: "",
            filename: 'bundle.[hash].js'
        }
    } else {
        cfg.devtool = 'source-map';
        cfg.plugins.push(new ExtractTextPlugin('style.css'));
        cfg.plugins.push(new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            hash: true
        }));
        cfg.plugins.push(new HtmlWebpackHarddiskPlugin());
        cfg.output = {
            path: path.resolve(__dirname, "dist/"), // index.html location
            publicPath: "../dist/",
            filename: 'bundle.js'
        };
        cfg.devServer = {
            port: 1000,
            hotOnly: true,
            contentBase: [path.join(__dirname, "dist/")], // index.html location
            watchContentBase: true,
            compress: true,
            publicPath: "/dist/"
        };
    }

    return cfg;
};