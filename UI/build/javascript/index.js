function e(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},s=t.parcelRequire94c2;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var s={id:e,exports:{}};return n[e]=s,t.call(s.exports,s,s.exports),s.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){i[e]=t},t.parcelRequire94c2=s);var o=s.register;o("gmstN",function(t,n){e(t.exports,"register",function(){return i},function(e){return i=e}),e(t.exports,"resolve",function(){return s},function(e){return s=e});var i,s,o=new Map;i=function(e,t){for(var n=0;n<t.length-1;n+=2)o.set(t[n],{baseUrl:e,path:t[n+1]})},s=function(e){var t=o.get(e);if(null==t)throw Error("Could not resolve bundle with id "+e);return new URL(t.path,t.baseUrl).toString()}}),o("hIVfd",function(e,t){var n=s("XXhuC");e.exports=n("huHpT").then(()=>s("cy3Db"))}),o("XXhuC",function(e,t){e.exports=function(e){return import(s("gmstN").resolve(e))}}),s("gmstN").register(new URL("",import.meta.url).toString(),JSON.parse('["drKE6","index.1b62db57.js","huHpT","polyfills.cf459d19.js"]'));class r extends HTMLElement{static #e=this.observedAttributes=["attribute"];constructor(){if(super(),this.button=this.querySelector("button"),this.count=0,!this.button)return;this.init(),this.button?.addEventListener("click",this)}init(){this.button?.removeAttribute("hidden")}handleGlobalClick(e){let t=e.target;this.button?.contains(t)||console.log("Click target:",t,"Clicked outside component:",this)}attributeChangedCallback(e,t,n){console.log(`Attribute ${e} has changed from ${t} to ${n}.`)}handleEvent(e){let t=e.currentTarget;this.count++,t&&(t.innerHTML=`Clicked ${this.count} time(s)`)}connectedCallback(){document.addEventListener("click",e=>this.handleGlobalClick(e))}disconnectedCallback(){document.removeEventListener("click",this.handleGlobalClick)}}const l=e=>JSON.parse(e);class c extends HTMLElement{constructor(){if(super(),this.qid=this.dataset.questionid,this.qgroup=this.dataset.questiongroup,this.element=document.querySelector(".a-input-singlelineedit"),this.question=this.closest(".o-question-container"),!this.element)return;this.init(),this.element?.addEventListener("click",this),this.element?.addEventListener("change",this)}init(){console.log("MInputSinglelineedit: init...",this.qid,this.qgroup,this.element),this.handleCustomProps()}handleCustomProps(){let e=this.question?.querySelector("[data-custom-props]");if(this.qid!==e?.dataset.questionid&&this.qgroup!==e?.dataset.questiongroup&&!e)return;let t=e?.dataset.customProps;if(t){let e=l(t);this.setInputType(e)}}setInputType(e){let t="text";switch(Object.entries(e).forEach(([e,n])=>{"type"===e&&(t=n)}),t){case"date":t="date";break;case"number":t="number";break;default:t="text"}this.element&&(this.element.type=t)}handleEvent(e){switch(e.type){case"click":console.log("click");break;case"change":console.log("change")}}connectedCallback(){}disconnectedCallback(){}}const a=()=>{customElements.get("wc-example")||customElements.define("wc-example",r),customElements.get("m-input-singlelineedit")||customElements.define("m-input-singlelineedit",c)};"function"==typeof document.createElement("dialog").showModal?a():s("hIVfd").then(()=>a()).catch(e=>console.error(e));
//# sourceMappingURL=index.1b62db57.js.map