/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 钟建坤
 * @Date: 2019-12-06 14:06:14
 * @LastEditors  : 钟建坤
 * @LastEditTime : 2020-01-16 17:21:15
 */

//不可修改
// window.onload = function (params) {
    function getQueryString(name){ //获得跳转参数
        var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return decodeURIComponent(r[2]); 
        }
        return '';
    
    }
    
    console.log(getQueryString('id'))
    let equipment = $(window).height();
    let right_ov = equipment - 57 - 66
    let active = 0 //什么时候会被改变？ 1.自动监听了左产品栏时的scroll滚动就自己改变
  
    $('.right-sidebar').css('height', right_ov + 'px')
    $(window).resize(function () {
        equipment = $(window).height();
        right_ov = equipment - 57 - 66;
        $('.right-sidebar').css('height', right_ov + 'px')
    })
    //计算滚动距离
    $(".left-sidebar>div").eq(active).addClass("active")
    $(".right-sidebar").scrollTop(0);
    
    let right_sidebar = $(".right-sidebar").children('div')
    
    
    $(".right-sidebar >div").each(function (i) {//设置class
    
        $(this).addClass('ZJK_sorll_' + (i + 1))
    
    })
    
    let dom_height = []//获取需要被获取的dom的高 第一步
    let arr4 = []//对象解析出来.一个一个叠加 第二步
    let arr5 = []//叠加后相加 第三步
    let scroll_array = []//<这个js写这么多只为生成这个 < 数组 arr相加完后得出数组并给scroll调用  第四步
    
    $(".right-sidebar >div").each(function (i) {//获取到高右侧栏目高
        let obj = {}
        // console.log($(this))
        // console.log($(this).height())
        obj.height = $(this).height()
        dom_height.push(obj)
        
    })
    console.log(dom_height)
    for (let i = 0; i < dom_height.length; i++) {
        var arr3 = []
        let slice = dom_height.slice(0, i)//[1,2],[1,2,3],[1,2,3,4]....
        slice.map(i => {//每获取一次push
            arr3.push(i.height)
        })
        arr4.push(arr3)
    }
    // let arr5 = []
    arr4.map(items => {
        // console.log(items);
        let arr = 0
        items.reduce((a, b) => {
            arr += b
            // console.log(arr)
    
        }, 0)
        arr5.push(arr)
    })
    arr5.forEach((element, i) => {
        // console.log(element)
        let obj = {}
        obj.scroll = element + 20 * i
        obj.index = i
        scroll_array.push(obj)
    });
    console.log(scroll_array)
    
    
    $(".left-sidebar >div ").on("click",function(){
        var curli = $(this).index()
    
        active_tab(curli)
    });
    if (getQueryString('id') != undefined) {
       
        active = getQueryString('id')
         console.log(active)
        active_tab(active)
    }
      




