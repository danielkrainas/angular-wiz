# Angular-wiz

Angular-wiz is a native [AngularJS][4] directive for creating wizards. The HTML/CSS created and used is compatible with the [easyWizard][3] jQuery plugin.

## Installation

The compiled files can be located in the *dist* folder and can be copied to your project:

- `dist/angular-wiz.js`
- `dist/angular-wiz.min.js`

Otherwise, the files are also available through the following package managers:

- **Bower**: `bower install angular-wiz`

## Getting Started

Add either the minified or unminified script to your project. Don't forget to add `angular-wiz` module as a dependency: 

```js
var app = angular.module('myApp', ['angular-wiz']);
```

Example usage:

```html
<wizard>
	<wizard-step title="first" active="true">
        <!-- content for the first step -->
    </wizard-step>
    <wizard-step title="Confirm">
        <!-- content for the last step -->
    </wizard>
</wizard>
```

### Notes

It supports any amount of steps.

## Supported Browsers

Since this project was really just an unintended creation, there's no _official_ support for anything but it has shown to work well in Chrome. I will be glad to attempt to address issues that may arise in other browsers, but I promise nothing.

## Bugs and Feedback

If you see a bug or have a suggestion, feel free to open an issue [here][2].

## License

MIT License. Copyright 2014 Daniel Krainas [http://www.danielkrainas.com][1]

[1]: http://www.danielkrainas.com
[2]: https://github.com/danielkrainas/angular-wiz/issues
[3]: https://github.com/st3ph/jquery.easyWizard
[4]: https://angularjs.org