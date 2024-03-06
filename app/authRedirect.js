// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";
let userRoles = [];
RolesFetched = false;
/**
 * A promise handler needs to be registered for handling the
 * response returned from redirect flow. For more information, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md
 */
myMSALObj.handleRedirectPromise()
    .then(handleResponse)
    .catch((error) => {
        console.error(error);
    });


    
    async function handleResponse(response) {
        if (response !== null) {
            username = response.account.username;
            myMSALObj.setActiveAccount(response.account);
            showWelcomeMessage(username);
            await acquireToken(tokenRequest);
        } else {
            selectAccount();
        }
    }


    function selectAccount () {
        const currentAccounts = myMSALObj.getAllAccounts();
    
        if (currentAccounts.length === 0) {
            signIn()
        } else if (currentAccounts.length > 1) {
            console.warn("Multiple accounts detected.");
            // Choose an account here and set it as active.
            username = currentAccounts[0].username;
            myMSALObj.setActiveAccount(currentAccounts[0]);
            showWelcomeMessage(username);
            acquireToken(tokenRequest);
        } else if (currentAccounts.length === 1) {
            username = currentAccounts[0].username;
            myMSALObj.setActiveAccount(currentAccounts[0]);
            showWelcomeMessage(username);
            acquireToken(tokenRequest);
        }
    }



function signIn() {
 
    myMSALObj.loginRedirect(loginRequest);
}
function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */
    
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
    };

    myMSALObj.logoutRedirect(logoutRequest);
}
function showWelcomeMessage(username) {
    const usernameElement = document.getElementById("username");
    console.log("User " + username + " logged in successfully" + " at " + new Date().toString() + ".");
    if (usernameElement) {
        usernameElement.textContent = username;
    }
}

function getTokenRedirect(request) {

    request.account = myMSALObj.getAccountByUsername(username);

    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using redirect");
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenRedirect(request);
            } else {
                console.warn(error);   
            }
        });
}

let token = "";
async function acquireToken(request) {
    request.account = myMSALObj.getActiveAccount();

    if (!request.account) {
        throw new Error("No active account found");
    }

    try {
        const tokenResponse = await myMSALObj.acquireTokenSilent(request);
        token = tokenResponse.accessToken;
        IDtoken = tokenResponse.idToken;
        userRoles = decodeTokenRoles(tokenResponse.idToken);
        RolesFetched = true;

        if(isUserObserver() && userRoles.length > 0 ){
            //nav-links class should not be displayed
            document.querySelector('.nav-links').style.display = 'none';
            console.log("User is observer, should not see the nav links")
            //elemts must also eist
        } else if( userRoles.length > 0 ) {
            //nav-links class should be displayed
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.style.display = 'block';
                console.log("User is not observer, should see the nav links");
            }
        }
        

        if (typeof makeRequest === 'function') {
            try {
                let updatedData = await makeRequest(tokenResponse.accessToken, tokenResponse.idToken, role);    
                data = updatedData;
            } catch (error) {
                if (error.errorMessage && error.errorMessage.indexOf("expired") > -1) {
                    // If token has expired, sign the user out
                    console.warn("Token expired. Signing out...");
                    signOut();
                    return;
                }
                console.error(error);
            }
        }
    } catch (error) {
        
        console.warn("Silent token acquisition fails. Acquiring token using redirect");
        if (error instanceof msal.InteractionRequiredAuthError) {
            return myMSALObj.acquireTokenRedirect(request);
        } else {
            console.warn(error);
            throw error;
        }
    }
}
    
function decodeTokenRoles(token) {
        // base64 decode the token
        let tokenBody = token.split(".")[1];
        let decodedTokenBody = atob(tokenBody);
        let userRoles = JSON.parse(decodedTokenBody).roles;
   
        if(!userRoles){
            userRoles = [];
        }
        console.log("userRoles: ", userRoles);
        return userRoles;
}

function isUserAdmin(){
    return userRoles.includes('Admin');
}
function isUserObserver(){
    return userRoles.includes('Observer');
}




