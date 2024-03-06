let createdTimestamp;
let globalData = {};
let FinishTimestamp;
let SeeMoreModal;
let statusCode;
let shouldAppear;
let modalEl

// Get the links and form elements from the HTML document
const newContractLink = document.getElementById("new-contract-link");
const newContractModalElement = document.getElementById("newContractModal");
const SeeMoreform = document.getElementById("see-more-modal");
const MyRequestsBtn = document.getElementById("my-requests");
const downloadButton = document.getElementById('download-docs');
const expirationMessageElement = document.querySelector('#expiration-message');
const contractButton = document.getElementById('requestOfferButton');
const consentCheckbox = document.getElementById('consent-checkbox');


const fieldMap = {
    "the-name": 2,
    "months-to-cover-seemore": 3,
    "the-covered-mileage-seemore": 4,
    "see-contract-level": 5,
    "the-efit-number": 7,
    "see-ContractType": 8,
    "Extension-Type": 9,
    "the-car-model": 12,
    "the-vin": 16,
    "actual-kilometers": 18,
    "form-address": 19,
    "zip-city": 20,
    "finish-time": 21,
    "the-total-amount": 22,
    "Status": 23,
    "status-details": 24,
    "see-company-name": 25,
    "StatusCode": 26,
    "Email": 27
}
//activation/completed
const fillFormWithData = async function (rowId) {
    while (!isFetchComplete || levelsData.length > 2) {
        await new Promise(resolve => setTimeout(resolve, 100)); // wait for 100ms before checking again
    }

    const rowData = data.find(item => item[0] === parseInt(rowId, 10));
    if (!rowData) {
        console.error('No data found for ID:', rowId);
        return;
    }

    statusCode = rowData[fieldMap['StatusCode']];
    let status = rowData[fieldMap['Status']];
    let extensionType = rowData[fieldMap['Extension-Type']];
    globalData['Email'] = rowData[fieldMap['Email']];
    globalData['Extension-Type'] = extensionType;
    console.log("Extension type: " + extensionType)

    for (const fieldId in fieldMap) {
        const input = SeeMoreform.querySelector(`#${fieldId}`);
        // Skip if the fieldId does not exist in the form.
        if (!input) {
            continue;
        }
        let value = rowData[fieldMap[fieldId]];

        if (fieldId === 'see-contract-level' && value !== undefined  && (value !== "-" && value !== "No level")) {
            currentLevel = value.toString();
            input.value = levelsData[value];
            continue;
        } else if (fieldId === 'see-contract-level') {
            input.value = "-";
            continue;
        }

        if (fieldId === 'finish-time' && value !== undefined) {
            FinishTimestamp = value;
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            input.value = new Date(value).toLocaleString(undefined, options);
            continue;
        } else if (fieldId === 'finish-time') {
            input.value = "-";
            continue;
        }

         if (fieldId === 'the-total-amount' && value === undefined) {
            document.getElementById('download-docs').style.display = 'none';
            input.value = "-";
            continue;
        } else if (fieldId === 'the-total-amount') {
            price = value;
            document.getElementById('download-docs').style.display = 'block';
            //Activate button should not be displayed and the expiration message should not be displayed
            document.getElementById('activate-button').style.display = 'block';
            expirationMessageElement.style.display = 'none';
            input.value = value;
            continue;
        }

        if (fieldId === 'see-company-name') {
            companyName = value;
            console.log("Company name value is: " + companyName)
            input.value = value;
        }

        if (value === undefined && fieldId === 'the-total-amount') {
            input.value = "Processing";
        } else {
            if (fieldId === 'the-total-amount') {
                input.value = value;
            } else {
                input.value = value;
            }
        }

        if (fieldId === 'status-details' && value !== undefined) {
            input.innerHTML = value;
        } else if (fieldId === 'status-details') {
            input.value = "-";
        }

        if (value !== undefined) {
            globalData[fieldId] = value;
        }
    }

    if (statusCode !== 200) {
        downloadButton.style.display = 'none';
        document.getElementById('activate-button').style.display = 'none';
        expirationMessageElement.style.display = 'none';
    } else {
        document.getElementById('activate-button').style.display = 'block';
        expirationMessageElement.style.display = 'block';
    }

    // Checking conditions for displaying the download button
    console.log('Status is: ' + status);
    if (status === 'Completed' && extensionType === 'Activation') {
        downloadButton.style.display = 'block!important';
        downloadButton.style.visibility = 'visible';
    } else {
        downloadButton.style.display = 'none!important';
        downloadButton.style.visibility = 'hidden';
    }

    if (activateButton && ((extensionType === 'Simulation' && statusCode === 200) || (isUserAdmin() && statusCode == 500 && extensionType === 'Activation'))) {
        activateButton.style.display = 'block';
        activateButton.style.visibility = 'visible';
        activateButton.disabled = false;
        checkTimestamp();
    }


    // if (activateButton && extensionType === 'Simulation' && statusCode === 200) {
    //     activateButton.style.display = 'block';
    //     activateButton.style.visibility = 'visible';
    //     if (!isUserAdmin())
    //         checkTimestamp();
    // }
    else {
        //make sure it is not displayed 
        activateButton.style.display = 'none';
        //make sure it is not displayed as display none is not enough
        activateButton.style.visibility = 'hidden';
        expirationMessageElement.style.display = 'none';
    }

    newContractLink.style.display = "none";
    MyRequestsBtn.style.display = "block";
    console.log(
        "the code is: " + statusCode + " and the extension type is: " + extensionType + " and the user is admin: " + isUserAdmin() + " and the timestamp is: " + FinishTimestamp
        + " and the current level is: " + currentLevel + " and the price is: " + price + " and the company name is: " + companyName + " and the status is: " + status
    );


};

