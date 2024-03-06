function downloadFile(base64Data, fileName) {
    //This file contains the script that will be used to transform the Base64 data from server to files

    // Will replace 'base64data' with the actual Base64-encoded data received from the API
    let base64data =base64Data;
    // Decode the Base64 data to its binary representation
    let binaryData = atob(base64data);
    // Convert the binary data to a Uint8Array
    let uint8Array = new Uint8Array(binaryData.length);
    for (var i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    let blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link
    let downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);

    // Set the filename for the download link (replace 'example.xlsx' with the actual file name and extension)
    downloadLink.download = fileName;

    // Programmatically click the download link
    downloadLink.click();

    // Clean up the URL object
    URL.revokeObjectURL(downloadLink.href);
}