
async function downloadTermsAndConditions() {
  let theContractLevelInput = document.getElementById('the-contract-level');

  const requestData = {
    "Brand": role,
    "Language": currentLanguage.toUpperCase(),
    "Level": theContractLevelInput.value,
    token: token,
    idtoken: IDtoken,
    role: role,
  };
  //level value is the text that is currently in the input field not the value of the option
  if(!theContractLevelInput.value)
  {
    alert(translator.translateForKey("errors.contractLevelNotSelected"));
  }

  try {
    const response = await axios.post(termsEndpoint, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + IDtoken
      }
    });

    if (response.status === 200 || response.status === 201) {
      downloadFile(response.data, "TaC_" + levelsData[theContractLevelInput.value] + ".pdf");
      return { success: true, data: response.data };
    } else {
      throw new Error('Server Error ' + response.status);
    }
  } catch (error) {
    console.log('Request failed: ' + error.message);

    return { success: false, error: error.message };
  }
}