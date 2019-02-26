require(["config"],function(){
	require(["jquery","template","load","cookie"],function($,template){//依赖jquery return的jQuery函数作为回调函数的参数
		function List(){
				this.loadf4pro();
				this.addListener();
				$.cookie.json = true;
			}
			$.extend(List.prototype,{
				//加载数据
				loadf4pro(){
					$.getJSON("http://rap2api.taobao.org/app/mock/120495/api/list.html",(data)=>{						
						const html=template("list_template",{products:data.res_body.list});						
						$("#mostlist").append(html);
					});
				},
				
				//加购物车
				addListener(){						
				$("div.most_list").on("click",".add_car",this.addToCartHandler);//事件捕获
				$("div.most_list").on("click",".buynow",this.addToCartHandler)
								
				},
			//加入购物车处理
			addToCartHandler(){
				const $parent=$(this).parents(".products");					
				const currentProduct={
					id:$parent.find("div.id").text(),
					price:$parent.find(".pro_price span").text(),
					title:$parent.find(".pro_desc").text(),					
					img:$parent.find(".pro_img a img").attr("src"),
					size:$parent.find("div.size").text(),
					amount:1
				};									
				
				// 获取在 cookie 中已保存的购物车数组
				const cart=$.cookie("cart")||[];
				// 判断在 cart 数组中是否存在当前选购的商品对象
				const has=cart.some(curr=>{
					
					if(curr.id==currentProduct.id){
						curr.amount++;//如果出现过数量＋1
						return true;
					}
					console.log(curr.amount)
					return false;
				});
				//如未加过就加到购物车数组中
				if(!has){
					cart.push(currentProduct);
					$.cookie("cart",cart,{expires:7,path:"/"});//保存数据到cookie中,路径一般为根目录
					
				};
				
			}
			});
			new List();
	});
});