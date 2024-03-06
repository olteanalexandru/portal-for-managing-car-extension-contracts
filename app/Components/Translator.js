let translator;
let preferredLanguageFromLocalStorage;
let currentLanguage;
// localStorage.setItem("preferred_language", " ");

function getStoredLanguage() {
    preferredLanguageFromLocalStorage = localStorage.getItem("preferred_language");
    console.log("preferredLanguageFromLocalStorage", preferredLanguageFromLocalStorage);
}

async function waitForUserLanguage() {
    try {
        getStoredLanguage();

        if (!['de', 'it', 'fr'].includes(preferredLanguageFromLocalStorage)) {
            const UserData = await waitForUserData();
            if (UserData.Language) {
                UserData.Language = UserData.Language.toLowerCase();
            }
            currentLanguage = ['de', 'it', 'fr'].includes(UserData.Language) ? UserData.Language : 'de';
            localStorage.setItem("preferred_language", currentLanguage);
            return currentLanguage;
        } else {
            currentLanguage = preferredLanguageFromLocalStorage;
            return currentLanguage;
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}




async function initializeTranslator() {
    let preferredLanguage = await waitForUserLanguage();
    console.log("preferredLanguage:", preferredLanguage);
    translator = new Translator({
        defaultLanguage: "de",
        detectLanguage: true,
        selector: "[data-i18n]",
        debug: false,
        registerGlobally: "__",
        persist: true,
        persistKey: "preferred_language",
        filesLocation: '../Translations/'
    });

    translator.fetch(["de", "fr", "it"]).then(() => {
        translator.translatePageTo(preferredLanguage);
        let preferredLanguageLink = document.querySelector(`.language-link[value="${preferredLanguage}"]`);
        if (preferredLanguageLink) {
            preferredLanguageLink.classList.add('selected');
        }
        registerLanguageToggle();
    });

}

function waitForUserData() {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (UserData) {
                if (UserData.Language) {
                    UserData.Language = UserData.Language.toLowerCase();
                } else {
                    UserData.Language = 'de';
                }
                clearInterval(interval);
                resolve(UserData);
                console.log("UserData:", UserData.Language);
            }
        }, 10);
    });
}

