/**
 * Created by wind on 2017/2/28.
 */

const pagesSource = 'local';//local or remote;
const assetsRoot = "assets/";
const imagesRoot = assetsRoot + "images/";

const serverIP = "";//测试：10.6.96.4；生产：10.7.61.80
const serverPort = "";
const serverURL = "http://" + serverIP + ":" + serverPort + "/";

const recalc = () => {
  if (window.locationConfig.zoom) {
    const docEl = document.documentElement;
    let clientWidth = docEl.clientWidth;
    let clientHeight = docEl.clientHeight;

    window.share.ratio = clientWidth / window.share.sizeWidth;
    var rootTag = window.share.rootTag;
    rootTag.style.transformOrigin = 'top left';
    rootTag.style.transform = 'scale(' + window.share.ratio + ')';
  }

};

window.share = {
  sizeWidth: 3840,
  sizeHeight: 1080,
  ratio: 1,
  rootTag: document.getElementById('app'),
  resetPageSize: function (w, h) {
    this.sizeWidth = w;
    this.sizeHeight = h;
    document.getElementById('app').style.width = w + "px";
    document.getElementById('app').style.height = h + "px";
    recalc();
  }
};
window.share.resetPageSize(window.share.sizeWidth, window.share.sizeHeight);


((doc, win) => {

  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

const Config = {
  pagesSource,
  assetsRoot,
  imagesRoot,

  serverIP,
  serverPort,
  serverURL,
  debug: false,
};

export default Config;