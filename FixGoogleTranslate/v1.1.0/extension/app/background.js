
bkg = chrome.extension.getBackgroundPage();

function initLanguages() {
    var template_languages = {
        "support": ['en', 'ru'],
        1: {
            "en": "Stable work method (recommended)",
            "ru": "Стабильный метод (рекомендуется)"
        },
        2: {
            "en": "Unstable method",
            "ru": "Не стабильный метод"
        },
        "reset-button":  {
            "en": "RESET SETTINGS",
            "ru": "СБРОСИТЬ НАСТРОЙКИ"
        },
        "reset":  {
            "en": "Reset settings completed! You need to update the page. Click here.",
            "ru": "Настройки сброшены! Необходимо обновить страницу. Кликните здесь."
        },
        "save": {
            "en": "Settings saved! You need to update the page. Click here.",
            "ru": "Настройки сохранены! Необходимо обновить страницу. Кликните здесь."
        }
    };

    localStorage.setItem('template_languages', JSON.stringify(template_languages));
    bkg.console.log('+ New languages saved');
}

function getTemplatesReplace() {
    var templates_replace = {
        1: {
            tmp: ['client=te_lib', 'client=te'],
            state: true
        },
        2: {
            tmp: ['key=dummytoken', 'key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw'],
            state: false
        }
    };


    var tm;
    tm = localStorage.getItem('templates_replace');
    if(tm){
        templates_replace = JSON.parse(tm);
        bkg.console.log('get settings', tm);
    }else {
        localStorage.setItem('templates_replace', JSON.stringify(templates_replace));
        bkg.console.log('+ New settings saved');
    }
    return templates_replace;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        tabId = request.tabid;

        // if this is a refresh request, refresh the tab if it has been set
        if(request.type == "refresh" && tabId !== null) {
            chrome.tabs.reload(tabId);
        }
    });

function start() {
    bkg.console.info("launch Fix Google Translate");
    initLanguages();                // initialization templates for languages
    var a = getTemplatesReplace();  // initialization templates for replace

    var currentTabId = -1;          // initialization default tab

    chrome.tabs.getSelected(null, function(tab){
        currentTabId = tab.id;

    });

    var callback = function(details) {
        if( details.url.indexOf('client=te_lib') > -1){

            bkg.console.warn('++ Request caught:  '+JSON.stringify(details.url));
            var templates_replace = getTemplatesReplace();
            console.log("templates_replace", templates_replace);
            for(item in templates_replace){
                if(templates_replace[item]['state']) {
                    var mod_url = details.url.replace(templates_replace[item]['tmp'][0], templates_replace[item]['tmp'][1]);
                    bkg.console.info("++ Request replace: "+ "\""+ mod_url +"\"");
                }else{
                    bkg.console.info("++ All solution ["+item+"] is off-mode." + "\n\n");
                }
            }
            bkg.console.log("");

        }
        return {redirectUrl: mod_url};

    };
    var filter = {urls: ["http://*/*", "https://*/*"], tabId: currentTabId };
    var opt_extraInfoSpec = ['blocking'];

    chrome.webRequest.onBeforeRequest.addListener(
        callback, filter, opt_extraInfoSpec);

}

start();