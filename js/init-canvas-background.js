;(function(){
    window.onload = function(){
        var canvasBackgroundInstance = new CanvasBackground(initConfig());

        window.onresize = function(){
            canvasBackgroundInstance.reset(initConfig());
        };

        function initConfig(){
            var baseW = 1920;
            var fontSize = window.innerWidth / baseW * 32;
            var xGap = window.innerWidth / baseW * 200;
            var yGap = window.innerWidth / baseW * 200;
            return {
                fontSize: fontSize > 16 ? fontSize : 16,
                angle: -35,
                xGap: xGap > 80 ? xGap : 80,
                yGap: yGap > 80 ? yGap : 80
            };
        }
    };
}());
(function(){
    var iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.href = 'https://github.githubassets.com/favicon.ico';
    document.head.appendChild(iconLink);
}());
