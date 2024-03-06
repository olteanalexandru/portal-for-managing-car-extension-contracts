// Event listener for when the DOM is fully loaded
let selectElement;
window.addEventListener('DOMContentLoaded', function () {
    let checkInterval = setInterval(async function () {
        // Check if data fetching is complete
        if (isFetchComplete && translator && translator.languages.size > 0) {
            // Clear the interval
            clearInterval(checkInterval);

            // Extract unique values for models, years, and vins from the data array
            const models = [...new Set(data.map(row => row[12]))];

            // Get the select elements for model, year, and vin
            const modelSelect = document.getElementById('model');

            // Populate the dropdowns with the unique values
            populateDropdown(modelSelect, models, true, translator.translateForKey("searchForm.model.placeholder"));

            document.getElementById('search-form').addEventListener('submit', processForm);

            // Event listener for Enter key press
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.code === 'Enter') {
                    e.preventDefault(); // Prevent the default behavior (page refresh)
                    processForm(e);
                }
            });

     
     
     
                  $(function () {
                    $("#startdate, #enddate").datepicker({
                      dateFormat: 'yy/mm/dd',
                      onSelect: function () {
                        processForm({ preventDefault: function () { } });
                      }
                    });
              
                    // select2 listener
                    $("#model").on('change', function () {
                      processForm({ preventDefault: function () { } });
                    });
              
                    $("#version").on('change', function () {
                      processForm({ preventDefault: function () { } });
                    });
                  });
               



            function processForm(e) {
                e.preventDefault();


                // Create a filter criteria object based on the selected values in the dropdowns
                const filterCriteria = {};

                ['model', 'version', 'startdate', 'enddate'].forEach((id) => {
                    let value = document.getElementById(id).value;
                    if (id === 'version') {
                        if (value === 'Contract') {
                            value = false;
                        } else if (value === 'Extension') {
                            value = true;
                        } else {
                            value = null;
                        }
                    }
                    if (id === 'startdate' || id === 'enddate') {
                        // Trim the date format to match the required format
                        value = value.trim().replace(/T.*/, '').replace(/\//g, '-');
                    }
                    filterCriteria[id] = value !== "" ? value : null;
                });

                // Create a table container using the filter criteria for 'citroen'
                const tableContainer = createTable(role, filterCriteria);

                // Remove any existing table container
                const oldTableContainer = document.querySelector('.gridjs-container');
                if (oldTableContainer) {
                    oldTableContainer.remove();
                }

                // Append the new table container to the table location
                document.getElementById('table-location').appendChild(tableContainer);
            }


            // Function to populate a dropdown with options
            function populateDropdown(dropdown, options, preserveValue, placeholder) {
                // Store the currently selected value
                const currentValue = dropdown.value;

                // Remove all existing options from the dropdown
                dropdown.innerHTML = '';

                // Create a default "Choose..." option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = placeholder || 'Model';
                defaultOption.disabled = false;
                dropdown.appendChild(defaultOption);

                // Create options for each value in the options array and append them to the dropdown
                options.forEach(optionValue => {
                    const option = document.createElement('option');
                    option.value = optionValue;
                    option.textContent = optionValue;
                    dropdown.appendChild(option);
                });


                // If preserveValue is true, try to select the previously selected value
                if (preserveValue) {
                    if (options.includes(currentValue)) {
                        dropdown.value = currentValue;
                    } else {
                        dropdown.value = '';  // Select the default "Choose..." option if the current value is not available anymore
                    }
                }
            }
        }
    });


    // Refresh button to reset the model form in the main page

    $(document).ready(function () {
        document.getElementById('reset-button').addEventListener('click', function () {
            // Reset the 'version' select
            $('#version').prop('selectedIndex', 0);
            $('#startdate').val('');
            // Reset the text inputs
            $(' #enddate').val('');
            $('#model').val('').trigger('change');
        });
    });


});


