
// 颜色矩阵
(function(){
    var cvs = document.getElementById('cvs4');
    var ctx = cvs.getContext('2d');

    var matrix = [
     // [ R,   G,   B,   A,   V ]
        [1.0, 1.0, 0.0, 0.0, 0.0],  // R
        [0.0, 1.0, 0.0, 0.0, 0.0],  // G
        [0.0, 0.0, 1.0, 0.0, 0.0],  // B
        [0.0, 0.0, 0.0, 1.0, 0.0],  // A
        [0.0, 0.0, 0.0, 0.0, 1.0],  // V
    ];

    // 文件上传控件
    var fileInput = document.getElementById('file4');

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

        function getPosition(x, y) {
            return 4 * 500 * y + 4 * x;
        }

        for (var x = 0; x < 500; x++) {
            for (var y = 0; y < 500; y++) {
                var target = getPosition(x, y);
                var R = pxData[target + 0];
                var G = pxData[target + 1];
                var B = pxData[target + 2];
                var A = pxData[target + 3];
                var r = R * matrix[0][0] + G * matrix[1][0] + B * matrix[2][0] + A * matrix[3][0] + matrix[4][0] * 255;
                var g = R * matrix[0][1] + G * matrix[1][1] + B * matrix[2][1] + A * matrix[3][1] + matrix[4][1] * 255;
                var b = R * matrix[0][2] + G * matrix[1][2] + B * matrix[2][2] + A * matrix[3][2] + matrix[4][2] * 255;
                var a = R * matrix[0][3] + G * matrix[1][3] + B * matrix[2][3] + A * matrix[3][3] + matrix[4][3] * 255;

                pxData[target + 0] = r;
                pxData[target + 1] = g;
                pxData[target + 2] = b;
                pxData[target + 3] = a;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }
})();