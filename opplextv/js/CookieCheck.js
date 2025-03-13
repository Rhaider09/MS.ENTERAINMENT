function detect() {
    if (navigator.cookieEnabled) {} else {
        window.location.href = '/Cookie-Error.aspx';
    }
}