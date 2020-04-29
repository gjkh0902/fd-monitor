/**
 * You may use special comments to disable some warnings.
 * Use eslint-disable-next-line to ignore the next line.
 * Use eslint-disable  to ignore all warnings in a file.
 */

// en:http://eslint.org/docs/user-guide/configuring
// cn:https://cn.eslint.org/docs/rules/
module.exports = {
    root: false,
    // 设置解析器选项
    parserOptions: {
        // "ecmaVersion": 6, //启用 ES6 语法支持
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    // 指定代码运行的环境
    env: {
        browser: true
    },
    // 指定eslint规范
    extends: [
        'plugin:vue/base',
        // "plugin:prettier/recommended",
        'prettier/vue'
    ],

    // 引用第三方的插件
    plugins: ['vue', 'prettier'],

    // 自定义规则（或者覆盖指定eslint规范中的规则）
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-shadow-restricted-names': 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
        'no-duplicate-imports': 2, // 禁止重复导入，即要求单个模块中的所有导入都存在于单个import语句中。
        'no-unused-vars': 2, // 禁止未使用的变量
        'no-redeclare': 2, // 禁止变量重新声明
        'no-dupe-args': 1, // 禁止function定义中的重复参数
        'no-empty': 1, // 禁止空块语句
        'no-extra-semi': 2, // 禁止不必要的分号
        'no-extra-boolean-cast': 1, // 禁止不必要的布尔强制转换
        'no-useless-escape': 1, // 禁止不必要的转义用法
        'no-regex-spaces': 1, // 禁止正则表达式文字中的多个空格
        'no-var': 1, // 使用 let 或 const 而不是 var
        'use-isnan': 1, // 使用Number.isNaN()或全局isNaN()函数来测试值是否为NaN
        'no-lonely-if': 1, // 禁止 if 作为唯一的语句出现在 else 语句中
        'no-unused-expressions': 1, // 禁止未使用的表达式

        // vue  module
        'vue/require-v-for-key': 2, // 需要v-bind:key用v-for指令
        'vue/no-use-v-if-with-v-for': 2, // 禁止在与v-for相同的元素上使用v-if
        'vue/no-unused-vars': 2, // 禁止使用v-for指令或范围属性的未使用的变量定义
        'vue/prop-name-casing': [1, 'camelCase'], // 要求prop变量小写驼峰
        'vue/no-unused-components': 2, // 禁止注册模板内未使用的组件
        'vue/no-duplicate-attributes': 2, // 禁止重复属性
        'vue/v-on-style': [1, 'shorthand'], // 使用@代替v-on指令
        'vue/v-bind-style': [1, 'shorthand'], // 使用：绑定代替v-bind指令
        'vue/return-in-computed-property': [
            // 在计算属性中必须存在return语句
            2,
            {
                treatUndefinedAsUnspecified: true
            }
        ],
        'vue/component-name-in-template-casing': [
            // 模板中的组件命名样式强制使用大写驼峰
            2,
            'kebab-case',
            {
                ignores: []
            }
        ],
        'vue/no-reserved-keys': [
            // 禁止覆盖保留字
            2,
            {
                reserved: [
                    'date',
                    'root',
                    '$data',
                    '$props',
                    '$el',
                    '$options',
                    '$parent',
                    '$root',
                    '$children',
                    '$slots',
                    '$scopedSlots',
                    '$refs',
                    '$isServer',
                    '$attrs',
                    '$listeners',
                    '$watch',
                    '$set',
                    '$delete',
                    '$on',
                    '$once',
                    '$off',
                    '$emit',
                    '$mount',
                    '$forceUpdate',
                    '$nextTick',
                    '$destroy'
                ],
                groups: []
            }
        ]
    }
}