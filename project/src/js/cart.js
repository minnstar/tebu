require(["config"],function(){
	require(["jquery","template","load","cookie"],function($,template){
		function Cart(){
			this.cart=[]; // 购物车数组结构
			$.cookie.json=true;
			this.render();
			this.addListener();
		}
		$.extend(Cart.prototype,{
			render(){//渲染购物车模板
				const cart= this.cart=$.cookie("cart")||[];				
				if(cart.length==0){
					$(".empty").show().next(".cart").addClass("hidden");
					return;
				}else{
					$(".empty").addClass("hidden").next(".cart").removeClass("hidden")
				}
				const html=template("cart-template",{"cart":cart});
				$(".cart-body").html(html);
			},
			//监听
			addListener(){
				$(".cart-body").on("click",".delete",$.proxy(this.delHandler,this));//删除
				$(".cart-body").on("click",".btnDown,.btnUp",$.proxy(this.modifyAmountHandler,this));//加减
				$(".cart-body").on("blur",".amount",$.proxy(this.modifyAmountHandler,this));//手动输入
				$(".selectAll").on("click",this.allCheckHandler);//全选
				$(".cart-body").on("click",".check",$.proxy(this.someCheckHandler,this));//部分选择
				$(".cart-body").on("click",".check,.delete,.btnDown,.btnUp",this.calcTotalHandler);
				$(".selectAll").on("click",this.calcTotalHandler);
//				$(".cart-body").on("click",".check,.delete,.btnDown,.btnUp",headercar.totalCar);
			},
			//删除行
			delHandler(event){
				//找到行						
				const $tr=$(event.target).parents("tr");//找到事件源元素祖先中tr的元素
				const id=$tr.find(".id").text();
				//移除旋转的id
				this.cart=this.cart.filter(curr=>curr.id!=id);
				//覆盖cookie保存				
				$.cookie("cart",this.cart,{expires:7,path:"/"});				
				$tr.remove();//删除dom				
				return false;
			},
			modifyAmountHandler(event){
				const $tr=$(event.target).parents("tr");
				const id=$tr.find(".id").text();
				const prod=this.cart.filter(curr=>curr.id==id)[0];//得到当前点击id商品
				const $src=$(event.target);
				if($src.is(".btnUp")){//＋
					prod.amount++;
				}
				if($src.is(".btnDown")){//-
					if(prod.amount<=1){return false;}
					prod.amount--;					
				}
				if($src.is(".amount")){//改变文本
					const _amount=$src.val();
					const reg=/^[1-9]\d*$/;
					if(!reg.test(_amount)){
						$src.val(prod.amount);
						return;
					}
					prod.amount=_amount;
				}
				$.cookie("cart",this.cart,{expires:7,path:"/"});//保存cookie
				$tr.find(".amount").val(prod.amount);//修改dom
				$tr.find(".total").text((prod.price*prod.amount).toFixed(2));
				return false;
			},
			allCheckHandler(event){//全选				
				const status=$(event.target).prop("checked");
				$(".check").prop("checked",status);//prop("属性","true/false")
				
			},
			someCheckHandler(){//部分选择
//				选择的数量＜数组的长度则取消全选的勾勾
			const count= $(".check:checked").length;			
			$(".selectAll").prop("checked",count==this.cart.length);				
			},
			calcTotalHandler(){
				let sum=0;
				$(".check:checked").each((index,element)=>{
					sum += Number($(element).parents("tr").find(".total").text());					
				})								
				$(".alltotal").text(sum.toFixed(2));
				
			}			
		});

		new Cart();
	});
});