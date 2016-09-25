

var bkg = chrome.extension.getBackgroundPage();

function getLanguage(template_languages) {
    bkg.console.info('Reset settings [starting]');
    var code_lng = navigator.browserLanguage || navigator.language || navigator.userLanguage;
    var tmp_lang = code_lng.split('-')[0];
    var unknown_user_lng = true;
    for (i=0;i<template_languages['support'].length;i++){
        if(tmp_lang == template_languages['support'][i]){
            unknown_user_lng = false;
            break;
        }
    }
    if(unknown_user_lng){
        tmp_lang = 'en';
        bkg.console.log('unknown_user_lng - code_lng: '+ code_lng);
    }
    return tmp_lang;
}


function showInfoMsg(text) {
    $('#info_save_settings').text(text);
    $('#info_save_settings').fadeIn();
}
function hideInfoMsg() {
    $('#info_save_settings').fadeOut();
}
function reloadPage() {
    hideInfoMsg();
    // signal to the background page that it's time to refresh
    chrome.runtime.sendMessage({type:"refresh"});
    window.location.href="popup.html";

}

function resetSettings() {
    localStorage.removeItem('template_languages');
    localStorage.removeItem('templates_replace');
    bkg.start();
    bkg.console.info('Reset settings [completed]');
    var template_languages = JSON.parse(localStorage.getItem('template_languages'));
    var tmp_lang = getLanguage(template_languages);
    console.warn('template_languages', template_languages);
    console.warn('template_languages', template_languages['reset'][tmp_lang]);
    showInfoMsg(template_languages['reset'][tmp_lang]);
}


function openPopup() {
    var template_languages = JSON.parse(localStorage.getItem('template_languages'));
    var templates_replace = JSON.parse(localStorage.getItem('templates_replace'));
    var tmp_lang = getLanguage(template_languages);


    function changeSwitchOne() {
        var templates_replace = JSON.parse(localStorage.getItem('templates_replace'));
        templates_replace[1]['state'] = $(this).find('input').prop( "checked" );

        localStorage.setItem('templates_replace', JSON.stringify(templates_replace));
        showInfoMsg(template_languages['save'][tmp_lang]);
    }
    function changeSwitchTwo() {
        var templates_replace = JSON.parse(localStorage.getItem('templates_replace'));
        templates_replace[2]['state'] = $(this).find('input').prop( "checked" );

        localStorage.setItem('templates_replace', JSON.stringify(templates_replace));
        showInfoMsg(template_languages['save'][tmp_lang]);
    }

    $('#bSwitchOne .switchbox').click(changeSwitchOne);
    $('#bSwitchTwo .switchbox').click(changeSwitchTwo);
    $('#reset_settings').click(resetSettings);
    $('#info_save_settings').click(reloadPage);

    $('#bSwitchOne h3').text(template_languages[1][tmp_lang]);
    $('#bSwitchTwo h3').text(template_languages[2][tmp_lang]);
    $('#reset_settings').text(template_languages['reset-button'][tmp_lang]);

    $('#bSwitchOne .onoffswitch').prop('checked', templates_replace[1]['state']);
    $('#bSwitchTwo .onoffswitch').prop('checked', templates_replace[2]['state']);
    
    bkg.console.log('Reading and application settings completed.');
}



$(document).ready(function () {
    openPopup();
});
