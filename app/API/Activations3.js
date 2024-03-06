//test
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

function createJSONFromViewFormData(){
  return {
    "Token": token,
    "Level": currentLevel,
    "Brand": role,
    "CompanyName": globalData['see-company-name'],
    "Model": globalData['the-car-model'],
    "ContractDuration": globalData['months-to-cover-seemore'],
    "ContractKilometers": globalData['the-covered-mileage-seemore'],
    "ContractType": currentLevel,
    "VIN": globalData['the-vin'],
    "ActualCarKilometers": globalData['actual-kilometers'],
    "Price": price,
    "UserLanguage": currentLanguage,
    "HandlerName": username,
    "EFITHandlerCode": globalData['the-efit-number'],
    "ClientName": globalData['the-name'],
    "ExtensionType": "Activation",
    "ClientAddress": globalData['form-address'],
    "ClientPostalCode": globalData['zip-city'],
    "Email": globalData['Email'],
    "Timestamp": FinishTimestamp,
    "Status": "Completed",
    IdToken: IDtoken,
    role: isUserAdmin() ? "Admin" : role,
    Role: isUserAdmin() ? "Admin" : role
  };
}



async function activateExtension(event) {
  event.preventDefault();
  token = await waitForToken();

  let requestData = createJSONFromViewFormData();
  requestData.Extension = true;

  try {
      const response = await axios.post(ActivateSimulationEndpoint, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + IDtoken
      }
    });

    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    } else {
      throw new Error('Server Error ' + response.status);
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      alert(translator.translateForKey("errors.TokenExpired"));
    } else {
    console.log('Request failed: ' + error.message);
    alert(translator.translateForKey("errors.unkownError"));
    }
    return { success: false, error: error.message };
  }
}

async function activateContract(event) {
  event.preventDefault();
  token = await waitForToken();

  let requestData = createJSONFromViewFormData();
  requestData.Extension = false;
  requestData.price = requestData.Price;

  const response = await axios.post(CreateContractEndPoint, requestData, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + IDtoken
    }
  });

  if (response.status === 200 || response.status === 201) {
    return { success: true, data: response.data };
  } else {
    throw new Error('Server Error ' + response.status);
  }
}

const activateButton = document.getElementById('activate-button');
activateButton.addEventListener('click', async (event) => {
  event.preventDefault();
  activateButton.disabled = true;
  try {
    let response = (globalData['see-ContractType'] == true) ? 
      await activateExtension(event):
      await activateContract(event);

    activateButton.disabled = false;
    if (response.success) {
      if((globalData['see-ContractType'] == true))
        alert(translator.translateForKey("requestSuccess.extensionActivated"));
      if((globalData['see-ContractType'] == false))
        alert(translator.translateForKey("requestSuccess.contractActivated"));
      closeSeeMoreModal()
      refreshBtnTrigger();
    }
  }
  catch (e) {
    activateButton.disabled = false;
    alert(translator.translateForKey("errors.unkownError"));
    return { success: false, error: e.message };
  }
}
);