function registerLanguageToggle() {
    let languageLinks = document.querySelectorAll('.language-link');

    languageLinks.forEach(link => {
        link.addEventListener('click', async evt => {
            evt.preventDefault();
            let language = link.getAttribute('value');
            await translator.translatePageTo(language);
            languageLinks.forEach(link => {
                link.classList.remove('selected');
            });
            link.classList.add('selected');
            localStorage.setItem("preferred_language", language);
        });
    });
}
if (window.location.pathname.split("/").pop() !== "UserIsAuth.html") {

    document.addEventListener("DOMContentLoaded", async () => {
        let lang = await waitForUserLanguage();
        currentLanguage = lang;

        initializeTranslator();

        document.querySelector("button").addEventListener("click", () => {
            console.log(__("dialog.content"));
        });
    });

    document.addEventListener("DOMContentLoaded", async () => {
        //This is the only way placeholders are translated:
        const translations = {
            'it': {
                start: 'Data inizio',
                end: 'Data fine',
                name: 'John Doe',
                model: 'Modello:',
                address: 'Thurgauerstrasse 35, 8050 Zurigo, Svezia',
                vin: 'WF0FXXWPCFDR12345',
                requestType: 'Tipo di richiesta di garanzia',
                contract: 'Contratto di garanzia',
                extension: 'Estensione garanzia',
                startDate: 'Data inizio:',
                endDate: 'Data fine:',
                zipCity: '8050',
                companyName: 'Peugeot Svizzera SA',
                efitNumber: '12347658',
                actualKilometers: '125000',
                monthsToCover: 'Mesi da coprire',
                coveredKilometers: 'Kilometri coperti',
                submit: 'Invia'
            },
            'en': {
                start: 'Start Date',
                end: 'End Date',
                name: 'John Doe',
                model: 'Model:',
                address: 'Thurgauerstrasse 35, 8050 Zürich, Sweden',
                vin: 'WF0FXXWPCFDR12345',
                requestType: 'Warranty Request Type',
                contract: 'Warranty Contract',
                extension: 'Warranty Extension',
                startDate: 'Start Date:',
                endDate: 'End Date:',
                zipCity: '8050',
                companyName: 'Peugeot Suisse SA',
                efitNumber: '12347658',
                actualKilometers: '125000',
                monthsToCover: 'Months to Cover',
                coveredKilometers: 'Covered Kilometers',
                model: 'Model:',
                submit: 'Submit'
            },
            'de': {
                start: 'Startdatum',
                end: 'Enddatum',
                name: 'John Doe',
                model: 'Modell:',
                address: 'Thurgauerstrasse 35, 8050 Zürich, Schweden',
                vin: 'WF0FXXWPCFDR12345',
                requestType: 'Garantieanfragetyp',
                contract: 'Garantievertrag',
                extension: 'Garantieverlängerung',
                startDate: 'Startdatum',
                endDate: 'Enddatum',
                zipCity: '8050',
                companyName: 'Peugeot Suisse SA',
                efitNumber: '12347658',
                actualKilometers: '125000',
                monthsToCover: 'Monate abdecken',
                coveredKilometers: 'Abgedeckte Kilometer',
                model: 'Modell:',
                submit: 'Einreichen'
            },
            'fr': {
                start: 'Date de début',
                end: 'Date de fin',
                name: 'John Doe',
                model: 'Modèle:',
                address: 'Thurgauerstrasse 35, 8050 Zürich, Suède',
                vin: 'WF0FXXWPCFDR12345',
                requestType: 'Type de demande de garantie',
                contract: 'Contrat de garantie',
                extension: 'Extension de garantie',
                startDate: 'Date de début',
                endDate: 'Date de fin',
                zipCity: '8050',
                companyName: 'Peugeot Suisse SA',
                efitNumber: '12347658',
                actualKilometers: '125000',
                monthsToCover: 'Mois à couvrir',
                coveredKilometers: 'Kilomètres couverts',
                model: 'Modèle:',
                submit: 'Soumettre'
            }
        };


        // Find the inputs
        let startDateInput = document.getElementById('startdate');
        let endDateInput = document.getElementById('enddate');
        let nameInput = document.getElementById('name-surname-client');
        let addressInput = document.getElementById('client-address');
        let vinInput = document.getElementById('vin-number-client');
        let zipCityInput = document.getElementById('zip-city');
        let companyNameInput = document.getElementById('company-name');
        let efitNumberInput = document.getElementById('efit-number-handlercode');
        let actualKilometersInput = document.getElementById('actual-kilometers');
        let monthsToCoverInput = document.getElementById('the-months-to-cover');
        let coveredKilometersInput = document.getElementById('the-covered-mileage');
        let SubmitRegister = document.getElementById('SubmitRegister');
        //  let modelTranslationClass = document.getElementsByClassName('model-translation');

        let lang = await waitForUserLanguage();

        // Update the placeholders
        if (startDateInput) startDateInput.placeholder = translations[lang].start;
        if (endDateInput) endDateInput.placeholder = translations[lang].end;
        if (nameInput) nameInput.placeholder = translations[lang].name;
        if (addressInput) addressInput.placeholder = translations[lang].address;
        if (vinInput) vinInput.placeholder = translations[lang].vin;
        if (zipCityInput) zipCityInput.placeholder = translations[lang].zipCity;
        if (companyNameInput) companyNameInput.placeholder = translations[lang].companyName;
        if (efitNumberInput) efitNumberInput.placeholder = translations[lang].efitNumber;
        if (actualKilometersInput) actualKilometersInput.placeholder = translations[lang].actualKilometers;
        if (monthsToCoverInput) monthsToCoverInput.placeholder = translations[lang].monthsToCover;
        if (coveredKilometersInput) coveredKilometersInput.placeholder = translations[lang].coveredKilometers;
        if (SubmitRegister) SubmitRegister.value = translations[lang].submit;
    });
} else {
    document.addEventListener("DOMContentLoaded", async () => {
        await waitForUserLanguage();
        initializeTranslator();

        let lang = currentLanguage;
        let langSelector = document.querySelector('.language-link[value="' + lang + '"]');
        if (langSelector) {
            langSelector.classList.add('selected');
        }
    });
}