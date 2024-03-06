let isFetchComplete = false;
let data = [];
let modelsData = [];
let levelsData = [];
let Level1;
let Level2;
let Level2Plus;
let Level3;
let IDtoken;
let currentLevel;
let price;
let newContractRequestData;


const form = document.getElementById('new-contract-form');
const submitButton = document.getElementById('simulate-price');
const totalAmount = document.getElementById('total-amount');
const modelInput = document.getElementById('the-brand-model');
const monthsToCoverInput = document.getElementById('the-months-to-cover');
const coveredMileageInput = document.getElementById('the-covered-mileage');
const contractLevelInput = document.getElementById('the-contract-level');
const requestOfferButton = document.querySelector('.btn-submit');
const priceInput = document.getElementById('total-amount');
const efitNumber = document.getElementById('efit-number-handlercode').value;
let companyName;

function getRequestDataFromNewForm() {
  // companyName = UserData.Garage;
  const contractlevel = document.getElementById('the-contract-level').value;
  const clientName = document.getElementById('name-surname-client').value;
  const clientAddress = document.getElementById('client-address').value;
  const clientPostalCode = document.getElementById('zip-city').value;
  const model = document.getElementById('the-brand-model').value;
  const vin = document.getElementById('vin-number-client').value;
  const actualCarKilometers = document.getElementById('actual-kilometers').value;
  const contractDuration = document.getElementById('the-months-to-cover').value;
  const contractKilometers = document.getElementById('the-covered-mileage').value;
  const price = document.getElementById('total-amount').value;
  const contractType = document.getElementById('contract-type').value;

  return {
    "Token": token,
    "Level": contractType === "true" ? "-" : contractlevel,
    "Brand": role,
    "CompanyName": document.getElementById('company-name').value,
    "Model": model,
    "ContractDuration": contractDuration,
    "ContractKilometers": contractKilometers,
    "ContractType": contractType === "true" ? "-" : contractlevel,
    "VIN": vin.toUpperCase(),
    "ActualCarKilometers": actualCarKilometers,
    "UserLanguage": currentLanguage,
    "HandlerName": username,
    // "EFITHandlerCode": efitNumber || document.getElementById('efit-number-handlercode').value,
    "EFITHandlerCode": document.getElementById('efit-number-handlercode').value,
    "ClientName": clientName,
    "ExtensionType": contractType === "true" ? "Simulation" : "Activation",
    "ClientAddress": clientAddress,
    "ClientPostalCode": clientPostalCode,
    "Extension": contractType === "true" ? true : false,
    "Email": username,
    "price": document.getElementById('total-amount').value,
    idtoken: IDtoken,
    role: isUserAdmin() ? "Admin" : role,
    Role: isUserAdmin() ? "Admin" : role
  };
}

async function makeRequestContract(event) {
  event.preventDefault();
  async function waitForToken() {
    const checkToken = () => {
      return new Promise((resolve) => {
        if (token.length > 5) {
          resolve(token);
        } else {
          setTimeout(() => resolve(checkToken()), 100);
        }
      });
    };

    return await checkToken();
  }
  token = await waitForToken();
  newContractRequestData = getRequestDataFromNewForm();
  if (newContractRequestData.price !== '') {
    newContractRequestData.price = newContractRequestData.price.replace(/[^0-9,.]/g, '');
  }
  else{
    newContractRequestData.price = 0;
  }
  newContractRequestData.Price = newContractRequestData.price;

  try {
    onContractRequestStart();
    const response = await axios.post(CreateContractEndPoint, newContractRequestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + IDtoken
      }
    });
    console.log(newContractRequestData);
    onContractRequestEnd();

    event.target.reset();
    if (response.status === 200 || response.status === 201) {
      refreshBtnTrigger();
      return { success: true, data: response.data };
    } else {
      throw new Error('Request failed with status ' + response.status);
    }
  } catch (error) {
    onContractRequestEnd();
    if (error.response && error.response.status === 403) {
      alert(translator.translateForKey("errors.TokenExpired"));
    } else {
      alert(translator.translateForKey("errors.unkownError"));
    }
    return { success: false, error: error.message };
  }
}

document.querySelector('.new-contract-form').addEventListener('submit', handleNewFormSubmit);
async function handleNewFormSubmit(event) {
  event.preventDefault();

  let form = document.querySelector('.new-contract-form');
  let formElements = form.elements;

  // Get the terms and conditions checkbox
  let termsCheckbox = document.getElementById('consent-checkbox');
  contractType = document.getElementById('contract-type').value;

  if (!termsCheckbox.checked && contractType === "false" ) {
    // If the terms and conditions checkbox is not checked, prevent the form submission and show the modal
    alert(translator.translateForKey("errors.tacAgreementNeeded"));
    event.preventDefault();
    return;
  }

  let formValid = true;

  let totalAmountField = document.getElementById('total-amount');
  if (contractType === 'true') { // Extension
    if (totalAmountField.value !== '') {
      formValid = false;
      //TODO: Translate
      alert('Total amount must be empty for extension type');
    }
  }
  if (contractType === 'false') { // Activation
    if (totalAmountField.value === '') {
      formValid = false;
      //alert based on language selected in currentLanguage
      alert(translator.translateForKey("validation.totalAmountMissing"));
    }
  }

  // Check for empty fields in the form
  for (let i = 0; i < formElements.length - 1; i++) {
    if (formElements[i].required && formElements[i].value === '') {
      formValid = false;
      //TODO: translate
      switch (currentLanguage) {
        case 'en':
          alert('Please fill in all required fields')
          break;
        case 'de':
          alert('Bitte füllen Sie alle Pflichtfelder aus')
          break;
        case 'it':
          alert('Si prega di compilare tutti i campi obbligatori')
          break;
        case 'fr':
          alert('Veuillez remplir tous les champs obligatoires')
          break;
        default:
          alert('Please fill in all required fields')
      }
      break;
    }
  }

  if (formValid) {
    var result = await makeRequestContract(event);
    if(result.success){
      event.target.reset();
      // Start hiding the modal
      closeNewContractModal()
      //Failsafe:
      $('#newContractModal').on('hidden.bs.modal', function () {
        document.getElementById("new-contract-link").style.display = "block";
        document.getElementById("my-requests").style.display = "none";
      });
  
      document.getElementById("new-contract-link").style.display = "block";
      document.getElementById("my-requests").style.display = "none";
    }
  }
}

function onContractRequestStart(){
  //disable "Request Offer" button
  document.getElementById("requestOfferButton").setAttribute("disabled", "disabled");

  let loadingElement = document.createElement('div');
  loadingElement.className = 'loading-text';
  loadingElement.id = "loading-request-offer";
  loadingElement.innerText = translator.translateForKey("actions.requesting");
  const requestOfferButton = document.getElementById("requestOfferButton");
  if (requestOfferButton) {
    let parentElement = requestOfferButton.parentElement;
    if (parentElement) {
      parentElement.appendChild(loadingElement);
    }
  }
  document.getElementsByClassName('gridjs-container')[0].style.display = 'none';
  document.getElementById('loading').style.display = 'block';

}

function onContractRequestEnd(){
  //enable "Request Offer" button
  document.getElementById("requestOfferButton").removeAttribute("disabled");

  let loadingElement = document.getElementById("loading-request-offer");
  if (loadingElement) {
    loadingElement.remove();
  }
  document.getElementsByClassName('gridjs-container')[0].style.display = 'block';
  document.getElementById('loading').style.display = 'none';
}