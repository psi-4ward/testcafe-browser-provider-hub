# testcafe-browser-provider-hub

***This is a proof of concept!***

This plugin integrates [TestCafe](http://devexpress.github.io/testcafe) with [TestCafe-Hub](https://github.com/psi-4ward/testcafe-hub).

## Install

Install from github, it's not published to npm yet.
```
npm install psi-4ward/testcafe-browser-provider-hub
```

## Usage

Before using this plugin, save the TestCafe Hub URL to the environment variable `TESTCAFE_HUB`, the default value is `http://localhost:8080`.  
testcafe-browser-provider-hub respects `.env` files.

```bash
# List available browser
testcafe -b hub

# Run tests
testcafe "hub:Chrome@66:Linux"
```

Tipp: Only the browser name is mandatory, you can omit the browser-version, os and os-version:

* `hub:Chrome` would run the test on a node with Chrome
* `hub:Chrome@66` would run the test on a node with Chrome with major version 66
* `hub:Chrome:Windows` would run the on a window node with Chrome

## Authors

* [Christoph Wiechert](https://psi.cx)

## License & copyright
* [testcafe-browser-provider-hub](https://github.com/psi-4ward/testcafe-browser-provider-hub/blob/master/LICENSE): MIT