/**
 * BY: PaddyWang
 * config: {
 *     fontSize
 *     angle
 *     xGap
 *     yGap
 *     text
 * }
 */
;(function(){
    function CanvasBackground(config){
        _initData(this, config);
        _init(this);
    }

    CanvasBackground.prototype.reset = function(config){
        _initData(this, config || {});
        this.canvasNode.setAttribute('width', this.winW);
        this.canvasNode.setAttribute('height', this.winH);
        _render(this);
    };

    function _initData(that, config){
        that.fontSize = config.fontSize ? parseInt(config.fontSize) : 32;
        that.angle = config.angle ? parseInt(config.angle) : -35;
        that.xGap = config.xGap ? parseInt(config.xGap) : 200;
        that.yGap = config.yGap ? parseInt(config.yGap) : 200;
        that.text = config.text || 'Paddy';
        that.winW = window.innerWidth;
        that.winH = window.innerHeight;
    }

    function _init(that){
        that.canvasNode = document.createElement('canvas');
        that.ctx = that.canvasNode.getContext('2d');
        that.canvasNode.setAttribute('width', that.winW);
        that.canvasNode.setAttribute('height', that.winH);
        that.canvasNode.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -1;';
        document.body.appendChild(that.canvasNode);
        _render(that);
    }

    function _render(that){
        var ctx = that.ctx;
        ctx.font = that.fontSize + 'px Arial';
        ctx.fillStyle = 'whitesmoke';
        ctx.textBaseline = 'middle';
        ctx.clearRect(0, 0, that.winW, that.winH);

        var textSize = _handleTextSize(that.text, that.fontSize);

        for(var i = 0, xNum = Math.ceil(that.winW / (textSize + that.xGap)); i < xNum; i++){
            for(var j = 0, yNum = Math.ceil(that.winH / (that.fontSize + that.yGap)); j < yNum; j++){
                var x = i * (textSize + that.xGap);
                var y = j * (that.fontSize + that.yGap);
                ctx.save();
                ctx.translate(x + textSize / 2, y);
                ctx.rotate(that.angle * Math.PI / 180);
                ctx.fillText(that.text, -textSize / 2, 0);
                ctx.restore();
            }
        }
    }

    function _handleTextSize(text, fontSize){
        var spanNode = document.createElement('span');
        var textSize = 0;
        spanNode.style.fontSize = fontSize + 'px';
        spanNode.innerHTML = text;
        document.body.appendChild(spanNode);
        textSize = spanNode.offsetWidth;
        document.body.removeChild(spanNode);
        return textSize;
    }
    window.CanvasBackground = CanvasBackground;
}());
