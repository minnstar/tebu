
require(["config"],function(){
	require(["jquery","template","load"],function($,template){//依赖jquery return的jQuery函数作为回调函数的参数
		
			function index(){
				this.loadf4pro();
				
			}
			$.extend(index.prototype,{
				//加载数据
				loadf4pro(){
					$.getJSON("http://rap2api.taobao.org/app/mock/120495/example/1544262448424",(data)=>{
						
						const html=template("f4pro_template",{products:data.res_body.list})
						
						$("ul.f4pro").append(html);
					})
				},
				
			});
			new index();
	});
});
