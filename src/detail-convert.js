
'use strict'

/**
 * @name  detail-convert.js
 * @description  数据的转换
 * @author  sunken
 * @date 2015.7.15
 */
define(function(require, exports) {

    const MINE_TYPE = {

        'text/csv': 'csv',
        'application/json': 'json'
    }

    // csv文件类
    function Csv() {

        this.text = null
        this.convert = function() {

            // 先按换行符分割
            var text = this.text.split('%0D')

            // 把第一列当作表头，生成json
            var json = []
            var keys = []

            // 获取表头
            text[0].split(',').forEach(function(v) {

                keys.push(v)
            })

            text.shift()
            text.forEach(function(v, i) {

                var obj = {}

                // 将每一行解码，再按逗号分割
                text[i] = decodeURI(v).split(',')
                // 遍历每一行，用遍历时的下标去keys中匹配列名，写入obj
                text[i].forEach(function(v, i) {

                    obj[keys[i]] = v
                })

                // 将obj追加到json数组中
                json.push(obj)
            })

            return json
        }
    }

    // json文件类
    function Json() {

        this.text = null
        this.convert = function() {

            return JSON.parse(this.text)
        }
    }

    // 多态实现
    function fileConverter(obj) {

        if (obj.convert instanceof Function) {

            return obj.convert()
        }
    }

    exports.format = function(text, type) {

        text = encodeURI(text)
        // 按照mine type取出文件类型，并进行首字母大写转换
        type = MINE_TYPE[type]
        type = type[0].toUpperCase() + type.substring(1)

        // 根据type调用不同类的初始化，obj是类的实例对象
        var obj = eval('new ' + type)

        obj.text = text

        return fileConverter(obj)
    }
})

// *.csv   text/csv
// *.doc   application/msword
// *.gif   image/gif
// *.htm   text/html
// *.html  text/html
// *.jpeg  image/jpeg  JPEG
// *.jpg   image/jpeg  JPEG
// *.json  application/json
// *.png   image/png