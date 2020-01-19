/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 钟建坤
 * @Date: 2019-12-18 16:46:05
 * @LastEditors  : 钟建坤
 * @LastEditTime : 2020-01-16 18:29:23
 */
//请求接口文件


let data2 = []
function ajax_data() {//请求全部数据并渲染
    $.ajax({
        url: "./data.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //使用$.each方法遍历返回的数据date,插入到id为#result中
            console.log(data)
            data2 = data
            if (data.data != [] && data.data.length != 0) {

                view_dom(data)
                switcher(true)
                //  confirm(data)    
            } else {
                switcher(false)
            }

            // if (da) {

            // }


        },

    });
}
ajax_data()
function confirm(purchase) {
    console.log(data2)
    let arr = []
    if (purchase) {
        data2.data.map((item, index) => {
            purchase.map((itme_x, index_x) => {
                if (item.good_ID == itme_x.id) {
                    arr.push(item)
                }
            })

        })
        $('.pay-gs').empty()
        console.log(arr)
    }

    arr.map(item => {
        let good_size = undefined;    //尺寸
        let good_name = undefined;  //产品名称
        let good_color = undefined; //产品名称
        let good_cover = undefined; //产品封面
        let good_price = undefined; //产品价格
        let good_number = undefined //产品数量
        let good_inventory = undefined //产品库存
        console.log(item)
        goods_size = item.goods_size
        if (item.good_size) {
            good_size = `
            <div class="p-c-2-list">
              
            尺寸<span>${item.good_size}</span>
        </div>
            `
            console.log(good_size)
        }

        if (item.good_name) {
            good_name = `<div class="pay-content-1">
            ${item.good_name}
            </div>`
            console.log(good_name)
        }
        if (item.good_color) {
            good_color = ` <div class="p-c-2-list">
            颜色<span>${item.good_color}</span>
        </div>`
            console.log(good_color)
        }
        if (item.good_cover) {
            good_cover = ` <div class="pay-image">
            <img src="${item.good_cover}" alt="">
        </div>`

            console.log(good_cover);
        }
        if (item.good_price) {
            console.log(item.good_price)
            good_price = item.good_price
            console.log(good_price);


        }
        if (item.good_number) {
            console.log(item.good_number)
            good_number = item.good_number
            console.log(good_number)
        }
        if (item.good_inventory) {

            good_inventory = item.good_inventory
            console.log(good_inventory)

        }


        // console.log(good_inventory)
        let str = `
        <div class="pay-goods-items">

       ${good_cover}
        <div class="pay-content">

            ${good_name}
            <div class="pay-content-2">
            
               ${good_size}
               ${good_color}
                <div class="p-c-2-list">
                    规格<span>50*50</span>
                </div>
            </div>
            <div class="pay-In-distribution">
                <div class="pay-In-d-1">
                    <div class="pay-In-d-1-1">配送方式</div>
                    <div class="pay-In-d-1-2">普通配送</div>
                </div>
                <div class="pay-In-d-2">
                    <img src="./images/left-arrow .png" alt="">
                </div>
            </div>
        </div>
        <div class="pay-price-num">
            <div class="pay-p-n-peice">${ good_price}</div>
            <div class="pay-p-n-num">x ${good_number}</div>
        </div>
    </div>
        `
        $('.pay-gs').append(str)
        console.log(str)
    })
}

