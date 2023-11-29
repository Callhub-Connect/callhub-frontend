/*!
 * PSPDFKit for Web 2023.5.2 (https://pspdfkit.com/web)
 *
 * Copyright (c) 2016-2023 PSPDFKit GmbH. All rights reserved.
 *
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 *
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
"use strict";(self.webpackChunkPSPDFKit=self.webpackChunkPSPDFKit||[]).push([[1620],{46309:(e,t,i)=>{i.d(t,{W:()=>u});var n=i(84121),r=i(35369),s=i(47347),a=i(66687),o=i(95651),c=i(92466);function l(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function h(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?l(Object(i),!0).forEach((function(t){(0,n.Z)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}class u{constructor(){(0,n.Z)(this,"attachmentsCache",(0,r.D5)()),(0,n.Z)(this,"cachedAPStreams",(0,r.D5)()),(0,n.Z)(this,"pageAPStreamsPromises",(0,r.D5)()),(0,n.Z)(this,"annotationAPStreamPromises",(0,r.D5)())}getAnnotationFormFieldAndValue(e){var t;const i=this.provider;(0,s.kG)(i instanceof i.constructor,"Backend can only use backend annotation provider");const n=e instanceof a.x_?null===(t=i._readStateCallbacks)||void 0===t?void 0:t.getFormFieldByName(e.formFieldName):null;return{formField:n,formFieldValue:!n||n instanceof a.Yo?null:new a.KD({name:n.name,value:void 0!==n.formattedValue?n.formattedValue:"string"==typeof n.value?n.value:n.values})}}getAnnotationAvailableVariants(e){var t;const i=this.provider;(0,s.kG)(i instanceof i.constructor,"Backend can only use backend annotation provider");return[...(null===(t=i._readStateCallbacks)||void 0===t?void 0:t.getAvailableVariants(e))||[],"normal"]}cachedRenderAnnotation(e,t,i,n,r){const a=this.provider;(0,s.kG)(a instanceof a.constructor,"Backend can only use backend annotation provider");const{formField:c,formFieldValue:l}=this.getAnnotationFormFieldAndValue(e);if(!(0,o._R)(e,c))return this.renderAnnotation(e,l,t,i,n,r);const u=this.getAnnotationAvailableVariants(e);let d=!1,m=()=>{d=!0};return{promise:new Promise((async(s,a)=>{const o=t=>{const i=this.annotationAPStreamPromises.get(e.id);i&&(this.annotationAPStreamPromises=this.annotationAPStreamPromises.delete(e.id),i(t))},c=this.annotationAPStreamPromises.get(e.id);this.annotationAPStreamPromises=this.annotationAPStreamPromises.set(e.id,s),c&&c(null);try{const a=this.pageAPStreamsPromises.get(e.pageIndex);if(!a){const t=new Promise((t=>{this.annotationAPStreamPromises=this.annotationAPStreamPromises.set(e.id,t)}));return void s(await t)}await a;const c=this.cachedAPStreams.get(e.pageIndex);if(c){const t=c?c.get(e.id):null;if(t)return void o(this.getAPStream(t,r))}const{promise:f,cancel:p}=this.renderAPStream(e,l,t,i,n,u,r);if(d)o(null);else if(m=p,u.length>1){const t=await Promise.all(f.map((e=>e.promise)));o(t[u.indexOf(r||"normal")]),t.some(Boolean)&&this.cacheAPStream(u.reduce(((e,i,n)=>h(h({},e),{},{[i]:t[n]})),{}),e)}else{const t=await f,i=t?this.getAPStream(t,r):null;o(i),i&&this.cacheAPStream(t,e)}}catch(e){a(e)}})),cancel:m}}cacheAPStream(e,t){let i=this.cachedAPStreams.get(t.pageIndex);i||(this.cachedAPStreams=this.cachedAPStreams.set(t.pageIndex,(0,r.D5)()),i=this.cachedAPStreams.get(t.pageIndex)),this.cachedAPStreams=this.cachedAPStreams.setIn([t.pageIndex,t.id],e)}clearAllPageAPStreams(e){const t=this.cachedAPStreams.get(e);t&&(t.forEach((e=>{this.releaseAPStream(e)})),this.cachedAPStreams=this.cachedAPStreams.delete(e)),this.pageAPStreamsPromises=this.pageAPStreamsPromises.delete(e)}clearPageAPStreams(e,t){const i=this.cachedAPStreams.get(e);i&&(i.filter(((e,i)=>t.has(i))).forEach((e=>{this.releaseAPStream(e)})),this.cachedAPStreams=this.cachedAPStreams.updateIn([e],(e=>e.filter(((e,i)=>!t.has(i))))))}getAPStream(e,t){return e instanceof c.Z?e:(null==e?void 0:e[t||"normal"])||null}renderAPStream(e,t,i,n,r,s,a){if(s.length>1){const a=s.map((s=>this.renderAnnotation(e,t,i,n,r,"normal"!==s?s:void 0)));return{promise:a,cancel:()=>{a.forEach((e=>{e.cancel()}))}}}return this.renderAnnotation(e,t,i,n,r,a)}releaseAPStream(e){e instanceof c.Z?e.release():Object.values(e).forEach((e=>{e.release()}))}}},45207:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(35369),r=i(97413);function s(){return!0}class a{constructor(e){this.queue=(0,n.zN)(),this.priorityQueue=(0,n.zN)(),this.inFlightRequests=(0,n.D5)(),this.inflightRequestLimit=e,this.isDestroyed=!1}enqueue(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(this.isDestroyed)return{promise:new Promise((()=>{})),cancel:()=>{}};let i=null,r=null;const s=new Promise(((e,t)=>{i=e,r=t})),a=t?this.priorityQueue:this.queue,o=(0,n.t8)(a,e,{promise:s,resolve:i,reject:r});return t?this.priorityQueue=o:this.queue=o,t?this.next():setTimeout((()=>this.next()),35),{promise:s,cancel:()=>this._cancel(e)}}_cancel(e){this.queue.has(e)&&(this.queue=this.queue.delete(e)),this.priorityQueue.has(e)&&(this.priorityQueue=this.priorityQueue.delete(e)),this.inFlightRequests.has(e)&&(this.inFlightRequests=this.inFlightRequests.delete(e))}cancelAll(){this.queue=(0,n.zN)(),this.priorityQueue=(0,n.zN)(),this.inFlightRequests=(0,n.D5)()}_requestFinished(e,t){if(this.isDestroyed)return;const i=this.inFlightRequests.get(e);i&&(i.resolve(t),this.inFlightRequests=this.inFlightRequests.delete(e)),this.next()}_requestFailed(e,t){if(this.isDestroyed)return;const i=this.inFlightRequests.get(e);i&&(i.reject(t),this.inFlightRequests=this.inFlightRequests.delete(e)),this.next()}next(){if(!(this.isDestroyed||this.inFlightRequests.size>=this.inflightRequestLimit)){if(this.priorityQueue.size>=1){const e=this.priorityQueue.findLastEntry(s);(0,r.k)(e);const[t,i]=e;return this.priorityQueue=this.priorityQueue.delete(t),this.inFlightRequests=this.inFlightRequests.set(t,i),void t.request().then((e=>this._requestFinished(t,e))).catch((e=>this._requestFailed(t,e)))}if(this.queue.size>=1){const e=this.queue.findEntry(s);(0,r.k)(e);const[t,i]=e;this.queue=this.queue.delete(t),this.inFlightRequests=this.inFlightRequests.set(t,i),t.request().then((e=>this._requestFinished(t,e))).catch((e=>this._requestFailed(t,e)))}}}destroy(){this.isDestroyed=!0}}},80488:(e,t,i)=>{i.d(t,{i:()=>o});var n=i(35369);class r extends(n.WV({id:"",attachmentId:"",description:null,fileName:null,fileSize:null,updatedAt:null})){}var s=i(33320);function a(e,t){return t}function o(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return a(0,i)?new r({id:(0,s.C)(),description:t.fileDescription,attachmentId:e,fileName:t.fileName||null,fileSize:t.fileSize||null,updatedAt:t.modificationDate?new Date(t.modificationDate):null}):new r({id:e,description:t.description,attachmentId:t.fileAttachmentId,fileName:t.fileName||null,fileSize:t.fileSize||null,updatedAt:new Date(t.updatedAt)||null})}},70569:(e,t,i)=>{i.d(t,{M:()=>a});var n=i(84121);function r(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function s(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?r(Object(i),!0).forEach((function(t){(0,n.Z)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function a(e,t,i,n,r,a){let o;return e.has(i)?o=e.get(i):(o=r.toString(),t[o]=i,e.set(i,o)),s(s({},n),{},{[a]:o})}},45513:(e,t,i)=>{i.d(t,{E:()=>o});var n=i(35369),r=i(47347),s=i(93572),a=i(46791);function o(e){return(0,r.kG)(Array.isArray(e),"Wrong `json` field"),(0,n.aV)(e.map((e=>((0,r.kG)("number"==typeof e.pageIndex,"Wrong `pageIndex` field"),(0,r.kG)("string"==typeof e.previewText,"Wrong `previewText` field"),(0,r.kG)(Array.isArray(e.rangeInPreview),"Wrong `rangeInPreview` field"),(0,r.kG)(Array.isArray(e.rectsOnPage),"Wrong `rectsOnPage` field"),new a.Z({pageIndex:e.pageIndex,previewText:e.previewText,locationInPreview:e.rangeInPreview[0],lengthInPreview:e.rangeInPreview[1],rectsOnPage:(0,n.aV)(e.rectsOnPage).map((e=>(0,s.k)(e))),isAnnotation:!!e.isAnnotation,annotationRect:e.annotationRect?(0,s.k)(e.annotationRect):null})))).filter(Boolean))}}}]);