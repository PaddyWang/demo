
	function Land(img, x){
		this.img = img;
		this.x = x;
		this.speed = -0.1;
	}
	Land.prototype = {
		updata: function(dv){
			if(this.x < -336){
				this.x += 336*4;
			}
			this.x += this.speed*dv;
		},
		draw: function(){
			ctx.drawImage(this.img, this.x, 600 - 112);
		}
	};