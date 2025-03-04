document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已经有语言偏好设置
    let preferredLang = localStorage.getItem('preferred-lang');
    
    if (!preferredLang) {
        // 获取浏览器语言
        const userLang = navigator.language || navigator.userLanguage;
        // 如果浏览器语言以 zh 开头，设置为中文，否则设置为英文
        preferredLang = userLang.startsWith('zh') ? 'zh' : 'en';
        // 保存语言偏好
        localStorage.setItem('preferred-lang', preferredLang);
    }
    
    // 获取当前页面 URL
    const currentPath = window.location.pathname;
    
    // 只在首次访问时进行重定向
    const hasRedirected = sessionStorage.getItem('hasRedirected');
    if (!hasRedirected) {
        sessionStorage.setItem('hasRedirected', 'true');
        
        // 处理根路径
        if (currentPath.endsWith('/zen-search/') || currentPath === '/') {
            if (preferredLang === 'zh') {
                window.location.href = currentPath + 'index.html';
            } else {
                window.location.href = currentPath + 'index.en.html';
            }
            return;
        }
        
        // 处理其他页面
        if (!currentPath.endsWith('/')) {
            if (preferredLang === 'zh') {
                window.location.href = currentPath.replace('.en.html', '.html');
            } else {
                window.location.href = currentPath.replace('.html', '.en.html');
            }
        }
    }
    
    // 更新语言切换器的激活状态
    const links = document.querySelectorAll('.language-switcher a');
    links.forEach(link => {
        if ((preferredLang === 'zh' && !link.href.includes('.en.html')) ||
            (preferredLang === 'en' && link.href.includes('.en.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // 为语言切换器添加点击事件
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const isEnglishLink = this.href.includes('.en.html');
            localStorage.setItem('preferred-lang', isEnglishLink ? 'en' : 'zh');
            sessionStorage.removeItem('hasRedirected'); // 清除重定向标记，允许切换语言
        });
    });
}); 