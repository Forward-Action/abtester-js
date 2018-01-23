export default class ABTester {
    constructor (config) {
        let variants = config.variants;
        let variantId = this.readCookie(config.cookieName);
        if (!variantId || !variants[variantId]) {
            variantId = Math.floor(Math.random() * variants.length);
            this.setCookie(config.cookieName, variantId, 7);
        }
        this.experimentName = config.experimentName;
        this.variant = variants[variantId];  
        this.analytics = window.ga ? true : false;
        if (this.variant.redirect && this.variant.redirect !== undefined) {
            this.init();
        } else {
            window.onload = () => {
                this.init();
            }  
        }      
    }

    init () {
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

    readCookie (name) {
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
}




