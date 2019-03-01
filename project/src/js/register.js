require(["config"],function(){
	require(["jquery","load","cookie"],function($){//依赖jquery return的jQuery函数作为回调函数的参数
		function register(){
			this.addListener();	
			$.cookie.json = true;
		}
		
		$.extend(register.prototype,{
			//添加事件监听
			addListener(){
				//注册
				$("#reg_sub").on("click", this.Register);
			},			
			Register(){//注册的方法
				const pass1=$("#pass1").val(),
					  pass2=$("#pass2").val();
				if(pass1==pass2){
					const reg=/^1[34578]\d{9}$/,
						  tel=$("#tel").val();
					if(reg.test(tel)){									
						const data=$(".register-form").serialize();
						console.log(data)
						$.post("http://localhost/tebu-project/project/api/register.php",data,(res)=>{														
							if(res.res_body.status==1){						
								window.location.href="/html/include/login.html";
								alert("注册成功，去登录")
							}else{
								$(".alert").removeClass("hidden");
							
							}					
						},"json");
					}else{
						$(".alerttel").removeClass("hidden");
					}
				}else{
					$(".alertpass").removeClass("hidden");
				}
				return false;											
			}
		});
		
		new register();	
		
	});
});
