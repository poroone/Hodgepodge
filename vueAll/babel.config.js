module.export = {
    presets: [
        "@babel/preset-env",
        '@vue/cli-plugin-babel/preset'
    ],
    Plugin: [
        "@babel/plugin-transform-runtime",
        "@vue/babel-plugin-jsx"
    ]
}