function resetModalForm() {
    var form = document.getElementById('new-contract-form')
    if (form) {
        form.reset();
        document.getElementById('consent-checkbox').checked = false;
    }
}

// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
    downloadButton.style.display = 'block';
    void downloadButton.offsetHeight;  // Force a repaint

    // Create new instances of the Bootstrap Modal class for each modal element
    modalEl = new bootstrap.Modal(newContractModalElement, {
        backdrop: 'static', // Disallows click outside of the modal to close
        keyboard: false // Disallows escape key to close
    });
    // const ExtensionEl = new bootstrap.Modal(Extensionform);
    SeeMoreModal = new bootstrap.Modal(SeeMoreform, {
        backdrop: 'static', // Disallows click outside of the modal to close
        keyboard: true // Allows escape key to close
    });

    document.querySelector('#see-more-modal .modal-dialog').addEventListener('click', function (e) {
        e.stopPropagation();
    });

    function resetBackgrounds() {
        const allInputsAndSelects = document.querySelectorAll('input.form-control:not(.form-select-sm), select.form-control:not(.form-select-sm)');
        allInputsAndSelects.forEach(element => {
            element.style.backgroundColor = ''; // Reset the background color
        });
    }

    // Add event listeners for modal hide events
    newContractModalElement.addEventListener('hidden.bs.modal', function () {
        resetBackgrounds();
    });



    newContractLink.addEventListener("click", async function (event) {
        //Render controls for New Contract form
        event.preventDefault();
        let retries = 0;
        const maxRetries = 10;
        const intervalTime = 1000;
        await new Promise(resolve => {
            const intervalId = setInterval(() => {
                if (UserData && UserData.Garage && UserData.CodeEFIT) {
                    clearInterval(intervalId);
                    resolve();
                } else {
                    retries++;
                    if (retries >= maxRetries) {
                        clearInterval(intervalId);
                        // document.getElementById('company-name').value = garageValue;
                        // document.getElementById('efit-number-handlercode').value = efitValue;
                        resolve();
                    }
                }
            }, intervalTime);
        });

        if (isUserAdmin()) {
            console.log("User is admin, should have write option on Garage & EFIT NR");
            document.getElementById("company-name").readOnly = false;
            document.getElementById("efit-number-handlercode").readOnly = false;
        }
        document.getElementById('company-name').value = UserData.Garage;
        document.getElementById('efit-number-handlercode').value = UserData.CodeEFIT;

        if (SeeMoreModal._isShown) {
            SeeMoreModal.hide();
        }
        if (!modalEl._isShown) {
            //when  isFetchComplete is true
            await new Promise(resolve => {
                const intervalId = setInterval(() => {
                    if (isFetchComplete) {
                        clearInterval(intervalId);
                        resolve();
                    }
                }, 100);
            });

            modalEl.show();
            consentCheckbox.checked = false;
            newContractLink.style.display = "none";
            MyRequestsBtn.style.display = "block";
        } else {
            modalEl.hide();
            newContractLink.style.display = "block";
            MyRequestsBtn.style.display = "none";
            const allInputsAndSelects = document.querySelectorAll('#newContractModal input, #newContractModal select');
            allInputsAndSelects.forEach(element => {
                element.style.backgroundColor = ''; // Reset the background color
            });

        }
    });

    //My request button logic
    MyRequestsBtn.addEventListener("click", function (event) {
        event.preventDefault()
        closeNewContractModal();
        closeSeeMoreModal();
    })
});



