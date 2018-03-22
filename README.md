# AB Test Script

## Warning

This script is currently in use on all GP petition pages. Be very careful before overwriting the hosted script with a new version.

## Development

You'll need node and npm to work on development of this script

* Clone this repo
* Run `npm install`
* `npm run dev` to compile code
* `npm run production` to make minified asset
* `./nodule_modules/.bin/webpack --watch` to watch for changes

## Usage

Include the abtester.min.js script into the head of the page from cloud storage:

```html
<script src="https://storage.googleapis.com/fa-assets/abtest/abtester.min.js"></script>
```

Create a new instance of ABTester on your page. This should be as high up the page as possible but if you have other JS on the page that needs to run first (such as other DOM manipulation) then you should include it after that.

Your control must also be defined as a variant. For now, have it return an empty callback.

## Running multiple tests

Though generally not advised, you can run multiple tests on a page by creating extra ABTester instances. Each must have a unique `experimentName` and `cookieName` value.

## Paramters

An ABTester instance accepts the following parameters:

```javascript
cookieName: (string|required)
experimentName: (string|required)
variants: (array|required)
```

Each item in the variants array should be an object has a name and either a callback or a redirect:

```javascript
name: (string|required)
callback: (function|optional)
redirect: (string|optional)
```

## Example

```javascript
var ABTest = new ABTester({
  cookieName: 'FATest',
  experimentName: 'Test experiment',
  variants: [{
      name: 'test 1',
      callback: function () {
        headerColor('red');
      },
    },
    {
      name: 'test 2',
      redirect: 'http://google.com'
    }
  ]
});

function headerColor(color) {
  document.getElementById('test-header').style.color = color;
}
```

## Dev mode

To force a certain variant to run you can pass a URL parameter in the format of `variant={variantID}` (without curly braces) where variant ID is equal to the index of the experiment you want to run in the variants array.

If you're running multiple tests on the page, then you should use a parameter in the format of `variant[{experimentName}]={variantID}` (without curly braces) where experimentName is equal to the experiment name value you gave and where variant ID is equal to the index of the experiment you want to run in the variants array.

