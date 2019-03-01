/* 加载头部和尾部 */
// 定义模块，复用
define(["jquery"],function(){
	require(["jquery","cookie"],function($){
	//构造函数
	function HeaderAndFooter(){
		this.init();		
		$.cookie.json = true;		
	}
	//扩展原型
	$.extend(HeaderAndFooter.prototype,{
		//初始化
		init(){
			this.loadHeader();
			this.loadFooter();
		},
		//加载头部
		loadHeader(){
			$.get("/html/include/header.html",(data)=>{
			$("header").html(data);
			this.headerHandler();			
		});
		},		
		//加载尾部
		loadFooter(){
			$("footer").load("/html/include/footer.html");
		},	
		//添加头部交互
		headerHandler(){
			$(".sou").on("keyup", this.suggestHandler);	
			//提示点击
			$(".suggest").on("click","div",(data)=>{
				$(".sou").val($(event.target).text());//==$(".sou")[0].value=$(event.target).innerText
				$(".suggest").hide();
			});
			this.totalCar();//显示购物车数量
			this.showUsername();//改变用户名
			this.loginOut();
		},
		suggestHandler(event){
			const 
				word=$(event.target).val(),//=this.value
			    url=`https://suggest.taobao.com/sug?code=utf-8&q=${word}&callback=?`;//jsonp跨域请求
			$.getJSON(url,(data)=>{
				let html="";
				data.result.forEach((curr) => {
					html +=`<div>${curr[0]}</div>`;
				});
				
				$(".suggest").show().html(html);
				if(word.length == 0){$(".suggest").hide()};
				$(".sou").on("blur" ,()=>{
					$(".suggest").hide();
				})
			});
		},
		totalCar(){
			// 获取在 cookie 中已保存的购物车数组
				const cart=$.cookie("cart")||[];
				if (cart.length === 0) {
					$(".shuliang").text(0);
					return;
				} else {
					let sum=0;
					$.each(cart,function(i){
						sum+=Number(cart[i].amount);
					});
					$(".shuliang").text(sum);
				}
		},
		showUsername(){
			const user=$.cookie("loginUser");
			if(user){
				$(".wellcome span").prepend(user);	//修改头部用户名
				$(".reg-log").addClass("hidden")//隐藏注册，登录
				const html=`<div>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="tuichu">退出</a></div>`;//
				$(".headerwell").append(html);	//退出			
			};
		},
		loginOut(){
			$(".tuichu").on("click",()=>{
				$.removeCookie("loginUser",{path:"/"});
				location = "/";
			});
		}
	});
	return new HeaderAndFooter();
	});
})