	
	var imgs = ['birds.png', 'land.png', 'pipe1.png', 'pipe2.png', 'sky.png'];
	// 存放imgs图像对象
	var imgsO = [];

	var imgsCount = 0;

	imgs.forEach(function(i){
		var img = new Image();
		img.addEventListener('load', imgsLoad);
		img.src = 'imgs/' + i;
		imgsO.push(img);
	});

	// 图片加载完成之后的监听函数
	function imgsLoad(){
		imgsCount++;
		if(imgsCount >= 5){
			main();
		}
	}