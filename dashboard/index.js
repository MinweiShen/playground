'use strict';

$(function(){
    $('.category').click(function(){
        $(this).parent().find('.item-list').toggleClass('item-list--hidden');
    });

    $('.menu .item').click(function(){
        $('.menu .item--selected').removeClass('item--selected');
        $(this).addClass('item--selected');
    });

    $('.menu-toggler').click(function(){
        $('.sidebar').toggleClass('sidebar--hidden');
    });
});