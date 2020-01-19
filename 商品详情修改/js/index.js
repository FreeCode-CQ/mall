/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 钟建坤
 * @Date: 2019-12-09 11:10:12
 * @LastEditors  : 钟建坤
 * @LastEditTime : 2020-01-19 17:10:16
 */
let WH = $(window).height()
let windowHeight = $(window).height() / 3//获取屏幕高度
let product_device = $('.device').offset().top//获取宝贝的top
let product_detail = $('.product-detail').offset().top //获取评价的top
let product_images = $('.product-images').offset().top //获取宝贝详情的top
let product_recommended = $('.product-recommended').offset().top //获取推荐的top
let start_0 = -1 //描述相符 默认4满分 3:好 2:一般 0 非常差
let start_1 = -1 //送货态度 默认4满分  3:好 2:一般 0 非常差
let start_2 = -1 //服务态度 默认4满分 3:好 2:一般 0 非常差
// left
$('.comments').css('height', WH + 'px')
$('.c-release').css('height', WH - 44 - 60 + 'px')
$('.insert-dom').css('height', WH - 44 - 60-70 + 'px')
$('.comments-position').css('height', WH + 'px')
$(window).resize(function () {
    WH = $(window).height()
    windowHeight = $(window).height() / 3
    product_device =    
    product_detail = $('.product-detail').offset().top
    product_images = $('.product-images').offset().top
    $('.comments').css('height', WH + 'px')
    $('.c-release').css('height', WH - 44 - 60-51 + 'px')
    $('.insert-dom').css('height', WH - 44 -60-70 + 'px')
    $('.comments-position').css('height', WH + 'px')
    $('.comments-position').css('height', WH + 'px')
})

let User_buy = 1  //1 已购买 可以开始评论 ，0未购买，无法评论
if (User_buy == 0) {

    $('.c-f-input input').attr({ 'disabled': 'true' })
    $('.c-f-input input').attr({ 'placeholder': '未购买，无法评论' })
    $('.c-f-input input').css({ 'background': '#ccc' })
    $('.c-f-btn ').css({ 'background': '#ccc' })
    $('.c-f-btn ').css({ 'color': '#fff' })
} else if (User_buy == 1) {
    $('.c-f-input input').removeAttr('disabled')
    $('.c-f-input input').css({ 'background': '#fff' })
    $('.c-f-input input').attr({ 'placeholder': '点击开始评论' })
    $('.c-f-btn ').css({ 'background': '#fff' })
    $('.c-f-btn ').css({ 'color': 'black' })
}

$('.p-d-e-1-2-text').click(function () {
    console.log('11');
    $('.comments').addClass('comments_active')
    $('body').css('height', WH + 'px')
    $('body').css('overflow', 'hidden')
})

$('.c-h-right').click(function () {
    $('.comments').removeClass('comments_active')
    $('body').css('height', WH + 'px')
    $('body').css('overflow', 'inherit')
})

$(window).on('scroll', function (ev) {


    let Device = $(window).scrollTop()
    console.log(Device)
    if (Device >= windowHeight) {
        $('.header').fadeOut()
        $('.header-1').fadeIn()

    } else if (Device <= windowHeight) {
        $('.header').fadeIn()
        $('.header-1').fadeOut()
    }
    if (Device >= product_device) {
        active_ZJK(0)
    }
    if (Device >=product_detail- 60) {
        active_ZJK(1)
    }
    if (Device >= product_images- 60) {
        active_ZJK(2)
    }
    if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
        active_ZJK(3)
    }
})
function  active_ZJK(id) {
    console.log(id);
    
    $('.header-info-items ').removeClass("header-active");
    $(".header-info-items ").eq(id).addClass("header-active")
    // $(".header-info-items > div").eq(id).addClass("header-info-active")
   
}

function active_Highlighted(id) {

    $('.header-info-items ').removeClass("header-active");
    $(".header-info-items ").eq(id).addClass("header-active")
    // $(".header-info-items > div").eq(id).addClass("header-info-active")
    

    if (id == 0) {
        $(window).scrollTop(product_device)
    } else if (id == 1) {
        $(window).scrollTop(product_detail - 40)
    } else if (id == 2) {
        $(window).scrollTop(product_images - 40)
    } else if (id == 3) {
        $(window).scrollTop(product_recommended - 40)
    }

}
function comments_active(id) {
    
    $('.c-d-e-2-item').removeClass("comments-active");
    $(".c-d-e-2-item").eq(id).addClass("comments-active")

}
$('.Reduction').click(function () {
    console.log('11');
    let input_number =  $('.input_number')
    if (input_number.val() == 1) {
         alert('不能再减少了喔')
         return 
    }
    let num = Number(input_number.val()) - 1

    console.log(num)
    input_number.val(num)
});
$('.add').click(function () {
    console.log('11');
    let input_number =  $('.input_number')
    let num = Number(input_number.val()) + 1
    console.log(num)
    input_number.val(num)
});

$('.shopping_choose_li').click(function () {
     $(this).addClass('on_shopping').siblings().removeClass('on_shopping')
});
// $('.shopping_down','.add_shopping_cart').on('click',function (params) {
//     console.log('1')
//       $('.add_shopping_cart').hide()
// })
$(document).on("click",".shopping_down>img , .add_shopping_cart", function(e){
     console.log(e.target)
    //  console.l
    if (e.target == e.currentTarget){//防止父元素覆盖资源的绑定事件操作
        // $('.add_shopping_cart').hide()
        // $('.add_shopping_cart').animate({background:'none'},0)
        $('.add_shopping_cart').css({
            background:'none'
        })
        $('.add_shopping_cart').animate({top:'10000px'},1000);
	}
   
 
})
$('.btn1').click(function () {
    $('.add_shopping_cart').animate({top:'0'},500);
})
// $('.btn1').click()