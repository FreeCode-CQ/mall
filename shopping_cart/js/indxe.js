/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 钟建坤
 * @Date: 2019-12-13 18:02:25
 * @LastEditors  : 钟建坤
 * @LastEditTime : 2020-01-06 17:09:46
 */
// let load = null
// let 

let product = $(window).height()
    - $('.heder-new').outerHeight()
    - $('.fixed-column').outerHeight()
    - $('.index-footer').outerHeight()

let ifooter_height = $('.index-footer').outerHeight();//底部导航栏的高度

let header_2 = true //删除或结算
let ajax_items = true //是否请求到商品

$('.good-positioning').height(product);//计算购物商品中心区域的高度

$('.fixed-column').css(//计算结算或删除栏的bottom
    {
        bottom: ifooter_height + 'px'
    }
);
function calculate() {//计算商品价格
    let nu2 = []
    console.log('进入calculate计算商品价格');
    
    if ( $('.choose_new ').length != 0) {
         $('.choose_new-1').parents('.good-items').find('.g-i-2-3-1 > span').each(function (i) {
        console.log($(this).text());//获取价格
        let num_format = parseInt($(this).text())
        let add_num = $(this).parents('.good-items').find('input').val()
        nu2.push(num_format * add_num)
        // num.push(num_format)
        // num+
    })
    try {
        let sum = nu2.reduce(function (a, b) {
            return a + b;
        });
          $('.f-c-2-1-1 span').text('￥' + sum)
    } catch (error) {
        $('.f-c-2-1-1 span').text('￥' + 0)
    
    }
 }
};

function view_dom(data) {//渲染dom
    $.each(data.data, function (i, item) {
        // var str = '<div>姓名:' + item.name + '性别：' + item.sex + '</div>';
        // document.write(str);
        // console.log(item.Goods_details)
        // console.log(item)
        let htmls = `<div class="good-items" data-id=${item.good_ID}>
        <div class="g-i-1">
            <img src="${item.good_cover}" alt="">
        </div>
        <div class="g-i-2">
            <div class="g-i-2-1">
                ${item.good_name}
            </div>
            <div class="g-i-2-2">
                <span class="g-i-2-2-1">
                 ${item.good_size}
                </span>；
                <span class="g-i-2-2-2">
                ${item.good_color}
                </span>
            </div>
            <div class="g-i-2-3">
                <div class="g-i-2-3-1">
                    ￥ <span>${item.good_price}</span>
                </div>
                <div>
                    <div class="g-i-2-3-2">
                        <div class="g-i-2-3-2-span1">-</div>
                        <input type="text" value="${item.good_number}">
                        <div class="g-i-2-3-2-span3">+</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="choose" >
            <div class="choose_new"></div>
        </div>
        <div class="g-i-3" style='display:none'>
            <div class="g-i-3-1">
                <div class="g-i-3-1-1">
                    <div class="g-i-3-1-1-1">
                        <img style="width: 100%;height: 100%;" src="${item.good_cover}"
                            alt="">
                    </div>
                    <div class="g-i-3-1-1-2">
                        <!-- <div class="g-i-1-1-2-1">
                            <span>￥</span> <span>79.00</span> 
                        </div> -->
                        <div class="g-i-3-1-2-2">
                            库存${item.good_inventory}件
                        </div>
                        <!-- <div class="g-i-3-1-2-3">
                            已选
                        </div> -->

                    </div>
                    <div class="g-i-3-1-2-4">
                        <img src="./images/cross.png" alt="">
                    </div>
                </div>
                <div class="g-i-3-1-2">
                <div class="g-i-3-2-header">
                尺码
              </div>
                    ${
            item.Goods_details[0].Goods_details_size.map(item => `
              
                    <div class="g-i-3-2-s">
                        <div class="g-i-3-2-s-items ">
                            ${item}
                        </div>
                       
                    </div>
                `).join('')
            }
                    
                </div>

                <div class="g-i-3-1-2">
                <div class="g-i-3-2-header">
                   颜色
               </div>
<div class="g-i-3-3">
                ${
            item.Goods_details[0].Goods_details_color.map(item =>


                ` 
                    <div class="g-i-3-3-s-items g-i-3-flex ">
                       <img src="${item.image}" alt="">
                        <div>
                           ${item.text}
                        </div>
                    </div>
                    
                    `


            ).join('')
            }
                </div>
                </div>
            </div>
        </div>

   
</div>`
        $('.good').append(htmls)
        // console.log(htmls);
    });
}

