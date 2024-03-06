let select2init = false;
function initializeSelect2() {
    // Check if select2 is loaded and retry after 100ms if it's not
    if (typeof $.fn.select2 !== 'function') {
        setTimeout(initializeSelect2, 100);
        return;
    }
    $('.select2').select2();
    $('.select2').next('.select2-container').addClass('form-select form-select-sm form-control model-translation');
    select2init = true;
}
initializeSelect2();

//The only solution for the search bar form gridjs(the other solution would be a ton of media queries):

$(document).ready(function(){
    function adjustWidthAndHeight() {
        var formControlWidth = $('.input-group').outerWidth(); //Get width of form-control
        var formControlHeight = $('.input-group').outerHeight(); //Get height of form-control
        $('.gridjs-search-input').css({
            'width': formControlWidth,
            'height': formControlHeight
        }); //Apply width and height to gridjs-search-input
    }

    var poll = setInterval(function(){
        if(isFetchComplete) { // If isFetchComplete is set to true
            clearInterval(poll); // Stop polling
            setTimeout(adjustWidthAndHeight, 100); // Wait 100ms then adjust the width and height
        }
    }, 100); // Poll every 100ms

    function adjustPosition() {
        var inputGroupPosition = $('.removePaddingRight').offset(); // Get position of .input-group
        $('.gridjs-search-input').offset({  left: inputGroupPosition.left }); // Set position of .gridjs-search-input
    }

    var poll = setInterval(function(){
        if(isFetchComplete) { // If isFetchComplete is set to true
            clearInterval(poll); // Stop polling
            setTimeout(function() {
                adjustPosition();
                adjustWidthAndHeight();
            }, 100); // Wait 100ms then adjust the width and position
        }
    }, 100); // Poll every 100ms

    $(window).resize(function(){ 
        adjustPosition();
        adjustWidthAndHeight();
    });
    async function loading() {
        const loadingElement = document.getElementById('loading');
        if (!loadingElement) {
            console.error("'loading' element not found in the DOM");
            return;
        }
        
        while (!isFetchComplete) {
            
            // Display loading
            loadingElement.style.display = 'block';

            // Wait for a short period before checking again
            await new Promise(resolve => setTimeout(resolve, 200));
        }
       // Stop displaying loading
        loadingElement.style.display = 'none';
    }
    loading();
});


document.addEventListener("DOMContentLoaded", function() {
    // Get all select elements
    let selects = document.querySelectorAll('select.form-control:not(.form-select-sm)');


    selects.forEach(function(select) {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.backgroundColor = 'rgb(232, 240, 254)'; // Change to the color you want
            } else {
                this.style.backgroundColor = ''; // Reset to default if no value is chosen
            }
        });
    });
    let inputs = document.querySelectorAll('input.form-control:not(.form-select-sm)');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            if (this.value) {
                this.style.backgroundColor = 'rgb(232, 240, 254)'; // Change to the color you want
            } else {
                this.style.backgroundColor = ''; // Reset to default if no value is entered
            }
        });
    });


     selectElement = document.getElementById('model');
        selectElement.addEventListener('change', function() {
            console.log(this.value);
        });

});

        




