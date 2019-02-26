require(["config"],function(){
	require(["jquery","load","cookie"],function($){//依赖jquery return的jQuery函数作为回调函数的参数
		function registerAndLogin(){
			this.addListener();	
			$.cookie.json = true;
		}
		
		$.extend(registerAndLogin.prototype,{
			//添加事件监听
			addListener(){
				//跳转				
				$(".regbtn").on("click",this.jumpToLogin);
				//关闭注册
				$(".close").on("click",this.closeReg);
				//注册			
				$("#reg_sub").on("click", this.Register);
				//登录
				$("#submit").on("click", this.Login);
			},			
			jumpToLogin(){	//跳转			
				$(".login").addClass("hidden");
				$(".register").addClass("show");							
				return false;
			},			
			closeReg(){	//关闭注册		
				$(".register").removeClass("show");
				$(".login").removeClass("hidden");				
			},
			
			Register(){//注册的方法
				const pass1=$("#pass1").val(),
					  pass2=$("#pass2").val();
					  
				if(pass1==pass2){
					const reg=/^[1][3,4,5,7,8][0-9]{9}$/,
						  tel=$("#tel").val();
					if(reg.test(tel)){
																
						const data=$(".register-form").serialize();				
						$.post("http://localhost/js2%20ex/shangpin/shangpin_project/api/register.php",data,(res)=>{															
							if(res.res_body.status==1){						
			//					$(".wellcome span").prepend(res.res_body.username);	//修改头部用户名
		//						$(".reg").addClass("hidden");
		//						$(".log").addClass("hidden")//隐藏注册，登录
								location="/html/include/login.html";
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
			},
			Login(){
				const data=$(".login-form").serialize();				
				$.post("http://localhost/js2%20ex/shangpin/shangpin_project/api/login.php",data,(res)=>{															
					if(res.res_body.status==1){																		
						location="/";			
						$.cookie("loginUser",res.res_body.info.username,{path:"/"});//保存cookie						
						$(".alert1").addClass("hidden");
					}else{						
						$(".alert1").removeClass("hidden");
					}					
				},"json");
				return false;				
			}	
			
		});
		
		new registerAndLogin();	
		
	});
});
