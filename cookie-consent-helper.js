var mediaus = mediaus || {htmlHelper:{}};
mediaus.htmlHelper = mediaus.htmlHelper || {appendHTML:{}, addEventListener:{}, addCss:{}, addCssStylesheet:{}, fadeOut:{}, fadeIn:{}};
if (window.jQuery) {
	mediaus.htmlHelper.appendHTML = function (selector, html) {
		jQuery(selector).append(html);
	};
	mediaus.htmlHelper.addEventListener = function (selector, event, callback) {
		jQuery(selector).on(event, callback);
	};
	mediaus.htmlHelper.addCss = function (cssCode) {
		jQuery('<style type="text/css">' + cssCode + '</style>').appendTo('head');
	};
	mediaus.htmlHelper.addCssStylesheet = function (cssHref) {
		jQuery('<link type="text/css" rel="stylesheet" href="' + cssHref + '">').appendTo('head');
	};
	mediaus.htmlHelper.fadeOut = function (selector){
		jQuery(selector).fadeOut();
	};
	mediaus.htmlHelper.fadeIn = function (selector, display){
		jQuery(selector).fadeIn();
	};
}
else {
	mediaus.htmlHelper.appendHTML = function (selector, html) {
		document.querySelectorAll(selector)[0].insertAdjacentHTML('beforeend', html );
	};
	mediaus.htmlHelper.addEventListener = function (selector, event, callback) {
		document.querySelectorAll(selector)[0].addEventListener(event, callback);
	};
	mediaus.htmlHelper.addCss = function (cssCode) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		document.getElementsByTagName("head")[0].appendChild(styleElement);
	};
	mediaus.htmlHelper.addCssStylesheet = function (cssHref) {
		var styleElement = document.createElement("link");
		styleElement.type = "text/css";
		styleElement.rel = "stylesheet";
		styleElement.href = cssHref;
		document.getElementsByTagName("head")[0].appendChild(styleElement);
	};
	mediaus.htmlHelper.fadeOut = function (selector){
		selector.style.opacity = 1;

		(function fade() {
			if ((selector.style.opacity -= .1) < 0) {
				selector.style.display = "none";
			} else {
				requestAnimationFrame(fade);
			}
		})();
	};
	mediaus.htmlHelper.fadeIn = function (selector, display){
		selector.style.opacity = 0;
		selector.style.display = display || "block";

		(function fade() {
			var val = parseFloat(selector.style.opacity);
			if (!((val += .1) > 1)) {
				selector.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	};
}
