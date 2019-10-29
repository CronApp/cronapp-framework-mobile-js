maskDirectiveAsDate.$inject=["$compile","$translate","$parse"],maskDirectiveMask.$inject=["$compile","$translate","$parse"],window.addEventListener("message",function(e){"reload"==e.data?window.location.reload():"reload(true)"==e.data&&window.location.reload(!0)}),function($app){var _Mathfloor=Math.floor,isoDate=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,patternFormat=function(e){return e?$(e).attr("format")||"DD/MM/YYYY":"DD/MM/YYYY"},parsePermission=function(e){var t={visible:{public:!0},enabled:{public:!0}};if(e)for(var a,n=e.toLowerCase().trim().split(","),l=0;l<n.length;l++)if(a=n[l].trim(),a){var o=a.split(":");if(2==o.length){var r=o[0].trim(),s=o[1].trim();if(s){for(var d,c=s.split(";"),u={},m=0;m<c.length;m++)d=c[m].trim(),d&&(u[d]=!0);t[r]=u}}}return t};app.directive("updateLanguage",["$rootScope",function(e){return{link:function(t,i){e.$on("$translateChangeSuccess",function(e,t){let a=t.language?t.language.split("_")[0]:null;i.attr("lang",a||"en")})}}}]),app.directive("asDate",maskDirectiveAsDate),app.directive("input",transformText),app.directive("textarea",transformText).directive("ngDestroy",function(){return{restrict:"A",link:function(scope,element,attrs,ctrl){element.on("$destroy",function(){attrs.ngDestroy&&0<attrs.ngDestroy.length&&(-1<attrs.ngDestroy.indexOf("app.")||-1<attrs.ngDestroy.indexOf("blockly.")?scope.$eval(attrs.ngDestroy):eval(attrs.ngDestroy))})}}}).filter("mask",["$translate",function(e){return function(t,i,a){if(i=parseMaskType(i,e),!i)return t;var n;if(void 0===a?n=window.fixedTimeZone:(n="date"==a||"datetime"==a||"time"==a,!window.fixedTimeZone&&(n=!1)),0<i.indexOf(";local")&&(n=!1),i=i.replace(";1","").replace(";0","").replace(";local","").trim(),"string"==typeof t&&t.match(isoDate)||t instanceof Date)return n?moment(t).utcOffset(window.timeZoneOffset).format(i):moment(t).format(i);if("number"==typeof t)return format(i,t);if(null!=t&&null!=t&&""!=t&&""!=i){var l=$("<input type=\"text\">");return l.mask(i),l.masked(t)}return t}}]).directive("screenParams",[function(){'use strict';return{link:function(scope,elem,attrs,ctrl){var screenParams=eval(attrs.screenParams);screenParams&&screenParams.length&&screenParams.forEach(function(e){scope.params&&!scope.params[e.key]&&(scope.params[e.key]=e.value||"")})}}}]).directive("mask",maskDirectiveMask).directive("dynamicImage",["$compile",function(e){return{restrict:"A",scope:!0,require:"ngModel",link:function(t,i,a){var n=a.ngRequired&&"true"==a.ngRequired?"required":"",l=i.html(),o="<div ngf-drop=\"\" ngf-drag-over-class=\"dragover\">               <img style=\"width: 100%;\" ng-if=\"$ngModel$\" data-ng-src=\"{{$ngModel$.startsWith('http') || ($ngModel$.startsWith('/') && $ngModel$.length < 1000)? $ngModel$ : 'data:image/png;base64,' + $ngModel$}}\">               <div class=\"btn\" ng-if=\"!$ngModel$\" ngf-drop=\"\" ngf-select=\"\" ngf-change=\"cronapi.internal.setFile('$ngModel$', $file)\" ngf-pattern=\"'image/*'\" ngf-max-size=\"$maxFileSize$\">                 $userHtml$               </div>               <div class=\"remove-image-button button button-assertive\" ng-if=\"$ngModel$\" ng-click=\"$ngModel$=null\">                 <span class=\"icon ion-android-close\"></span>               </div>               <div class=\"button button-positive\" ng-if=\"!$ngModel$\" ng-click=\"cronapi.internal.startCamera('$ngModel$')\">                 <span class=\"icon ion-ios-videocam\"></span>               </div>             </div>",r="";a.maxFileSize&&(r=a.maxFileSize),o=$(o.split("$ngModel$").join(a.ngModel).split("$required$").join(n).split("$userHtml$").join(l).split("$maxFileSize$").join(r)),$(i).html(o),e(o)(i.scope())}}}]).directive("dynamicFile",["$compile",function(e){return{restrict:"A",scope:!0,require:"ngModel",link:function(t,i,a){var n=a.ngRequired&&"true"==a.ngRequired?"required":"",l=a.ngModel.split("."),o=l[0],r=l[l.length-1],s=_Mathfloor(1e3*Math.random()+20),d=i.html(),c="";a.maxFileSize&&(c=a.maxFileSize);var p="                                <div ng-show=\"!$ngModel$\" ngf-drop=\"\" ngf-drag-over-class=\"dragover\">                                  <div class=\"btn\" ngf-drop=\"\" ngf-select=\"\" ngf-change=\"cronapi.internal.uploadFile('$ngModel$', $file, 'uploadprogress$number$')\" ngf-max-size=\"$maxFileSize$\">                                    $userHtml$                                  </div>                                  <div class=\"progress\" data-type=\"bootstrapProgress\" id=\"uploadprogress$number$\" style=\"display:none\">                                    <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"70\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:0%\">                                      <span class=\"sr-only\"></span>                                    </div>                                  </div>                                </div>                                 <div ng-show=\"$ngModel$\" class=\"upload-image-component-attribute\">                                   <div class=\"button button-assertive\" style=\"float:right;\" ng-if=\"$ngModel$\" ng-click=\"$ngModel$=null\">                                     <span class=\"icon ion-android-close\"></span>                                   </div>                                   <div>                                     <div ng-bind-html=\"cronapi.internal.generatePreviewDescriptionByte($ngModel$)\"></div>                                     <a href=\"javascript:void(0)\" ng-click=\"cronapi.internal.downloadFileEntityMobile($datasource$,'$field$')\">download</a>                                   </div>                                 </div>                                 ";p=$(p.split("$ngModel$").join(a.ngModel).split("$datasource$").join(o).split("$field$").join(r).split("$number$").join(s).split("$required$").join(n).split("$userHtml$").join(d).split("$maxFileSize$").join(c)),$(i).html(p),e(p)(i.scope())}}}]).directive("pwCheck",[function(){'use strict';return{require:"ngModel",link:function(e,t,i,a){var n="#"+i.pwCheck;t.add(n).on("keyup",function(){e.$apply(function(){var e=t.val()===$(n).val();a.$setValidity("pwmatch",e)})})}}}]).directive("qr",["$window",function(e){return{restrict:"EA",require:"^ngModel",template:"<canvas ng-hide=\"image\"></canvas><img ng-if=\"image\" ng-src=\"{{canvasImage}}\"/>",link:function(t,i,a,n){t.size===void 0&&a.size&&(t.text=a.size);var l=function(){return n.$modelValue||""},o=function(e){var t=/^[0-9]*$/;return t.test(e)},r=function(e){var t=/^[0-9A-Z $%*+\-./:]*$/;return t.test(e)},s=function(e){for(var t,a=0;a<e.length;a++)if(t=e.charCodeAt(a),255<t)return!1;return!0},d=function(e,t){if("NUMBER"===e&&!o(t))throw new Error("The `NUMBER` input mode is invalid for text.");else if("ALPHA_NUM"===e&&!r(t))throw new Error("The `ALPHA_NUM` input mode is invalid for text.");else if("8bit"===e&&!s(t))throw new Error("The `8bit` input mode is invalid for text.");else if(!s(t))throw new Error("Input mode is invalid for text.");return!0},c=function(e){var i=t.inputMode;return i=i||(o(e)?"NUMBER":void 0),i=i||(r(e)?"ALPHA_NUM":void 0),i=i||(s(e)?"8bit":""),d(i,e)?i:""},p=i.find("canvas")[0],u=!!e.CanvasRenderingContext2D;t.TYPE_NUMBER=function(){return t.typeNumber||0}(),t.TEXT=l(),t.CORRECTION=function(){var e=t.correctionLevel||0;return{L:1,M:0,Q:3,H:2}[e]||0}(),t.SIZE=function(){return t.size||$(i).outerWidth()}(),t.INPUT_MODE=c(t.TEXT),t.canvasImage="";var m=function(e,t,i,a){for(var n=Math.round,l=Math.ceil,o=0;o<i;o++)for(var r=0;r<i;r++){var s=l((r+1)*a)-_Mathfloor(r*a),d=l((o+1)*a)-_Mathfloor(o*a);e.fillStyle=t.isDark(o,r)?"#000":"#fff",e.fillRect(n(r*a),n(o*a),s,d)}},g=function(e,i,a,n,l,o){var r=/^\s+|\s+$/g,s=i.replace(r,""),d=new QRCode(a,n,o);d.addData(s),d.make();var c=e.getContext("2d"),p=d.getModuleCount();e.width=e.height=l,u&&(m(c,d,p,l/p),t.canvasImage=e.toDataURL()||"")};t.$watch(function(){return n.$modelValue},function(e,i){(e!==i||e!==t.TEXT)&&(t.text=n.$modelValue,t.TEXT=l(),t.INPUT_MODE=c(t.TEXT),g(p,t.TEXT,t.TYPE_NUMBER,t.CORRECTION,t.SIZE,t.INPUT_MODE))}),g(p,t.TEXT,t.TYPE_NUMBER,t.CORRECTION,t.SIZE,t.INPUT_MODE)}}}]).directive("valid",function(){return{require:"^ngModel",restrict:"A",link:function(e,t,i,a){var n={cpf:CPF,cnpj:CNPJ};a.$validators[i.valid]=function(e,a){var l=e||a,o=n[i.valid].isValid(l);return o?t[0].setCustomValidity(""):t.scope().$applyAsync(function(){t[0].setCustomValidity(t[0].dataset.errorMessage)}),o||!l}}}}).directive("cronappSecurity",function(){return{restrict:"A",link:function(e,t,a){var n=[],l=JSON.parse(localStorage.getItem("_u"));l&&l.roles&&(n=l.roles.toLowerCase().split(","));for(var o,r=parsePermission(a.cronappSecurity),s=!1,d=!1,c=0;c<n.length;c++)o=n[c].trim(),o&&(r.visible[o]&&(s=!0),r.enabled[o]&&(d=!0));s||$(t).hide(),d||$(t).find("*").addBack().attr("disabled",!0)}}}).directive("cronappStars",[function(){'use strict';return{restrict:"A",require:"ngModel",link:function(e,t,a,n){function l(e){for(var t=1;5>=t;t++)d[t-1].removeClass("ion-android-star-outline"),d[t-1].removeClass("ion-android-star"),t<=e?d[t-1].addClass("ion-android-star"):d[t-1].addClass("ion-android-star-outline");return e}var o=$(t),r=$("<i style=\"font-size: 200%\" class=\"component-holder ion ion-android-star-outline\" style=\"\" xattr-size=\"\" data-component=\"crn-icon\"></i>");o.html("");for(var s,d=[],c=1;5>=c;c++)s=r.clone(),o.append(s),s.attr("idx",c),s.click(function(){e.$apply(function(){n.$viewValue=parseInt($(this).attr("idx")),n.$commitViewValue()}.bind(this))}),d.push(s);n.$parsers.push(l),n.$formatters.push(l)}}}]).directive("cronappRating",[function(){'use strict';return{restrict:"E",require:"ngModel",link:function(e,t,a,n){function l(e){for(var t=1;5>=t;t++)c[t-1].removeClass(a.iconOff||"ion ion-android-star-outline"),c[t-1].removeClass(a.iconOn),c[t-1].removeClass(a.theme),t<=e?(c[t-1].addClass(a.iconOn),c[t-1].addClass(a.theme)):(c[t-1].addClass(a.iconOff||"ion ion-android-star-outline"),c[t-1].addClass(a.theme));return e}a.theme=$(t).find("i").attr("xattr-theme"),a.iconOn=$(t).find("i").attr("class");var o=$(t),r=[];a.xattrDefaultValue&&(n.$viewValue=0,n.$commitViewValue());for(var s=1;5>=s;s++)r.push($(t).find("i").get(s-1)),$(r[s-1]).addClass(a.iconOff||"fa fa-star-o");o.html("");for(var d,c=[],s=1;5>=s;s++)d=$(r[s-1]).clone(),o.append(d),d.attr("idx",s),d.click(function(){e.$apply(function(){n.$viewValue=parseInt($(this).attr("idx")),n.$commitViewValue()}.bind(this))}),c.push(d);n.$parsers.push(l),n.$formatters.push(l)}}}]).directive("ngInitialValue",["$parse",function(e){return{restrict:"A",require:"ngModel",link:function(t,i,a){if(a.ngInitialValue){var n,l=e(a.ngModel),o=l.assign;try{n=t.$eval(a.ngInitialValue)}catch(t){n=a.ngInitialValue}"checkbox"==i[0].type&&n&&(n="true"==(""+n).toLowerCase()),o(t,n)}}}}]).directive("crnAllowNullValues",[function(){return{restrict:"A",require:"?ngModel",link:function(e,t,i,a){a.$formatters=[],a.$parsers=[],"true"===i.crnAllowNullValues?(a.$render=function(){var e=a.$viewValue;t.data("checked",e);!0===e?(t.attr("indeterminate",!1),t.prop("checked",!0)):!1===e?(t.attr("indeterminate",!1),t.prop("checked",!1)):t.attr("indeterminate",!0)},t.bind("click",function(){var i;switch(t.data("checked")){case!1:i=!0;break;case!0:i=null;break;default:i=!1;}a.$setViewValue(i),e.$apply(a.$render)})):"false"===i.crnAllowNullValues&&(a.$render=function(){var e=a.$viewValue;switch((void 0===e||null===e)&&(a.$setViewValue(!1),e=!1),t.data("checked",e),e){case!0:t.attr("indeterminate",!1),t.prop("checked",!0);break;default:t.attr("indeterminate",!1),t.prop("checked",!1);}},t.bind("click",function(){var i;switch(t.data("checked")){case!1:i=!0;break;default:i=!1;}a.$setViewValue(i),e.$apply(a.$render)}))}}}]).directive("cronappFilter",["$compile",function($compile){var setFilterInButton=function(e,t){var i=e.closest("div");if(i){var a=i.find("button[cronapp-filter]");if(a){var n=a.data("filters");n||(n=[]);var l=-1,o=e.attr("ng-model");if($(n).each(function(e){this.ngModel==o&&(l=e)}),-1<l&&n.splice(l,1),0<t.length){n.push({ngModel:o,bindedFilter:t})}a.data("filters",n)}}},makeAutoPostSearch=function(e,t,i,a){var n=e.closest("div");if(n&&0<n.length){var l=n.find("button[cronapp-filter]");if(l&&0<l.length){var o=l.data("filters");o&&0<o.length&&(t="",$(o).each(function(){t+=this.bindedFilter+";"}))}}i.search(t,"true"==a.cronappFilterCaseinsensitive)},inputBehavior=function(scope,element,attrs,ngModelCtrl,$element,typeElement,operator,autopost){var datasource,filterTemplate="",filtersSplited=attrs.cronappFilter.split(";");if(attrs.crnDatasource)datasource=eval(attrs.crnDatasource);else{var fieldset=$element.closest("div");if(!fieldset)return;var button=fieldset.find("button[cronapp-filter]");if(!button)return;if(!button.attr("crn-datasource"))return;datasource=eval(button.attr("crn-datasource"))}var isOData=datasource.isOData();$(filtersSplited).each(function(){0<this.length&&(""!=filterTemplate&&(isOData?filterTemplate+=" or ":filterTemplate+=";"),isOData?"="==operator&&"text"==typeElement&&""==filterTemplate?filterTemplate="substringof({value.lower}, tolower("+this+"))":"="==operator?filterTemplate+=" substringof({value.lower},tolower("+this+"))":"!="==operator?filterTemplate+=this+" ne {value}":">"==operator?filterTemplate+=this+" gt {value}":">="==operator?filterTemplate+=this+" ge {value}":"<"==operator?filterTemplate+=this+" lt {value}":"<="==operator&&(filterTemplate+=this+" le {value}"):"text"==typeElement?filterTemplate+=this+"@"+operator+"%{value}%":filterTemplate+=this+operator+"{value}")}),0==filterTemplate.length&&(isOData?filterTemplate="{value}":filterTemplate="%{value}%"),ngModelCtrl?scope.$watch(attrs.ngModel,function(e,t){if(!angular.equals(e,t)){var i=$element.data("type")||$element.attr("type"),a=ngModelCtrl.$modelValue;isOData?a instanceof Date?"datetime-local"==i?a="datetimeoffset'"+a.toISOString()+"'":a="datetime'"+a.toISOString().substring(0,23)+"'":"number"==typeof a?a=a:"boolean"==typeof a?a=a:a="'"+a+"'":a instanceof Date?(a=a.toISOString(),a+="date"==i?"@@date":"time"==i||"time-local"==i?"@@time":"@@datetime"):"number"==typeof a?a+="@@number":"boolean"==typeof a&&(a+="@@boolean");var n=filterTemplate.split("{value}").join(a);n="string"==typeof a?n.split("{value.lower}").join(a.toLowerCase()):n.split("{value.lower}").join(a),0==ngModelCtrl.$viewValue.length&&(n=""),setFilterInButton($element,n,operator),autopost&&makeAutoPostSearch($element,n,datasource,attrs)}}):"text"==typeElement?$element.on("keyup",function(){var datasource=eval(attrs.crnDatasource),value=void 0;value=ngModelCtrl&&null!=ngModelCtrl?ngModelCtrl.$viewValue:this.value;var bindedFilter=filterTemplate.split("{value}").join(value);0==this.value.length&&(bindedFilter=""),setFilterInButton($element,bindedFilter,operator),autopost&&makeAutoPostSearch($element,bindedFilter,datasource,attrs)}):$element.on("change",function(){var datasource=eval(attrs.crnDatasource),value=void 0,typeElement=$(this).attr("type");if(null!=attrs.asDate&&(typeElement="date"),ngModelCtrl&&null!=ngModelCtrl)value=ngModelCtrl.$viewValue;else if("checkbox"==typeElement)value=$(this).is(":checked");else if("date"!=typeElement)value=this.value;else if(value=this.value,0<this.value.length){var momentDate=moment(this.value,patternFormat(this));value=momentDate.toDate().toISOString()}var bindedFilter=filterTemplate.split("{value}").join(value);0==value.toString().length&&(bindedFilter=""),setFilterInButton($element,bindedFilter,operator),autopost&&makeAutoPostSearch($element,bindedFilter,datasource,attrs)})},forceDisableDatasource=function(datasourceName,scope){var disableDatasource=setInterval(function(){try{var datasourceInstance=eval(datasourceName);datasourceInstance&&($(document).ready(function(){var e=0,t=setInterval(function(){10>e?(scope.$apply(function(){datasourceInstance.enabled=!1,datasourceInstance.data=[]}),e++):clearInterval(t)},20)}),clearInterval(disableDatasource))}catch(t){}},10)},buttonBehavior=function(scope,element,attrs,ngModelCtrl,$element,typeElement,operator,autopost){var datasourceName="";datasourceName=attrs.crnDatasource?attrs.crnDatasource:$element.parent().attr("crn-datasource");var datasource=eval(datasourceName),isOData=datasource.isOData(),requiredFilter=attrs.requiredFilter&&"true"==attrs.requiredFilter.toString();requiredFilter&&this.forceDisableDatasource(datasourceName,scope),$element.on("click",function(){var $this=$(this),filters=$this.data("filters");if(datasourceName&&0<datasourceName.length&&filters){var bindedFilter="";$(filters).each(function(){""!=bindedFilter&&(bindedFilter+=isOData?" and ":";"),bindedFilter+=this.bindedFilter});var datasourceToFilter=eval(datasourceName);requiredFilter?(datasourceToFilter.enabled=0<bindedFilter.length,datasourceToFilter.enabled?datasourceToFilter.search(bindedFilter,"true"==attrs.cronappFilterCaseinsensitive):scope.$apply(function(){datasourceToFilter.data=[]})):datasourceToFilter.search(bindedFilter,"true"==attrs.cronappFilterCaseinsensitive)}})};return{restrict:"A",require:"?ngModel",link:function(e,t,i,a){var n=$(t),l=n.data("type")||n.attr("type");i.asDate!=null&&(l="date");var o="=";i.cronappFilterOperator&&0<i.cronappFilterOperator.length&&(o=i.cronappFilterOperator);var r=!0;i.cronappFilterAutopost&&"false"==i.cronappFilterAutopost&&(r=!1),setTimeout(function(){"INPUT"==n[0].tagName?inputBehavior(e,t,i,a,n,l,o,r):buttonBehavior(e,t,i,a,n,l,o,r)},100)}}}]).directive("cronList",["$compile","$parse",function($compile,$parse){'use strict';let TEMPLATE="               <ion-list type=\"\" can-swipe=\"listCanSwipe\">             \t   <ion-item ng-class=\"{'cron-list-selected' : isChecked(rowData)}\" class=\"item\" ng-repeat=\"rowData in datasource\">               \t </ion-item>                </ion-list>                <ion-infinite-scroll></ion-infinite-scroll>                ";var getExpression=function(e){return"rowData in ".concat(e).concat(".data")},buildFormat=function(e){var t="";return t=" | mask: \""+e.type+"\"",e.format&&(t=" | mask: \""+e.format+"\":\""+e.type+"\""),t},addDefaultColumn=function(e,t){var i=null;return i=t?"<h2>{{rowData."+e.field+buildFormat(e)+"}}</h2>":"<h3 class=\"dark\">{{rowData."+e.field+buildFormat(e)+"}}</h3>",i},getEditCommand=function(e){return e+".startEditing(rowData)"},addDefaultButton=function(e,t){const i="<ion-option-button class=\"button-positive ion-edit\" ng-click=\""+getEditCommand(e)+"\"><span>edit</span></ion-option-button>",a="<ion-option-button class=\"button-assertive ion-trash-a\" ng-click=\""+e+".remove(rowData)\"><span>delete</span></ion-option-button>";if("edit|destroy"==t.command)return i.concat(a);return"edit"==t.command?i:"destroy"==t.command?a:void 0},addImage=function(e,t,i,a,n,l){let o="";return a&&l&&n&&(o="image-to-"+n+"-"+l),"<img ng-src=\"data:image/png;base64,{{rowData."+e.field+"}}\" class=\""+o+"\" ></img>"},addImageLink=function(e){return"<img ng-src=\"{{rowData."+e.field+"}}\"></img>"},addIcon=function(e){return"<i class=\""+e+"\" xattr-theme=\"dark\"></i>"},addCheckbox=function(e,t){var i="";return e&&t||(t="default"),i="<ul class=\"checkbox-group component-holder cron-list-multiselect-"+t+"\"data-component=\"crn-checkbox\"><label class=\"checkbox\"><input ng-checked=\"isChecked(rowData);\" type=\"checkbox\"></label></ul>",i},encodeHTML=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")},generateBlocklyCall=function(e){var t;if("client"==e.type){var i=e.blocklyClass.split("/"),a=i[i.length-1];t="blockly.js.blockly."+a,t+="."+e.blocklyMethod;var n="()";0<e.blocklyParams.length&&(n="(",e.blocklyParams.forEach(function(e){n+=(e.value?encodeHTML(e.value):"''")+","}.bind(this)),n=n.substr(0,n.length-1),n+=")"),t+=n}else if("server"==e.type){var a=e.blocklyClass+":"+e.blocklyMethod;t="cronapi.util.makeCallServerBlocklyAsync('"+a+"',null,null,",0<e.blocklyParams.length&&e.blocklyParams.forEach(function(e){t+=(e.value?encodeHTML(e.value):"''")+","}.bind(this)),t=t.substr(0,t.length-1),t+=")"}return t},addBlockly=function(e){return"<ion-option-button class=\"button-dark ion-navigate\" ng-click=\""+generateBlocklyCall(e.blocklyInfo)+"\"></ion-option-button>"},isImage=function(e,t){for(var a,n=0;n<t.length;n++)if(a=t[n],e==a.name)return"Binary"==a.type;return!1},addCustomButton=function(e){return`<ion-option-button class="button-dark ${e.iconClass}" ng-click="listButtonClick($index, rowData, '${window.stringToJs(e.execute)}', $event)">${e.label}</ion-option-button> `},isImage=function(e,t){for(var a,n=0;n<t.length;n++)if(a=t[n],e==a.name)return"Binary"==a.type;return!1},getSearchableList=function(e,t){return"              <div class=\"item item-input-inset\">              <label class=\"item-input-wrapper\"> <i class=\"icon ion-search placeholder-icon\"></i>                 <input type=\"text\" ng-model=\"vars.__searchableList__\" cronapp-filter=\""+t+";\" cronapp-filter-operator=\"\" cronapp-filter-caseinsensitive=\"false\" cronapp-filter-autopost=\"true\"                 crn-datasource=\""+e+"\" placeholder=\"{{'template.crud.search' | translate}}\">               </label>              <button ng-if=\"showButton()\" ng-click=\"limparSelecao()\"                 class=\"button-small cron-list-button-clean button button-inline button-positive component-holder\">              <span  cron-list-button-text>Limpar Sele\xE7\xE3o<span></button>               </div>             "};return{restrict:"E",require:"?ngModel",scope:!0,link:function(scope,element,attrs,ngModelCtrl){var optionsList={},dataSourceName="",content="",buttons="",image="";try{optionsList=JSON.parse(attrs.options),dataSourceName=optionsList.dataSourceScreen.name;var dataSource=eval(optionsList.dataSourceScreen.name),imageDirection=optionsList.imagePosition?optionsList.imagePosition:"left",iconDirection=optionsList.iconPosition?optionsList.iconPosition:"right",iconTemplate=optionsList.icon?addIcon(optionsList.icon):"",bothDirection="left"===imageDirection&&"left"===iconDirection?"left":"right"===imageDirection&&"right"===iconDirection?"right":"",checkboxTemplate="",modelArrayToInsert=[],isKey=!1;const cronListClass="cron-list-selected";if(scope.options=optionsList,attrs.ngModel){var modelGetter=$parse(attrs.ngModel),modelSetter=modelGetter.assign;optionsList.allowMultiselect?(scope.verifyIsKey=function(e){return isKey=!1,optionsList.fieldType&&"key"===optionsList.fieldType&&(e=this.changeRowDataField(e),isKey=!0),e},scope.limparSelecao=function(){modelSetter(scope,[])},scope.isChecked=function(e){let t=!1;return modelArrayToInsert=modelGetter(scope),e=scope.verifyIsKey(e),t=scope.hasObjectChecked(isKey,cronListClass,e,null,event),scope.isSelected=t,t},scope.hasObjectChecked=function(e,t,i){let a=!1;return Array.isArray(modelArrayToInsert)&&(e&&"object"!=typeof i?modelArrayToInsert.forEach(e=>{i===e&&(a=!0)}):modelArrayToInsert.forEach(e=>{dataSource.objectIsEquals(i,e)&&(a=!0)})),a},scope.checkboxButtonClick=function(e,t,i,a){let n=!1,l=$(a.currentTarget),o=l.find("input[type=checkbox]:checked").length;modelArrayToInsert=modelGetter(scope),Array.isArray(modelArrayToInsert)||(modelArrayToInsert=[]),$(a.target).is("input[type=checkbox]")||i||(0<o?l.find("input[type=checkbox]").prop("checked",!1):l.find("input[type=checkbox]").prop("checked",!0));let r=$(a.currentTarget).find("input[type=checkbox]");t=scope.verifyIsKey(t),$(r).is(":checked")?(n=scope.hasObjectChecked(isKey,cronListClass,t,i,a),!n&&modelArrayToInsert.push(t)):isKey&&"object"!=typeof t?modelArrayToInsert.forEach((e,i)=>{t===e&&modelArrayToInsert.splice(i,1)}):modelArrayToInsert.forEach((e,i)=>{dataSource.objectIsEquals(t,e)&&modelArrayToInsert.splice(i,1)}),modelSetter(scope,modelArrayToInsert),a.stopPropagation()}):scope.setRowDataModel=function(e,t){optionsList.fieldType&&"key"===optionsList.fieldType&&(t=this.changeRowDataField(t)),modelSetter(scope,t)},scope.changeRowDataField=function(e){e=dataSource.getKeyValues(e);var t=Object.keys(e);return 1===t.length&&(e=e[t]),e}}scope.listButtonClick=function(e,t,i,a){dataSource.goTo(t);var n={currentData:dataSource.data,datasource:dataSource,selectedIndex:e,index:e,selectedRow:t,consolidated:{item:t,index:e},item:t,selectedKeys:dataSource.getKeyValues(dataSource.active,!0)};scope.$eval(i,n),a.preventDefault(),a.stopPropagation()};for(var column,searchableField=null,isNativeEdit=!1,addedImage=!1,i=0;i<optionsList.columns.length;i++)column=optionsList.columns[i],column.visible&&(column.field&&"Database"==column.dataType?!addedImage&&isImage(column.field,optionsList.dataSourceScreen.entityDataSource.schemaFields)&&"do-not-show"!==optionsList.imageType?(image=addImage(column,imageDirection,iconDirection,iconTemplate,bothDirection,optionsList.imageType),addedImage=!0):addedImage||"image"!=column.type?(content=content.concat(addDefaultColumn(column,0==i)),column.filterable&&(searchableField=null==searchableField?column.field:searchableField+";"+column.field)):(image=addImageLink(column),addedImage=!0):"Command"==column.dataType?(buttons=buttons.concat(addDefaultButton(dataSourceName,column)),("edit"==column.command||"edit|destroy"==column.command)&&(isNativeEdit=!0)):"Blockly"==column.dataType?buttons=buttons.concat(addBlockly(column)):"Customized"==column.dataType&&(buttons=buttons.concat(addCustomButton(column))))}catch(e){console.log("CronList invalid configuration! "+e)}var templateDyn=null;if(searchableField){let e=$(getSearchableList(dataSourceName,searchableField)+TEMPLATE);templateDyn=$(e)}else templateDyn=$(TEMPLATE);templateDyn.attr("type",optionsList.listType),$(element).replaceWith(templateDyn);var $element=templateDyn,ionItem=$element.find("ion-item");ionItem.attr("ng-repeat",getExpression(dataSourceName)),isNativeEdit&&ionItem.attr("ng-click",getEditCommand(dataSourceName));var ngClickAttrTemplate="",ngClickAttrTemplateCheckbox="";optionsList.allowMultiselect?(attrs.ngModel&&(ngClickAttrTemplateCheckbox="checkboxButtonClick($index, rowData, '"+window.stringToJs(attrs.ngClick)+"', $event);"),checkboxTemplate=addCheckbox(addedImage,optionsList.imageType),attrs.ngClick&&(checkboxTemplate=$(checkboxTemplate).attr("ng-click",ngClickAttrTemplateCheckbox).get(0).outerHTML,ngClickAttrTemplate=ngClickAttrTemplate+"listButtonClick($index, rowData, '"+window.stringToJs(attrs.ngClick)+"', $event);"),ionItem.attr("ng-click",ngClickAttrTemplateCheckbox+ngClickAttrTemplate)):(attrs.ngModel&&(ngClickAttrTemplate="setRowDataModel($index, rowData, '"+window.stringToJs(attrs.ngClick)+"', $event);"),attrs.ngClick&&(ngClickAttrTemplate=ngClickAttrTemplate+"listButtonClick($index, rowData, '"+window.stringToJs(attrs.ngClick)+"', $event);"),ionItem.attr("ng-click",ngClickAttrTemplate)),optionsList.icon&&ionItem.addClass("item-icon-"+iconDirection),addedImage&&(!optionsList.imageType||"avatar"===optionsList.imageType)&&ionItem.addClass("item-avatar-"+imageDirection),addedImage&&"thumbnail"===optionsList.imageType&&ionItem.addClass("item-thumbnail-"+imageDirection);const attrsExcludeds=["options","ng-repeat","ng-click"],filteredItems=Object.values(attrs.$attr).filter(function(e){return!attrsExcludeds.includes(e)});for(let e in filteredItems)ionItem.attr(filteredItems[e],attrs[e]);let extraClassToAdd="";optionsList.imageType&&bothDirection&&addedImage&&iconTemplate&&(extraClassToAdd="text-to-"+bothDirection+"-"+optionsList.imageType),content="<div class=\""+attrs.xattrTextPosition+" "+extraClassToAdd+"\">"+content+iconTemplate+"<div>",image?(ionItem.append(checkboxTemplate),ionItem.append(image),ionItem.append(content),ionItem.append(buttons)):(ionItem.append(checkboxTemplate),ionItem.append(content),ionItem.append(buttons)),scope.nextPageInfinite=function(){dataSource.nextPage(),scope.$broadcast("scroll.infiniteScrollComplete")};var infiniteScroll=$element.filter(function(){return $(this).is("ion-infinite-scroll")});infiniteScroll.attr("on-infinite","nextPageInfinite()"),infiniteScroll.attr("distance","1%"),scope.showButton=function(){if(optionsList.allowMultiselect){var e=modelGetter(scope);if(null!==e&&e!==void 0)return 0<e.length}return!1},$compile(templateDyn)(scope)}}}]).directive("cronInfiniteScroll",["$compile",function($compile){'use strict';return{restrict:"EA",link:function(scope,element,attrs){var dataSource=attrs.cronInfiniteScroll?eval(attrs.cronInfiniteScroll):attrs.crnDatasource?eval(attrs.crnDatasource):void 0;if(dataSource){scope.nextPageInfinite=function(){dataSource.nextPage(),scope.$broadcast("scroll.infiniteScrollComplete")};var templateDyn=$("<ion-infinite-scroll></ion-infinite-scroll>");$(element).html(templateDyn);var infiniteScroll=$(element).find("ion-infinite-scroll");infiniteScroll.attr("on-infinite","nextPageInfinite()"),infiniteScroll.attr("distance","1%"),$compile(templateDyn)(element.scope())}}}}]).filter("raw",["$translate",function(){return function(e){if(null!=e&&e!==void 0){if("number"==typeof e)return e+"";if("boolean"==typeof e)return e+"";if(e instanceof Date)"datetimeoffset'"+e.toISOString()+"'";else return 10<=e.length&&e.match(ISO_PATTERN)?"datetimeoffset'"+e+"'":"'"+e+"'"}else return""}}]).directive("xkeyField",["$compile",function(e){'use strict';return{restrict:"A",link:function(t,i,a){if(a.xkeyField&&a.xdisplayField){var n="";a.crnDatasource&&(n=a.crnDatasource);var l;i.removeAttr("xkey-field"),i.removeAttr("xdisplay-field"),a.multiple?(l="opt as opt."+a.xdisplayField+" for opt in "+n+".data track by opt."+a.xkeyField,i.attr("ng-options",l)):i.append("<option ng-repeat=\"opt in "+n+".data\" value=\"{{opt."+a.xkeyField+"}}\">{{opt."+a.xdisplayField+"}}</option>"),e($(i))(t)}}}}]).directive("cronMobileMenu",["$compile","$translate",function(e,t){'use strict';var i=function(e){var i="";return e&&null!=e&&e.subMenuOptions&&null!=e.subMenuOptions&&Array.isArray(e.subMenuOptions)&&e.subMenuOptions.forEach(function(e){var a=e.security&&null!=e.security?" cronapp-security=\""+e.security+"\" ":"",n=e.action&&null!=e.action?" ng-click=\""+e.action+"\" ":"",l=e.hide&&null!=e.hide?" ng-hide=\""+e.hide+"\" ":"",o=e.iconClass&&null!=e.iconClass?e.iconClass:"",r=e.imagePosition&&null!=e.imagePosition?"item-icon-"+e.imagePosition:"",s=e.textPosition&&null!=e.textPosition?"text-"+e.textPosition:"",d=e.contentTheme&&null!=e.contentTheme?e.contentTheme:"",c=e.iconTheme&&null!=e.iconTheme?e.iconTheme:"",p=t.instant(e.title);i=i+"                    <a menu-close=\"\" class=\"item "+r+"\" "+n+a+l+">                       <i class=\""+o+" "+c+"\" style=\"font-size: 150%\"></i>                       <div class=\"item-content "+s+"\">                           <h2 class=\""+d+"\">"+p+"</h2>                       </div>                     </a> "}),i};return{restrict:"EA",link:function(t,a,n){var l={};try{l=JSON.parse(n.options)}catch(t){console.log("CronMobileMenu: Invalid configuration!")}var o=$("<ul class=\"nav navbar-nav\" style=\"float:none\"></ul>"),r=i(l);o.append(r);var s=angular.element(o);a.html(""),a.append(o),a.attr("id",null),e(s)(t)}}}])}(app);function maskDirectiveAsDate(e,t,i){return maskDirective(e,t,"as-date",i)}function maskDirectiveMask(e,t,i){return maskDirective(e,t,"mask",i)}function maskDirective(e,t,i,a){return{restrict:"A",require:"?ngModel",link:function(e,n,l,o){var r=a(l.ngModel),s=r.assign;if("as-date"!=i||void 0===l.mask){var d=$(n),c=d.attr("type");if("checkbox"!=c&&"password"!=c){d.data("type",c),d.attr("type","text"),o&&(o.$formatters=[],o.$parsers=[]),void 0!==l.asDate&&"text"==c&&(c="date");var p=!0,u=!1,m=l.mask||l.format;m=m?parseMaskType(m,t):parseMaskType(c,t),m.endsWith(";0")&&(u=!0);var g=m.replace(";1","").replace(";0","").replace(";local","").trim(),f=l.keyboard,h=t.instant("keyboardDecimalChar")&&1==t.instant("keyboardDecimalChar").length?t.instant("keyboardDecimalChar"):",";if(f&&parseKeyboardType(f,h,d),null!=g&&0!=g.length){if("date"==c||"datetime"==c||"datetime-local"==c||"month"==c||"time"==c||"time-local"==c||"week"==c){var v="date"==c||"datetime"==c||"time"==c;window.fixedTimeZone||(v=!1),"date"==c?(g=moment.HTML5_FMT.DATE,d.attr("type","date")):"month"==c?(g=moment.HTML5_FMT.MONTH,d.attr("type","month")):"week"==c?(g=moment.HTML5_FMT.WEEK,d.attr("type","week")):"datetime"==c||"datetime-local"==c?(g=moment.HTML5_FMT.DATETIME_LOCAL,d.attr("type","datetime-local")):("time"==c||"time-local"==c)&&(g=moment.HTML5_FMT.TIME,d.attr("type","time")),o&&(o.$formatters.push(function(e){return e?v?moment(e).utcOffset(window.timeZoneOffset).format(g):moment(e).format(g):null}),o.$parsers.push(function(e){return e?v?moment(e,g).utcOffset(window.timeZoneOffset,!0).toDate():moment(e,g).toDate():new Date(e)}))}else if("number"==c||"money"==c||"integer"==c||"money-decimal"==c){u=!0,p=!1;var y=g.trim().replace(/\./g,"").replace(/\,/g,"").replace(/#/g,"").replace(/0/g,"").replace(/9/g,"");f||("integer"==c||"money-decimal"==c?f="integer":f="number");var k="",b="",M="",x=",",w=0;g.startsWith(y)?k=y:g.endsWith(y)&&(b=y);var T=g.trim().replace(k,"").replace(b,"").trim();T.startsWith("#.")?M=".":T.startsWith("#,")&&(M=",");var D=null;if(-1==T.indexOf(",0")?-1!=T.indexOf(".0")&&(x=".",D=".0"):(x=",",D=",0"),null!=D){var C=T.substring(T.indexOf(D)+1);w=C.length}var F="numeric";0==w&&(F="integer");var E={rightAlign:"money"==c||"money-decimal"==c,unmaskAsNumber:!0,allowMinus:"money"!=c&&"money-decimal"!=c,prefix:k,suffix:b,radixPoint:x,digits:w,numericInput:"money-decimal"==c};M&&(E.autoGroup=!0,E.groupSeparator=M),"money-decimal"==c&&(F="currency"),$(n).inputmask(F,E),useInputMaskPlugin(n,o,e,s)}else"text"==c||"tel"==c?(f||"tel"!=c||(f="tel"),l.maskPlaceholder?(options={},options.placeholder=l.maskPlaceholder,$(n).inputmask(g,options),$(n).off("keypress"),u&&useInputMaskPlugin(n,o,e,s)):(d.mask(g),useMaskPlugin(n,o,e,s,u))):("email"==c||"password"==c||"search"==c)&&(f||(f=c));f&&parseKeyboardType(f,h,d)}}}}}}function useInputMaskPlugin(e,t,i,a){var n=$(e);$(e).off("keypress"),$(e).on("keyup",function(){var t=$(this).inputmask("unmaskedvalue");$(this).data("rawvalue",t),e._ignoreFormatter=!0,i.safeApply(function(){a(i,t)})}),t&&(t.$formatters.push(function(t){return e._ignoreFormatter?(e._ignoreFormatter=!1,$(e).val()):(e._ignoreFormatter=!1,null!=t&&null!=t&&""!==t?format(mask,t):null)}),t.$parsers.push(function(e){if(e!=null&&null!=e&&""!==e){var t=n.inputmask("unmaskedvalue");if(""!==t)return t}return null}))}function useMaskPlugin(e,t,i,a,n){var l=$(e),o=function(){n&&$(this).data("rawvalue",$(this).cleanVal())};$(e).on("keydown",o).on("keyup",o),n&&t&&(t.$formatters.push(function(e){return e?l.masked(e):null}),t.$parsers.push(function(e){return e?l.cleanVal():null}))}function parseKeyboardType(e,t,i){("integer"==e||"number"==e||"tel"==e)&&(i.attr("pattern","\\d*"),i.attr("inputmode","decimal")),("tel"==e||"email"==e||"search"==e||"password"==e)&&i.attr("type",e),"ios"===cordova.platformId&&"number"==e&&(i.attr("decimal","true"),i.attr("allow-multiple-decimals","true"),i.attr("decimal-char",t))}function parseMaskType(e,t){return"datetime"==e||"datetime-local"==e?(e=t.instant("Format.DateTime"),"Format.DateTime"==e&&(e="DD/MM/YYYY HH:mm:ss")):"date"==e?(e=t.instant("Format.Date"),"Format.Date"==e&&(e="DD/MM/YYYY")):"time"==e||"time-local"==e?(e=t.instant("Format.Hour"),"Format.Hour"==e&&(e="HH:mm:ss")):"month"==e?e="MMMM":"number"==e?(e=t.instant("Format.Decimal"),"Format.Decimal"==e&&(e="0,00")):"money"==e||"money-decimal"==e?(e=t.instant("Format.Money"),"Format.Money"==e&&(e="#.#00,00")):"integer"==e?e="0":"week"==e?e="dddd":"tel"==e?e="(99) 99999-9999;0":"text"==e?e="":"string"==e&&(e=""),e}function transformText(){return{restrict:"E",require:"?ngModel",link:function(e,t,i,a){var n=function(e,t){if(e&&t){if("uppercase"===e.css("text-transform"))return t.toUpperCase();return"lowercase"===e.css("text-transform")?t.toLowerCase():t}};a&&(a.$formatters.push(function(e){return n(t,e)}),a.$parsers.push(function(e){return n(t,e)}))}}}