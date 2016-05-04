	
	function Sky(img, x){
		this.img = img;
		this.x = x;
		this.speed = -0.05;
	}
	Sky.prototype = {
		updata: function(dv){
			if(this.x < -800){
				this.x += 1600;
			}
			this.x += this.speed*dv;
		},
		draw: function(){
			ctx.drawImage(this.img, this.x, 0);
		}
	};