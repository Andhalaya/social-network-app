import{g as qt,c as f,d as Vt,e as _e,o as Ae,j as i,f as Gt,_ as M,h as Je,k as mt,l as gt,s as he,P as Yt,m as Qt,n as vt,p as Fe,q as Xt,t as ht,v as de,w as Jt,x as Zt,G as en,r as te,i as ne,y as tn,R as nn,u as yt,a as bt,A as xt,b as pe,M as rn,z as Ze,D as Dt,I as on,B as jt}from"./index-DGTewU9Y.js";import{d as an}from"./Search-CYh7I3MX.js";import{R as sn,P as cn}from"./Post-BqZWApL7.js";import"./ChatBubbleOutlineRounded-BAj-2NIz.js";var wt={exports:{}},ln="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",un=ln,fn=un;function Et(){}function Ct(){}Ct.resetWarningCache=Et;var pn=function(){function e(r,a,o,c,l,m){if(m!==fn){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:Ct,resetWarningCache:Et};return n.PropTypes=n,n};wt.exports=pn();var dn=wt.exports;const x=qt(dn);function et(e){return e.substring(2).toLowerCase()}function mn(e,t){return t.documentElement.clientWidth<e.clientX||t.documentElement.clientHeight<e.clientY}function gn(e){const{children:t,disableReactTree:n=!1,mouseEvent:r="onClick",onClickAway:a,touchEvent:o="onTouchEnd"}=e,c=f.useRef(!1),l=f.useRef(null),m=f.useRef(!1),u=f.useRef(!1);f.useEffect(()=>(setTimeout(()=>{m.current=!0},0),()=>{m.current=!1}),[]);const p=Vt(t.ref,l),v=_e(g=>{const j=u.current;u.current=!1;const C=Ae(l.current);if(!m.current||!l.current||"clientX"in g&&mn(g,C))return;if(c.current){c.current=!1;return}let h;g.composedPath?h=g.composedPath().indexOf(l.current)>-1:h=!C.documentElement.contains(g.target)||l.current.contains(g.target),!h&&(n||!j)&&a(g)}),k=g=>j=>{u.current=!0;const C=t.props[g];C&&C(j)},_={ref:p};return o!==!1&&(_[o]=k(o)),f.useEffect(()=>{if(o!==!1){const g=et(o),j=Ae(l.current),C=()=>{c.current=!0};return j.addEventListener(g,v),j.addEventListener("touchmove",C),()=>{j.removeEventListener(g,v),j.removeEventListener("touchmove",C)}}},[v,o]),r!==!1&&(_[r]=k(r)),f.useEffect(()=>{if(r!==!1){const g=et(r),j=Ae(l.current);return j.addEventListener(g,v),()=>{j.removeEventListener(g,v)}}},[v,r]),i.jsx(f.Fragment,{children:f.cloneElement(t,_)})}function vn(e={}){const{autoHideDuration:t=null,disableWindowBlurListener:n=!1,onClose:r,open:a,resumeHideDuration:o}=e,c=Gt();f.useEffect(()=>{if(!a)return;function h(b){b.defaultPrevented||(b.key==="Escape"||b.key==="Esc")&&(r==null||r(b,"escapeKeyDown"))}return document.addEventListener("keydown",h),()=>{document.removeEventListener("keydown",h)}},[a,r]);const l=_e((h,b)=>{r==null||r(h,b)}),m=_e(h=>{!r||h==null||c.start(h,()=>{l(null,"timeout")})});f.useEffect(()=>(a&&m(t),c.clear),[a,t,m,c]);const u=h=>{r==null||r(h,"clickaway")},p=c.clear,v=f.useCallback(()=>{t!=null&&m(o??t*.5)},[t,o,m]),k=h=>b=>{const E=h.onBlur;E==null||E(b),v()},_=h=>b=>{const E=h.onFocus;E==null||E(b),p()},g=h=>b=>{const E=h.onMouseEnter;E==null||E(b),p()},j=h=>b=>{const E=h.onMouseLeave;E==null||E(b),v()};return f.useEffect(()=>{if(!n&&a)return window.addEventListener("focus",v),window.addEventListener("blur",p),()=>{window.removeEventListener("focus",v),window.removeEventListener("blur",p)}},[n,a,v,p]),{getRootProps:(h={})=>{const b=M({},Je(e),Je(h));return M({role:"presentation"},h,b,{onBlur:k(b),onFocus:_(b),onMouseEnter:g(b),onMouseLeave:j(b)})},onClickAway:u}}function hn(e){return mt("MuiSnackbarContent",e)}gt("MuiSnackbarContent",["root","message","action"]);const yn=["action","className","message","role"],bn=e=>{const{classes:t}=e;return ht({root:["root"],action:["action"],message:["message"]},hn,t)},xn=he(Yt,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>{const t=e.palette.mode==="light"?.8:.98,n=Qt(e.palette.background.default,t);return M({},e.typography.body2,{color:e.vars?e.vars.palette.SnackbarContent.color:e.palette.getContrastText(n),backgroundColor:e.vars?e.vars.palette.SnackbarContent.bg:n,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(e.vars||e).shape.borderRadius,flexGrow:1,[e.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})}),Dn=he("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0"}),jn=he("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),wn=f.forwardRef(function(t,n){const r=vt({props:t,name:"MuiSnackbarContent"}),{action:a,className:o,message:c,role:l="alert"}=r,m=Fe(r,yn),u=r,p=bn(u);return i.jsxs(xn,M({role:l,square:!0,elevation:6,className:Xt(p.root,o),ownerState:u,ref:n},m,{children:[i.jsx(Dn,{className:p.message,ownerState:u,children:c}),a?i.jsx(jn,{className:p.action,ownerState:u,children:a}):null]}))}),En=wn;function Cn(e){return mt("MuiSnackbar",e)}gt("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const On=["onEnter","onExited"],kn=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],An=e=>{const{classes:t,anchorOrigin:n}=e,r={root:["root",`anchorOrigin${de(n.vertical)}${de(n.horizontal)}`]};return ht(r,Cn,t)},tt=he("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`anchorOrigin${de(n.anchorOrigin.vertical)}${de(n.anchorOrigin.horizontal)}`]]}})(({theme:e,ownerState:t})=>{const n={left:"50%",right:"auto",transform:"translateX(-50%)"};return M({zIndex:(e.vars||e).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},t.anchorOrigin.vertical==="top"?{top:8}:{bottom:8},t.anchorOrigin.horizontal==="left"&&{justifyContent:"flex-start"},t.anchorOrigin.horizontal==="right"&&{justifyContent:"flex-end"},{[e.breakpoints.up("sm")]:M({},t.anchorOrigin.vertical==="top"?{top:24}:{bottom:24},t.anchorOrigin.horizontal==="center"&&n,t.anchorOrigin.horizontal==="left"&&{left:24,right:"auto"},t.anchorOrigin.horizontal==="right"&&{right:24,left:"auto"})})}),Sn=f.forwardRef(function(t,n){const r=vt({props:t,name:"MuiSnackbar"}),a=Jt(),o={enter:a.transitions.duration.enteringScreen,exit:a.transitions.duration.leavingScreen},{action:c,anchorOrigin:{vertical:l,horizontal:m}={vertical:"bottom",horizontal:"left"},autoHideDuration:u=null,children:p,className:v,ClickAwayListenerProps:k,ContentProps:_,disableWindowBlurListener:g=!1,message:j,open:C,TransitionComponent:h=en,transitionDuration:b=o,TransitionProps:{onEnter:E,onExited:I}={}}=r,$=Fe(r.TransitionProps,On),B=Fe(r,kn),P=M({},r,{anchorOrigin:{vertical:l,horizontal:m},autoHideDuration:u,disableWindowBlurListener:g,TransitionComponent:h,transitionDuration:b}),y=An(P),{getRootProps:D,onClickAway:L}=vn(M({},P)),[W,K]=f.useState(!0),U=Zt({elementType:tt,getSlotProps:D,externalForwardedProps:B,ownerState:P,additionalProps:{ref:n},className:[y.root,v]}),A=J=>{K(!0),I&&I(J)},F=(J,oe)=>{K(!1),E&&E(J,oe)};return!C&&W?null:i.jsx(gn,M({onClickAway:L},k,{children:i.jsx(tt,M({},U,{children:i.jsx(h,M({appear:!0,in:C,timeout:b,direction:l==="top"?"down":"up",onEnter:F,onExited:A},$,{children:p||i.jsx(En,M({message:j,action:c},_))}))}))}))}),_n=Sn;var Le={},Fn=ne;Object.defineProperty(Le,"__esModule",{value:!0});var Ot=Le.default=void 0,Pn=Fn(te()),Rn=i;Ot=Le.default=(0,Pn.default)((0,Rn.jsx)("path",{d:"M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-7.79-3.17-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4z"}),"AddPhotoAlternateOutlined");var ze={},Tn=ne;Object.defineProperty(ze,"__esModule",{value:!0});var kt=ze.default=void 0,Mn=Tn(te()),In=i;kt=ze.default=(0,Mn.default)((0,In.jsx)("path",{d:"M15 15H3v2h12zm0-8H3v2h12zM3 13h18v-2H3zm0 8h18v-2H3zM3 3v2h18V3z"}),"FormatAlignLeftOutlined");var $e={},Ln=ne;Object.defineProperty($e,"__esModule",{value:!0});var At=$e.default=void 0,zn=Ln(te()),$n=i;At=$e.default=(0,zn.default)((0,$n.jsx)("path",{d:"M8.7 15.9 4.8 12l3.9-3.9c.39-.39.39-1.01 0-1.4a.9839.9839 0 0 0-1.4 0l-4.59 4.59c-.39.39-.39 1.02 0 1.41l4.59 4.6c.39.39 1.01.39 1.4 0 .39-.39.39-1.01 0-1.4m6.6 0 3.9-3.9-3.9-3.9a.9839.9839 0 0 1 0-1.4c.39-.39 1.01-.39 1.4 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.6c-.39.39-1.01.39-1.4 0a.9839.9839 0 0 1 0-1.4"}),"CodeRounded");var Ne={},Nn=ne;Object.defineProperty(Ne,"__esModule",{value:!0});var St=Ne.default=void 0,Hn=Nn(te()),Bn=i;St=Ne.default=(0,Hn.default)((0,Bn.jsx)("path",{d:"M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5m-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4zm-3-4h8v2H8z"}),"LinkOutlined");var He={},Wn=ne;Object.defineProperty(He,"__esModule",{value:!0});var _t=He.default=void 0,Kn=Wn(te()),Un=i;_t=He.default=(0,Kn.default)((0,Un.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"}),"KeyboardArrowDown");const qn=tn(i.jsx("path",{d:"M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"}),"DeleteOutlined");function Q(e,t,n,r){function a(o){return o instanceof n?o:new n(function(c){c(o)})}return new(n||(n=Promise))(function(o,c){function l(p){try{u(r.next(p))}catch(v){c(v)}}function m(p){try{u(r.throw(p))}catch(v){c(v)}}function u(p){p.done?o(p.value):a(p.value).then(l,m)}u((r=r.apply(e,t||[])).next())})}function X(e,t){var n={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,a,o,c;return c={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(c[Symbol.iterator]=function(){return this}),c;function l(u){return function(p){return m([u,p])}}function m(u){if(r)throw new TypeError("Generator is already executing.");for(;c&&(c=0,u[0]&&(n=0)),n;)try{if(r=1,a&&(o=u[0]&2?a.return:u[0]?a.throw||((o=a.return)&&o.call(a),0):a.next)&&!(o=o.call(a,u[1])).done)return o;switch(a=0,o&&(u=[u[0]&2,o.value]),u[0]){case 0:case 1:o=u;break;case 4:return n.label++,{value:u[1],done:!1};case 5:n.label++,a=u[1],u=[0];continue;case 7:u=n.ops.pop(),n.trys.pop();continue;default:if(o=n.trys,!(o=o.length>0&&o[o.length-1])&&(u[0]===6||u[0]===2)){n=0;continue}if(u[0]===3&&(!o||u[1]>o[0]&&u[1]<o[3])){n.label=u[1];break}if(u[0]===6&&n.label<o[1]){n.label=o[1],o=u;break}if(o&&n.label<o[2]){n.label=o[2],n.ops.push(u);break}o[2]&&n.ops.pop(),n.trys.pop();continue}u=t.call(e,n)}catch(p){u=[6,p],a=0}finally{r=o=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}function nt(e,t){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var r=n.call(e),a,o=[],c;try{for(;(t===void 0||t-- >0)&&!(a=r.next()).done;)o.push(a.value)}catch(l){c={error:l}}finally{try{a&&!a.done&&(n=r.return)&&n.call(r)}finally{if(c)throw c.error}}return o}function rt(e,t,n){if(n||arguments.length===2)for(var r=0,a=t.length,o;r<a;r++)(o||!(r in t))&&(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))}var Vn=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function re(e,t){var n=Gn(e);if(typeof n.path!="string"){var r=e.webkitRelativePath;Object.defineProperty(n,"path",{value:typeof t=="string"?t:typeof r=="string"&&r.length>0?r:e.name,writable:!1,configurable:!1,enumerable:!0})}return n}function Gn(e){var t=e.name,n=t&&t.lastIndexOf(".")!==-1;if(n&&!e.type){var r=t.split(".").pop().toLowerCase(),a=Vn.get(r);a&&Object.defineProperty(e,"type",{value:a,writable:!1,configurable:!1,enumerable:!0})}return e}var Yn=[".DS_Store","Thumbs.db"];function Qn(e){return Q(this,void 0,void 0,function(){return X(this,function(t){return me(e)&&Xn(e.dataTransfer)?[2,tr(e.dataTransfer,e.type)]:Jn(e)?[2,Zn(e)]:Array.isArray(e)&&e.every(function(n){return"getFile"in n&&typeof n.getFile=="function"})?[2,er(e)]:[2,[]]})})}function Xn(e){return me(e)}function Jn(e){return me(e)&&me(e.target)}function me(e){return typeof e=="object"&&e!==null}function Zn(e){return Pe(e.target.files).map(function(t){return re(t)})}function er(e){return Q(this,void 0,void 0,function(){var t;return X(this,function(n){switch(n.label){case 0:return[4,Promise.all(e.map(function(r){return r.getFile()}))];case 1:return t=n.sent(),[2,t.map(function(r){return re(r)})]}})})}function tr(e,t){return Q(this,void 0,void 0,function(){var n,r;return X(this,function(a){switch(a.label){case 0:return e.items?(n=Pe(e.items).filter(function(o){return o.kind==="file"}),t!=="drop"?[2,n]:[4,Promise.all(n.map(nr))]):[3,2];case 1:return r=a.sent(),[2,ot(Ft(r))];case 2:return[2,ot(Pe(e.files).map(function(o){return re(o)}))]}})})}function ot(e){return e.filter(function(t){return Yn.indexOf(t.name)===-1})}function Pe(e){if(e===null)return[];for(var t=[],n=0;n<e.length;n++){var r=e[n];t.push(r)}return t}function nr(e){if(typeof e.webkitGetAsEntry!="function")return at(e);var t=e.webkitGetAsEntry();return t&&t.isDirectory?Pt(t):at(e)}function Ft(e){return e.reduce(function(t,n){return rt(rt([],nt(t),!1),nt(Array.isArray(n)?Ft(n):[n]),!1)},[])}function at(e){var t=e.getAsFile();if(!t)return Promise.reject("".concat(e," is not a File"));var n=re(t);return Promise.resolve(n)}function rr(e){return Q(this,void 0,void 0,function(){return X(this,function(t){return[2,e.isDirectory?Pt(e):or(e)]})})}function Pt(e){var t=e.createReader();return new Promise(function(n,r){var a=[];function o(){var c=this;t.readEntries(function(l){return Q(c,void 0,void 0,function(){var m,u,p;return X(this,function(v){switch(v.label){case 0:if(l.length)return[3,5];v.label=1;case 1:return v.trys.push([1,3,,4]),[4,Promise.all(a)];case 2:return m=v.sent(),n(m),[3,4];case 3:return u=v.sent(),r(u),[3,4];case 4:return[3,6];case 5:p=Promise.all(l.map(rr)),a.push(p),o(),v.label=6;case 6:return[2]}})})},function(l){r(l)})}o()})}function or(e){return Q(this,void 0,void 0,function(){return X(this,function(t){return[2,new Promise(function(n,r){e.file(function(a){var o=re(a,e.fullPath);n(o)},function(a){r(a)})})]})})}var ar=function(e,t){if(e&&t){var n=Array.isArray(t)?t:t.split(","),r=e.name||"",a=(e.type||"").toLowerCase(),o=a.replace(/\/.*$/,"");return n.some(function(c){var l=c.trim().toLowerCase();return l.charAt(0)==="."?r.toLowerCase().endsWith(l):l.endsWith("/*")?o===l.replace(/\/.*$/,""):a===l})}return!0};function it(e){return cr(e)||sr(e)||Tt(e)||ir()}function ir(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function sr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function cr(e){if(Array.isArray(e))return Re(e)}function st(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function ct(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?st(Object(n),!0).forEach(function(r){Rt(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):st(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Rt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ee(e,t){return fr(e)||ur(e,t)||Tt(e,t)||lr()}function lr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Tt(e,t){if(e){if(typeof e=="string")return Re(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Re(e,t)}}function Re(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ur(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r=[],a=!0,o=!1,c,l;try{for(n=n.call(e);!(a=(c=n.next()).done)&&(r.push(c.value),!(t&&r.length===t));a=!0);}catch(m){o=!0,l=m}finally{try{!a&&n.return!=null&&n.return()}finally{if(o)throw l}}return r}}function fr(e){if(Array.isArray(e))return e}var pr="file-invalid-type",dr="file-too-large",mr="file-too-small",gr="too-many-files",vr=function(t){t=Array.isArray(t)&&t.length===1?t[0]:t;var n=Array.isArray(t)?"one of ".concat(t.join(", ")):t;return{code:pr,message:"File type must be ".concat(n)}},lt=function(t){return{code:dr,message:"File is larger than ".concat(t," ").concat(t===1?"byte":"bytes")}},ut=function(t){return{code:mr,message:"File is smaller than ".concat(t," ").concat(t===1?"byte":"bytes")}},hr={code:gr,message:"Too many files"};function Mt(e,t){var n=e.type==="application/x-moz-file"||ar(e,t);return[n,n?null:vr(t)]}function It(e,t,n){if(H(e.size))if(H(t)&&H(n)){if(e.size>n)return[!1,lt(n)];if(e.size<t)return[!1,ut(t)]}else{if(H(t)&&e.size<t)return[!1,ut(t)];if(H(n)&&e.size>n)return[!1,lt(n)]}return[!0,null]}function H(e){return e!=null}function yr(e){var t=e.files,n=e.accept,r=e.minSize,a=e.maxSize,o=e.multiple,c=e.maxFiles,l=e.validator;return!o&&t.length>1||o&&c>=1&&t.length>c?!1:t.every(function(m){var u=Mt(m,n),p=ee(u,1),v=p[0],k=It(m,r,a),_=ee(k,1),g=_[0],j=l?l(m):null;return v&&g&&!j})}function ge(e){return typeof e.isPropagationStopped=="function"?e.isPropagationStopped():typeof e.cancelBubble<"u"?e.cancelBubble:!1}function fe(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(t){return t==="Files"||t==="application/x-moz-file"}):!!e.target&&!!e.target.files}function ft(e){e.preventDefault()}function br(e){return e.indexOf("MSIE")!==-1||e.indexOf("Trident/")!==-1}function xr(e){return e.indexOf("Edge/")!==-1}function Dr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.navigator.userAgent;return br(e)||xr(e)}function z(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){for(var a=arguments.length,o=new Array(a>1?a-1:0),c=1;c<a;c++)o[c-1]=arguments[c];return t.some(function(l){return!ge(r)&&l&&l.apply(void 0,[r].concat(o)),ge(r)})}}function jr(){return"showOpenFilePicker"in window}function wr(e){if(H(e)){var t=Object.entries(e).filter(function(n){var r=ee(n,2),a=r[0],o=r[1],c=!0;return Lt(a)||(console.warn('Skipped "'.concat(a,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),c=!1),(!Array.isArray(o)||!o.every(zt))&&(console.warn('Skipped "'.concat(a,'" because an invalid file extension was provided.')),c=!1),c}).reduce(function(n,r){var a=ee(r,2),o=a[0],c=a[1];return ct(ct({},n),{},Rt({},o,c))},{});return[{description:"Files",accept:t}]}return e}function Er(e){if(H(e))return Object.entries(e).reduce(function(t,n){var r=ee(n,2),a=r[0],o=r[1];return[].concat(it(t),[a],it(o))},[]).filter(function(t){return Lt(t)||zt(t)}).join(",")}function Cr(e){return e instanceof DOMException&&(e.name==="AbortError"||e.code===e.ABORT_ERR)}function Or(e){return e instanceof DOMException&&(e.name==="SecurityError"||e.code===e.SECURITY_ERR)}function Lt(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||/\w+\/[-+.\w]+/g.test(e)}function zt(e){return/^.*\.[\w]+$/.test(e)}var kr=["children"],Ar=["open"],Sr=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],_r=["refKey","onChange","onClick"];function Fr(e){return Tr(e)||Rr(e)||$t(e)||Pr()}function Pr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Rr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Tr(e){if(Array.isArray(e))return Te(e)}function Se(e,t){return Lr(e)||Ir(e,t)||$t(e,t)||Mr()}function Mr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $t(e,t){if(e){if(typeof e=="string")return Te(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Te(e,t)}}function Te(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Ir(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r=[],a=!0,o=!1,c,l;try{for(n=n.call(e);!(a=(c=n.next()).done)&&(r.push(c.value),!(t&&r.length===t));a=!0);}catch(m){o=!0,l=m}finally{try{!a&&n.return!=null&&n.return()}finally{if(o)throw l}}return r}}function Lr(e){if(Array.isArray(e))return e}function pt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?pt(Object(n),!0).forEach(function(r){Me(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pt(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Me(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ve(e,t){if(e==null)return{};var n=zr(e,t),r,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function zr(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,o;for(o=0;o<r.length;o++)a=r[o],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}var ye=f.forwardRef(function(e,t){var n=e.children,r=ve(e,kr),a=Nr(r),o=a.open,c=ve(a,Ar);return f.useImperativeHandle(t,function(){return{open:o}},[o]),nn.createElement(f.Fragment,null,n(w(w({},c),{},{open:o})))});ye.displayName="Dropzone";var Nt={disabled:!1,getFilesFromEvent:Qn,maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};ye.defaultProps=Nt;ye.propTypes={children:x.func,accept:x.objectOf(x.arrayOf(x.string)),multiple:x.bool,preventDropOnDocument:x.bool,noClick:x.bool,noKeyboard:x.bool,noDrag:x.bool,noDragEventsBubbling:x.bool,minSize:x.number,maxSize:x.number,maxFiles:x.number,disabled:x.bool,getFilesFromEvent:x.func,onFileDialogCancel:x.func,onFileDialogOpen:x.func,useFsAccessApi:x.bool,autoFocus:x.bool,onDragEnter:x.func,onDragLeave:x.func,onDragOver:x.func,onDrop:x.func,onDropAccepted:x.func,onDropRejected:x.func,onError:x.func,validator:x.func};const $r=ye;var Ie={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function Nr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=w(w({},Nt),e),n=t.accept,r=t.disabled,a=t.getFilesFromEvent,o=t.maxSize,c=t.minSize,l=t.multiple,m=t.maxFiles,u=t.onDragEnter,p=t.onDragLeave,v=t.onDragOver,k=t.onDrop,_=t.onDropAccepted,g=t.onDropRejected,j=t.onFileDialogCancel,C=t.onFileDialogOpen,h=t.useFsAccessApi,b=t.autoFocus,E=t.preventDropOnDocument,I=t.noClick,$=t.noKeyboard,B=t.noDrag,P=t.noDragEventsBubbling,y=t.onError,D=t.validator,L=f.useMemo(function(){return Er(n)},[n]),W=f.useMemo(function(){return wr(n)},[n]),K=f.useMemo(function(){return typeof C=="function"?C:dt},[C]),U=f.useMemo(function(){return typeof j=="function"?j:dt},[j]),A=f.useRef(null),F=f.useRef(null),J=f.useReducer(Hr,Ie),oe=Se(J,2),be=oe[0],R=oe[1],Ht=be.isFocused,Be=be.isFileDialogActive,ae=f.useRef(typeof window<"u"&&window.isSecureContext&&h&&jr()),We=function(){!ae.current&&Be&&setTimeout(function(){if(F.current){var d=F.current.files;d.length||(R({type:"closeDialog"}),U())}},300)};f.useEffect(function(){return window.addEventListener("focus",We,!1),function(){window.removeEventListener("focus",We,!1)}},[F,Be,U,ae]);var q=f.useRef([]),Ke=function(d){A.current&&A.current.contains(d.target)||(d.preventDefault(),q.current=[])};f.useEffect(function(){return E&&(document.addEventListener("dragover",ft,!1),document.addEventListener("drop",Ke,!1)),function(){E&&(document.removeEventListener("dragover",ft),document.removeEventListener("drop",Ke))}},[A,E]),f.useEffect(function(){return!r&&b&&A.current&&A.current.focus(),function(){}},[A,b,r]);var N=f.useCallback(function(s){y?y(s):console.error(s)},[y]),Ue=f.useCallback(function(s){s.preventDefault(),s.persist(),le(s),q.current=[].concat(Fr(q.current),[s.target]),fe(s)&&Promise.resolve(a(s)).then(function(d){if(!(ge(s)&&!P)){var O=d.length,S=O>0&&yr({files:d,accept:L,minSize:c,maxSize:o,multiple:l,maxFiles:m,validator:D}),T=O>0&&!S;R({isDragAccept:S,isDragReject:T,isDragActive:!0,type:"setDraggedFiles"}),u&&u(s)}}).catch(function(d){return N(d)})},[a,u,N,P,L,c,o,l,m,D]),qe=f.useCallback(function(s){s.preventDefault(),s.persist(),le(s);var d=fe(s);if(d&&s.dataTransfer)try{s.dataTransfer.dropEffect="copy"}catch{}return d&&v&&v(s),!1},[v,P]),Ve=f.useCallback(function(s){s.preventDefault(),s.persist(),le(s);var d=q.current.filter(function(S){return A.current&&A.current.contains(S)}),O=d.indexOf(s.target);O!==-1&&d.splice(O,1),q.current=d,!(d.length>0)&&(R({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),fe(s)&&p&&p(s))},[A,p,P]),ie=f.useCallback(function(s,d){var O=[],S=[];s.forEach(function(T){var Z=Mt(T,L),Y=Se(Z,2),De=Y[0],je=Y[1],we=It(T,c,o),ue=Se(we,2),Ee=ue[0],Ce=ue[1],Oe=D?D(T):null;if(De&&Ee&&!Oe)O.push(T);else{var ke=[je,Ce];Oe&&(ke=ke.concat(Oe)),S.push({file:T,errors:ke.filter(function(Ut){return Ut})})}}),(!l&&O.length>1||l&&m>=1&&O.length>m)&&(O.forEach(function(T){S.push({file:T,errors:[hr]})}),O.splice(0)),R({acceptedFiles:O,fileRejections:S,type:"setFiles"}),k&&k(O,S,d),S.length>0&&g&&g(S,d),O.length>0&&_&&_(O,d)},[R,l,L,c,o,m,k,_,g,D]),se=f.useCallback(function(s){s.preventDefault(),s.persist(),le(s),q.current=[],fe(s)&&Promise.resolve(a(s)).then(function(d){ge(s)&&!P||ie(d,s)}).catch(function(d){return N(d)}),R({type:"reset"})},[a,ie,N,P]),V=f.useCallback(function(){if(ae.current){R({type:"openDialog"}),K();var s={multiple:l,types:W};window.showOpenFilePicker(s).then(function(d){return a(d)}).then(function(d){ie(d,null),R({type:"closeDialog"})}).catch(function(d){Cr(d)?(U(d),R({type:"closeDialog"})):Or(d)?(ae.current=!1,F.current?(F.current.value=null,F.current.click()):N(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):N(d)});return}F.current&&(R({type:"openDialog"}),K(),F.current.value=null,F.current.click())},[R,K,U,h,ie,N,W,l]),Ge=f.useCallback(function(s){!A.current||!A.current.isEqualNode(s.target)||(s.key===" "||s.key==="Enter"||s.keyCode===32||s.keyCode===13)&&(s.preventDefault(),V())},[A,V]),Ye=f.useCallback(function(){R({type:"focus"})},[]),Qe=f.useCallback(function(){R({type:"blur"})},[]),Xe=f.useCallback(function(){I||(Dr()?setTimeout(V,0):V())},[I,V]),G=function(d){return r?null:d},xe=function(d){return $?null:G(d)},ce=function(d){return B?null:G(d)},le=function(d){P&&d.stopPropagation()},Bt=f.useMemo(function(){return function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},d=s.refKey,O=d===void 0?"ref":d,S=s.role,T=s.onKeyDown,Z=s.onFocus,Y=s.onBlur,De=s.onClick,je=s.onDragEnter,we=s.onDragOver,ue=s.onDragLeave,Ee=s.onDrop,Ce=ve(s,Sr);return w(w(Me({onKeyDown:xe(z(T,Ge)),onFocus:xe(z(Z,Ye)),onBlur:xe(z(Y,Qe)),onClick:G(z(De,Xe)),onDragEnter:ce(z(je,Ue)),onDragOver:ce(z(we,qe)),onDragLeave:ce(z(ue,Ve)),onDrop:ce(z(Ee,se)),role:typeof S=="string"&&S!==""?S:"presentation"},O,A),!r&&!$?{tabIndex:0}:{}),Ce)}},[A,Ge,Ye,Qe,Xe,Ue,qe,Ve,se,$,B,r]),Wt=f.useCallback(function(s){s.stopPropagation()},[]),Kt=f.useMemo(function(){return function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},d=s.refKey,O=d===void 0?"ref":d,S=s.onChange,T=s.onClick,Z=ve(s,_r),Y=Me({accept:L,multiple:l,type:"file",style:{display:"none"},onChange:G(z(S,se)),onClick:G(z(T,Wt)),tabIndex:-1},O,F);return w(w({},Y),Z)}},[F,n,l,se,r]);return w(w({},be),{},{isFocused:Ht&&!r,getRootProps:Bt,getInputProps:Kt,rootRef:A,inputRef:F,open:G(V)})}function Hr(e,t){switch(t.type){case"focus":return w(w({},e),{},{isFocused:!0});case"blur":return w(w({},e),{},{isFocused:!1});case"openDialog":return w(w({},Ie),{},{isFileDialogActive:!0});case"closeDialog":return w(w({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return w(w({},e),{},{isDragActive:t.isDragActive,isDragAccept:t.isDragAccept,isDragReject:t.isDragReject});case"setFiles":return w(w({},e),{},{acceptedFiles:t.acceptedFiles,fileRejections:t.fileRejections});case"reset":return w({},Ie);default:return e}}function dt(){}function Br({fetchPosts:e}){yt();const{user:t,token:n}=bt(),[r,a]=f.useState(null),[o,c]=f.useState(null),[l,m]=f.useState([]),[u,p]=f.useState(!1),[v,k]=f.useState(null),_={user:t._id,title:"",description:"",codeSnippet:"",link:""},[g,j]=f.useState(_),C=y=>{l.includes(y)?m(l.filter(D=>D!==y)):m([...l,y])},h=y=>l.includes(y),b=async y=>{if(!g.title&&!g.description&&!g.codeSnippet&&!g.link&&!r)p(!0);else try{const D=new FormData;D.append("user",g.user),D.append("title",g.title),D.append("description",g.description),D.append("codeSnippet",g.codeSnippet),D.append("link",g.link),D.append("image",r),await jt.post(y,D,{headers:{Authorization:`Bearer ${n}`}}),e(),j(_),a(null),c(null),m([])}catch(D){console.error("Error:",D)}},E=()=>{k(null)},I=(y,D)=>{j({...g,[y]:D})},$=y=>{const D=y[0];a(D);const L=new FileReader;L.onload=W=>c(W.target.result),L.readAsDataURL(D)},B={toolbar:[[{header:[1,2,!1]}],["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],[{align:[]}],[{color:[]},{background:[]}],["link","image","code-block"],["clean"]]},P=["header","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","code-block"];return i.jsxs(xt,{children:[i.jsxs("div",{className:"space-between",style:{marginBottom:"10px"},children:[i.jsxs("div",{className:"inline-left",style:{gap:"20px"},children:[i.jsx("img",{src:`${pe}/public/${t.profilePicture?t.profilePicture:"uploads/default-profile-picture.jpg"}`,alt:"name",style:{borderRadius:40,width:"40px"}}),i.jsx("div",{className:"search-box",children:i.jsx("input",{type:"text",placeholder:"Write a thought...",value:g.title,onChange:y=>I("title",y.target.value),className:"roboto-font"})})]}),i.jsxs("div",{children:[i.jsxs("button",{className:"share-btn",onClick:y=>{k(y.currentTarget)},children:["share",i.jsx(_t,{})]}),i.jsxs(rn,{anchorEl:v,open:!!v,onClose:E,children:[i.jsx(Ze,{onClick:()=>{b(`${pe}/posts`),E()},children:"Share as Post"}),i.jsx(Ze,{onClick:()=>{b(`${pe}/projects`),E()},children:"Share as Project"})]})]}),i.jsx(_n,{open:u,autoHideDuration:3e3,onClose:y=>{p(!1)},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformorigin:{vertical:"bottom",horizontal:"right"},message:"Please add some content before sharing"})]}),i.jsx(Dt,{}),i.jsxs("div",{className:"inline-left",style:{gap:"20px",marginTop:"10px"},children:[i.jsxs("div",{className:"post-elements",onClick:()=>C("image"),children:[i.jsx(Ot,{className:"icon1",sx:{fontSize:"30px"}}),i.jsx("p",{children:"Add image"})]}),i.jsxs("div",{className:"post-elements medium",onClick:()=>C("description"),children:[i.jsx(kt,{sx:{fontSize:"30px"}}),i.jsx("p",{children:"Add description"})]}),i.jsxs("div",{className:"post-elements big",onClick:()=>C("codeSnippet"),children:[i.jsx(At,{sx:{fontSize:"30px"}}),i.jsx("p",{children:"Add code snippet"})]}),i.jsxs("div",{className:"post-elements",onClick:()=>C("link"),children:[i.jsx(St,{sx:{fontSize:"30px"}}),i.jsx("p",{children:"Add link"})]})]}),i.jsxs("div",{className:"column gap",children:[h("description")&&i.jsx(sn,{theme:"snow",modules:B,formats:P,value:g.description,onChange:y=>I("description",y)}),h("image")&&i.jsx("div",{style:{display:"flex",justifyContent:"center"},children:i.jsx($r,{acceptedFiles:".jpg,.jpeg,.png",multiple:!1,onDrop:$,children:({getRootProps:y,getInputProps:D})=>i.jsxs("div",{...y(),children:[i.jsx("input",{...D()}),r?i.jsxs("div",{className:"column",children:[o&&i.jsx("img",{src:o,alt:"Preview"}),i.jsxs("div",{className:"inline-left",children:[i.jsx("p",{children:r.name}),i.jsx(on,{onClick:()=>{a(null),c(null)},children:i.jsx(qn,{})})]})]}):i.jsx("p",{className:"dropzone",children:"Add Image Here"})]})})}),h("codeSnippet")&&i.jsx("textarea",{placeholder:"Enter code snippet",value:g.codeSnippet,onChange:y=>I("codeSnippet",y.target.value)}),h("link")&&i.jsx("input",{type:"url",placeholder:"Enter link URL",value:g.link,onChange:y=>I("link",y.target.value)})]})]})}function Vr(){const{theme:e}=yt(),{token:t}=bt(),[n,r]=f.useState([]),[a,o]=f.useState("");f.useEffect(()=>{c()},[]);const c=async()=>{try{const p=await jt.get(`${pe}/posts`,{headers:{Authorization:`Bearer ${t}`}});r(p.data)}catch(p){console.error("Error fetching posts:",p)}},l=p=>{o(p.target.value)},m=n.filter(p=>(p.title+p.description).toLowerCase().includes(a.toLowerCase())),u=(p,v)=>{r(n.map(k=>k._id===p?{...k,likes:v}:k))};return i.jsxs("div",{className:"feed",children:[i.jsx(Br,{fetchPosts:c}),i.jsxs(xt,{children:[i.jsxs("div",{className:"space-between margin-bottom",children:[i.jsxs("div",{className:"inline-left margin-bottom gap",children:[i.jsx("p",{children:"Filter by:"}),i.jsxs("div",{className:"inline-left gap",children:[i.jsx("p",{className:"tag",children:"friends"}),i.jsx("p",{className:"tag",children:"all users"}),i.jsx("p",{className:"tag",children:"most recent"}),i.jsx("p",{className:"tag",children:"oldest"})]})]}),i.jsxs("div",{className:"search-box",children:[i.jsx("input",{type:"text",placeholder:"search post",value:a,onChange:l}),i.jsx(an,{className:`icon ${e}`,style:{width:"20px"}})]})]}),i.jsx("h2",{children:"Feed"}),i.jsx(Dt,{}),i.jsx("div",{style:{display:"flex",flexDirection:"column-reverse"},children:m.map(p=>i.jsx(cn,{post:p,updatePostLikes:u},p._id))})]})]})}export{Vr as default};
