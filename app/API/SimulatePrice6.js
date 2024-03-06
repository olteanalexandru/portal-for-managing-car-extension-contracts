
// List of input fields to monitor
const inputsToMonitor = [
  modelInput,
  monthsToCoverInput,
  coveredMileageInput,
  contractLevelInput
];

// Add change event listeners to each input field
if ( role == "Peugeot" || role == "Dsautomobiles" ){
inputsToMonitor.forEach(input => {
  input.addEventListener('change', () => {
    priceInput.value = ''; // Empty the price input field
  });
});
}
if (submitButton) {
submitButton.addEventListener('click', async (event) => {
  event.preventDefault();

  // Disable the button and input fields to prevent further clicks or changes during processing
  submitButton.disabled = true;
  modelInput.disabled = true;
  monthsToCoverInput.disabled = true;
  coveredMileageInput.disabled = true;
  contractLevelInput.disabled = true;

  await makeRequest3();


  async function makeRequest3() {

    const model = document.getElementById('the-brand-model').value;
    const monthsToCover = document.getElementById('the-months-to-cover').value;
    const coveredMileage = document.getElementById('the-covered-mileage').value;
    const contractLevel = document.getElementById('the-contract-level').value;

    let loadingElement;
    if (!model || !monthsToCover || !coveredMileage || !contractLevel) {

      switch (currentLanguage) {
        case 'en':
          alert('missing data for price simulation')
          break;
        case 'de':
          alert('fehlende Daten für die Preissimulation')
          break;
        case 'it':
          alert('dati mancanti per la simulazione del prezzo')
          break;
        case 'fr':
          alert('données manquantes pour la simulation de prix')
          break;
        default:
          alert('missing data for price simulation')
      }


      // Enable the button and input fields after processing
      submitButton.disabled = false;
      modelInput.disabled = false;
      monthsToCoverInput.disabled = false;
      coveredMileageInput.disabled = false;
      contractLevelInput.disabled = false;

      return;
    } else {

      loadingElement = document.createElement('div');
      loadingElement.className = 'loading-text';
      loadingElement.innerText = translator.translateForKey("actions.simulating");
      let parentElement = document.getElementById("simulate-fields");
      parentElement.appendChild(loadingElement);
    }

    try {
      const response = await axios.post(SimulatePriceEndpoint, {
        "Brand": role,
        "Model": model,
        "ContractDuration": monthsToCover,
        "ContractKilometers": coveredMileage,
        "Level": contractLevel,
        token: token,
        idtoken: IDtoken,
        role: role,
      }, {
        headers: {
          'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + IDtoken
        }
      });

      if (response.status === 200 || response.status === 201 ) {

        if (response.data === null || response.data === 0 ) {
          priceInput.value = '';
          priceInput.placeholder = '-0';
          priceInput.style.borderColor = 'red';
         

          // Disable the input and Submit button
          priceInput.disabled = true;
          requestOfferButton.disabled = true;
        } else {
          priceInput.value = response.data + " CHF"
          priceInput.style.borderColor = 'initial';
          priceInput.setCustomValidity('');

          // Enable the input and Submit button
          submitButton.disabled = false;
          modelInput.disabled = false;
          monthsToCoverInput.disabled = false;
          coveredMileageInput.disabled = false;
          contractLevelInput.disabled = false;
          priceInput.disabled = false;
          requestOfferButton.disabled = false;
        }
      }  else if ( response.status === 404  ){
        
        submitButton.disabled = false;
        modelInput.disabled = false;
        monthsToCoverInput.disabled = false;
        coveredMileageInput.disabled = false;
        contractLevelInput.disabled = false;
        priceInput.disabled = false;
        requestOfferButton.disabled = false;
        
      } else  {
        console.log(response.status + " " + response.statusText);
        throw new Error('Server Error ' + response.status);
      }
    } catch (error) {
      console.error('Request failed:', error);
      switch (currentLanguage) {
        case 'en':
          alert('No price matching ');
          break;
      case 'de':
          alert('Kein Preisvergleich '); // "Kein Preisvergleich" is a rough translation of "No price matching" into German
          break;
      case 'it':
          alert('Nessun confronto prezzi '); // "Nessun confronto prezzi" is a rough translation of "No price matching" into Italian
          break;
      case 'fr':
          alert('Aucune correspondance de prix '); // "Aucune correspondance de prix" is a rough translation of "No price matching" into French
          break;
      default:
          alert('No price matching ' );
      }
  
      console.error('Request failed: ' + error.message);
  
  } finally {
      if (loadingElement) {
          loadingElement.remove();
      }
      submitButton.disabled = false;
      modelInput.disabled = false;
      monthsToCoverInput.disabled = false;
      coveredMileageInput.disabled = false;
      contractLevelInput.disabled = false;
      submitButton.disabled = false;
  }
}
});
}
