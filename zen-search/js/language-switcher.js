document.addEventListener('DOMContentLoaded', function() {
    // 自动检测当前页面语言并高亮对应链接
    const path = window.location.pathname;
    const isZh = path.includes('.zh.html');
    const links = document.querySelectorAll('.lang-link');
    
    links.forEach(link => {
        if ((isZh && link.getAttribute('hreflang') === 'zh') ||
            (!isZh && link.getAttribute('hreflang') === 'en')) {
            link.classList.add('current');
        }
    });
}); 