
!function() {

    function _toggleCheckbox($this) {
        if ($this.attr('data-value') === 'checked') {
            $this.attr('data-value', '')

        } else {
            $this.attr('data-value', 'checked')
        }
    }
    
    $('.checkbox').live('click', function(e) {
        _toggleCheckbox($(this))

        e.preventDefault()
    })

    $('.select').live('click', function(e) {

        var list = $(this).find('.select-list')

        if (list.css('display') == 'none') {
            list.show()

            $(this).addClass('dropdown-selected')

        } else {

            $(this).attr('style', '')
            list.hide()
            $(this).removeClass('dropdown-selected')
        }

        e.preventDefault();

    });


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

}()
