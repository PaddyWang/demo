// 2016-04-11 PaddyWang
// 搜索引擎
// 实现了：
//  * 基本选择器 ：id class tag *
//  * 并集选择器 : select('div,.box')
//  * 后代选择器 : select('.box div, #a, #b .c')
//  example ：selsct(selector, context, arr)
// 				selector : 必填 选择器   
// 				context  : 选填 上下文     即在context元素下去查找指定元素
// 				arr      : 选填 累加数组   存放符合要求的元素
// 				返回值   ：arr

var select = (function(){
	// 解决IE中不支持push.apply伪数组情况
	// 声明一个push对象
	var push = [].push;
	try{
		// 正常情况下调用原生的push方法
		push.apply(arr1, arr2);
	}catch(e){
		// 在不支持的IE中解决
		// 创建一个push对象
		push = {
			// 给push对象添加一个apply属性
			apply:function(arr1, arr2){
				var i = arr1.length, j = 0;
				// 将arr2中的成员一个个添加到arr1里面
				// 这里进行 赋值 的同时进行 判断 循环
				// 在arr2[...]为空时跳出循环
				while((arr1[i++] = arr2[j++]));
				arr1.length = i - 1;
			}
		}
	}
	function each(arr, fn){
		var i,len = arr.length;
		for(i = 0; i < len; i++){
			// 当回调函数返回false时则跳出循环
			if(fn.call(arr[ i ], i, arr[ i ]) === false) break;
		}
	}
	// 在一个页面中有且仅有一个id 即不需要在上下文中查找
	function getId(id, arr){
		arr = arr || [];
		push.apply(arr, [document.getElementById(id)]);
		return arr;
	}
	function getTag(tag, context, arr){
		arr = arr || [];
		push.apply(arr, context.getElementsByTagName(tag));
		return arr;
	}
	function getClass(className, context, arr){
		arr = arr || [];
		if(document.getElementsByClassName){
			push.apply(arr, context.getElementsByClassName(className));
		}else{
			// 解决IE兼容性问题
			each(getTag('*', context), function(k, v){
				if((' '+v.className+' ').indexOf(' '+className+' ') != -1){
					arr.push(v);
				}
			});
		}
		return arr;
	}
	function get(selector, context, arr){
		var r = /^(?:#([\w\-_]+)|\.([\w\-_]+)|([\w]+)|(\*))$/,
			m = r.exec(selector);
		arr = arr || [];
		context = context || document;
		// 当get('')时m = null 即这里添加一个判断
		if(m){
			// context可能是一个dom节点数组  也可能是一个dom节点
			// 当context是一个dom节点时则添加到一个数组中
			if(context.nodeType) context = [ context ];
			// 当为一个选择器字符串时  直接递归获取dom节点
			if(typeof context == 'string') context = arguments.callee(context);
			// 这个循环为了遍历context中的所有标签  以便获取所有的上下文下的标签
			each(context, function(){
				// 正则匹配之后 存在则是（）中的匹配元素 不存在则undefined
				// m[ 1 ] -> # id
				// m[ 2 ] -> . class
				// m[ 3 ] -> tag
				// m[ 4 ] -> *
				if(m[ 1 ]){
					arr = getId(m[ 1 ], arr);
				}else if(m[ 2 ]){
					arr = getClass(m[ 2 ], this, arr);
				}else if(m[ 3 ]){
					arr = getTag(m[ 3 ], this, arr);
				}else if(m[ 4 ]){
					arr = getTag('*', this, arr);
				}
			});
		}
		return arr;
	}
	// 去两端空格
	function trim(str){
		if(String.prototype.trim) return str.trim();
		else return str.replace(/^\s+|\s+$/, '');
	}
	function select(selector, context, arr){
		// 当选择器为并集选择器时的处理
		var newS = selector.split(',');
		arr = arr || [];
		context = context || document;
		each(newS, function(k, v){
			// 当选择器为后代选择器时的处理
			var list = v.split(' '), a = context;
			each(list, function(k, v){
				// 当split后的选择器字符串为空时直接return掉 跳到下次循环
				if(v == '') return;
				// 在后代元素查询时 将查询到的元素作为父元素 进行父元素下查询
				// example：'#box #div .c'
				// 即-> div = get('#box')
				//   -> div = get('#div', div)
				//   -> div = get('.c', div)
				a = get(trim(v), a);
			});
			arr.push.apply(arr, a);
		});
		return arr;
	}
	return select;
})();