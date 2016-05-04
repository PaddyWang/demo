	
	function Score(){
		this.num = 0;
		this.steep = 0.1;
		this.index = 0;
		this.waitTime = 0;
	}
	Score.prototype = {
		updata: function(dv){
			// this.index += this.steep * dv;
			this.waitTime += dv;
			this.index = this.waitTime > 4500 ? 
						 this.index + this.steep * dv : 0;

			if(this.index > 200){
				this.num++;
				this.index -= 200;
			}
		},
		draw: function(){
			ctx.fillStyle = 'red';
			ctx.font = '45px mircosoft yahei';
			ctx.fillText(this.num, 700, 100);
		}
	};
