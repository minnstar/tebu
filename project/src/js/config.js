require.config({
	baseUrl:"/",//根目录 webserver的root指向的目录
	paths:{//模块短名称路径配置
		jquery:"/lib/jquery/jquery-1.12.4.min",//jQuery短名称		
		load:"/js/load-header-and-footer",//加载头部尾部
		template:"/lib/art-template/template-web",//加载模板引擎	
		cookie:"/lib/jquery-plugins/jquery.cookie",//增加cookie
		zoom:"/lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",//放大镜插件
	},
	shim: {
		 // 这是jQuery插件，依赖于 jQuery 模块
		zoom: {
			deps: ["jquery"]
		}
	}
});