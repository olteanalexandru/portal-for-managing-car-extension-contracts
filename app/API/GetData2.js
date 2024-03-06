let UserData;

async function makeRequest(token, IDtoken, role, currentLanguage) {
  // Add client-side validation
  if (!token || !IDtoken) {
    throw new Error('Invalid input: a valid token is required');
  }
  try {
    const response = await axios.post(apiUrl, {
      token: token,
      idtoken: IDtoken,
      role: role
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + IDtoken
      }
    });

    if (response.status === 200) {
      console.log(response.data);
      const ceva = response.data.Requests.value
      const newData = response.data.Requests.value
      .filter(item => item.StatusCode !== 204)
      .map(payload => [
        payload.ID,
        payload.Brand,
        payload.ClientName,
        payload.ContractDuration,
        payload.ContractKilometers,
        payload.ContractType,
        payload.Created,
        payload.EFITHandlerCode,
        payload.Extension,
        payload.ExtensionType,
        payload.HandlerName,
        payload.ItemInternalId,
        payload.Model,
        payload.Created,
        payload.UserLanguage,
        payload.ContractType,
        payload.VIN,
        payload.Level,
        payload.ActualCarKilometers,
        payload.ClientAddress,
        payload.ClientPostalCode,
        payload.TimeStampEnd,
        payload.Price,
        payload.Status,
        payload.StatusDetails,
        payload.CompanyName,
        payload.StatusCode,
        payload.Email
      ])

      UserData = response.data.UserData;

      //Brand is also mapped for debugging purposes
      modelsData = response.data.Models.value
        .filter((item, index, self) => {
          return index === self.findIndex(t => (
            t.Model === item.Model
          ));
        })
        .filter(item => item.Brand === selectedBrand)
        .map(payload => ({
          Model: payload.Model,
          Brand: payload.Brand,
        }))

      levelsData = response.data.Levels.value
        .filter(item => item.Brand === selectedBrand)
        .map(payload => ({
          Level1: payload.Level1,
          Level2Plus: payload.Level2Plus,
          Level3: payload.Level3,
        }))

        console.log("modelsData: " + JSON.stringify(modelsData, null, 2),"Brandul:" +  selectedBrand);

      // assuming that levelsData always have at least one element
      let level = levelsData[0];
      levelsData = {
        "1": level.Level1,
        "2+": level.Level2Plus,
        "3": level.Level3
      }

      data = newData;
      // Update the variable to true since the fetch is complete
      isFetchComplete = true;
      // Return the updated data array
      return newData;
    } else {
      throw new Error('Request failed with status ' + response.status);
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      alert(translator.translateForKey("errors.TokenExpired"));
    } else {
    alert(translator.translateForKey("errors.unkownError"));
    }
  }
}

async function waitForFetchCompletion() {
  while (!isFetchComplete) {
    try {
      // Wait for a short period before checking again
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      throw new Error('Waiting for fetch completion failed: ' + error.message);
    }
  }
}

async function waitForFetchCompletionAndGenerateGrid(brand) {
  try {
    while (!isFetchComplete) {
      // Wait for a short period before checking again
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Call the function to wait for fetch completion
    await waitForFetchCompletion();

    //if current language is not fr/de/it then set it to de
    if (currentLanguage !== "fr" && currentLanguage !== "de" && currentLanguage !== "it") {
      currentLanguage = "de";
    }

    // Create the table and append it to the table location
    const tableContainer = createTable(brand, {}, currentLanguage);
    document.getElementById('table-location').appendChild(tableContainer);

    modelsData.forEach(item => {
      let model = item.Model
      $('#the-brand-model').append(`<option value="${model}">${model}</option>`);
    });


    Object.entries(levelsData).forEach(([key, value]) => {
      if (value !== undefined) {
          $('#the-contract-level').append(`<option value="${key}">${value}</option>`);
      } else {
          console.warn(`Undefined value for key: ${key}`);
      }
  });


    console.log("userData:" + JSON.stringify(UserData, null, 2));
    console.log("garage:" + UserData.Garage);
  } catch (error) {
    console.error('Waiting for fetch completion failed: ' + error.message);
  }
}