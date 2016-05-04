
// 反色

(function(){
    var cvs = document.getElementById('cvs2');
    var ctx = cvs.getContext('2d');

    // 文件上传控件
    var fileInput = document.getElementById('file2');

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
        for (var i = 0; i < 4 * 500 * 500; i = i + 4) {
            var r = pxData[i + 0];
            var g = pxData[i + 1];
            var b = pxData[i + 2];
            var a = pxData[i + 3];
            pxData[i + 0] = 255 - r;
            pxData[i + 1] = 255 - g;
            pxData[i + 2] = 255 - b;
        }

        ctx.putImageData(imageData, 0, 0);
    }
})();