$("body").on("click", ".g-i-2-3-2-span1", function () {//减少单个数量的事件
    let num = $(this).next().val()
    if ($(this).next().val() == 1) {
        console.log('不能小于0')
        load = new Loading('该宝贝不能减少了喔')
        // setTimeout(function () {
        //      load = null
        // } ,200)
        $(this).next().val(1)
    } else {
        $(this).next().val(num - 1)
    }
    calculate()


});
$("body").on("click", ".g-i-2-3-2-span3", function () {//增加单个数量的事件
    let num = parseInt($(this).prev().val())
    if ($(this).prev().val() == 99) {
        console.log('不能大于99')
        load = new Loading('该宝贝不能添加更多了喔')
        return
    } else {
        $(this).prev().val(num + 1)
    }
    calculate()
});

$('.header-2').click(function () {//控制删除或结算
    console.log('11')
    if (header_2 == false) {
        $('.header-2').html('管理')
        $('.f-c-2-2').html('结算')
        $('.f-c-2-2').removeClass('f-c-2-2-NEW')
        $('.f-c-2-1-1').css(
            {
                display: 'block'
            }
        )
        header_2 = true
        switch_ZJK = true

    } else if (header_2 == true) {
        $('.header-2').html('完成')
        $('.f-c-2-2').html('删除')

        $('.f-c-2-2').addClass('f-c-2-2-NEW')
        $('.f-c-2-1-1').css(
            {
                display: 'none'
            }
        )
        header_2 = false
        switch_ZJK = false

    }
});

$("body").on("click", ".choose", function () {//选中单个商品

    if ($(this).find('div')[0].className == 'choose_new') {//如果是没选中的
        $(this).find('div').addClass('choose_new-1');
        if ($('.choose_new-1').length == $('.good-items').length) {
            $('.f-c-choose_new').addClass('f-c-choose_new-1')
        };
        calculate()
    } else if ($(this).find('div')[0].className == 'choose_new choose_new-1') {//选中的
        if ($('.choose_new-1').length + 1 != $('.good-items').length) {
            $('.f-c-choose_new').removeClass('f-c-choose_new-1')
        };
        $(this).find('div').removeClass('choose_new-1');
        let num = []
        $('.choose_new-1').parent().siblings('.g-i-2').find('.g-i-2-3-1 > span').each(function (i) {
            let num_format = parseInt($(this).text());
            let add_num = $(this).parents('.good-items').find('input').val();
            num.push(num_format * add_num);
            // num.push(num_format)
            // num+
        });
        try {
            //在这里运行代码
            let sum = num.reduce(function (a, b) {
                return a + b;
            });
            $('.f-c-2-1-1 span').text('￥' + sum);
        }
        catch (err) {
            //在这里处理错误
            $('.f-c-2-1-1 span').text('￥' + 0);
            $('.f-c-choose_new').removeClass('f-c-choose_new-1');
        };
    }

});

$("body").on("click", ".g-i-3-2-s-items ", function () {//尺码的修改u

    $(this).parents('.g-i-3-1').find('.g-i-3-2-s-items').removeClass('g-i-3-2-s-items-active');
    $(this).addClass('g-i-3-2-s-items-active');
    let size = $(this).html().trim();
    $('.g-i-3-1-2-3-span2').text(size);
});

$("body").on("click", ".g-i-3-3-s-items ", function () {//颜色的修改

    $(this).siblings().removeClass('g-i-3-2-s-items-active');
    $(this).addClass('g-i-3-2-s-items-active');

    let size = $(this).text().trim();
    $(this).parents('.g-i-3').find('.g-i-3-1-2-3-span1').text(size);
});

$("body").on("click", ".g-i-3-1-2-4 ", function () {//购物车点击商品规格的X号按钮隐藏
    $(this).parents('.g-i-3').fadeToggle();
    let convenient =  $(this).siblings() 
    let convenient1 =   $(this).parents('.g-i-3').siblings('.g-i-2')
    let text1 = convenient.find('.g-i-3-1-2-3-span2').text();
    let text2 = convenient.find('.g-i-3-1-2-3-span1').text();
    // $(this).parent().parent().siblings('.g-i-2').find('.g-i-2-2-1')
    console.log($(this).parents('.g-i-3'));

    convenient1.find('.g-i-2-2-1').text(text1);
    convenient1.find('.g-i-2-2-2').text(text2);
    let html = ` <span class="g-i-2-2-1">${text1}</span>；<span class="g-i-2-2-2">${text2}</span>`
    convenient1.find('.g-i-2-2').html('');
    convenient1.find('.g-i-2-2').append(html);
})

