export default class ABTester {
    constructor (config) {    
        this.variants = config.variants;
        this.analytics = window.ga ? true : false;
        /* Dev mode - return given variant */
        if (this.devMode()) {
            return this.setDevModeVariant();
        }
        let variantId = this.readCookie(config.cookieName);
        if (!variantId || !this.variants[variantId]) {
            variantId = Math.floor(Math.random() * this.variants.length);
            this.setCookie(config.cookieName, variantId, 7);
        }
        this.experimentName = config.experimentName;
        this.variant = this.variants[variantId];  
        this.init();     
    }

    init() {
        if (this.variant.redirect && this.variant.redirect !== undefined) {
            this.runTest();
        } else {
            document.addEventListener("DOMContentLoaded", this.runTest.bind(this));
        }            
    }

    runTest() {
        let variant = this.variant;
        if (variant.callback && variant.redirect) {
            return console.error("You can't define both a callback and a redirect");
        }
        if (this.analytics) {
            ga('send', 'event', this.experimentName, variant.name);
        }
        if (variant.callback) {
            return variant.callback.call(window, arguments);
        } else if (variant.redirect) {
            return window.location = variant.redirect;
        }              
    }

    readCookie(name) {
        var nameEQ = name + '=',
            ca = document.cookie.split(';'),
            i,
            c;
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    /*
     * Gets a URL Parameter by name
     */
    getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    /*
     * Checks if a variant parameter is passed by a dev
     */
    devMode() {
        if (this.getParameterByName('variant')) {
            return true;
        }
        return false;
    }

    /*
     * Sets up variant from the url parameter and runs test
     */
    setDevModeVariant() {
        let variantId = this.getParameterByName('variant');
        this.variant = this.variants[variantId];
        this.init();
    }
}




