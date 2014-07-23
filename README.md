# Angular-wiz

Angular-wiz is a native [AngularJS][4] directive for creating wizards. The HTML/CSS created and used is compatible with the [easyWizard][3] jQuery plugin.

## Installation

The compiled files can be located in the *dist* folder and can be copied to your project:

- `dist/angular-wiz.js`
- `dist/angular-wiz.min.js`

Otherwise, the files are also available through the following package managers:

- **Bower**: `bower install angular-wiz`

## Getting Started

Add either the minified or unminified script to your project. After that, you will need to add the `angular-wiz` module as a dependency in your Angular app. This can be done by simply doing: 

```js
angular.module('your-app', ['angular-wiz']);
```

Here is an example of the directive structure and options available:

```html
<wizard finished="executeWizardComplete()">
	<wizard-step title="first" active="true">
        <!-- content for the first step -->
    </wizard-step>
    <wizard-step title="Confirm">
        <!-- content for the last step -->
    </wizard>
</wizard>
```

### Wizard Directive Options

- **finished**: A function to be called when the wizard is finished. The syntax allowed is similiar to `ng-click`.

### Step Directive Options

- **title**: The title of the step. This will be displayed in the steps list of the wizard.

- **active**: A boolean to set the active step in the wizard. *please note*: this option will likely be removed in the future.

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