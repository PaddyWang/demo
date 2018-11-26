P(function(){
    var titleDom = document.createElement('h1');
    titleDom.innerHTML = document.title;
    P('body').prepend(titleDom);

    document.querySelectorAll('article').forEach(function(dom){
        var preDom = dom.querySelector('pre');

        dom.querySelectorAll('.render > [language]').forEach(function(renderDom){
            var divDom = document.createElement('div');
            var codeDom = document.createElement('code');
            var renderDomStr = '';
            divDom.appendChild(renderDom.cloneNode(true));
            renderDomStr = divDom.innerHTML.replace(/[<>&"]/g, function(ret){
                return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'}[ret];
            });

            codeDom.className = renderDom.getAttribute('language');
            codeDom.innerHTML = renderDomStr;
            preDom.appendChild(codeDom);
            hljs.highlightBlock(codeDom);
        });
    });

    document.querySelectorAll('a[href="#"]').forEach(function(aDom){
        var text = aDom.innerText;
        aDom.setAttribute('name', text);
        aDom.setAttribute('href', '#' + text);
    });
});
