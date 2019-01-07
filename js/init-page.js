(function(){
    var iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.href = 'https://github.githubassets.com/favicon.ico';
    document.head.appendChild(iconLink);
}());
P(function(){
    // 代码高亮
    document.querySelectorAll('article').forEach(function(dom){
        var preDom = dom.querySelector('pre');
        var codeDoms = [];

        preDom.querySelectorAll('code').forEach(function(codeDom){
            codeDom.innerHTML = trimCode(codeDom.innerHTML);
            codeDoms.push(codeDom);

        });
        preDom.innerHTML = '';
        codeDoms.forEach(function(codeDom){
            preDom.appendChild(codeDom);
            hljs.highlightBlock(codeDom);
        });

        dom.querySelectorAll('.render > [language]').forEach(function(renderDom){
            var divDom = document.createElement('div');
            var codeDom = document.createElement('code');
            var renderDomStr = '';
            var cloneRenderDom = renderDom.cloneNode(true);
            cloneRenderDom.removeAttribute('language');
            divDom.appendChild(cloneRenderDom);
            renderDomStr = divDom.innerHTML.replace(/[<>&"]/g, function(ret){
                return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'}[ret];
            });

            codeDom.className = renderDom.getAttribute('language');
            codeDom.innerHTML = trimCode(renderDomStr);
            preDom.appendChild(codeDom);
            hljs.highlightBlock(codeDom);
        });
    });
    // 代码去空格
    function trimCode(codeStr){
        codeStr = codeStr.trim();
        var lastEnterIndex = codeStr.lastIndexOf('\n');
        var space = '';
        for(var i = lastEnterIndex + 1, len = codeStr.length; i < len; i++){
            if(codeStr[i] === ' '){
                space += ' ';
            }else {
                break;
            }
        }
        codeStr.match(/(\n)/mig).forEach(function(){
            codeStr = codeStr.replace(space, '');
        });
        return codeStr;
    }

    var mobileHandelFns = [];
    // 生成目录
    var navDom = document.createElement('nav');
    var divDom = document.createElement('div');
    var ulDom = document.createElement('ul');
    divDom.className = 'title';
    divDom.innerHTML = '目录';
    navDom.appendChild(divDom);
    navDom.appendChild(ulDom);
    divDom.addEventListener('click', function(event){
        P(divDom).toggleClass('active');
    });

    document.querySelectorAll('a[href="#"]').forEach(function(aDom){
        var text = aDom.innerText;
        aDom.setAttribute('name', text);
        aDom.setAttribute('href', '#' + text);
        aDom.setAttribute('id', text);

        var liDom = document.createElement('li');
        var liADom = document.createElement('a');

        liADom.setAttribute('name', text);
        liADom.innerHTML = text;
        liDom.className = aDom.className;
        liDom.appendChild(liADom);
        ulDom.appendChild(liDom);

        var userAgent = navigator.userAgent.toLowerCase();
        if(userAgent.indexOf('mobile') >= 0){
            liADom.addEventListener('click', function(){
                setTimeout(function(){
                    location.hash = text;
                }, 100);
            });
        }else {
            liADom.setAttribute('href', '#' + text);
        }
    });
    P('body').prepend(navDom);

    var titleDom = document.createElement('h1');
    titleDom.innerHTML = document.title;
    P('body').prepend(titleDom);
});
