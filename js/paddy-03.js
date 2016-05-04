// PaddyWang
//

(function(window, undefined){

var push = [].push,
	support = {};

// 解决IE中push.apply伪数组不能调用情况
// try{
// 	push.apply(arr1, arr2);
// 	push.call(arr1, o);
// }catch(e){
// 	push = {
// 		apply: function(arr1, arr2){
// 			var i = arr1.length,
// 				j = 0;
// 			while(arr1[i++] = arr2[j++]);
// 			return arr1.length = i - 1;
// 		},
// 		call: function(arr){
// 			var i = arr.length,
// 				j = 1;
// 			while(arr[i++] = arguments[j++]);
// 			return arr.length = i - 1;
// 		}
// 	}
// }

// 解决IE中push.apply伪数组不能调用情况
/*
try{
	push.apply(arr1, arr2);
}catch(e){
	push = {
		apply: function(arr1, arr2){
			var i = arr1.length,
				j = 0;
			while(arr1[i++] = arr2[j++]);
			return arr1.length = i - 1;
		},
		call: function(){
			var i = arguments[0].length;
				j = 1;
			while(arguments[0][i++] = arguments[j++]);
			return arguments[0].length = i - 1;
		}
	};
}
*/

// 能力检测
/*
support.getElementsByClassName = (function(){
	var dom,
		doms,
		ability = false;
	if(document.getElementsByClassName){
		dom = document.createElement('div');
		dom.innerHTML = '<p class="c">p</p>';
		doms = dom.getElementsByClassName('c');
		doms.length > 0 ? ability = true : ability = false;
	}
	return ability;
})();
support.firstElementChild = (function(){
	var ability = false;
	if(document.body.firstElementChild){
		ability = true;
	}
	return ability;
})();
*/

// start
// 构造函数  paddy
function paddy(p){
	return new paddy.fn.init(p);
}

// 原型对象
paddy.fn = paddy.prototype = {
	constructor: paddy,
	selector: null,
	// >>> 处理技巧  在没有成员时继承自原型对象 有成员时动态添加该属性
	length: 0,
	init: function(p){
		// 如果什么都不传入直接return掉
		if(!p) return;
		// 字符串
		if(typeof p === 'string'){
			if(p.charAt(0) === '<'){
				// html
				// this.elements = parseHTML(str);
				push.apply(this, paddy.parseHTML(p));
			}else {
				// selector
				// this.elements = select(p);
				push.apply(this, paddy.select(p));
				this.selector = p;
			}
		// DOM对象
		}else if(paddy.isDOM(p)){
			// this.elements = [p];
			push.apply(this, [p]);
		// paddy对象
		}else if(paddy.isPaddy(p)){
			// this.elements = str.elements;
			push.apply(this, p);
			// return p;
		// 数组
		}else if(paddy.isLikeArray(p)){
			// this.elements = str;
			push.apply(this, p);
		// 函数  入口函数处理
		}else if(paddy.isFunction(p)){
			// 1>  在IE中执行顺序会出现问题
			// window.onload = p;
			// if(window.addEventListener){
			// 	window.addEventListener('load', p);
			// }else {
			// 	window.attachEvent('onload', p);
			// }

			// 2>
			// var arr = [];
			// function load(fn){
			// 	arr.push(fn);
			// 	window.onload = function(){
			// 		for(var i = 0; i < arr.length; i++){
			// 			arr[i]();
			// 		}
			// 	};
			// }

			// 3>
			var oldLoad = window.onload;
			if(typeof oldLoad === 'function'){
				window.onload = function(){
					oldLoad();
					p();
				}
			}else {
				window.onload = p;
			}
		}
		// this.str = 'paddy';
	},
	// 添加成员的方法
	extend: function(obj){
		var k;
		for(k in obj){
			this[k] = obj[k];
		}
	}
};
// 返回对象的原型对象指向该对象的原型对象
paddy.fn.init.prototype = paddy.fn;
// 添加静态成员和实例成员的方法共用
paddy.extend = paddy.fn.extend;

// 静态成员  判断函数
paddy.extend({
	isString: function(o){
		return typeof o === 'string';
	},
	isNumber: function(o){
		return typeof o === 'number';
	},
	isBoolean: function(o){
		return typeof o === 'boolean';
	},
	isFunction: function(o){
		return typeof o === 'function';
	},
	isLikeArray: function(o){
		return o && o.length && o.length >= 0;
	},
	isPaddy: function(o){
		// return !!o.selector;
		return 'selector' in o;
	},
	isDOM: function(o){
		return !!o.nodeType;
	},
	isObject: function(o){
		return typeof o === 'object';
	}
});

// 静态成员  辅助性方法
paddy.extend({
	// 循环遍历的方法
	each: function(arr,callback){
		var i;
		if(paddy.isLikeArray(arr)){
			for(i = 0; i < arr.length; i++){
				if(callback.call(arr[i], i, arr[i]) === false) break;
			}
		}else {
			for(i in arr){
				if(callback.call(arr[i], i, arr[i]) === false) break;
			}
		}
	},
	// 去除字符串两端空格
	trim: function(str){
		if(String.prototype.trim) return str.trim();
		else return str.replace(/^\s+|\s+$/, '');
	},
	// 获取第一个孩子元素节点
	firstChild: function(dom){
		if(dom.firstElementChild){
			return dom.firstElementChild;
		} // 这里直接 return 掉了 不用 else 了

		// 1>
		// var doms = dom.childNodes
		// 	i = 0,
		// 	l = doms.length;
		// for(;i < l; i++){
		// 	if(doms[i].nodeType === 1) return doms[i];
		// }

		// 2>
		var node;
		paddy.each(dom.childNodes, function(){
			if(this.nodeType === 1) {
				node = this;
				return false;
			}
		});
		return node;
	},
	lastChild: function(dom){
		var doms = dom.childNodes,
			l = doms.length,
			i = l;
		for(;i > 0; i--){
			if(doms[i].nodeType === 1) return doms[i];
		}
	},
	nextSibling: function(dom){
		if(dom.nextElementSibling){
			return dom.nextElementSibling;
		} // 这里不需要 else 直接 return 掉了
		// >>> 小技巧
		// 循环的同时进行赋值，赋值的同时进行判断跳出循环
		while(dom = dom.nextSibling){
			if(dom.nodeType === 1) return dom;
		}
	},
	nextAllSibling: function(dom){
		var arr = [];
		if(dom.nextElementSibling){
			while(dom = dom.nextElementSibling){
				arr.push(dom);
			}
		}else {
			while(dom = dom.nextSibling){
				if(dom.nodeType === 1){
					arr.push(dom);
				}
			}
		}
		return arr;
	}
});

// 实例方法
paddy.fn.extend({
	appendTo: function(p){
		var pL,
			// i,
			// j,
			// doms = this,
			// domL = doms.length,
			node,
			arr = [];
		p = paddy(p);
		pL = p.length;
		// 1 >
		// for(i = 0; i < pL; i++){
		// 	for(j = 0; j < domL; j++){
		// 		node = i === pL - 1 ?
		// 					doms[j] :
		// 					doms[j].cloneNode(true);
		// 		arr.push(node);
		// 		p[i].appendChild(node);
		// 	}
		// }

		// 2 >
		this.each(function(k1, v1){
			paddy.each(p, function(k2, v2){
				node = k2 === pL - 1 ?
							   v1 :
							   v1.cloneNode(true);
				arr.push(node);
				this.appendChild(node);
			});
		});
		return paddy(arr);
	},
	append: function(p){
		paddy(p).appendTo(this);
	},
	remove: function(){
		paddy.each(this, function(){
			this.parentNode.removeChild(this);
		});
	},
	prependTo: function(p){
		var l,
			node,
			arr = [];
		p = paddy(p);
		l = p.length;
		paddy.each(this, function(k, v){
			paddy.each(p, function(k1, v1){
				node = k1 === l - 1 ?
								v :
								v.cloneNode(true);
				arr.push(node);
				this.insertBefore(node, paddy.firstChild(this));
			});
		});
		return paddy(arr);
	},
	prepend: function(p){
		paddy(p).prependTo(this);
	},
	next: function(){
		var arr = [];
		paddy.each(this, function(){
			arr.push(paddy.nextSibling(this));
		});
		return paddy(arr);
	},
	nextAll: function(){
		var arr = [];
		paddy.each(this, function(){
			push.apply(arr, paddy.nextAllSibling(this));
		});
		return paddy(arr);
	}
});

// 链式编程each
paddy.fn.extend({
	each: function(callback){
		// 第一个this指的是paddy对象
		// 第二个this指的是paddy遍历的DOM对象
		// paddy.each(this, function(){
		// 	callback.call(this);
		// });
		// return this;
		paddy.each(this, callback);
		return this;
	}
});
// 事件
paddy.Event = function(e){
	this.e = e || window.event;
	this.which = this.e.which || this.e.button;
};
paddy.Event.prototype = {
	constructor: paddy.Event
};
paddy.fn.extend({
	// 可以绑定一个或多个事件
	// 多个事件时由 , 号隔开
	on: function(event, callback){
		var events = event.split(',');
		return this.each(function(k1, v1){
			paddy.each(events, function(k2, v2){
				if(v1.addEventListener){
					v1.addEventListener(paddy.trim(this), function(e){
						// 给回调函数传入一个 Event 对象
						// 并将事件对象 e 传入Event对象中
						callback.call(v1, new paddy.Event(e));
					});
				}else{
					v1.attachEvent('on'+paddy.trim(this), function(e){
						callback.call(v1, new paddy.Event(e));
					})
				}
			});
		});
		// return this;
	},
	off: function(event, callback){
		return this.each(function(){
			this.removeEventListener(event, callback);
		});
		// return this;
	}
});
// 遍历添加单独的事件
paddy.each('click,fouse,blur,mouseover,mouseout,mouseleave,mousemove,mousedown,mouseup,input,change,keydown,keyup'.split(','), function(k, v){
	paddy.fn[v] = function(callback){
		// 这里的this指的是调用事件者
		return this.on(v, callback);
	};
});
// hover & toggle
paddy.fn.extend({
	hover: function(fn1, fn2){
		return this.mouseover(fn1).mouseout(fn2);
	},
	toggle: function(){
		var i = 0,args = arguments;
		return this.click(function(e){
			// call让this指向调用者
			args[i++ % args.length].call(this, e);
		});
	}
});
// css
paddy.fn.extend({
	css: function(cssName, cssVal){
		// 为json格式样式
		if(paddy.isObject(cssName)){
			return this.each(function(){
				var k;
				for(k in cssName){
					this.style[k] = cssName[k];
				}
			});
		}else if(!cssVal){
			// 只有一个参数的时候
			return window.getComputedStyle(this[0])[cssName];
		}else {
			// 两个参数时
			return this.each(function(){
				this.style[cssName] = cssVal;
			});
		}
	}
});
// class系列
paddy.fn.extend({
	hasClass: function(className){
		// 1>
		// var has = false;
		// paddy.each(this[0].className.split(' '), function(k, v){
		// 	if(v === paddy.trim(className)){
		// 		has = true;
		// 		return false;
		// 	}
		// });
		// return has;

		// 2> 利用了 indexOf 的特性
		return (' '+this[0].className+' ').indexOf(' '+paddy.trim(className)+' ') != -1;
	},
	addClass: function(className){
		return this.each(function(){
			this.className += ' '+paddy.trim(className);
		});
	},
	removeClass: function(className){
		className = paddy.trim(className);
		if(className){
		// 有参数时
			return this.each(function(){
				// 1>   >>>小技巧
				this.className = paddy.trim(
							(' '+this.className+' ').
							replace(' '+className+' ', ' '));

				// 2>
				// var arr = this.className.split(' '),
				// 	i = 0
				// 	l = arr.length;
				// for(;i < l; i++){
				// 	if(arr[i] === className){
				// 		arr.splice(i, 1);
				// 		this.className = paddy.trim(arr.join(' '));
				// 		break;
				// 	}
				// }

			});
		}else {
			// 没有参数时
			return this.each(function(){
				this.className = '';
			});
		}
	},
	toggleClass: function(className){
		return this.each(function(){
			if(paddy(this).hasClass(className)){
				paddy(this).removeClass(className);
			}else {
				paddy(this).addClass(className);
			}
		});
	}
});
// 属性操作
paddy.fn.extend({
	// 如果要获取标签的class属性  则需要出入className
	attr: function(attrName, attrVal){
		if(!attrVal){
			//1>
			// return this[0][attrName];

			// 2>
			return this[0].getAttribute(attrName);
		}else {
			return this.each(function(){
				// 1>
				// this[attrName] = attrVal;

				// 2>
				this.setAttribute(attrName, attrVal);
			});
		}

	},
	val: function(value){
		if(!value){
			return this[0].value;
		}else {
			return this.each(function(){
				this.value = value;
			});
		}
	}
});
// html
paddy.extend({
	getText: function(dom){
		var arr = [];
		if('innerText' in dom){
			return dom.innerText;
		}else {
			return getInnerText(dom, arr).join('');
		}
		// 1>  字符串操作
		// function getInnerText1(dom){
		// 	var str = dom.innerHTML+'';
		// 	str = str.replace(/<\/?[a-zA-Z]+[^>]*>/g, '').
		// 			  replace(/&lt;/g, '<').
		// 			  replace(/&gt;/g, '>').
		// 			  replace(/<!--[\w]+-->/, '');

		// 	return str;
		// }

		// 2>  递归
		function getInnerText(dom, arr){
			var doms = dom.childNodes;

			// .1>
			paddy.each(doms, function(){
				if(this.nodeType === 3){
					arr.push(this.nodeValue);
				}else if(this.nodeType === 1){
					// arguments.callee(this, arr);
					getInnerText(this, arr);
				}
			});

			// .2>
			// var l = doms.length, i = 0;
			// for(; i < l; i++){
			// 	if(doms[i].nodeType === 3){
			// 		arr.push(doms[i].nodeValue);
			// 	}else if(doms[i].nodeType === 1) {
			// 		getInnerText(doms[i], arr);
			// 	}
			// }

			return arr;
		}
	},
	setText: function(dom, text){
		if('innerText' in dom){
			dom.innerText = text;
		}else {
			dom.innerHTML = '';
			dom.appendChild(document.createTextNode(text));
		}
	}
});
paddy.fn.extend({
	html: function(html){
		if(!html){
			return this[0].innerHTML;
		}else {
			return this.each(function(){
				this.innerHTML = html;
			});
		}
	},
	text: function(text){
		if(!text){
			return paddy.getText(this[0]);
		}else {
			return this.each(function(){
				paddy.setText(this, text);
			});
		}
	}
});
// 动画
// 动画模块
// 工具方法
paddy.extend({
	// 样式名对象
	attrs: {
		left: 'offsetLeft',
		top: 'offsetTop',
		width: 'offsetWidth',
		height: 'offsetHeight'
	},
	// 处理总路程函数
	getDisctance: function ( dom, target ) {
		var o = {};
		// 1>
		// for ( var k in target ) {
		// 	o[ k ] = parseInt( target[ k ] ) - dom[ paddy.attrs[ k ] ];
		// }

		// 2>
		paddy.each(target, function(k, v){
			o[k] = parseInt(this) - dom[paddy.attrs[k]];
		});
		return o;
	},
	// 处理当前位置函数
	getLocation: function ( dom, target ) {
		var o = {};
		// for ( var k in target ) {
		// 	o[ k ] = dom[ paddy.attrs[ k ] ];
		// }
		paddy.each(target, function(k, v){
			o[k] = dom[paddy.attrs[k]];
		});
		return o;
	},
	// 处理动画函数    当前时间  起始位置  样式对象 总时间   动画效果
	easings: function ( x, time, startLocations, target, dur, easingName ) {
		var o = {};
		// for ( var k in target ) { // top, left ...
		// 	o[ k ] = paddy.easing[ easingName ]( x,
		// 										  time,
		// 										  startLocations[ k ],
		// 										  parseInt( target[ k ] ),
		// 										  dur );
		// }
		paddy.each(target, function(k, v){
			o[k] = paddy.easing[easingName](x,
											time,
											startLocations[k],
											parseInt(this),
											dur);
		});
		return o;
	},
	// 设置样式函数   对象    起始位置      路程     样式对象
	setStyle: function ( dom, startLocations, tweens, target ) {
		// 给 dom 的每一个样式设置值
		// for ( var k in target ) {
		// 	dom.style[ k ] = startLocations[ k ] + tweens[ k ] + 'px';
		// }
		paddy.each(target, function(k, v){
			dom.style[k] = startLocations[k] + tweens[k] + 'px';
		});
	},
	// 动画函数
	easing: {
		// 匀速  x：忽略  t：当前时间  b：起始值  c：终止值  d：总时间
		// 返回：当前位置 | 值
		liner: function ( x, t, b, c, d ) {
		return t * ( c - b ) / d;
		},
		// 匀减速
		minusspeed: function ( x, t, b, c, d ) {
			// 需要初始速度 和加速度
			var a = 2 * ( c - b ) / ( d * d ),
				v0 = a * d;
			return v0 * t - a * t * t / 2;
		}
	}
});


// 动画
paddy.fn.extend({
	timerId: null,
	// 动画：样式对象  执行时间  动画效果  回调函数(可选)
	animate: function ( target, dur, easingName, callback) {
		easingName = easingName || 'liner';
		var dom = this[ 0 ],
			totalDistances = paddy.getDisctance( dom, target ),
			startTime = +new Date,
			startLocations = paddy.getLocation( dom, target ),
			stepTime = 25;

			function play() {
				var time = +new Date - startTime, // 已过时间毫秒
					tweens;
				if ( time >= dur ) {
					tweens = totalDistances;
					clearInterval( this.timerId );
					this.timerId = null;
					if(callback) callback();
				} else {
					tweens = paddy.easings( null,
											 time,
											 startLocations,
											 target,
											 dur,
											 easingName );
				}
				paddy.setStyle( dom, startLocations, tweens, target );
			};
		play();
		this.timerId = setInterval( play, stepTime );  // 50Hz
	},
	// 停止当前动画
	stopAnimating: function () {
		clearInterval( this.timerId );
	},
	// 判断是否有动画在执行
	isAnimating: function () {
		return this.timerId === null;
	}
});

paddy.extend({
	parseHTML: parseHTML,
	select: select
});
// html字符串解析
function parseHTML(html){
	var div = document.createElement('div'),
		arr = [];
	div.innerHTML = html;
	paddy.each(div.childNodes, function(k, v){
		arr[k] = v;
	});
	return arr;
}

// 搜索引擎
function select(selector){
		// (?:  ) 非获取匹配 只匹配里面的内容
	var r = /^(?:#([\w\-_]+)|\.([\w\-_]+)|([\w]+)|(\*))$/,
		// exec 返回一个匹配数组 匹配到的有值 没有匹配到的 undefined
		m = r.exec(selector),
		arr = [],
		doms,
		dom;
	// id选择器
	if(m[1]){
		// 当获取不到指定 id 的标签时返回 null
		dom = document.getElementById(m[1]);
		// >>> 小技巧
		!!dom === false ?
				  arr = null :
				  push.call(arr, dom);
		// 采用这种做法时 当获取不到指定 id 的标签时会把 null push 到 arr 中
		// push.call(arr, document.getElementById(m[1]));

	// class类选择器
	}else if(m[2]){
		if(document.getElementsByClassName){
			push.apply(arr, document.getElementsByClassName(m[2]));
		}else {
			doms = document.getElementsByTagName('*');
			paddy.each(doms, function(k, v){
				// >>> 小技巧
				if((' '+v.className+' ').indexOf(' '+m[2]+' ') != -1){
					arr.push(v);
				}
			});
		}
	// 标签或 * 选择器
	}else {
		// >>> 小技巧
		push.apply(arr, document.getElementsByTagName(!!m[3] ? m[3] : m[4]));
	}
	return arr;
}

// end
window.P = window.paddy = paddy;
})(window);