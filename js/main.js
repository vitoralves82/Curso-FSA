// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    let currentLanguage = 'pt';
    let translations = {};
    
    let completedChapters = JSON.parse(localStorage.getItem('fsaCompletedChapters')) || [];

    const contentContainer = document.getElementById('content-container');
    const navContainer = document.getElementById('sidebar-nav');
    const translateBtn = document.getElementById('translate-btn');

    const navStructure = [
        {
            part: null,
            items: [
                { id: 'welcome', key: 'nav_home', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>' },
            ]
        },
        {
            part: { key: 'sidebar_subtitle_p3' },
            items: [
                { id: 'chapter9', key: 'nav_ch9', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-9-5.747h18"></path></svg>' },
                { id: 'chapter10', key: 'nav_ch10', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>' },
                { id: 'chapter11', key: 'nav_ch11', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>' },
                { id: 'chapter12', key: 'nav_ch12', icon: '<svg class="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.5h-8.01a1.125 1.125 0 01-1.125-1.125v-6.75a1.125 1.125 0 011.125-1.125h9.741c.496 0 .962.188 1.305.524l3.385 3.385c.336.343.524.81.524 1.305v.242a2.25 2.25 0 01-1.125 2.062l-6.75 3.375a2.25 2.25 0 01-2.062-1.125z" /></svg>' },
                { id: 'chapter13', key: 'nav_ch13', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>' }
            ]
        },
        {
            part: { key: 'sidebar_subtitle_p4' },
            items: [
                { id: 'chapter14', key: 'nav_ch14', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>'}
            ]
        },
        {
            part: { key: 'sidebar_tools' },
            items: [
                { id: 'flashcards', key: 'nav_flashcards', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>' },
                { id: 'mock-exam', key: 'nav_quiz', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>' }
            ]
        }
    ];

    const renderNav = (activePageId) => {
        let navHTML = '';
        navStructure.forEach(section => {
            if (section.part) {
                navHTML += `<h3 class="px-6 mt-4 mb-2 text-xs font-bold text-gray-500 uppercase i18n" data-key="${section.part.key}">${section.part.key}</h3>`;
            }
            section.items.forEach(item => {
                const isCompleted = completedChapters.includes(item.id);
                const isActive = item.id === activePageId;
                const checkIcon = isCompleted ? `<svg class="w-5 h-5 text-green-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>` : '';
                const activeClass = isActive ? 'active' : '';

                navHTML += `
                <a href="#${item.id}" class="sidebar-link ${activeClass} flex items-center px-6 py-3 text-gray-700 font-semibold" data-pageid="${item.id}">
                    ${item.icon}
                    <span class="i18n" data-key="${item.key}">${item.key}</span>
                    ${checkIcon}
                </a>
                `;
            });
        });
        navContainer.innerHTML = navHTML;
    };

    const saveProgress = (pageId) => {
        if (pageId.startsWith('chapter') && !completedChapters.includes(pageId)) {
            completedChapters.push(pageId);
            localStorage.setItem('fsaCompletedChapters', JSON.stringify(completedChapters));
        }
    };
    
    const loadContent = async (pageId) => {
        try {
            const response = await fetch(`content/${pageId}.html`);
            if (!response.ok) throw new Error(`Content not found for ${pageId}`);
            
            contentContainer.innerHTML = await response.text();

            if (window.renderMarkdownContainers) {
                window.renderMarkdownContainers(contentContainer);
            }
            
            saveProgress(pageId);
            renderNav(pageId);
            applyTranslations(); // Garante que as traduções sejam aplicadas ao novo conteúdo e à navegação recriada
            
        } catch (error) {
            console.error('Failed to load content:', error);
            contentContainer.innerHTML = `<p class="p-8 text-red-500">Error loading content. Please check the console.</p>`;
        }
    };

    const loadTranslations = async (lang) => {
        try {
            const response = await fetch(`lang/${lang}.json`);
            translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            alert('Could not load translation file. Check for syntax errors in your JSON.');
        }
    };
    
    const applyTranslations = () => {
        document.querySelectorAll('.i18n').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });
    };
    
    // **FUNÇÃO DE TRADUÇÃO OTIMIZADA**
    const toggleLanguage = async () => {
        currentLanguage = (currentLanguage === 'pt') ? 'en' : 'pt';
        await loadTranslations(currentLanguage);
        // Simplesmente reaplica as traduções em toda a página.
        // Isso é mais eficiente do que recarregar todo o conteúdo.
        applyTranslations(); 
        document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';
    };

    navContainer.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            e.preventDefault();
            const pageId = link.dataset.pageid;
            window.location.hash = pageId;
        }
    });

    const handleRouteChange = () => {
        const pageId = window.location.hash.substring(1) || 'welcome';
        loadContent(pageId);
    };

    const init = async () => {
        translateBtn.addEventListener('click', toggleLanguage);
        window.addEventListener('hashchange', handleRouteChange);
        
        await loadTranslations(currentLanguage);
        handleRouteChange();
    };

    init();
});