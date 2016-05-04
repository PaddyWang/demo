	
	// 声明一个Bird构造函数
	function Bird(){
		this.x = 200;
		this.y = 150;
		this.a = 0.0005;  // 加速度
		this.speed = 0;
		this.index = 1;
		this.waitTime = 0;
	}

	Bird.prototype = {
		constructor: Bird,
		draw: function(){
			// 让 speed 永远不会超过 0.3 
			var speed = this.speed > 0.3 ? 0.3 : this.speed;
			// 角度
			var deg = (speed/0.3*45)*Math.PI/180;
			// 保存
			ctx.save();
			// 移动坐标系
			ctx.translate(this.x, this.y);
			// 旋转坐标系
			ctx.rotate(deg);
			ctx.drawImage(imgsO[0], 
						this.index*52, 0, 52, 45,
						-26, -22.5, 52, 45);
			// 恢复  坐标系
			ctx.restore();
		},
		updata: function(dv){
			this.waitTime += dv;
			if(this.waitTime > 100){
				this.index = (this.index + 1) % 3;
				this.waitTime -= 100;
			}
			this.speed = this.speed + this.a * dv;
			this.y += this.speed * dv;
		},
		fly: function(){
			this.speed = -0.3;
		}
	};