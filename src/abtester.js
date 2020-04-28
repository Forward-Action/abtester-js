import 'url-search-params-polyfill';

export default class ABTester {
    constructor(config) {
        this.params = new URLSearchParams(window.location.search);
        this.variants = config.variants;
        this.experimentName = config.experimentName;
        /* Dev mode - return given variant */
        if (this.devMode()) {
            return this.setDevModeVariant();
        }
        let variantId = this.readCookie(config.cookieName);
        if (!variantId || !this.variants[variantId]) {
            variantId = Math.floor(Math.random() * this.variants.length);
            this.setCookie(config.cookieName, variantId, 7);
        }
        this.variant = this.variants[variantId];
        this.init();
    }

    /* 
     * Decies whether we can run the test now or we 
     * need to wait for DOM content to be loaded.
     */

    init() {
        if (this.variant.redirect && this.variant.redirect !== undefined) {
            this.runTest();
        } else {
            if (document.readyState !== 'loading') {
                this.runTest();
            } else {
                document.addEventListener("DOMContentLoaded", this.runTest.bind(this));
            }
        }
    }

    /*
     * Check this test is valid
     * and runs the test
     */

    runTest() {
        let variant = this.variant;
        if (variant.callback && variant.redirect) {
            return console.error("You can't define both a callback and a redirect");
        }
        if (variant.callback) {
            return variant.callback.call(window, arguments);
        } else if (variant.redirect) {
            return window.location = variant.redirect;
        }
    }

    /*
     * Returns the value of the given cookie.
     */

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

    /*
     * Sets a cookie for the root path with the 
     * given name, value and days duration.
     */

    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    /*
     * Checks if a variant parameter is passed by a dev
     */

    devMode() {
        if (this.params.get(`variant[${this.experimentName}]`) || this.params.get('variant')) {
            return true;
        }
        return false;
    }

    /*
     * Sets up variant from the url parameter and runs test
     */

    setDevModeVariant() {
        /* 
         * Use the variant ID specified with an experiment name, if available
         * Otherwise, use the simple variant parameter.
         */
        let variantId = this.params.get(`variant[${this.experimentName}]`) || this.params.get('variant');
        this.variant = this.variants[variantId];
        this.init();
    }
}