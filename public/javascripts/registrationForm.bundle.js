!function(l){function e(e){for(var t,r,a=e[0],n=e[1],s=e[2],o=0,i=[];o<a.length;o++)r=a[o],c[r]&&i.push(c[r][0]),c[r]=0;for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(l[t]=n[t]);for(d&&d(e);i.length;)i.shift()();return m.push.apply(m,s||[]),u()}function u(){for(var e,t=0;t<m.length;t++){for(var r=m[t],a=!0,n=1;n<r.length;n++){var s=r[n];0!==c[s]&&(a=!1)}a&&(m.splice(t--,1),e=o(o.s=r[0]))}return e}var r={},c={3:0},m=[];function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=l,o.c=r,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(r,a,function(e){return t[e]}.bind(null,a));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var t=window.webpackJsonp=window.webpackJsonp||[],a=t.push.bind(t);t.push=e,t=t.slice();for(var n=0;n<t.length;n++)e(t[n]);var d=a;m.push([379,0]),u()}({15:function(e,t,r){"use strict";var a=r(11),n=r.n(a),s=r(10),o=r.n(s),i=r(13),l=r.n(i),u=r(5),c=r.n(u),m=r(6),d=r.n(m),f=r(7),p=r.n(f),h=r(8),g=r.n(h),v=r(9),w=r.n(v),b=r(1),y=r.n(b),E=r(2),S=r.n(E),P=r(0),D=r.n(P),x=r(31),C=r.n(x),O=function(e){var t=e.text,r=e.type,a=e.show,n=e.onDismiss;return a?D.a.createElement("div",{className:"alert alert-".concat(r," alert-dismissible fade show"),role:"alert"},t,D.a.createElement("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close",onClick:n},D.a.createElement("span",{"aria-hidden":"true"},"×"))):null},j=r(4),A=r(32),N=r.n(A),F=(j.BaseFormControl,r(33)),k=(j.BaseFormControl,{alertPrimaryShow:!1,alertDangerShow:!1,message:"",loading:!1});t.a=function(r){return function(e){function t(e){var n;return c()(this,t),n=p()(this,g()(t).call(this,e)),S()(y()(y()(n)),"fetchData",function(){var t=l()(o.a.mark(function e(t){var r,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.setState({loading:!0}),e.next=4,C()(t);case 4:return r=e.sent,(a=r.data).message&&n.setState({message:a.message,alertPrimaryShow:!0}),e.abrupt("return",a);case 10:e.prev=10,e.t0=e.catch(0),n.setState({message:e.t0.message,alertDangerShow:!0});case 13:return e.prev=13,n.setState({loading:!1}),e.finish(13);case 16:case"end":return e.stop()}},e,this,[[0,10,13,16]])}));return function(e){return t.apply(this,arguments)}}()),S()(y()(y()(n)),"onAlertDismiss",function(e){return function(){n.setState(S()({},e,!1))}}),S()(y()(y()(n)),"renderAlerts",function(){var e=n.state,t=e.alertPrimaryShow,r=e.alertDangerShow,a=e.message;return D.a.createElement(D.a.Fragment,null,D.a.createElement(O,{text:a,type:"danger",show:r,onDismiss:n.onAlertDismiss("alertDangerShow")}),D.a.createElement(O,{text:a,type:"primary",show:t,onDismiss:n.onAlertDismiss("alertPrimaryShow")}))}),n.state=k,n}return w()(t,e),d()(t,[{key:"render",value:function(){var e=this.state.loading;return D.a.createElement(r,n()({},this.props,{loading:e,renderAlerts:this.renderAlerts,fetchData:this.fetchData}))}}]),t}(P.Component)}},379:function(e,t,r){"use strict";r.r(t);var a=r(0),i=r.n(a),n=r(14),s=r.n(n),o=r(10),l=r.n(o),u=r(13),c=r.n(u),m=r(5),d=r.n(m),f=r(6),p=r.n(f),h=r(7),g=r.n(h),v=r(8),w=r.n(v),b=r(9),y=r.n(b),E=r(1),S=r.n(E),P=r(2),D=r.n(P),x=r(4),C=r(30),O=r.n(C),j=(r(31),r(15)),A={email:"",password:"",confirmPassword:""},N=function(e){function t(e){var n;return d()(this,t),n=g()(this,w()(t).call(this,e)),D()(S()(S()(n)),"handleChange",function(e){n.setState(D()({},e.target.name,e.target.value))}),D()(S()(S()(n)),"handleSubmit",function(){var r=c()(l.a.mark(function e(t,r){var a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.props.fetchData,t.preventDefault(),e.next=4,a({method:"post",url:"/registration",data:r});case 4:case"end":return e.stop()}},e,this)}));return function(e,t){return r.apply(this,arguments)}}()),D()(S()(S()(n)),"matchPassword",function(e){return e&&e===n.state.password}),D()(S()(S()(n)),"onAlertDismiss",function(e){return function(){n.setState(D()({},e,!1))}}),n.formRef=i.a.createRef(),n.state=A,n}return y()(t,e),p()(t,[{key:"render",value:function(){var e=this.state,t=e.email,r=e.password,a=e.confirmPassword,n=this.props,s=n.loading,o=n.renderAlerts;return i.a.createElement(x.ValidationForm,{className:"registration-form",onSubmit:this.handleSubmit,onErrorSubmit:this.handleErrorSubmit,ref:this.formRef,immediate:!0,setFocusOnError:!0},i.a.createElement("h3",null,"Registration or ",i.a.createElement("a",{href:"/login"},"Login")),o(),i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{htmlFor:"email"},"Email"),i.a.createElement(x.TextInput,{name:"email",id:"email",type:"email",validator:O.a.isEmail,errorMessage:{validator:"Please enter a valid email"},value:t,onChange:this.handleChange})),i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{htmlFor:"password"},"Password"),i.a.createElement(x.TextInput,{name:"password",id:"password",type:"password",required:!0,pattern:"(?=.*[A-Z]).{6,}",errorMessage:{required:"Password is required",pattern:"Password should be at least 6 characters and contains at least one upper case letter"},value:r,onChange:this.handleChange})),i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{htmlFor:"confirmPassword"},"Confirm Password"),i.a.createElement(x.TextInput,{name:"confirmPassword",id:"confirmPassword",type:"password",required:!0,validator:this.matchPassword,errorMessage:{required:"Confirm password is required",validator:"Password does not match"},value:a,onChange:this.handleChange})),i.a.createElement("div",{className:"form-group"},i.a.createElement("button",{className:"btn btn-primary",disabled:s},s&&i.a.createElement("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),"Submit")))}}]),t}(a.Component),F=Object(j.a)(N),k=document.querySelector("#registration-form");s.a.render(i.a.createElement(F,null),k)}});