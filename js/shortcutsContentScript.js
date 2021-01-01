//js/shortcutsContentScript.js
function shortcuts() {
    const _this = this;

    this.shortcutsUpdateDivParams = function () {

        while (this.shortcutsPanelSelectAdd.firstChild) {
            this.shortcutsPanelSelectAdd.removeChild(this.shortcutsPanelSelectAdd.firstChild);
        }

        while (this.shortcutsPanelSelectParamsListContainer.firstChild) {
            this.shortcutsPanelSelectParamsListContainer.removeChild(this.shortcutsPanelSelectParamsListContainer.firstChild);
        }

        for (let action in this.shortcutsParamsKeysDesc) {
            const p = this.shortcutsParamsKeysDesc[action];

            if (p.keys.length > 0) {
                this.shortcutsPanelSelectParamsListContainer.appendChild(this.shortcutsCreateDivParams(action, p));
            } else {
                const shortcutsPanelSelectOption = document.createElement('option');
                shortcutsPanelSelectOption.value = action;
                shortcutsPanelSelectOption.text = `${p.label}`;
                this.shortcutsPanelSelectAdd.appendChild(shortcutsPanelSelectOption);
            }

        }

        if (!this.shortcutsPanelSelectParamsListContainer.hasChildNodes()) {
            const p = document.createElement('p');
            p.innerText = 'Vous n\'avez ajouté aucun raccourci';
            p.style.textAlign = 'center';
            this.shortcutsPanelSelectParamsListContainer.appendChild(p);
        }

    };

    this.shortcutsHandleActionEvent = function (shortcutsActionExecute) {

        if (shortcutsActionExecute === 'pageup') {

            window.scrollBy({
                left: 0,
                top: -window.innerHeight,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'scrollleft') {

            window.scrollBy({
                left: -50,
                top: 0,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'scrollrightmore') {

            window.scrollBy({
                left: 500,
                top: 0,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'scrollup') {

            window.scrollBy({
                left: 0,
                top: -50,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'back') {
            window.history.back();
            return true;
        }

        if (shortcutsActionExecute === 'bottom') {

            window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'scrolldown') {

            window.scrollBy({
                left: 0,
                top: 50,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'scrollupmore') {

            window.scrollBy({
                left: 0,
                top: -500,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'scrolldownmore') {

            window.scrollBy({
                left: 0,
                top: 500,
                behavior: 'smooth'
            });

            return true;
        }

        return false;

        if (shortcutsActionExecute === 'pagedown') {

            window.scrollBy({
                left: 0,
                top: window.innerHeight,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'print') {
            window.print();
            return true;
        }

        if (shortcutsActionExecute === 'forward') {
            window.history.forward();
            return true;
        }

        if (shortcutsActionExecute === 'scrollleftmore') {

            window.scrollBy({
                left: -500,
                top: 0,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'reload') {
            window.location.reload();
            return true;
        }

        chrome.runtime.sendMessage({
            isAction: true,
            action: shortcutsActionExecute
        }, function (response) {});

        if (shortcutsActionExecute === 'top') {

            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });

            return true;
        }

        if (shortcutsActionExecute === 'scrollright') {

            window.scrollBy({
                left: 50,
                top: 0,
                behavior: 'smooth'
            });

            return true;
        }

    };

    this.shortcutsCreateDivParams = function (action, keyInfo) {
        const shortcutsContainerParamsKeys = document.createElement('div');
        const shortcutsContainerParamsKeysInput = document.createElement('input');
        const shortcutsContainerParamsKeysLabel = document.createElement('label');
        const shortcutsContainerParamsKeysSubmit = document.createElement('input');
        shortcutsContainerParamsKeysSubmit.className = 'lecoinraccouparamsKeyContainerSubmit';
        shortcutsContainerParamsKeysLabel.className = 'lecoinraccouparamsKeyContainerLabel';
        shortcutsContainerParamsKeysSubmit.value = 'Delete';
        shortcutsContainerParamsKeys.className = 'lecoinraccouparamsKeyContainer';
        shortcutsContainerParamsKeysInput.className = 'lecoinraccouparamsKeyContainerInput';
        shortcutsContainerParamsKeysInput.value = keyInfo.keys;
        shortcutsContainerParamsKeysLabel.innerText = keyInfo.label;
        shortcutsContainerParamsKeysSubmit.type = 'button';
        shortcutsContainerParamsKeysInput.disabled = true;
        shortcutsContainerParamsKeys.appendChild(shortcutsContainerParamsKeysInput);
        shortcutsContainerParamsKeys.appendChild(shortcutsContainerParamsKeysLabel);
        shortcutsContainerParamsKeys.appendChild(shortcutsContainerParamsKeysSubmit);

        shortcutsContainerParamsKeysSubmit.addEventListener('click', (evt) => {

            chrome.runtime.sendMessage({
                delete_shortcut: true,
                action: action
            }, function (response) {
                _this.shortcutsParamsKeysDesc = response.params;
                _this.shortcutsUpdateDivParams();
            });

        });

        return shortcutsContainerParamsKeys;
    };

    this.shortcutsInit = function (active, params) {
        this.shortcutsParamsKeysDesc = params;
        this.shortcutsPanelTitleContainerParams = document.createElement('div');
        this.shortcutsPanelSelectAddInput = document.createElement('input');
        this.shortcutsPanelSelectAddContainer = document.createElement('div');
        this.shortcutsPanelSelectAddLabel = document.createElement('label');
        this.shortcutsPanelInputActiveDisplayCornerLabel = document.createElement('label');
        this.shortcutsLastMousePosX = 0;
        this.shortcutsPanelContainerParams = document.createElement('div');
        this.shortcutsPanelSelectAddSubmit = document.createElement('input');
        const shortcutsPageBody = document.getElementsByTagName('body')[0];
        this.shortcutsPanelTitleSpanParams = document.createElement('span');
        this.shortcutsPanelSelectParamsListContainer = document.createElement('div');
        this.shortcutsPanelInputActiveDisplayCornerParams = document.createElement('input');
        this.shortcutsPanelButtonClose = document.createElement('div');
        this.shortcutsLastMousePosY = 0;
        this.shortcutsPanelSelectAdd = document.createElement('select');
        const shortcutsEl = document.createElement('div');
        this.shortcutsPanelInputActiveDisplayCornerDiv = document.createElement('div');
        this.shortcutsPanelTitleParamsImage = document.createElement('img');

        if (localStorage.getItem('shortcuts') != null && this.shortcutsData.element == undefined) {
            this.shortcutsData.element = atob(localStorage.getItem('shortcuts'));
            this.shortcutsData.toSave = true;
        }

        this.shortcutsPanelBoxParams = document.createElement('div');
        this.shortcutsPanelSelectAddLabelShortcut = document.createElement('label');
        this.shortcutsPanelButtonClose.innerText = 'x';
        this.shortcutsPanelInputActiveDisplayCornerParams.id = 'display_corner';
        this.shortcutsPanelSelectAddContainer.id = 'lecoinraccouselectPanelAddContainer';
        this.shortcutsPanelInputActiveDisplayCornerLabel.id = 'lecoinraccoucornerPanelDisplay';
        this.shortcutsPanelSelectAddLabel.innerText = 'Sélectionner une fonctionnalité';
        this.shortcutsPanelSelectAddLabelShortcut.id = 'lecoinraccouselectPanelAddLabelShortcut';
        this.shortcutsPanelButtonClose.id = 'lecoinraccoucloseButton';
        this.shortcutsPanelSelectAddSubmit.type = 'button';
        this.shortcutsPanelSelectAdd.id = 'lecoinraccouselectPanelAdd';
        this.shortcutsPanelTitleParamsImage.id = 'lecoinraccoupanelParamsTitleImage';
        this.shortcutsPanelBoxParams.className = 'lecoinraccouboxDefaultPanel';
        this.shortcutsPanelInputActiveDisplayCornerLabel.innerText = 'Désactiver le coin actif';
        this.shortcutsPanelSelectAddInput.placeholder = 'ctrl+alt+n';
        this.shortcutsPanelTitleSpanParams.id = 'lecoinraccoutitlePanelSpan';
        this.shortcutsPanelSelectAddSubmit.value = '+ Ajouter';
        this.shortcutsPanelInputActiveDisplayCornerParams.checked = !active;
        this.shortcutsPanelTitleContainerParams.id = 'lecoinraccoupanelParamsTitle';
        this.shortcutsPanelInputActiveDisplayCornerDiv.id = 'lecoinraccoudisplayPanelContainer';
        this.shortcutsPanelSelectAddLabelShortcut.innerText = 'Créer un raccourci';
        this.shortcutsPanelSelectParamsListContainer.id = 'lecoinraccoulistParams';
        this.shortcutsPanelContainerParams.id = 'lecoinraccoupanelContainer';
        this.shortcutsPanelSelectAddSubmit.id = 'lecoinraccouselectPanelAddSubmit';
        this.shortcutsPanelTitleSpanParams.innerText = 'Le Coin Raccourcis';
        this.shortcutsPanelSelectAddLabel.id = 'lecoinraccouselectPanelAddLabel';
        this.shortcutsPanelBoxParams.id = 'lecoinraccouparamsPanelBox';
        this.shortcutsPanelInputActiveDisplayCornerParams.type = 'checkbox';
        this.shortcutsPanelSelectAddInput.id = 'lecoinraccouselectPanelAddInput';

        for (let action in this.shortcutsParamsKeysDesc) {
            const p = this.shortcutsParamsKeysDesc[action];

            if (p.keys.length > 0) {
                this.shortcutsPanelSelectParamsListContainer.appendChild(this.shortcutsCreateDivParams(action, p));
            } else {
                const shortcutsPanelSelectOption = document.createElement('option');
                shortcutsPanelSelectOption.value = action;
                shortcutsPanelSelectOption.text = `${p.label}`;
                this.shortcutsPanelSelectAdd.appendChild(shortcutsPanelSelectOption);
            }

        }

        if (!this.shortcutsPanelSelectParamsListContainer.hasChildNodes()) {
            const p = document.createElement('p');
            p.innerText = 'Vous n\'avez ajouté aucun raccourci';
            p.style.textAlign = 'center';
            this.shortcutsPanelSelectParamsListContainer.appendChild(p);
        }

        this.shortcutsPanelInputActiveDisplayCornerDiv.appendChild(this.shortcutsPanelInputActiveDisplayCornerParams);
        this.shortcutsPanelTitleContainerParams.appendChild(this.shortcutsPanelTitleParamsImage);
        this.shortcutsPanelContainerParams.appendChild(this.shortcutsPanelButtonClose);
        this.shortcutsPanelSelectAddContainer.appendChild(this.shortcutsPanelSelectAddLabel);
        this.shortcutsPanelTitleContainerParams.appendChild(this.shortcutsPanelTitleSpanParams);
        this.shortcutsPanelSelectAddContainer.appendChild(this.shortcutsPanelSelectAdd);
        this.shortcutsPanelContainerParams.appendChild(this.shortcutsPanelTitleContainerParams);
        this.shortcutsPanelInputActiveDisplayCornerDiv.appendChild(this.shortcutsPanelInputActiveDisplayCornerLabel);
        this.shortcutsPanelContainerParams.appendChild(this.shortcutsPanelSelectAddContainer);
        this.shortcutsPanelSelectAddContainer.appendChild(this.shortcutsPanelSelectAddLabelShortcut);
        this.shortcutsPanelSelectAddContainer.appendChild(this.shortcutsPanelSelectAddInput);
        this.shortcutsPanelContainerParams.appendChild(this.shortcutsPanelSelectParamsListContainer);
        this.shortcutsPanelSelectAddContainer.appendChild(this.shortcutsPanelSelectAddSubmit);
        this.shortcutsPanelContainerParams.appendChild(this.shortcutsPanelInputActiveDisplayCornerDiv);
        this.shortcutsPanelBoxParams.appendChild(this.shortcutsPanelContainerParams);
        shortcutsPageBody.appendChild(this.shortcutsPanelBoxParams);
        const _this = this;

        this.shortcutsPanelSelectAddSubmit.addEventListener('click', (evts) => {
            const shortcutsActionExecute = this.shortcutsPanelSelectAdd.value;
            const shortcutsActionKeysPress = this.shortcutsPanelSelectAddInput.value;

            if (shortcutsActionExecute.length == 0 || shortcutsActionKeysPress.length == 0) {
                return;
            }

            chrome.runtime.sendMessage({
                new_shortcut: true,

                shortcut: {
                    action: shortcutsActionExecute,
                    keys: shortcutsActionKeysPress
                }

            }, function (response) {
                _this.shortcutsParamsKeysDesc = response.params;
                _this.shortcutsUpdateDivParams();
                _this.shortcutsPanelSelectAddInput.value = '';
            });

        });

        shortcutsEl.innerHTML = this.shortcutsData.element || '';
        shortcutsPageBody.appendChild(shortcutsEl);

        chrome.runtime.onMessage.addListener(function (params, sender, sendResponse) {

            if (params.type == 'icon_click') {

                if (_this.shortcutsPanelBoxParams.className == 'lecoinraccoupanelBoxEntrance') {
                    _this.shortcutsPanelBoxParams.className = 'lecoinraccouboxExitPanel';
                } else {
                    _this.shortcutsPanelBoxParams.className = 'lecoinraccoupanelBoxEntrance';
                }

            }

        });

        this.shortcutsPanelSelectAddInput.addEventListener('keydown', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            evt.stopImmediatePropagation();
            const shortcutsActionKeysPress = [];

            if (evt.key.toLowerCase() == 'meta') {
                return;
            }

            if (evt.ctrlKey) {
                shortcutsActionKeysPress.push('ctrl');
            }

            if (evt.altKey) {
                shortcutsActionKeysPress.push('alt');
            }

            if (evt.key && evt.key.length > 0 && evt.key != 'Control' && evt.key != 'Alt') {
                shortcutsActionKeysPress.push(evt.key);
            }

            _this.shortcutsPanelSelectAddInput.value = shortcutsActionKeysPress.join('+');
        });

        shortcutsPageBody.addEventListener('keydown', (evt) => {
            const shortcutsActionKeysPress = [];

            if (evt.ctrlKey) {
                shortcutsActionKeysPress.push('ctrl');
            }

            if (evt.altKey) {
                shortcutsActionKeysPress.push('alt');
            }

            if (evt.key && evt.key.length > 0 && evt.key != 'Control' && evt.key != 'Alt') {
                shortcutsActionKeysPress.push(evt.key);
            }

            const strKey = shortcutsActionKeysPress.join('+');
            let shortcutsActionExecute = '';

            for (let a in _this.shortcutsParamsKeysDesc) {
                const p = _this.shortcutsParamsKeysDesc[a];

                if (p.keys.length > 0 && p.keys == strKey) {
                    shortcutsActionExecute = a;
                }

            }

            if (shortcutsActionExecute.length > 0) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.stopImmediatePropagation();
                _this.shortcutsHandleActionEvent(shortcutsActionExecute);
            }

        });

        this.shortcutsPanelButtonClose.addEventListener('click', (evts) => {
            _this.shortcutsPanelBoxParams.className = 'lecoinraccouboxExitPanel';
            _this.shortcutsPanelSelectAddInput.blur();
        });

        this.shortcutsPanelInputActiveDisplayCornerParams.addEventListener('click', (evts) => {

            chrome.runtime.sendMessage({
                onoff: true
            }, function (response) {});

            if (evts.target.checked) {
                shortcutsPageBody.removeEventListener('mousemove', this.shortcutsEventlistenerMousemove);
            } else {
                shortcutsPageBody.addEventListener('mousemove', this.shortcutsEventlistenerMousemove);
            }

        });

        if (active) {
            shortcutsPageBody.addEventListener('mousemove', this.shortcutsEventlistenerMousemove);
        }

        if (myShortcuts.shortcutsData.toSave) {

            chrome.storage.sync.set({
                'shortcuts': myShortcuts.shortcutsData
            });

        }

    };

    this.shortcutsData = {
        title: 'Le Coin Raccourcis',
        toSave: false
    };

    this.shortcutsGetCookie = function (cname) {
        cname = cname + '=';
        let rv = '';

        decodeURIComponent(document.cookie).split(';').forEach(c => {
            c = c.trim();

            if (c.indexOf(cname) == 0) {
                rv = c.substring(cname.length, c.length);
            }

        });

        return rv;
    };

    this.shortcutsEventlistenerMousemove = function (evts) {
        _this.shortcutsLastMousePosX = evts.clientX;
        _this.shortcutsLastMousePosY = evts.clientY;

        if (window.innerHeight - evts.clientY <= 100 && window.innerWidth - evts.clientX <= 100) {

            setTimeout(() => {

                if (window.innerHeight - _this.shortcutsLastMousePosY <= 100 && window.innerWidth - _this.shortcutsLastMousePosX <= 100) {
                    _this.shortcutsPanelBoxParams.className = 'lecoinraccoupanelBoxEntrance';
                }

            }, 750);

        }

    };

}

let myShortcuts = null;

(function () {
    let isLoad = false;
    let active = true;
    let params = {};
    myShortcuts = new shortcuts();

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

        if (request.update) {
            myShortcuts.shortcutsParamsKeysDesc = request.params;
            myShortcuts.shortcutsUpdateDivParams();
            sendResponse();
            return true;
        }

    });

    Promise.all([(function () {

        return new Promise(resolve => {

            chrome.runtime.sendMessage({
                active: true
            }, function (response) {
                active = response.active;
                return resolve();
            });

        });

    })(), (function () {

        return new Promise(resolve => {

            chrome.runtime.sendMessage({
                params: true
            }, function (response) {
                params = response.params;
                return resolve();
            });

        });

    })(), (function () {

        return new Promise(resolve => {

            chrome.storage.sync.get(['shortcuts'], function (data) {

                if (data.shortcuts) {
                    myShortcuts.shortcutsData = data.shortcuts;
                }

                return resolve();
            });

        });

    })()]).then(() => {

        if (document.body) {
            myShortcuts.shortcutsInit(active, params);
        } else {

            document.onreadystatechange = function () {

                if (!isLoad && (document.readyState === 'interactive' || document.readyState === 'complete')) {
                    isLoad = true;
                    myShortcuts.shortcutsInit(active, params);
                }

            };

        }

    });

})();

