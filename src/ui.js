
PE.ui = (function() {

    // 切换复选框状态
    var _toggleCheckbox = function(target) {

        var state = this.getAttribute('data-value')

        if (state === 'checked') {
            
            this.removeAttribute('data-value', '')

        } else {

            this.setAttribute('data-value', 'checked')
        }
    }

    // 绑定事件
    var bindEvents = function() {

        // 复选框点击事件
        $('.checkbox').live('click', function(e) {

            _toggleCheckbox(this)

            e.preventDefault()
        })

        // 下拉列表点击事件
        $('.select').live('click', function(e) {

            var list = this.querySelector('.select-list')

            if (list.style.display === 'none') {

                list.style.display = 'block'

            } else {

                list.style.display = 'none'
            }

            e.preventDefault()
        })

        // 下拉列表项点击事件
        $('.select-list li').live('click', function(e) {

            var target = $(this)

            var text = target.html()
            var id = target.attr('data-id')
            var select = target.parent()
                .parent()
                .parent()
                .parent()

            target.parent()
                .find('.select-list-value')
                .removeClass('select-list-value')

            select.find('.select-value')
                .html(text)
                
            select.attr('data-id', id)

            $(this).addClass('select-list-value')
        })
    }

    ! function() {

        bindEvents()

    } ()

    return bindEvents

}) ()



/**
 * 2015.8.10
 * 重构了ui文件，将所有代码挂在PE.ui下，通过自运行函数初始化
 * 重构了select的click事件
 * 
 */