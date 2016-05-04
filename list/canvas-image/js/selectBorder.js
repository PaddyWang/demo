
// 查找边框
(function(){
    var cvs = document.getElementById('cvs3');
    var ctx = cvs.getContext('2d');

    // 文件上传控件
    var fileInput = document.getElementById('file3');

    // 用户选择文件之后，会发生change事件，监听这个事件
    fileInput.addEventListener('change', function () {

        var imageFile = fileInput.files[0];

        // 用于把file对象转换成一个当前页面里可以使用的url。记住就行。
        var url = URL.createObjectURL(imageFile);

        var img = new Image();
        img.src = url;
        img.addEventListener('load', function () {
            // 图像加载之后执行：使图像正好占满屏幕又不改变缩放的大小
            var w = img.width;
            var h = img.height;
            var scaleX = 500 / w;
            var scaleY = 500 / h;
            var scale = scaleX < scaleY ? scaleX : scaleY;

            ctx.clearRect(0, 0, 500, 500);

            ctx.save();
            ctx.translate(250, 250);
            ctx.scale(scale, scale); // 对坐标系进行缩放
            ctx.drawImage(img, -w / 2, -h / 2);
            ctx.restore();

            main();
        })
    });

    function main() {
        // 获取图像数据
        var imageData = ctx.getImageData(0, 0, 500, 500);
        var pxData = imageData.data;

        // 根据x，y轴坐标找到对应的数组位置
        function getPosition(x, y) {
            // 4像素 * 500个点一行 * y之前的行数 + 4像素 * x列数
            /*
             * 比如说，x=3，y=4,6个点一行，则有：
             * 4*6*(y-1)+4*x
             * 如下图
             * ······
             * ······
             * ······
             * ···
             * */
            return 4 * 500 * (y - 1) + 4 * x;
        }

        for (var x = 0; x < 500; x++) {
            for (var y = 0; y < 500; y++) {
                var target = getPosition(x, y); // 该点的坐标
                var nextX = getPosition(x + 1, y); // 右边点的坐标
                var nextY = getPosition(x, y + 1); // 下边点的坐标
                // 求出左右紧邻像素点之间的色彩差值
                var rr = Math.abs(pxData[nextX + 0] - pxData[target + 0]);
                var rg = Math.abs(pxData[nextX + 1] - pxData[target + 1]);
                var rb = Math.abs(pxData[nextX + 2] - pxData[target + 2]);
                // 求出上下紧邻像素点之间的色彩差值
                var br = Math.abs(pxData[nextY + 0] - pxData[target + 0]);
                var bg = Math.abs(pxData[nextY + 1] - pxData[target + 1]);
                var bb = Math.abs(pxData[nextY + 2] - pxData[target + 2]);
                pxData[target + 0] = 255 - (rr + br) ;
                pxData[target + 1] = 255 - (rg + bg) ;
                pxData[target + 2] = 255 - (rb + bb) ;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }
})();