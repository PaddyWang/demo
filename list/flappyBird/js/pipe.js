	
	// 管道
	function Pipe(img1, img2, x){
		this.img1 = img1;
		this.img2 = img2;
		this.x = x;
		// y 的取值为 50 - 200
		this.y = Math.random() * 150 + 50;
		console.log(this.y);
		this.speed = -0.1;
	}
	Pipe.prototype = {
		updata: function(dv){
			if(this.x < -52){
				this.x += 1000;
				this.y = Math.random() * 150 + 50;
			}
			this.x += this.speed * dv;
		},
		draw: function(){
			ctx.rect(this.x, this.y - 420, 52, 112);
			ctx.drawImage(this.img1, this.x, this.y - 420);
			ctx.drawImage(this.img2, this.x, 150 + this.y);
			ctx.rect(this.x, this.y - 420, 52, 420);
			ctx.rect(this.x, 150 + this.y, 52, 420);
			// ctx.stroke();
		}
	};