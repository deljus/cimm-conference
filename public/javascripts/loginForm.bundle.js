!function(l){function e(e){for(var t,n,r=e[0],a=e[1],i=e[2],o=0,s=[];o<r.length;o++)n=r[o],c[n]&&s.push(c[n][0]),c[n]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(l[t]=a[t]);for(p&&p(e);s.length;)s.shift()();return d.push.apply(d,i||[]),u()}function u(){for(var e,t=0;t<d.length;t++){for(var n=d[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==c[i]&&(r=!1)}r&&(d.splice(t--,1),e=o(o.s=n[0]))}return e}var n={},c={1:0},d=[];function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=l,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var t=window.webpackJsonp=window.webpackJsonp||[],r=t.push.bind(t);t.push=e,t=t.slice();for(var a=0;a<t.length;a++)e(t[a]);var p=r;d.push([531,0]),u()}({19:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a});var r=3,a={country:{label:"Country",required:!0,errorMessage:{required:"Country is required"},default:""},city:{label:"City",required:!0,errorMessage:{required:"City is required"},default:""},affiliation:{label:"Affiliation",required:!0,errorMessage:{required:"Affiliation is required"},default:""},address:{label:"Address",required:!0,errorMessage:{required:"Address is required"},default:""},zip:{label:"Zip",required:!0,type:"number",validator:function(e){return 6===e.length},errorMessage:{required:"Zip is required",validator:"Zip len must be 6"},default:""}}},20:function(e,t,n){"use strict";var r=n(0),l=n.n(r),a=function(e){var t=e.text,n=e.type,r=e.show,a=e.onDismiss;return r?l.a.createElement("div",{className:"alert alert-".concat(n," alert-dismissible fade show"),role:"alert"},t,l.a.createElement("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close",onClick:a},l.a.createElement("span",{"aria-hidden":"true"},"×"))):null},i=n(11),o=n.n(i),s=n(4),u=n.n(s),c=n(5),d=n.n(c),p=n(6),f=n.n(p),m=n(7),h=n.n(m),g=n(8),v=n.n(g),b=n(1),y=n.n(b),w=n(2),E=n.n(w),C=n(10),S=n(40),k=(C.BaseFormControl,n(31)),D=n.n(k),R=n(9),N=n.n(R),O=n(12),q=n.n(O),x=n(13),P=n(22),A=n.n(P),M=n(19),j=function(e){function n(e){var t;return u()(this,n),(t=f()(this,h()(n).call(this,e))).setWrapperRef=t.setWrapperRef.bind(y()(y()(t))),t.handleClickOutside=t.handleClickOutside.bind(y()(y()(t))),t}return v()(n,e),d()(n,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.handleClickOutside)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClickOutside)}},{key:"setWrapperRef",value:function(e){this.wrapperRef=e}},{key:"handleClickOutside",value:function(e){this.wrapperRef&&!this.wrapperRef.contains(e.target)&&this.props.onOutSideClick()}},{key:"render",value:function(){return l.a.createElement("div",{ref:this.setWrapperRef},this.props.children)}}]),n}(r.Component),F={input:{position:"relative"}},I=function(e){function t(e){var a;return u()(this,t),a=f()(this,h()(t).call(this,e)),E()(y()(y()(a)),"fetchFn",Object(x.debounce)(function(){var t=q()(N.a.mark(function e(t){var n,r;return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.props.url,e.next=3,A()({url:n,method:"get",params:{search:t}});case 3:(r=e.sent).data&&a.setState({data:r.data});case 5:case"end":return e.stop()}},e,this)}));return function(e){return t.apply(this,arguments)}}(),200)),E()(y()(y()(a)),"handleChange",function(e){e.stopPropagation(),a.fetchFn(e.target.value)}),E()(y()(y()(a)),"openDropdown",function(e){e.stopPropagation(),a.setState({open:!0})}),E()(y()(y()(a)),"closeDropdown",function(e){a.setState({open:!1})}),E()(y()(y()(a)),"onItemClick",function(n){return function(e){e.stopPropagation(),a.setState({open:!1});var t=a.props.onSelect;t&&t(n)}}),a.inputRef=l.a.createRef(),a.popupRef=l.a.createRef(),a.getInputRef=a.getInputRef.bind(y()(y()(a))),a.state={data:[],open:!1},a}return v()(t,e),d()(t,[{key:"componentDidUpdate",value:function(){this.props.disabled&&(this.inputRef.current.value="")}},{key:"getInputRef",value:function(){return this.inputRef.current.inputElement}},{key:"render",value:function(){var e=this,t=this.state,n=t.open,r=t.data,a=this.props,i=a.disabled,o=a.className,s=a.affiliations;D()(a,["disabled","className","affiliations"]);return l.a.createElement(j,{onOutSideClick:this.closeDropdown},l.a.createElement("div",{style:F.input},l.a.createElement("input",{ref:this.inputRef,className:o,onFocus:this.openDropdown,onChange:this.handleChange,disabled:i}),n&&l.a.createElement("div",{ref:this.popupRef,className:"dropdown-menu",style:{display:"block"}},r&&r.map(function(r){return l.a.createElement("span",{className:"dropdown-item-text"},l.a.createElement("h6",null,r.affiliation),l.a.createElement("div",null,Object(x.map)(Object(x.omit)(M.a,"affiliation"),function(e,t){var n=e.label;return r[t]&&l.a.createElement("span",{className:"badge badge-primary "},n,": ",r[t])})),l.a.createElement("button",{className:"btn btn-primary btn-sm",onClick:e.onItemClick(r),disabled:s.some(function(e){return e.id===r.id})},l.a.createElement("i",{className:"fa fa-plus","aria-hidden":"true"}),"  Add selected affiliation"))}),!r.length&&l.a.createElement("span",{className:"dropdown-item"},"Not found"))))}}]),t}(r.Component),_=n(41),W=(n(75),n(534),function(e){function n(e){var t;return u()(this,n),t=f()(this,h()(n).call(this,e)),E()(y()(y()(t)),"onEditorStateChange",function(e){t.checkError(),t.props.onChange&&t.props.onChange(e)}),t.inputRef=l.a.createRef(),t.getInputRef=t.getInputRef.bind(y()(y()(t))),t}return v()(n,e),d()(n,[{key:"getInputRef",value:function(){return this.inputRef.current.inputElement}},{key:"render",value:function(){var e,t=this.props.value;return l.a.createElement(l.a.Fragment,null,l.a.createElement(_.Editor,o()({ref:this.inputRef},this.filterProps(),{editorState:t,toolbar:(e=function(){},{inline:{inDropdown:!0},list:{inDropdown:!0},textAlign:{inDropdown:!0},link:{inDropdown:!0},history:{inDropdown:!0},image:{uploadCallback:e,alt:{present:!0,mandatory:!0}}}),toolbarClassName:"toolbarClassName",wrapperClassName:"html-editor",editorClassName:"form-control",onEditorStateChange:this.onEditorStateChange})),this.displayErrorMessage(),this.displaySuccessMessage())}}]),n}(C.BaseFormControl));n.d(t,"a",function(){return a}),n.d(t,"b",function(){return I}),n.d(t,"c",function(){return W})},21:function(e,t,n){"use strict";var r=n(11),a=n.n(r),i=n(9),o=n.n(i),s=n(12),l=n.n(s),u=n(4),c=n.n(u),d=n(5),p=n.n(d),f=n(6),m=n.n(f),h=n(7),g=n.n(h),v=n(8),b=n.n(v),y=n(1),w=n.n(y),E=n(2),C=n.n(E),S=n(0),k=n.n(S),D=n(22),R=n.n(D),N=n(20),O={alertPrimaryShow:!1,alertDangerShow:!1,message:"",loading:!1};t.a=function(t){return function(e){function n(e){var a,t;return c()(this,n),a=m()(this,g()(n).call(this,e)),C()(w()(w()(a)),"fetchData",(t=l()(o.a.mark(function e(t){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a.setState({loading:!0}),e.next=4,R()(t);case 4:return n=e.sent,(r=n.data).message&&a.setState({message:r.message,alertPrimaryShow:!0}),e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),a.setState({message:e.t0.message,alertDangerShow:!0});case 13:return e.prev=13,a.setState({loading:!1}),e.finish(13);case 16:case"end":return e.stop()}},e,this,[[0,10,13,16]])})),function(e){return t.apply(this,arguments)})),C()(w()(w()(a)),"onAlertDismiss",function(e){return function(){a.setState(C()({},e,!1))}}),C()(w()(w()(a)),"renderAlerts",function(){var e=a.state,t=e.alertPrimaryShow,n=e.alertDangerShow,r=e.message;return k.a.createElement(k.a.Fragment,null,k.a.createElement(N.a,{text:r,type:"danger",show:n,onDismiss:a.onAlertDismiss("alertDangerShow")}),k.a.createElement(N.a,{text:r,type:"primary",show:t,onDismiss:a.onAlertDismiss("alertPrimaryShow")}))}),a.state=O,a}return b()(n,e),p()(n,[{key:"render",value:function(){var e=this.state.loading;return k.a.createElement(t,a()({},this.props,{loading:e,renderAlerts:this.renderAlerts,fetchData:this.fetchData}))}}]),n}(S.Component)}},531:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(18),o=n.n(i),s=n(9),l=n.n(s),u=n(12),c=n.n(u),d=n(4),p=n.n(d),f=n(5),m=n.n(f),h=n(6),g=n.n(h),v=n(7),b=n.n(v),y=n(8),w=n.n(y),E=n(1),C=n.n(E),S=n(2),k=n.n(S),D=n(10),R=n(59),N=n.n(R),O=n(21),q=function(e){function i(){var e,a;p()(this,i);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return a=g()(this,(e=b()(i)).call.apply(e,[this].concat(n))),k()(C()(C()(a)),"state",{email:"",password:""}),k()(C()(C()(a)),"handleChange",function(e){a.setState(k()({},e.target.name,e.target.value))}),k()(C()(C()(a)),"handleSubmit",function(){var n=c()(l.a.mark(function e(t,n){var r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),r=a.props.fetchData,e.next=4,r({method:"post",url:"/login",data:n});case 4:window.location.href="/";case 5:case"end":return e.stop()}},e,this)}));return function(e,t){return n.apply(this,arguments)}}()),a}return w()(i,e),m()(i,[{key:"render",value:function(){var e=this.props,t=e.loading,n=e.renderAlerts;return a.a.createElement(D.ValidationForm,{className:"registration-form",onSubmit:this.handleSubmit,onErrorSubmit:this.handleErrorSubmit},a.a.createElement("h3",null,"Login or ",a.a.createElement("a",{href:"/registration"},"Registration")),n(),a.a.createElement("div",{className:"form-group"},a.a.createElement("label",{htmlFor:"email"},"Email"),a.a.createElement(D.TextInput,{name:"email",id:"email",type:"email",validator:N.a.isEmail,errorMessage:{validator:"Please enter a valid email"},value:this.state.email,onChange:this.handleChange})),a.a.createElement("div",{className:"form-group"},a.a.createElement("label",{htmlFor:"password"},"Password"),a.a.createElement(D.TextInput,{name:"password",id:"password",type:"password",required:!0,pattern:"(?=.*[A-Z]).{6,}",errorMessage:{required:"Password is required",pattern:"Password should be at least 6 characters and contains at least one upper case letter"},value:this.state.password,onChange:this.handleChange})),a.a.createElement("div",{className:"form-group"},a.a.createElement("button",{className:"btn btn-primary",disabled:t},t&&a.a.createElement("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),"Submit")))}}]),i}(r.Component),x=Object(O.a)(q),P=document.querySelector("#login-form");o.a.render(a.a.createElement(x,null),P)}});