//Dinamic fields based on dropdown:
// Get button element outside the event listener


document.getElementById('contract-type').addEventListener('change', function () {
    const contractLevelSelect = document.getElementById('the-contract-level');
    const checkboxFooter = document.getElementById('checkbox-footer');
    if (this.value === 'false') {
        document.getElementById('Level-Area').style.display = 'block';
        document.getElementById('invoice-fields').style.display = 'block';
        document.getElementById('simulate-fields').style.display = 'flex';
        contractLevelSelect.style.display = 'block';
        contractLevelSelect.setAttribute('required', true); 
        contractButton.setAttribute('data-i18n', 'button.activateOffer');
        translator.translatePageTo(currentLanguage);
        checkboxFooter.setAttribute('required', true);
        document.getElementById('checkbox-footer').style.display = 'block';
    } else if (this.value === 'true') {
        document.getElementById('Level-Area').style.display = 'none';
        contractLevelSelect.style.display = 'none';
        contractLevelSelect.removeAttribute('required'); 
        document.getElementById('invoice-fields').style.display = 'none';
        document.getElementById('simulate-fields').style.display = 'none';
        document.getElementById('total-amount').value = '';
        document.getElementById('extension-fields').style.display = 'block';
        contractButton.setAttribute('data-i18n', 'button.requestOffer');
        translator.translatePageTo(currentLanguage);
        checkboxFooter.setAttribute('required', false);
        document.getElementById('checkbox-footer').style.display = 'none';
    }
});


// Function to check the timestamp and disable the button
function checkTimestamp() {
    if (!isUserAdmin()) {
        // convert the 'Created' timestamp to a Date object
        const finishedDate = new Date(FinishTimestamp);
        // get the current date and time
        const now = new Date();

        // calculate the difference in hours
        const diffInHours = Math.abs(now - finishedDate) / 36e5;
        ///if there is a finih time and the contract is of type
        if (document.getElementById('finish-time').value.length > 3 && !isUserObserver()) {
            if (diffInHours > 48) {
                document.querySelector('#activate-button').disabled = true;
                expirationMessageElement.style.display = 'block!important';
            }
            else {
                expirationMessageElement.style.display = 'none';
                document.querySelector('#activate-button').disabled = false;
            }
        } else {
            expirationMessageElement.style.display = 'none';
            document.querySelector('#activate-button').disabled = true;
        }
    }
    else{
        expirationMessageElement.style.display = 'none';
        document.querySelector('#activate-button').disabled = false;
    }
}

//function that closes the new contract modal
function closeNewContractModal() {
    if (modalEl._isShown) {
        modalEl.hide();
        resetModalForm();
        newContractLink.style.display = "block";
        MyRequestsBtn.style.display = "none";
    }
}

function closeSeeMoreModal() {
    if (SeeMoreModal._isShown) {
        SeeMoreModal.hide();
        newContractLink.style.display = "block";
        MyRequestsBtn.style.display = "none";
    }
}

$(document).ready(function () {
    // By default, we're setting the select color to red, because it should be red when the first child is selected.
    $("#contract-type,#the-contract-level,#the-months-to-cover,#the-covered-mileage").css("color", "rgb(220, 217, 217)");

    // Change the color based on the option selected.
    $("#contract-type,#the-contract-level,#the-months-to-cover,#the-covered-mileage").change(function () {
        var selected = $("#contract-type,#the-contract-level,#the-months-to-cover,#the-covered-mileage option:selected");
        if (selected.index() == 0) {
            $(this).css("color", "black!important");
        } else {
            $(this).css("color", "#787B80");
        }
    });
});
