
async function downloadContract() {
    downloadButton.disabled = true;
    const requestData = {
      "Token": token,
      "Brand": role,
      "Email": username,
      "VIN": globalData['the-vin'],
      "Timestamp": FinishTimestamp,
      "Language": currentLanguage,
      idtoken: IDtoken,
      role: role,
    };
  
    try {
      const response = await axios.post(downloadEndpoint, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + IDtoken
        }
      });
  
      downloadButton.disabled = false;
      if (response.status === 200 || response.status === 201) {
        downloadFile(response.data, globalData["the-vin"] + "_" + globalData["the-name"] + ".pdf");
        return { success: true, data: response.data };
      } else {
        throw new Error('Server Error ' + response.status);
      }
    } catch (error) {
      downloadButton.disabled = false;
      console.log('Request failed: ' + error.message);
      alert(translator.translateForKey("errors.unkownError"));
      return { success: false, error: error.message };
    }
  }