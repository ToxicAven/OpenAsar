module.exports = (o, n) => {
  const w = new (require('electron').BrowserWindow)({
    frame: false,
    resizable: false,
    center: true,
    backgroundColor: '#2f3136',
    webPreferences: {
      preload: require('path').join(__dirname, '..', n, 'preload.js')
    },
    ...o
  });

  const c = w.webContents;
  c.once('dom-ready', () => {
    if (oaConfig.themeSync !== false) try {
      const j = JSON.parse(require('fs').readFileSync(require('path').join(require('../paths').getUserData(), 'userDataCache.json'), 'utf8'));
      c.insertCSS(j.openasarSplashCSS);
      c.insertCSS(j.customSplashCSS);
    } catch { }
  });

  w.loadURL('https://cdn.openasar.dev/' + n + '?v=' + oaVersion);

  return w;
};