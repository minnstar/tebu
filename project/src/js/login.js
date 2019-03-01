require(["config"],function(){
	require(["jquery","load","cookie"],function($){//依赖jquery return的jQuery函数作为回调函数的参数
		function Login(){
			this.addListener();	
			$.cookie.json = true;
		}
		
		$.extend(Login.prototype,{
			//添加事件监听
			addListener(){
				//登录
				$("#submit").on("click", this.Login);
			},			
			Login(){
				const data=$(".login-form").serialize();		
				$.post("http://localhost/tebu-project/project/api/login.php",data,(res)=>{															
					if(res.res_code == 1){																		
					  for(var key in res.res_body){
					  	const $arr =  [Number(res.res_body[key])];
						$.cookie("loginUser",$arr[0],{path:"/"});//保存cookie		
					}	
						location="/"; 	
						$(".alert1").addClass("hidden");
					}else if(res.res_code == 0){						
						$(".alert1").removeClass("hidden");
						console.log("账号密码错误");
					}					
				},"json");
				return false;				
			}	
			
		});
		
		new Login();	
		
	});
});
