/* 调用方式
    ajax({
        type: 'get',
        url: 'demo.php',
        data: {name:'哈哈',age:22},
        callback: function(data){
            console.log(data);
        }
    });
  */
;(function(){
    function joint(data){
        var d = '';
        for(var key in data){
            d += key + '=' + data[key] + '&';
        }
        d = d.slice(0, -1);
        return d;
    }
    window.ajax = function(obj){
        var type = obj.type || 'get';
        var url = obj.url || location.pathname;
        var data = joint(obj.data);
        var xhr = new XMLHttpRequest();
        if(type == 'get'){
            url = url + '?' + data;
            data = null;
        }
        xhr.open(type,url);
        if(type == 'post'){
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.send(data);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status ==200){
                var data = xhr.responseText;
                var ct = xhr.getResponseHeader('Content-Type');
                ct = ct.toLowerCase();
                if(ct.indexOf('json') != -1){
                    data = JSON.parse(data);
                }else if(ct.indexOf('xml') != -1){
                    data = xhr.responseXML;
                }
                obj.callback(data);
            }
        }
    };
}());
