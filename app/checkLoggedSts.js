
            window.location.href = "/UserIsAuth.html";
            //do a base64 decode of the token using base64ToString and return as json 
            return JSON.parse(base64ToString(token));


       
            