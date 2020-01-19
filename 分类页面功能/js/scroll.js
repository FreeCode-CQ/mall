/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 钟建坤
 * @Date: 2019-12-06 14:22:25
 * @LastEditors  : 钟建坤
 * @LastEditTime : 2020-01-16 17:23:56
 */
//不可修改！！！！
// window.onload = function (params) {
function active_tab(index) {//分类栏点击函数
    scroll_array.map(item => {
        if (index == item.index) {
            $(".right-sidebar").animate({
                scrollTop: item.scroll+'px'
            })
        }
    })
}
$('.right-sidebar').on('scroll', function (ev) {//监听滚动左产品栏了多少改变active
    let Listening = $('.right-sidebar').scrollTop()
    console.log(Listening);
    console.log($('.ZJK_sorll_2').scrollTop());
   
    scroll_array.map(item => active = Listening >= item.scroll ? item.index : active)
    $('.left-sidebar > div').removeClass("active");
    $(".left-sidebar>div").eq(active).addClass("active")
});
// }
