(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72ea899b"],{"0147":function(e,s,t){},"278f":function(e,s,t){"use strict";t.r(s);var i=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{class:e.containerClass,on:{click:function(s){return e.onClick(s)}}},[t("div",{staticClass:"p-hidden-accessible"},[t("input",{ref:"input",attrs:{type:"checkbox",id:e.inputId,name:e.name,disabled:e.disabled,role:"switch","aria-checked":e.value,"aria-labelledby":e.ariaLabelledBy},domProps:{checked:e.value},on:{focus:function(s){return e.onFocus(s)},blur:function(s){return e.onBlur(s)},keydown:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:(s.preventDefault(),e.onClick(s))}}})]),t("span",{staticClass:"p-inputswitch-slider"})])},l=[],a={props:{value:Boolean,inputId:String,name:String,disabled:Boolean,ariaLabelledBy:null,trueValue:{type:null,default:!0},falseValue:{type:null,default:!1}},data(){return{focused:!1}},methods:{onClick(e){if(!this.disabled){const s=this.checked?this.falseValue:this.trueValue;this.$emit("click",e),this.$emit("input",s),this.$emit("change",e),this.$refs.input.focus()}},onFocus(e){this.focused=!0,this.$emit("focus",e)},onBlur(e){this.focused=!1,this.$emit("blur",e)}},computed:{containerClass(){return["p-inputswitch p-component",{"p-inputswitch-checked":this.checked,"p-disabled":this.disabled,"p-focus":this.focused}]},checked(){return this.value===this.trueValue}}},r=a,o=(t("c3a1"),t("2877")),n=Object(o["a"])(r,i,l,!1,null,null,null);s["default"]=n.exports},"2a37":function(e,s,t){"use strict";t("5ccf")},"3ce4":function(e,s,t){"use strict";e.exports=t("278f")},"5ccf":function(e,s,t){},"63bb":function(e,s,t){"use strict";e.exports=t("674b")},"6ec9":function(e,s,t){"use strict";e.exports=t("9bc1")},7397:function(e,s,t){"use strict";t("7a84")},"7a84":function(e,s,t){},"9bc1":function(e,s,t){"use strict";t.r(s);var i=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{ref:"container",class:e.containerClass,on:{click:e.onClick}},[t("div",{staticClass:"p-hidden-accessible"},[t("input",{ref:"focusInput",attrs:{type:"text",role:"listbox",id:e.inputId,readonly:"",disabled:e.disabled,tabindex:e.tabindex,"aria-haspopup":"listbox","aria-expanded":e.overlayVisible,"aria-labelledby":e.ariaLabelledBy},on:{focus:e.onFocus,blur:e.onBlur,keydown:e.onKeyDown}})]),t("div",{staticClass:"p-multiselect-label-container"},[t("div",{class:e.labelClass},[e._t("value",["comma"===e.display?[e._v(" "+e._s(e.label||"empty")+" ")]:"chip"===e.display?[e._l(e.value,(function(s){return t("div",{key:e.getLabelByValue(s),staticClass:"p-multiselect-token"},[t("span",{staticClass:"p-multiselect-token-label"},[e._v(e._s(e.getLabelByValue(s)))]),e.disabled?e._e():t("span",{staticClass:"p-multiselect-token-icon pi pi-times-circle",on:{click:function(t){return e.removeChip(s)}}})])})),e.value&&0!==e.value.length?e._e():[e._v(e._s(e.placeholder||"empty"))]]:e._e()],{value:e.value,placeholder:e.placeholder})],2)]),t("div",{staticClass:"p-multiselect-trigger"},[e._t("indicator",[t("span",{staticClass:"p-multiselect-trigger-icon pi pi-chevron-down"})])],2),t("transition",{attrs:{name:"p-connected-overlay"},on:{enter:e.onOverlayEnter,leave:e.onOverlayLeave}},[e.overlayVisible?t("div",{ref:"overlay",staticClass:"p-multiselect-panel p-component"},[e.showToggleAll&&null==e.selectionLimit||e.filter?t("div",{staticClass:"p-multiselect-header"},[e.showToggleAll&&null==e.selectionLimit?t("div",{staticClass:"p-checkbox p-component",attrs:{role:"checkbox","aria-checked":e.allSelected},on:{click:e.onToggleAll}},[t("div",{staticClass:"p-hidden-accessible"},[t("input",{attrs:{type:"checkbox",readonly:""},on:{focus:e.onHeaderCheckboxFocus,blur:e.onHeaderCheckboxBlur}})]),t("div",{class:["p-checkbox-box",{"p-highlight":e.allSelected,"p-focus":e.headerCheckboxFocused}],attrs:{role:"checkbox","aria-checked":e.allSelected}},[t("span",{class:["p-checkbox-icon",{"pi pi-check":e.allSelected}]})])]):e._e(),e.filter?t("div",{staticClass:"p-multiselect-filter-container"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.filterValue,expression:"filterValue"}],ref:"filterInput",staticClass:"p-multiselect-filter p-inputtext p-component",attrs:{type:"text",placeholder:e.filterPlaceholder},domProps:{value:e.filterValue},on:{input:[function(s){s.target.composing||(e.filterValue=s.target.value)},e.onFilterChange]}}),t("span",{staticClass:"p-multiselect-filter-icon pi pi-search"})]):e._e(),t("button",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"p-multiselect-close p-link",attrs:{type:"button"},on:{click:e.onCloseClick}},[t("span",{staticClass:"p-multiselect-close-icon pi pi-times"})])]):e._e(),t("div",{ref:"itemsWrapper",staticClass:"p-multiselect-items-wrapper",style:{"max-height":e.scrollHeight}},[t("ul",{staticClass:"p-multiselect-items p-component",attrs:{role:"listbox","aria-multiselectable":"true"}},[e._l(e.visibleOptions,(function(s,i){return t("li",{directives:[{name:"ripple",rawName:"v-ripple"}],key:e.getOptionRenderKey(s),class:["p-multiselect-item",{"p-highlight":e.isSelected(s),"p-disabled":e.isOptionDisabled(s)}],attrs:{role:"option","aria-selected":e.isSelected(s),"aria-label":e.getOptionLabel(s),tabindex:e.tabindex||"0"},on:{click:function(t){return e.onOptionSelect(t,s)},keydown:function(t){return e.onOptionKeyDown(t,s)}}},[t("div",{staticClass:"p-checkbox p-component"},[t("div",{class:["p-checkbox-box",{"p-highlight":e.isSelected(s)}]},[t("span",{class:["p-checkbox-icon",{"pi pi-check":e.isSelected(s)}]})])]),e._t("option",[t("span",[e._v(e._s(e.getOptionLabel(s)))])],{option:s,index:i})],2)})),e.filterValue&&(!e.visibleOptions||e.visibleOptions&&0===e.visibleOptions.length)?t("li",{staticClass:"p-multiselect-empty-message"},[e._v(e._s(e.emptyFilterMessage))]):e._e()],2)])]):e._e()])],1)},l=[],a=t("d152"),r=t.n(a),o=t("e17c"),n=t.n(o),d=t("11cd"),c=t.n(d),u=t("15f1"),p=t.n(u),h={props:{value:null,options:Array,optionLabel:null,optionValue:null,optionDisabled:null,scrollHeight:{type:String,default:"200px"},placeholder:String,disabled:Boolean,filter:Boolean,tabindex:String,inputId:String,dataKey:null,filterPlaceholder:String,filterLocale:String,ariaLabelledBy:null,appendTo:{type:String,default:null},emptyFilterMessage:{type:String,default:"No results found"},display:{type:String,default:"comma"},selectionLimit:{type:Number,default:null},showToggleAll:{type:Boolean,default:!0}},data(){return{focused:!1,headerCheckboxFocused:!1,filterValue:null,overlayVisible:!1}},outsideClickListener:null,resizeListener:null,scrollHandler:null,updated(){this.onFilterUpdated()},beforeDestroy(){this.restoreAppend(),this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null)},methods:{getOptionLabel(e){return this.optionLabel?n.a.resolveFieldData(e,this.optionLabel):e},getOptionValue(e){return this.optionValue?n.a.resolveFieldData(e,this.optionValue):e},getOptionRenderKey(e){return this.dataKey?n.a.resolveFieldData(e,this.dataKey):this.getOptionLabel(e)},isOptionDisabled(e){return!(!this.maxSelectionLimitReached||this.isSelected(e))||!!this.optionDisabled&&n.a.resolveFieldData(e,this.optionDisabled)},isSelected(e){let s=!1,t=this.getOptionValue(e);if(this.value)for(let i of this.value)if(n.a.equals(i,t,this.equalityKey)){s=!0;break}return s},show(){this.$emit("before-show"),this.overlayVisible=!0},hide(){this.$emit("before-hide"),this.overlayVisible=!1},onFocus(){this.focused=!0},onBlur(){this.focused=!1},onHeaderCheckboxFocus(){this.headerCheckboxFocused=!0},onHeaderCheckboxBlur(){this.headerCheckboxFocused=!1},onClick(){this.disabled||this.$refs.overlay&&this.$refs.overlay.contains(event.target)||c.a.hasClass(event.target,"p-multiselect-close")||(this.overlayVisible?this.hide():this.show(),this.$refs.focusInput.focus())},onCloseClick(){this.hide()},onKeyDown(e){switch(e.which){case 40:this.visibleOptions&&!this.overlayVisible&&e.altKey&&this.show();break;case 32:this.overlayVisible||(this.show(),e.preventDefault());break;case 13:case 27:this.overlayVisible&&(this.hide(),e.preventDefault());break;case 9:this.hide();break;default:break}},onOptionSelect(e,s){if(this.disabled||this.isOptionDisabled(s))return;let t=this.isSelected(s),i=null;i=t?this.value.filter(e=>!n.a.equals(e,this.getOptionValue(s),this.equalityKey)):[...this.value||[],this.getOptionValue(s)],this.$emit("input",i),this.$emit("change",{originalEvent:e,value:i})},onOptionKeyDown(e,s){let t=e.target;switch(e.which){case 40:var i=this.findNextItem(t);i&&i.focus(),e.preventDefault();break;case 38:var l=this.findPrevItem(t);l&&l.focus(),e.preventDefault();break;case 13:this.onOptionSelect(e,s),e.preventDefault();break;default:break}},findNextItem(e){let s=e.nextElementSibling;return s?c.a.hasClass(s,"p-disabled")?this.findNextItem(s):s:null},findPrevItem(e){let s=e.previousElementSibling;return s?c.a.hasClass(s,"p-disabled")?this.findPrevItem(s):s:null},onOverlayEnter(){this.$refs.overlay.style.zIndex=String(c.a.generateZIndex()),this.appendContainer(),this.alignOverlay(),this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit("show"),this.filter&&this.$refs.filterInput.focus()},onOverlayLeave(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit("hide")},alignOverlay(){this.appendTo?(c.a.absolutePosition(this.$refs.overlay,this.$refs.container),this.$refs.overlay.style.minWidth=c.a.getOuterWidth(this.$refs.container)+"px"):c.a.relativePosition(this.$refs.overlay,this.$refs.container)},bindOutsideClickListener(){this.outsideClickListener||(this.outsideClickListener=e=>{this.overlayVisible&&this.isOutsideClicked(e)&&this.hide()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener(){this.scrollHandler||(this.scrollHandler=new r.a(this.$el,()=>{this.overlayVisible&&this.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener(){this.resizeListener||(this.resizeListener=()=>{this.overlayVisible&&!c.a.isAndroid()&&this.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isOutsideClicked(e){return!(this.$refs.container.isSameNode(e.target)||this.$refs.container.contains(e.target)||this.$refs.overlay&&this.$refs.overlay.contains(e.target))},getLabelByValue(e){let s=null;if(this.options)for(let t of this.options){let i=this.getOptionValue(t);if(n.a.equals(i,e,this.equalityKey)){s=this.getOptionLabel(t);break}}return s},onToggleAll(e){const s=this.allSelected?[]:this.visibleOptions&&this.visibleOptions.map(e=>this.getOptionValue(e));this.$emit("input",s),this.$emit("change",{originalEvent:e,value:s})},appendContainer(){this.appendTo&&("body"===this.appendTo?document.body.appendChild(this.$refs.overlay):document.getElementById(this.appendTo).appendChild(this.$refs.overlay))},restoreAppend(){this.$refs.overlay&&this.appendTo&&("body"===this.appendTo?document.body.removeChild(this.$refs.overlay):document.getElementById(this.appendTo).removeChild(this.$refs.overlay))},onFilterChange(e){this.$emit("filter",{originalEvent:e,value:e.target.value})},onFilterUpdated(){this.overlayVisible&&this.alignOverlay()},removeChip(e){let s=this.value.filter(s=>!n.a.equals(s,e,this.equalityKey));this.$emit("input",s),this.$emit("change",{originalEvent:event,value:s})}},computed:{visibleOptions(){return this.filterValue&&this.filterValue.trim().length>0?this.options.filter(e=>this.getOptionLabel(e).toLocaleLowerCase(this.filterLocale).indexOf(this.filterValue.toLocaleLowerCase(this.filterLocale))>-1):this.options},containerClass(){return["p-multiselect p-component p-inputwrapper",{"p-multiselect-chip":"chip"===this.display,"p-disabled":this.disabled,"p-focus":this.focused,"p-inputwrapper-filled":this.value&&this.value.length,"p-inputwrapper-focus":this.focused||this.overlayVisible}]},labelClass(){return["p-multiselect-label",{"p-placeholder":this.label===this.placeholder,"p-multiselect-label-empty":!this.placeholder&&(!this.value||0===this.value.length)}]},label(){let e;if(this.value&&this.value.length){e="";for(let s=0;s<this.value.length;s++)0!==s&&(e+=", "),e+=this.getLabelByValue(this.value[s])}else e=this.placeholder;return e},allSelected(){if(this.filterValue&&this.filterValue.trim().length>0){let e=!0;if(this.visibleOptions.length>0){for(let s of this.visibleOptions)if(!this.isSelected(s)){e=!1;break}}else e=!1;return e}return this.value&&this.options&&this.value.length>0&&this.value.length===this.options.length},equalityKey(){return this.optionValue?null:this.dataKey},maxSelectionLimitReached(){return this.selectionLimit&&this.value&&this.value.length===this.selectionLimit}},directives:{ripple:p.a}},v=h,m=(t("a24d"),t("2877")),f=Object(m["a"])(v,i,l,!1,null,null,null);s["default"]=f.exports},a24d:function(e,s,t){"use strict";t("b088")},b088:function(e,s,t){},c3a1:function(e,s,t){"use strict";t("0147")},c66d:function(e,s,t){"use strict";t.r(s);var i=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("base-header",{staticClass:"pb-8 pt-5"}),t("div",{staticClass:"container-fluid mt--7"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-xl-12 order-xl-1 pr-0 pl-0"},[t("card",{attrs:{shadow:"",type:"secondary"}},[[t("form",[t("h6",{staticClass:"heading-small text-muted mb-4"},[e._v("User information")]),t("div",{staticClass:"pl-lg-4"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-4"},[t("base-input",{attrs:{alternative:"",label:"Username",placeholder:"Username","input-classes":"form-control-alternative",autocomplete:"username",valid:e.errors.username.valid,error:e.errors.username.error},model:{value:e.userModel.username,callback:function(s){e.$set(e.userModel,"username",s)},expression:"userModel.username"}})],1),t("div",{staticClass:"col-lg-4"},[t("base-input",{attrs:{alternative:"",label:"Email address",placeholder:"email@example.com","input-classes":"form-control-alternative",valid:e.errors.email.valid,error:e.errors.email.error},model:{value:e.userModel.email,callback:function(s){e.$set(e.userModel,"email",s)},expression:"userModel.email"}})],1),t("div",{staticClass:"col-lg-4"},[t("div",{staticClass:"form-group has-label"},[t("label",{staticClass:"form-control-label"},[e._v(" "+e._s(this.$i18n.t("language"))+" ")]),t("Dropdown",{staticClass:"form-control form-control-alternative",attrs:{options:e.languages,optionLabel:"name",placeholder:e.$i18n.t("user.edit.select-a-language")},model:{value:e.userModel.language,callback:function(s){e.$set(e.userModel,"language",s)},expression:"userModel.language"}})],1)])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-6"},[t("base-input",{attrs:{alternative:"",label:"First name",placeholder:"First name","input-classes":"form-control-alternative",autocomplete:"given-name",valid:e.errors.firstName.valid,error:e.errors.firstName.error},model:{value:e.userModel.firstName,callback:function(s){e.$set(e.userModel,"firstName",s)},expression:"userModel.firstName"}})],1),t("div",{staticClass:"col-lg-6"},[t("base-input",{attrs:{alternative:"",label:"Last name",placeholder:"Last name","input-classes":"form-control-alternative",autocomplete:"family-name",valid:e.errors.lastName.valid,error:e.errors.lastName.error},model:{value:e.userModel.lastName,callback:function(s){e.$set(e.userModel,"lastName",s)},expression:"userModel.lastName"}})],1)])]),t("h6",{staticClass:"heading-small text-muted mb-4"},[e._v("Password change")]),t("div",{staticClass:"pl-lg-4"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-4"},[t("base-input",{attrs:{type:"password",alternative:"",label:"Old password","input-classes":"form-control-alternative",autocomplete:"current-password",valid:e.errors.oldpass.valid,error:e.errors.oldpass.error},model:{value:e.userModel.oldpass,callback:function(s){e.$set(e.userModel,"oldpass",s)},expression:"userModel.oldpass"}})],1),t("div",{staticClass:"col-lg-4"},[t("base-input",{attrs:{type:"password",alternative:"",label:"New password","input-classes":"form-control-alternative",autocomplete:"new-password",valid:e.errors.newpass.valid,error:e.errors.newpass.error},model:{value:e.userModel.newpass,callback:function(s){e.$set(e.userModel,"newpass",s)},expression:"userModel.newpass"}})],1),t("div",{staticClass:"col-lg-4"},[t("base-input",{attrs:{type:"password",alternative:"",label:"Repeat new password","input-classes":"form-control-alternative",autocomplete:"new-password",valid:e.errors.newpass2.valid,error:e.errors.newpass2.error},model:{value:e.userModel.newpass2,callback:function(s){e.$set(e.userModel,"newpass2",s)},expression:"userModel.newpass2"}})],1),t("div",{staticClass:"col-lg-12 pt-4"},[t("base-button",{attrs:{type:"primary"},on:{click:function(s){return s.preventDefault(),e.saveUser(s)}}},[e._v("Save user profile")])],1)])])])]],2)],1)])])],1)},l=[],a=t("aec4"),r=t("63bb"),o=t.n(r),n=(t("ec12"),t("e1ae"),t("4121"),{name:"user-profile",components:{Dropdown:o.a},data(){return{errors:{firstName:{valid:void 0,error:""},lastName:{valid:void 0,error:""},username:{valid:void 0,error:""},email:{valid:void 0,error:""},oldpass:{valid:void 0,error:""},newpass:{valid:void 0,error:""},newpass2:{valid:void 0,error:""}},userModel:{firstName:"",lastName:"",username:"",email:"",oldpass:"",newpass:"",newpass2:""},languages:[]}},emits:["evtOverlayAddItem","evtOverlayRemoveItem"],mounted(){this.$emit("evtOverlayAddItem"),a["b"].list().then(e=>{this.languages=e.data,this.languages=this.languages.map(e=>({code:e.languageId,name:e.name}))}),a["g"].getUser().then(e=>{this.userModel=e.data,this.userModel.language&&(this.userModel.language={name:this.userModel.language.name,code:this.userModel.language.languageId}),this.$emit("evtOverlayRemoveItem")})},methods:{saveUser(){this.$emit("evtOverlayAddItem"),this.userModel.language.code&&(this.userModel.language.languageId=this.userModel.language.code),a["g"].save(this.userModel).then(e=>{this.resetErrors(),e.error?this.errors={...this.errors,...e.data}:this.$toast.add({severity:"success",summary:"User profile",detail:"User details have been saved succssfully.",life:5e3}),this.$emit("evtOverlayRemoveItem")})},resetErrors(){Object.keys(this.errors).forEach((function(e){this.errors[e]={valid:void 0,error:""}}),this)}}}),d=n,c=(t("2a37"),t("2877")),u=Object(c["a"])(d,i,l,!1,null,null,null);s["default"]=u.exports},cf30:function(e,s,t){"use strict";t.r(s);var i=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("base-header",{staticClass:"pb-8 pt-5"}),t("div",{staticClass:"container-fluid mt--7"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-xl-12 order-xl-1 pr-0 pl-0"},[t("card",{attrs:{shadow:"",type:"secondary"}},[[t("form",[t("h6",{staticClass:"heading-small text-muted mb-4"},[e._v(e._s(this.$i18n.t("userInformation")))]),t("div",{staticClass:"pl-lg-4"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-1"},[t("div",{staticClass:"form-group has-label"},[t("label",{staticClass:"form-control-label"},[e._v(" "+e._s(this.$i18n.t("isActive"))+" ")]),t("div",[t("InputSwitch",{model:{value:e.userModel.isActive,callback:function(s){e.$set(e.userModel,"isActive",s)},expression:"userModel.isActive"}})],1)])]),t("div",{staticClass:"col-lg-5"},[t("base-input",{attrs:{alternative:"",label:e.$i18n.t("user.list.dataheader.username"),placeholder:e.$i18n.t("user.list.dataheader.username"),"input-classes":"form-control-alternative",autocomplete:"username",valid:e.errors.username.valid,error:e.errors.username.error},model:{value:e.userModel.username,callback:function(s){e.$set(e.userModel,"username",s)},expression:"userModel.username"}})],1),t("div",{staticClass:"col-lg-3"},[t("div",{staticClass:"form-group has-label"},[t("label",{staticClass:"form-control-label"},[e._v(" "+e._s(this.$i18n.t("role"))+" ")]),t("Dropdown",{staticClass:"form-control form-control-alternative",attrs:{options:e.roles,optionLabel:"role",placeholder:e.$i18n.t("user.edit.select-a-role")},model:{value:e.userModel.role,callback:function(s){e.$set(e.userModel,"role",s)},expression:"userModel.role"}})],1)]),t("div",{staticClass:"col-lg-3"},[t("div",{staticClass:"form-group has-label"},[t("label",{staticClass:"form-control-label"},[e._v(" "+e._s(this.$i18n.t("language"))+" ")]),t("Dropdown",{staticClass:"form-control form-control-alternative",attrs:{options:e.languages,optionLabel:"name",placeholder:e.$i18n.t("user.edit.select-a-language")},model:{value:e.userModel.language,callback:function(s){e.$set(e.userModel,"language",s)},expression:"userModel.language"}})],1)])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-6"},[t("base-input",{attrs:{alternative:"",label:e.$i18n.t("user.edit.email-address"),placeholder:"email@example.com","input-classes":"form-control-alternative",valid:e.errors.email.valid,error:e.errors.email.error},model:{value:e.userModel.email,callback:function(s){e.$set(e.userModel,"email",s)},expression:"userModel.email"}})],1)]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-6"},[t("base-input",{attrs:{alternative:"",label:e.$i18n.t("user.edit.first-name"),placeholder:e.$i18n.t("user.edit.first-name"),"input-classes":"form-control-alternative",autocomplete:"given-name",valid:e.errors.firstName.valid,error:e.errors.firstName.error},model:{value:e.userModel.firstName,callback:function(s){e.$set(e.userModel,"firstName",s)},expression:"userModel.firstName"}})],1),t("div",{staticClass:"col-lg-6"},[t("base-input",{attrs:{alternative:"",label:e.$i18n.t("user.edit.last-name"),placeholder:e.$i18n.t("user.edit.last-name"),"input-classes":"form-control-alternative",autocomplete:"family-name",valid:e.errors.lastName.valid,error:e.errors.lastName.error},model:{value:e.userModel.lastName,callback:function(s){e.$set(e.userModel,"lastName",s)},expression:"userModel.lastName"}})],1)])]),e.showChangePassword?t("div",[t("h6",{staticClass:"heading-small text-muted mb-4"},[e._v(e._s(this.$i18n.t("changePassword")))]),t("div",{staticClass:"pl-lg-4"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-4"},[t("base-input",{attrs:{type:"password",alternative:"",label:e.$i18n.t("user.edit.old-password"),"input-classes":"form-control-alternative",autocomplete:"current-password",valid:e.errors.oldpass.valid,error:e.errors.oldpass.error},model:{value:e.userModel.oldpass,callback:function(s){e.$set(e.userModel,"oldpass",s)},expression:"userModel.oldpass"}})],1),t("div",{staticClass:"col-lg-4"},[t("base-input",{attrs:{type:"password",alternative:"",label:e.$i18n.t("user.edit.old-password"),"input-classes":"form-control-alternative",autocomplete:"new-password",valid:e.errors.newpass.valid,error:e.errors.newpass.error},model:{value:e.userModel.newpass,callback:function(s){e.$set(e.userModel,"newpass",s)},expression:"userModel.newpass"}})],1),t("div",{staticClass:"col-lg-4"},[t("base-input",{attrs:{type:"password",alternative:"",label:e.$i18n.t("user.edit.repeat-password"),"input-classes":"form-control-alternative",autocomplete:"new-password",valid:e.errors.newpass2.valid,error:e.errors.newpass2.error},model:{value:e.userModel.newpass2,callback:function(s){e.$set(e.userModel,"newpass2",s)},expression:"userModel.newpass2"}})],1)])])]):e._e(),t("h6",{staticClass:"heading-small text-muted mb-4"},[e._v(e._s(this.$i18n.t("permissionGroups")))]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-6"},[t("MultiSelect",{attrs:{options:e.permissionGroups,optionLabel:"name",placeholder:e.$i18n.t("user.edit.select-permission-groups"),display:"chip"},model:{value:e.userModel.permissionGroups,callback:function(s){e.$set(e.userModel,"permissionGroups",s)},expression:"userModel.permissionGroups"}})],1)]),t("div",[t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-12 pt-4"},[t("base-button",{attrs:{type:"primary"},on:{click:function(s){return s.preventDefault(),e.saveUser(s)}}},[e._v(e._s(this.$i18n.t("save")))]),t("base-button",{attrs:{outline:"",type:"primary"},on:{click:function(s){return s.preventDefault(),e.resetPassword(s)}}},[e._v(e._s(this.$i18n.t("resetPassword")))])],1)])])])]],2)],1)])])],1)},l=[],a=t("aec4"),r=t("63bb"),o=t.n(r),n=t("3ce4"),d=t.n(n),c=t("6ec9"),u=t.n(c),p=(t("ec12"),t("e1ae"),t("4121"),{name:"user-edit",components:{Dropdown:o.a,InputSwitch:d.a,MultiSelect:u.a},data(){return{messages:[],showChangePassword:!1,errors:{firstName:{valid:void 0,error:""},lastName:{valid:void 0,error:""},username:{valid:void 0,error:""},email:{valid:void 0,error:""},oldpass:{valid:void 0,error:""},newpass:{valid:void 0,error:""},newpass2:{valid:void 0,error:""}},userModel:{userId:0,firstName:"",lastName:"",username:"",email:"",permissionGroups:[],oldpass:"",newpass:"",newpass2:""},roles:[],languages:[],permissionGroups:[]}},emits:["evtOverlayAddItem","evtOverlayRemoveItem"],mounted(){this.$emit("evtOverlayAddItem"),a["e"].list().then(e=>{this.permissionGroups=e.data}),a["f"].list().then(e=>{this.roles=e.data,this.roles=this.roles.map(e=>({code:e.roleId,role:e.role}))}),a["b"].list().then(e=>{this.languages=e.data,this.languages=this.languages.map(e=>({code:e.languageId,name:e.name}))}),a["g"].getUser(this.$route.params.userId).then(e=>{this.userModel=e.data,this.userModel.role&&(this.userModel.role={role:this.userModel.role.role,code:this.userModel.role.roleId}),this.userModel.language&&(this.userModel.language={name:this.userModel.language.name,code:this.userModel.language.languageId}),this.userModel.userId==this.$store.state.user.userId&&(this.showChangePassword=!0),this.$emit("evtOverlayRemoveItem")})},methods:{saveUser(){this.$emit("evtOverlayAddItem"),this.userModel.role.code&&(this.userModel.role.roleId=this.userModel.role.code),this.userModel.language.code&&(this.userModel.language.languageId=this.userModel.language.code);var e={...this.userModel};e.permissionGroups=e.permissionGroups.map(e=>e.permissionGroupId),a["g"].save(e).then(e=>{this.resetErrors(),e.error?this.errors={...this.errors,...e.data}:this.$toast.add({severity:"success",summary:"User profile",detail:"User details have been saved succssfully.",life:5e3}),this.$emit("evtOverlayRemoveItem")})},resetPassword(){a["g"].reset(this.userModel.firstName,this.userModel.lastName,this.userModel.email).then(e=>{e.error?this.$toast.add({severity:"error",summary:"Password reset",detail:e.messages.join(". "),life:5e3}):this.$toast.add({severity:"success",summary:"Password reset",detail:"User password reset has been initiated.",life:5e3})})},resetErrors(){Object.keys(this.errors).forEach((function(e){this.errors[e]={valid:void 0,error:""}}),this)}}}),h=p,v=(t("7397"),t("2877")),m=Object(v["a"])(h,i,l,!1,null,null,null);s["default"]=m.exports}}]);
//# sourceMappingURL=chunk-72ea899b.95720d05.js.map