$("body").on("click", ".g-i-3 ", function (event) {//购物车点击商品规格点击蒙层隐藏
    event.stopPropagation();
    if (event.target == event.currentTarget) {
        //执行父元素的事件;
        let text1 = $(this).find('.g-i-3-1-2-3-span2').text();
        let text2 = $(this).find('.g-i-3-1-2-3-span1').text();
        let text4 = $(this).siblings('.g-i-2').find('.g-i-2-2-2');
        $(this).siblings('.g-i-2').find('.g-i-2-2-1').text(text1);
        $(this).siblings('.g-i-2').find('.g-i-2-2-2').text(text2);
        text4.text(text2);
        //产品规格的修改
        $(this).fadeToggle();
        return
    }
});
$("body").on("click", ".g-i-2-2", function () {//弹出产品规格选中
    // $('.g-i-3').fadeToggle()
    $(this).parent().siblings('.g-i-3').fadeToggle();
    let text1 = $(this).children('.g-i-2-2-1').text();
    let text2 = $(this).children('.g-i-2-2-2').text();
    let text3 = $(this).siblings().find('.g-i-2-3-1 > span').text();
    let choose_innHtml = `
    <div class="g-i-3-1-2-3">
    已选<span class="g-i-3-1-2-3-span2"> ${text1}</span>；<span class="g-i-3-1-2-3-span1"> ${text2}</span>
</div>
    
    `;
    let choose_innHtml2 = `
    <div class="g-i-1-1-2-1">
                            <span>￥</span> <span>${text3}</span> 
                            </div>
    
    `;
    let dom_1 = $(this).parent().siblings('.g-i-3').find('.g-i-3-1-2-2');
    if ($('.g-i-3-1-2-3')) {
        $('.g-i-3-1-2-3').remove()
    };
    if ($('.g-i-1-1-2-1')) {
        $('.g-i-1-1-2-1').remove()
    };
    dom_1.after(choose_innHtml);
    dom_1.before(choose_innHtml2);

})

const Loading = (function () {//单给点击数量超出规定时
    let instance

    return function (text) {

        if (!instance) {
            instance = document.createElement('div')
            instance.innerHTML = text
            instance.id = 'err_num'
            instance.className = 'err_num'
            document.body.appendChild(instance)
            setTimeout(function () {
                $(".err_num").remove();
                instance = null
            }, 500)
        }
        return instance
    }
})();



$('body').on('click', '.f-c-choose,.f-c-1-2', function (params) {//全选或取消所有购物车商品
    console.log('11');
    
    if( $('.good-items').length == 0){
        return
    }
    if ($('.good-items').find('.choose_new').attr('class') == "choose_new choose_new-1") {
        console.log('11');
        $('.good-items').find('.choose_new').removeClass('choose_new-1');
        $('.f-c-choose_new').removeClass('f-c-choose_new-1');
        $('.f-c-2-1-1 span').text('￥' + 0);
    } else {
        $('.good-items').find('.choose_new').addClass('choose_new-1')
        $('.f-c-choose_new').addClass('f-c-choose_new-1')
        calculate()
        console.log('11');
    };

});


$('.f-c-2-2').click(function () {//处理结算或删除时的数据
    //删除
    // 1.用户点击时只是删除dom
    // 2.实际删除还是需要请求ajax更新数据，再次刷新才是修改后的数据

    //结算 默认获取商品id 
    let data_json = [] //id:选中的id，新增的数量,
    if ($('.choose_new-1').parents('.good-items').length != 0) { 
        let data_dom = $('.choose_new-1').parents('.good-items')
        data_dom.each(function (i) {
            let id = $(this).data('id')
            let num = $(this).find('.g-i-2-3-2 >input').val()
            let size = $(this).find('.g-i-2-2-1').text().trim()
            let color = $(this).find('.g-i-2-2-2').text().trim()
            let obj = {
                id,
                num,
                size,
                color
            }
            console.log(num);

            data_json.push(obj)
        })
        // data_json.push(obj)
        console.log(data_json);
    }
    console.log($('.choose_new-1').parents('.good-items').data('id'));

    if (header_2 == false) {
        console.log('删除')
        $('.good-items').each(function () {

            console.log($(this).data('id'));
            data_json.map(item => {
                if (item.id == $(this).data('id')) {
                    console.log('322');
                    $(this).remove()
                }
              
                
            })
            calculate()
            //请求ajax删除购物车

        })
        if ($('.good-items').length == 0) {
            $('.f-c-choose_new').removeClass('f-c-choose_new-1');
            switcher(false)
            calculate()
        }

    } else if (header_2 == true) {
        console.log('结算');
        if ($(' .choose_new-1').length > 0) {
            $('.pay').addClass('pay_active')
            confirm(data_json)
        }
        
    }
})

function switcher (boole) {
      if (boole) {
          $('.good_empty').hide()
          $('.good-positioning').show()
      }else{
        $('.good_empty').show()
        $('.good-positioning').hide()
      }
}
$('.backFanhui').click(function(params) {
     $('.pay').removeClass('pay_active')

})
