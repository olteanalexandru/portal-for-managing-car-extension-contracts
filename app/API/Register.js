
function getStoredLanguage() {
    preferredLanguageFromLocalStorage = localStorage.getItem("preferred_language");
    console.log("preferredLanguageFromLocalStorage", preferredLanguageFromLocalStorage);
}

async function DisplayCurrentLangage() {
    try {
        getStoredLanguage();
 if (['de', 'it', 'fr'].includes(preferredLanguageFromLocalStorage)) {
            Preselectedlanguage = preferredLanguageFromLocalStorage;
            document.getElementById("SelectedLanguage").value = language.toLowerCase();
        } 
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function Register() {
    // Get form data
    const efit = document.getElementById("efit").value;
    const garage = document.getElementById("garage").value;
    const email = document.getElementById("mail").value;
    const brands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(brand => brand.value);
    const currentLanguage = document.getElementById("SelectedLanguage").value.toUpperCase();
  let preferredLanguageFromLocalStorage 
let language = "de";


    async function waitForUserLanguage() {
        try {
            getStoredLanguage();

            if (currentLanguage && ['de', 'it', 'fr'].includes(currentLanguage)) {
                language = currentLanguage;
            } else if (['de', 'it', 'fr'].includes(preferredLanguageFromLocalStorage)) {
                language = preferredLanguageFromLocalStorage;
            } else {
                language = "de";
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }





    // Check if brands array is empty
    if (brands.length === 0) {
        throw new Error("Please select at least one brand");
    }

    // Create request body
    const requestBody = {
        efit,
        garage,
        email,
        brands,
        language
    };

    console.log(requestBody); // Log the request body

    // Send HTTP POST request to Logic App
    try {
        waitForUserLanguage();
        const response = await axios.post("...", JSON.stringify(requestBody), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': 'Bearer ' + AccessToken
            }
        });

        console.log(response.data);
        // Handle success response
        return { success: true, data: response.data };
    } catch (error) {
        console.error(error);
        // Handle error response
        return { success: false, error: error.message };
    }
}

document.getElementById("RegisterForm").addEventListener("submit", async function (event) {
    // Prevent default form submit
    event.preventDefault();

    // Call Register function
    try {
        const result = await Register();

        // Handle result
        if (result.success) {
            // Handle success
            alert("Registration successful");
        } else {
            // Handle error
            alert("Registration failed");
        }
    } catch (error) {
        // Handle error
        alert(error.message);
    }
});

