let downloadFilesEndpoint = "...";

async function downloadHelpFile() {
    try {
        const response = await axios.post(downloadFilesEndpoint, {
            IdToken: IDtoken,
            Language: currentLanguage.toUpperCase(),
            Role: role,
            Token: token,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + IDtoken
            },
        });

        if (response.status === 200 || response.status === 201) {
            downloadFile(response.data, "Help_" +  ".pdf");
            return { success: true, data: response.data };
        } else {
            throw new Error('Server Error ' + response.status);
        }
    } catch (error) {
        console.log('Request failed: ' + error.message);

        return { success: false, error: error.message };
    }
}
