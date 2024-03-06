// Add link to jQuery and jQuery UI
const jqueryScript = document.createElement('script');
jqueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
document.head.appendChild(jqueryScript);

const jqueryUIScript = document.createElement('script');
jqueryUIScript.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js';
document.head.appendChild(jqueryUIScript);

const jqueryUILink = document.createElement('link');
jqueryUILink.rel = 'stylesheet';
jqueryUILink.href = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css';
document.head.appendChild(jqueryUILink);

