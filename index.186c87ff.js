/*!
* tabbable 5.2.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var e=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],t=e.join(","),n="undefined"==typeof Element?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,a=function(e,a,r){var o=Array.prototype.slice.apply(e.querySelectorAll(t));return a&&n.call(e,t)&&o.unshift(e),o=o.filter(r)},r=function(e){var t=parseInt(e.getAttribute("tabindex"),10);return isNaN(t)?function(e){return"true"===e.contentEditable}(e)?0:"AUDIO"!==e.nodeName&&"VIDEO"!==e.nodeName&&"DETAILS"!==e.nodeName||null!==e.getAttribute("tabindex")?e.tabIndex:0:t},o=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},i=function(e){return"INPUT"===e.tagName},c=function(e){return function(e){return i(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t,n=e.form||e.ownerDocument,a=function(e){return n.querySelectorAll('input[type="radio"][name="'+e+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=a(window.CSS.escape(e.name));else try{t=a(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var r=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]}(t,e.form);return!r||r===e}(e)},s=function(e,t){return!(t.disabled||function(e){return i(e)&&"hidden"===e.type}(t)||function(e,t){if("hidden"===getComputedStyle(e).visibility)return!0;var a=n.call(e,"details>summary:first-of-type")?e.parentElement:e;if(n.call(a,"details:not([open]) *"))return!0;if(t&&"full"!==t){if("non-zero-area"===t){var r=e.getBoundingClientRect(),o=r.width,i=r.height;return 0===o&&0===i}}else for(;e;){if("none"===getComputedStyle(e).display)return!0;e=e.parentElement}return!1}(t,e.displayCheck)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(i(e)||"SELECT"===e.tagName||"TEXTAREA"===e.tagName||"BUTTON"===e.tagName)for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var n=0;n<t.children.length;n++){var a=t.children.item(n);if("LEGEND"===a.tagName)return!a.contains(e)}return!0}t=t.parentElement}return!1}(t))},l=function(e,t){return!(!s(e,t)||c(t)||r(t)<0)},u=e.concat("iframe").join(","),d=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==n.call(e,u)&&s(t,e)};function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v,b=(v=[],{activateTrap:function(e){if(v.length>0){var t=v[v.length-1];t!==e&&t.pause()}var n=v.indexOf(e);-1===n||v.splice(n,1),v.push(e)},deactivateTrap:function(e){var t=v.indexOf(e);-1!==t&&v.splice(t,1),v.length>0&&v[v.length-1].unpause()}}),p=function(e){return setTimeout(e,0)},y=function(e,t){var n=-1;return e.every((function(e,a){return!t(e)||(n=a,!1)})),n},g=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return"function"==typeof e?e.apply(void 0,n):e},h=function(e){return e.target.shadowRoot&&"function"==typeof e.composedPath?e.composedPath()[0]:e.target},E=function(e,t){var n,i=(null==t?void 0:t.document)||document,c=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){m(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0},t),s={containers:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0},u=function(e,t,n){return e&&void 0!==e[t]?e[t]:c[n||t]},v=function(e){return!(!e||!s.containers.some((function(t){return t.contains(e)})))},E=function(e){var t=c[e];if("function"==typeof t){for(var n=arguments.length,a=new Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];t=t.apply(void 0,a)}if(!t){if(void 0===t||!1===t)return t;throw new Error("`".concat(e,"` was specified but was not a node, or did not return a node"))}var o=t;if("string"==typeof t&&!(o=i.querySelector(t)))throw new Error("`".concat(e,"` as selector refers to no known node"));return o},w=function(){var e=E("initialFocus");if(!1===e)return!1;if(void 0===e)if(v(i.activeElement))e=i.activeElement;else{var t=s.tabbableGroups[0];e=t&&t.firstTabbableNode||E("fallbackFocus")}if(!e)throw new Error("Your focus-trap needs to have at least one focusable element");return e},S=function(){if(s.tabbableGroups=s.containers.map((function(e){var t,n,i,c=(n=[],i=[],a(e,(t=t||{}).includeContainer,l.bind(null,t)).forEach((function(e,t){var a=r(e);0===a?n.push(e):i.push({documentOrder:t,tabIndex:a,node:e})})),i.sort(o).map((function(e){return e.node})).concat(n));if(c.length>0)return{container:e,firstTabbableNode:c[0],lastTabbableNode:c[c.length-1]}})).filter((function(e){return!!e})),s.tabbableGroups.length<=0&&!E("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times")},_=function e(t){!1!==t&&t!==i.activeElement&&(t&&t.focus?(t.focus({preventScroll:!!c.preventScroll}),s.mostRecentlyFocusedNode=t,function(e){return e.tagName&&"input"===e.tagName.toLowerCase()&&"function"==typeof e.select}(t)&&t.select()):e(w()))},k=function(e){var t=E("setReturnFocus",e);return t||!1!==t&&e},L=function(e){var t=h(e);v(t)||(g(c.clickOutsideDeactivates,e)?n.deactivate({returnFocus:c.returnFocusOnDeactivate&&!d(t)}):g(c.allowOutsideClick,e)||e.preventDefault())},I=function(e){var t=h(e),n=v(t);n||t instanceof Document?n&&(s.mostRecentlyFocusedNode=t):(e.stopImmediatePropagation(),_(s.mostRecentlyFocusedNode||w()))},q=function(e){if(function(e){return"Escape"===e.key||"Esc"===e.key||27===e.keyCode}(e)&&!1!==g(c.escapeDeactivates,e))return e.preventDefault(),void n.deactivate();(function(e){return"Tab"===e.key||9===e.keyCode})(e)&&function(e){var t=h(e);S();var n=null;if(s.tabbableGroups.length>0){var a=y(s.tabbableGroups,(function(e){return e.container.contains(t)}));if(a<0)n=e.shiftKey?s.tabbableGroups[s.tabbableGroups.length-1].lastTabbableNode:s.tabbableGroups[0].firstTabbableNode;else if(e.shiftKey){var r=y(s.tabbableGroups,(function(e){var n=e.firstTabbableNode;return t===n}));if(r<0&&s.tabbableGroups[a].container===t&&(r=a),r>=0){var o=0===r?s.tabbableGroups.length-1:r-1;n=s.tabbableGroups[o].lastTabbableNode}}else{var i=y(s.tabbableGroups,(function(e){var n=e.lastTabbableNode;return t===n}));if(i<0&&s.tabbableGroups[a].container===t&&(i=a),i>=0){var c=i===s.tabbableGroups.length-1?0:i+1;n=s.tabbableGroups[c].firstTabbableNode}}}else n=E("fallbackFocus");n&&(e.preventDefault(),_(n))}(e)},A=function(e){if(!g(c.clickOutsideDeactivates,e)){var t=h(e);v(t)||g(c.allowOutsideClick,e)||(e.preventDefault(),e.stopImmediatePropagation())}},N=function(){if(s.active)return b.activateTrap(n),s.delayInitialFocusTimer=c.delayInitialFocus?p((function(){_(w())})):_(w()),i.addEventListener("focusin",I,!0),i.addEventListener("mousedown",L,{capture:!0,passive:!1}),i.addEventListener("touchstart",L,{capture:!0,passive:!1}),i.addEventListener("click",A,{capture:!0,passive:!1}),i.addEventListener("keydown",q,{capture:!0,passive:!1}),n},O=function(){if(s.active)return i.removeEventListener("focusin",I,!0),i.removeEventListener("mousedown",L,!0),i.removeEventListener("touchstart",L,!0),i.removeEventListener("click",A,!0),i.removeEventListener("keydown",q,!0),n};return(n={activate:function(e){if(s.active)return this;var t=u(e,"onActivate"),n=u(e,"onPostActivate"),a=u(e,"checkCanFocusTrap");a||S(),s.active=!0,s.paused=!1,s.nodeFocusedBeforeActivation=i.activeElement,t&&t();var r=function(){a&&S(),N(),n&&n()};return a?(a(s.containers.concat()).then(r,r),this):(r(),this)},deactivate:function(e){if(!s.active)return this;clearTimeout(s.delayInitialFocusTimer),s.delayInitialFocusTimer=void 0,O(),s.active=!1,s.paused=!1,b.deactivateTrap(n);var t=u(e,"onDeactivate"),a=u(e,"onPostDeactivate"),r=u(e,"checkCanReturnFocus");t&&t();var o=u(e,"returnFocus","returnFocusOnDeactivate"),i=function(){p((function(){o&&_(k(s.nodeFocusedBeforeActivation)),a&&a()}))};return o&&r?(r(k(s.nodeFocusedBeforeActivation)).then(i,i),this):(i(),this)},pause:function(){return s.paused||!s.active||(s.paused=!0,O()),this},unpause:function(){return s.paused&&s.active?(s.paused=!1,S(),N(),this):this},updateContainerElements:function(e){var t=[].concat(e).filter(Boolean);return s.containers=t.map((function(e){return"string"==typeof e?i.querySelector(e):e})),s.active&&S(),this}}).updateContainerElements(e),n};document.querySelectorAll("[data-toggles-class]").forEach((e=>{const t=e.dataset.togglesClass,n=document.getElementById(e.dataset.togglesClassFor);e.addEventListener("click",(()=>{n.classList.toggle(t)}))}));const w=document.getElementById("cookies-pop-up");w.focus();const S=E(w);S.activate();w.querySelector(".cookies-pop-up__agree-button").addEventListener("click",(()=>{S.deactivate()})),w.addEventListener("keydown",(e=>{"Escape"===e.key&&w.classList.toggle("cookies-pop-up_hidden")})),document.querySelectorAll('[data-focus-hidden="true"]').forEach((e=>{e.tabIndex=-1}));const _=document.querySelector(".page-main"),k=document.querySelector(".page-header-top-bar__menu-button"),L=document.querySelector(".page-nav-darken"),I=k.querySelector(".burger-icon__top"),q=k.querySelector(".burger-icon__middle"),A=k.querySelector(".burger-icon__bottom"),N=document.querySelector(".menu-sub-nav"),O=document.querySelector(".nav-list__open-submenu-button"),T=document.querySelector(".menu-sub-nav__go-back-button"),x=e=>{if(void 0===e)return()=>{};let t=!0;return e.pause(),()=>{t?t=!1:e.reverse(),e.play()}},F={direction:"normal",fill:"forwards",duration:300,easing:"ease-in-out"},C=x(I.animate([{transform:"none"},{transform:"translateY(30%)",offset:.3},{transform:"translateY(30%)",offset:.6},{transform:"translateY(30%) rotate(45deg)"}],F)),D=x(q.animate([{transform:"none"},{transform:"none",offset:.3},{transform:"none",offset:.6},{transform:"rotate(45deg)"}],F)),G=x(A.animate([{transform:"none"},{transform:"translateY(-30%)",offset:.3},{transform:"translateY(-30%)",offset:.6},{transform:"translateY(-30%) rotate(135deg)"}],F));let P=!1;const j=document.querySelector(".page-nav");let Y,B;O.addEventListener("click",(()=>{N.classList.add("menu-sub-nav_toggled"),setTimeout((()=>{N.querySelectorAll('[data-focus-hidden="true"]').forEach((e=>{e.tabIndex=0})),N.focus({preventScroll:!0}),B=E(N,{allowOutsideClick:!0}),B.activate()}),200)})),T.addEventListener("click",(()=>{N.classList.remove("menu-sub-nav_toggled"),N.querySelectorAll('[data-focus-hidden="true"]').forEach((e=>{e.tabIndex=-1})),B.deactivate()})),N.addEventListener("keydown",(e=>{"Escape"===e.key&&(N.classList.remove("menu-sub-nav_toggled"),N.querySelectorAll('[data-focus-hidden="true"]').forEach((e=>{e.tabIndex=-1})),B.deactivate())}));const M=()=>{P=!1,N.classList.contains("menu-sub-nav_toggled")&&(N.classList.remove("menu-sub-nav_toggled"),N.querySelectorAll('[data-focus-hidden="true"]').forEach((e=>{e.tabIndex=-1})),B.deactivate()),k.classList.remove("page-header__menu-button_toggled"),L.classList.remove("page-nav-darken_toggled"),j.querySelectorAll('[data-focus-hidden="true"]').forEach((e=>{e.tabIndex=-1})),Y.deactivate(),document.body.style.overflowY="auto"},R=window.matchMedia("(min-width: 50rem)");R.addEventListener("change",(()=>{if(R.matches)return document.body.style.overflowY="auto",void(P&&(C(),D(),G(),M()));P?(document.body.style.overflowY="hidden",window.scrollTo({top:0})):document.body.style.overflowY="auto"}));const U=()=>{P?M():(P=!0,k.classList.add("page-header__menu-button_toggled"),L.classList.add("page-nav-darken_toggled"),j.querySelectorAll('[data-focus-hidden="true"]').forEach((e=>{e.tabIndex=0})),j.focus({preventScroll:!0}),Y=E(j,{allowOutsideClick:!0}),Y.activate(),document.body.style.overflowY="hidden")};k.addEventListener("click",(()=>{C(),D(),G(),U()})),_.addEventListener("click",(()=>{P&&(C(),D(),G(),M())})),j.addEventListener("keydown",(e=>{P&&"Escape"===e.key&&(C(),D(),G(),M())}));document.querySelector(".page-nav__close-menu").addEventListener("click",(()=>{P&&(C(),D(),G(),M())}));const K=window.matchMedia("(min-width: 50rem)");K.matches&&j.querySelectorAll('[data-focus-hidden="true"]').forEach((e=>{e.tabIndex=0})),K.addEventListener("change",(e=>{j.querySelectorAll('[data-focus-hidden="true"]').forEach((t=>{t.tabIndex=e.matches?0:-1}))}));const X=document.querySelector(".endless-extras-section__learn-more-overlay");let $=null;const z=new Map;function V(e){X.classList.remove("endless-extras-section__learn-more-overlay_toggled"),e.querySelectorAll("[data-focus-hidden]").forEach((e=>{e.tabIndex=-1})),e.classList.remove("toggled");z.get(e).deactivate()}[...document.querySelectorAll(".extras-item__learn-more-button"),...document.querySelectorAll(".extras-item_learn-more-image-button")].forEach((e=>{if(!e.dataset.opensModal)return;const t=document.querySelector(`#${e.dataset.opensModal}`);e.addEventListener("click",(()=>function(e){X.classList.add("endless-extras-section__learn-more-overlay_toggled"),e.classList.add("toggled"),e.querySelectorAll("[data-focus-hidden]").forEach((e=>{e.tabIndex=0}));const t=E(e,{allowOutsideClick:!0});z.set(e,t),t.activate(),$=e}(t))),t.addEventListener("keydown",(e=>{"Escape"===e.key&&V(t)}))})),[...document.querySelectorAll(".learn-more-modal__accept-modal"),...document.querySelectorAll(".learn-more-modal__close-button")].forEach((e=>{if(!e.dataset.closesModal)return;const t=document.getElementById(e.dataset.closesModal);e.addEventListener("click",(()=>V(t)))})),X.addEventListener("click",(e=>{e.target===X&&V($)})),document.querySelectorAll(".learn-more-modal__page-radios").forEach((e=>{if(!e.dataset.controlsCarousel)return;const t=e.parentElement,n=t.querySelector(".learn-more-modal__prev-page-button"),a=t.querySelector(".learn-more-modal__next-page-button"),r=t.querySelector(".learn-more-modal__accept-modal"),o=document.getElementById(e.dataset.controlsCarousel),i=Number.parseInt(o.dataset.slidesCount,10);e.addEventListener("change",(e=>{var t;if(!(null===(t=e.target.dataset)||void 0===t?void 0:t.pageNumber))return;const c=Number.parseInt(e.target.dataset.pageNumber,10);n.style.visibility=1===c?"hidden":"visible",c===i?(a.style.visibility="hidden",r.style.visibility="visible"):(a.style.visibility="visible",r.style.visibility="hidden"),o.style.transform=`translateX(-${100*(c-1)/i}%)`}))})),document.querySelectorAll(".learn-more-modal__prev-page-button, .learn-more-modal__next-page-button").forEach((e=>{if(!e.dataset.selectsFrom)return;const t=Number.parseInt(e.dataset.shiftsBy,10),n=[...document.getElementById(e.dataset.selectsFrom).querySelectorAll('input[type="radio"]')];e.addEventListener("click",(()=>{const e=n.findIndex((e=>e.checked))+t;e>=0&&e<n.length&&(n[e].checked=!0,n[e].dispatchEvent(new Event("change",{bubbles:!0})))}))}));
//# sourceMappingURL=index.186c87ff.js.map