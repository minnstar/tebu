require(["config"],function(){
	require(["jquery","template","cookie","load","zoom"],function($, template){//依赖jquery return的jQuery函数作为回调函数的参数
		//构造函数
		function Product(){	
		
			this.getList();	
			this.addListener();
			// 配置 cookie 自动在JS值与JSON值之间转换
			$.cookie.json = true;
		}
		//原型添加方法
		$.extend(Product.prototype,{
			getList(){				
				const _id=location.search.slice(location.search.lastIndexOf("=")+1);
				//console.log(_id);
				const url=`http://rap2api.taobao.org/app/mock/120495/api/product?id=`+_id;
				$.getJSON(url,(data)=>{					
					const {id,title,price,comments,sales,points,size,zoomImgs}=data.res_body;
					const html=template("product-template",{"id":id,"title":title,"price":price,"comments":comments,"sales":sales,"points":points,"size":size,"zoomImgs":zoomImgs});
					
					$("div.content").prepend(html);
					// 放大镜
					$(".zoom-img").elevateZoom({
						gallery:'gal1',
						cursor: 'pointer',
						galleryActiveClass: 'active'						
					}); 
				})
			},
			//添加事件监听 加入购物车
			addListener(){										
				$(".content").on("click",".min",this.modifyAmountHandler);//数量减
				$(".content").on("click",".max",this.modifyAmountHandler);//数量加
				$(".content").on("blur",".inputamount",this.modifyAmountHandler);//修改文本				
				$(".content").on("click",".add_car",this.addToCartHandler);	//事件捕获 加入购物车
				$(".content").on("click",".buynow",this.addToCartHandler);	
			},
			//数量加减
			modifyAmountHandler(event){
				const $src=$(event.target);
				var $inputamount=$(".inputamount").val();							
				if($src.is(".max")){//＋
					$inputamount++;	
				}
				if($src.is(".min")){//-   
					if($inputamount<=1){return false;}
					$inputamount--;					
				}
				if($src.is(".inputamount")){//改变文本
					const _amount=$src.val();
					const reg=/^[1-9]\d*$/;
					if(!reg.test(_amount)){
						$src.val($inputamount);
						return;
					}
					$inputamount=_amount;
				}		
				//console.log($inputamount);	
				$(".inputamount").val($inputamount);//修改input文本
//				let $kucui=$(".whouse").text();//修改库存
//				$kucui=$kucui-$inputamount;
//				$(".whouse").text($kucui);
				return false;
			},
			//加入购物车处理
			addToCartHandler(){				
				const $parent=$(".pro_main");				
				const currentProduct={
					id:$parent.find("div.id").text(),
					price:$parent.find(".price b").text(),
					title:$parent.find("h2").text(),
					size:$parent.find(".size .select").text(),
					img:$parent.find(".item_select a img").attr("src"),
					amount:$(".inputamount").val()
				};									
//				console.log(currentProduct.amount);
				// 获取在 cookie 中已保存的购物车数组
				const cart=$.cookie("cart")||[];
				// 判断在 cart 数组中是否存在当前选购的商品对象
				const has=cart.some(curr=>{
					
					if(curr.id==currentProduct.id){
						curr.amount=Number(curr.amount)+Number($(".inputamount").val());//如果出现过数量＋1	
						
						console.log(curr.id);
						console.log("111111");					
						console.log(currentProduct.id);					
						console.log(curr.amount);						
						return true;
					}
					
					return false;
				});
				//如未加过就加到购物车数组中
				if(!has){
					cart.push(currentProduct);										
				}	
				$.cookie("cart",cart,{expires:7,path:"/"});//保存数据到cookie中,路径一般为根目录
			}						
		});
		//调用
		new Product();
	});
});