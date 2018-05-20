require('dotenv').config();
const debug = require('debug')('testcafe-browser-provider-hub');
const fetch = require('node-fetch');
const hubUrl = process.env.TESTCAFE_HUB || 'http://localhost:8080';

async function get(url) {
  const req = await(await fetch(`${hubUrl}${url}`));
  if(req.status !== 200) {
    throw new Error(`Request to ${hubUrl}${url} failed! ${req.status}: ${await req.text()}`);
  }
  try {
    return await req.json();
  }
  catch(e) {
    throw new Error(await req.text());
  }
}

async function post(url, body) {
  const req = await fetch(`${hubUrl}${url}`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  if(req.status !== 200) {
    throw new Error(`Request to ${hubUrl}${url} failed! ${req.status}: ${await req.text()}`);
  }
  try {
    return await req.json();
  }
  catch(e) {
    throw new Error(await req.text());
  }
}


module.exports = {
  isMultiBrowser: true,

  async openBrowser(id, url, name) {
    debug('openBrowser', url, name);
    await post('/api/browser-provider/open-browser', {id, url, name})
  },

  async closeBrowser(id) {
    debug('closeBrowser', id);
    await post('/api/browser-provider/close-browser', {id})
  },

  async getBrowserList() {
    debug('getBrowserList');
    const nodes = await get('/api/browser-provider/get-browser-list');
    return nodes.map(node => node.name);
  },

  async isValidBrowserName(name) {
    const tmp = name.split(':');
    const [browser, browserVersion] = tmp[0].split('@');
    let os, osVersion;
    if(tmp[1]) [os, osVersion] = tmp[1].split(' ');

    const nodes = await get('/api/browser-provider/get-browser-list');

    return nodes.some(node => {
      let match = node.browser === browser;
      if(browserVersion && !node.browserVersion.startsWith(browserVersion)) match = false;
      if(os && node.os !== os) match = false;
      if(osVersion && !node.osVersion.startsWith(osVersion)) match = false;
      return match;
    });
  },

  async resizeWindow(id, width, height, currentWidth, currentHeight) {
    debug('resizeWindow', ...arguments);
    this.reportWarning(id, 'resizeWindow is not implemented yet');
    // await post('/api/browser-provider/resize-window', {id, width, height, currentWidth, currentHeight});
  },

  async canResizeWindowToDimensions(id, width, height) {
    debug('canResizeWindowToDimensions', ...arguments);
    return true;
    // try {
    //   return await post('/api/browser-provider/can-resize-window-to-dimensions', {id, width, height});
    // } catch(e) {
    //   console.error(e);
    //   return false;
    // }
  },

  async maximizeWindow(id) {
    debug('maximizeWindow');
    this.reportWarning(id, 'maximizeWindow is not implemented yet');
    // await post('/api/browser-provider/maximize-window', {id})
  },

  async takeScreenshot(id, screenshotPath) {
    debug('takeScreenshot', ...arguments);
    this.reportWarning(id, 'takeScreenshot is not implemented yet');
    // await post('/api/browser-provider/take-screenshot', {id})
  },

};