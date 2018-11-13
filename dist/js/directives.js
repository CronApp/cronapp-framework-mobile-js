function maskDirectiveAsDate(e,t){return maskDirective(e,t,"as-date")}function maskDirectiveMask(e,t){return maskDirective(e,t,"mask")}function maskDirective(e,t,a){return{restrict:"A",require:"?ngModel",link:function(e,n,i,r){if("as-date"!=a||void 0===i.mask){var o=$(n),l=o.attr("type");if("checkbox"!=l&&"password"!=l){o.data("type",l),o.attr("type","text"),r&&(r.$formatters=[],r.$parsers=[]),void 0!==i.asDate&&"text"==l&&(l="date");var s=!1,c=i.mask||i.format;c=c?parseMaskType(c,t):parseMaskType(l,t),c.endsWith(";0")&&(s=!0);var d=c.replace(";1","").replace(";0","").trim();if(void 0!=d&&0!=d.length)if("date"==l||"datetime"==l||"datetime-local"==l||"month"==l||"time"==l||"time-local"==l||"week"==l){var u="date"==l||"datetime"==l||"time"==l;"date"==l?(d=moment.HTML5_FMT.DATE,o.attr("type","date")):"month"==l?(d=moment.HTML5_FMT.MONTH,o.attr("type","month")):"week"==l?(d=moment.HTML5_FMT.WEEK,o.attr("type","week")):"datetime"==l||"datetime-local"==l?(d=moment.HTML5_FMT.DATETIME_LOCAL,o.attr("type","datetime-local")):"time"!=l&&"time-local"!=l||(d=moment.HTML5_FMT.TIME,o.attr("type","time")),r&&(r.$formatters.push(function(e){return e?u?moment.utc(e).format(d):moment(e).format(d):null}),r.$parsers.push(function(e){return e?u?moment.utc(e,d).toDate():moment(e,d).toDate():new Date(e)}))}else if("number"==l||"money"==l||"integer"==l){s=!0,!1;var m=d.trim().replace(/\./g,"").replace(/\,/g,"").replace(/#/g,"").replace(/0/g,"").replace(/9/g,""),p="",f="",v="",g=",",h=0;d.startsWith(m)?p=m:d.endsWith(m)&&(f=m);var b=d.trim().replace(p,"").replace(f,"").trim();b.startsWith("#.")?v=".":b.startsWith("#,")&&(v=",");var y=null;if(-1!=b.indexOf(",0")?(g=",",y=",0"):-1!=b.indexOf(".0")&&(g=".",y=".0"),null!=y){var M=b.substring(b.indexOf(y)+1);h=M.length}var k="numeric";0==h&&(k="integer");var D={rightAlign:"money"==l,unmaskAsNumber:!0,allowMinus:!0,prefix:p,suffix:f,radixPoint:g,digits:h};v&&(D.autoGroup=!0,D.groupSeparator=v),$(n).inputmask(k,D);var F=function(){$(this).data("rawvalue",$(this).inputmask("unmaskedvalue"))};$(n).off("keypress"),e.safeApply(function(){$(n).on("keyup",F)}),r&&(r.$formatters.push(function(e){return void 0!=e&&null!=e&&""!=e?format(d,e):null}),r.$parsers.push(function(e){if(void 0!=e&&null!=e&&""!=e){var t=o.inputmask("unmaskedvalue");if(""!=t)return t}return null}))}else if("text"==l||"tel"==l){var T={};i.maskPlaceholder&&(T.placeholder=i.maskPlaceholder),o.mask(d,T);var F=function(){s&&$(this).data("rawvalue",$(this).cleanVal())};$(n).on("keydown",F).on("keyup",F),s&&r&&(r.$formatters.push(function(e){return e?o.masked(e):null}),r.$parsers.push(function(e){return e?o.cleanVal():null}))}}}}}}function parseMaskType(e,t){return"datetime"==e||"datetime-local"==e?"Format.DateTime"==(e=t.instant("Format.DateTime"))&&(e="DD/MM/YYYY HH:mm:ss"):"date"==e?"Format.Date"==(e=t.instant("Format.Date"))&&(e="DD/MM/YYYY"):"time"==e||"time-local"==e?"Format.Hour"==(e=t.instant("Format.Hour"))&&(e="HH:mm:ss"):"month"==e?e="MMMM":"number"==e?"Format.Decimal"==(e=t.instant("Format.Decimal"))&&(e="0,00"):"money"==e?"Format.Money"==(e=t.instant("Format.Money"))&&(e="#.#00,00"):"integer"==e?e="0":"week"==e?e="dddd":"tel"==e?e="(00) 00000-0000;0":"text"==e&&(e=""),e}maskDirectiveAsDate.$inject=["$compile","$translate"],maskDirectiveMask.$inject=["$compile","$translate"],function($app){var isoDate=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,patternFormat=function(e){return e?$(e).attr("format")||"DD/MM/YYYY":"DD/MM/YYYY"},parsePermission=function(e){var t={visible:{public:!0},enabled:{public:!0}};if(e)for(var a=e.toLowerCase().trim().split(","),n=0;n<a.length;n++){var i=a[n].trim();if(i){var r=i.split(":");if(2==r.length){var o=r[0].trim(),l=r[1].trim();if(l){for(var s=l.split(";"),c={},d=0;d<s.length;d++){var u=s[d].trim();u&&(c[u]=!0)}t[o]=c}}}}return t};app.directive("asDate",maskDirectiveAsDate).directive("ngDestroy",function(){return{restrict:"A",link:function(scope,element,attrs,ctrl){element.on("$destroy",function(){attrs.ngDestroy&&attrs.ngDestroy.length>0&&(attrs.ngDestroy.indexOf("app.")>-1||attrs.ngDestroy.indexOf("blockly.")>-1?scope.$eval(attrs.ngDestroy):eval(attrs.ngDestroy))})}}}).filter("mask",["$translate",function(e){return function(t,a){if(!(a=parseMaskType(a,e)))return t;if(a=a.replace(";1","").replace(";0","").trim(),"string"==typeof t&&t.match(isoDate))return moment.utc(t).format(a);if(t instanceof Date)return moment.utc(t).format(a);if("number"==typeof t)return format(a,t);if(void 0!=t&&null!=t&&""!=t){var n=$('<input type="text">');return n.mask(a),n.masked(t)}return t}}]).directive("mask",maskDirectiveMask).directive("dynamicImage",["$compile",function(e){return{restrict:"A",scope:!0,require:"ngModel",link:function(t,a,n){var i=n.ngRequired&&"true"==n.ngRequired?"required":"",r=a.html(),o='<div ngf-drop="" ngf-drag-over-class="dragover">               <img style="width: 100%;" ng-if="$ngModel$" data-ng-src="{{$ngModel$.startsWith(\'http\') || ($ngModel$.startsWith(\'/\') && $ngModel$.length < 1000)? $ngModel$ : \'data:image/png;base64,\' + $ngModel$}}">               <div class="btn" ng-if="!$ngModel$" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.setFile(\'$ngModel$\', $file)" ngf-pattern="\'image/*\'" ngf-max-size="$maxFileSize$">                 $userHtml$               </div>               <div class="remove-image-button button button-assertive" ng-if="$ngModel$" ng-click="$ngModel$=null">                 <span class="icon ion-android-close"></span>               </div>               <div class="button button-positive" ng-if="!$ngModel$" ng-click="cronapi.internal.startCamera(\'$ngModel$\')">                 <span class="icon ion-ios-videocam"></span>               </div>             </div>',l="";n.maxFileSize&&(l=n.maxFileSize),o=$(o.split("$ngModel$").join(n.ngModel).split("$required$").join(i).split("$userHtml$").join(r).split("$maxFileSize$").join(l)),$(a).html(o),e(o)(a.scope())}}}]).directive("dynamicFile",["$compile",function(e){return{restrict:"A",scope:!0,require:"ngModel",link:function(t,a,n){var i=n.ngRequired&&"true"==n.ngRequired?"required":"",r=n.ngModel.split("."),o=r[0],l=r[r.length-1],s=Math.floor(1e3*Math.random()+20),c=a.html(),d="";n.maxFileSize&&(d=n.maxFileSize);var u='                                <div ng-show="!$ngModel$" ngf-drop="" ngf-drag-over-class="dragover">                                  <div class="btn" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.uploadFile(\'$ngModel$\', $file, \'uploadprogress$number$\')" ngf-max-size="$maxFileSize$">                                    $userHtml$                                  </div>                                  <div class="progress" data-type="bootstrapProgress" id="uploadprogress$number$" style="display:none">                                    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:0%">                                      <span class="sr-only"></span>                                    </div>                                  </div>                                </div>                                 <div ng-show="$ngModel$" class="upload-image-component-attribute">                                   <div class="button button-assertive" style="float:right;" ng-if="$ngModel$" ng-click="$ngModel$=null">                                     <span class="icon ion-android-close"></span>                                   </div>                                   <div>                                     <div ng-bind-html="cronapi.internal.generatePreviewDescriptionByte($ngModel$)"></div>                                     <a href="javascript:void(0)" ng-click="cronapi.internal.downloadFileEntityMobile($datasource$,\'$field$\')">download</a>                                   </div>                                 </div>                                 ';u=$(u.split("$ngModel$").join(n.ngModel).split("$datasource$").join(o).split("$field$").join(l).split("$number$").join(s).split("$required$").join(i).split("$userHtml$").join(c).split("$maxFileSize$").join(d)),$(a).html(u),e(u)(a.scope())}}}]).directive("pwCheck",[function(){"use strict";return{require:"ngModel",link:function(e,t,a,n){var i="#"+a.pwCheck;t.add(i).on("keyup",function(){e.$apply(function(){var e=t.val()===$(i).val();n.$setValidity("pwmatch",e)})})}}}]).directive("qr",["$window",function(e){return{restrict:"A",require:"^ngModel",template:'<canvas ng-hide="image"></canvas><img ng-if="image" ng-src="{{canvasImage}}"/>',link:function(t,a,n,i){void 0===t.size&&n.size&&(t.text=n.size);var r=function(){return i.$modelValue||""},o=function(e){return/^[0-9]*$/.test(e)},l=function(e){return/^[0-9A-Z $%*+\-.\/:]*$/.test(e)},s=function(e){for(var t=0;t<e.length;t++){if(e.charCodeAt(t)>255)return!1}return!0},c=function(e,t){if("NUMBER"===e&&!o(t))throw new Error("The `NUMBER` input mode is invalid for text.");if("ALPHA_NUM"===e&&!l(t))throw new Error("The `ALPHA_NUM` input mode is invalid for text.");if("8bit"===e&&!s(t))throw new Error("The `8bit` input mode is invalid for text.");if(!s(t))throw new Error("Input mode is invalid for text.");return!0},d=function(e){var a=t.inputMode;return a=a||(o(e)?"NUMBER":void 0),a=a||(l(e)?"ALPHA_NUM":void 0),a=a||(s(e)?"8bit":""),c(a,e)?a:""},u=a.find("canvas")[0],m=!!e.CanvasRenderingContext2D;t.TYPE_NUMBER=function(){return t.typeNumber||0}(),t.TEXT=r(),t.CORRECTION=function(){return{L:1,M:0,Q:3,H:2}[t.correctionLevel||0]||0}(),t.SIZE=function(){return t.size||$(a).outerWidth()}(),t.INPUT_MODE=d(t.TEXT),t.canvasImage="";var p=function(e,t,a,n){for(var i=0;i<a;i++)for(var r=0;r<a;r++){var o=Math.ceil((r+1)*n)-Math.floor(r*n),l=Math.ceil((i+1)*n)-Math.floor(i*n);e.fillStyle=t.isDark(i,r)?"#000":"#fff",e.fillRect(Math.round(r*n),Math.round(i*n),o,l)}},f=function(e,a,n,i,r,o){var l=/^\s+|\s+$/g,s=a.replace(l,""),c=new QRCode(n,i,o);c.addData(s),c.make();var d=e.getContext("2d"),u=c.getModuleCount(),f=r/u;e.width=e.height=r,m&&(p(d,c,u,f),t.canvasImage=e.toDataURL()||"")};t.$watch(function(){return i.$modelValue},function(e,a){e!==a&&(t.text=i.$modelValue,t.TEXT=r(),t.INPUT_MODE=d(t.TEXT),f(u,t.TEXT,t.TYPE_NUMBER,t.CORRECTION,t.SIZE,t.INPUT_MODE))}),f(u,t.TEXT,t.TYPE_NUMBER,t.CORRECTION,t.SIZE,t.INPUT_MODE)}}}]).directive("valid",function(){return{require:"^ngModel",restrict:"A",link:function(e,t,a,n){var i={cpf:CPF,cnpj:CNPJ};n.$validators[a.valid]=function(e,n){var r=e||n,o=i[a.valid].isValid(r);return o?t[0].setCustomValidity(""):t.scope().$applyAsync(function(){t[0].setCustomValidity(t[0].dataset.errorMessage)}),o||!r}}}}).directive("cronappSecurity",function(){return{restrict:"A",link:function(e,t,a){var n=[];e.session&&e.session.roles&&(n=e.session.roles.toLowerCase().split(","));for(var i=parsePermission(a.cronappSecurity),r=!1,o=!1,l=0;l<n.length;l++){var s=n[l].trim();s&&(i.visible[s]&&(r=!0),i.enabled[s]&&(o=!0))}r||$(t).hide(),o||$(t).find("*").addBack().attr("disabled",!0)}}}).directive("cronappStars",[function(){"use strict";return{restrict:"A",require:"ngModel",link:function(e,t,a,n){function i(e){for(var t=1;t<=5;t++)l[t-1].removeClass("ion-android-star-outline"),l[t-1].removeClass("ion-android-star"),t<=e?l[t-1].addClass("ion-android-star"):l[t-1].addClass("ion-android-star-outline");return e}var r=$(t),o=$('<i style="font-size: 200%" class="component-holder ion ion-android-star-outline" style="" xattr-size="" data-component="crn-icon"></i>');r.html("");for(var l=[],s=1;s<=5;s++){var c=o.clone();r.append(c),c.attr("idx",s),c.click(function(){e.$apply(function(){n.$viewValue=parseInt($(this).attr("idx")),n.$commitViewValue()}.bind(this))}),l.push(c)}n.$parsers.push(i),n.$formatters.push(i)}}}]).directive("cronappFilter",["$compile",function($compile){var setFilterInButton=function(e,t,a){var n=e.closest("fieldset");if(n){var i=n.find("button[cronapp-filter]");if(i){var r=i.data("filters");r||(r=[]);var o=-1,l=e.attr("ng-model");if($(r).each(function(e){this.ngModel==l&&(o=e)}),o>-1&&r.splice(o,1),t.length>0){var s={ngModel:l,bindedFilter:t};r.push(s)}i.data("filters",r)}}},makeAutoPostSearch=function(e,t,a,n){var i=e.closest("fieldset");if(i&&i.length>0){var r=i.find("button[cronapp-filter]");if(r&&r.length>0){var o=r.data("filters");o&&o.length>0&&(t="",$(o).each(function(){t+=this.bindedFilter+";"}))}}a.search(t,"true"==n.cronappFilterCaseinsensitive)},inputBehavior=function(scope,element,attrs,ngModelCtrl,$element,typeElement,operator,autopost){var filterTemplate="",filtersSplited=attrs.cronappFilter.split(";"),datasource;if(attrs.crnDatasource)datasource=eval(attrs.crnDatasource);else{var fieldset=$element.closest("fieldset");if(!fieldset)return;var button=fieldset.find("button[cronapp-filter]");if(!button)return;if(!button.attr("crn-datasource"))return;datasource=eval(button.attr("crn-datasource"))}var isOData=datasource.isOData();$(filtersSplited).each(function(){this.length>0&&(""!=filterTemplate&&(filterTemplate+=isOData?" and ":";"),isOData?"="==operator&&"text"==typeElement?filterTemplate="startswith(tolower("+this+"), {value.lower})":"="==operator?filterTemplate=this+" eq {value}":"!="==operator?filterTemplate=this+" ne {value}":">"==operator?filterTemplate=this+" gt {value}":">="==operator?filterTemplate=this+" ge {value}":"<"==operator?filterTemplate=this+" lt {value}":"<="==operator&&(filterTemplate=this+" le {value}"):filterTemplate+="text"==typeElement?this+"@"+operator+"%{value}%":this+operator+"{value}")}),0==filterTemplate.length&&(filterTemplate=isOData?"{value}":"%{value}%"),ngModelCtrl?scope.$watch(attrs.ngModel,function(e,t){if(!angular.equals(e,t)){var a=$element.data("type")||$element.attr("type"),n=ngModelCtrl.$modelValue;isOData?n=n instanceof Date?"datetime-local"==a?"datetimeoffset'"+n.toISOString()+"'":"datetime'"+n.toISOString().substring(0,23)+"'":"number"==typeof n?n:"boolean"==typeof n?n:"'"+n+"'":n instanceof Date?(n=n.toISOString(),n+="date"==a?"@@date":"time"==a||"time-local"==a?"@@time":"@@datetime"):"number"==typeof n?n+="@@number":"boolean"==typeof n&&(n+="@@boolean");var i=filterTemplate.split("{value}").join(n);i="string"==typeof n?i.split("{value.lower}").join(n.toLowerCase()):i.split("{value.lower}").join(n),0==ngModelCtrl.$viewValue.length&&(i=""),setFilterInButton($element,i,operator),autopost&&makeAutoPostSearch($element,i,datasource,attrs)}}):"text"==typeElement?$element.on("keyup",function(){var datasource=eval(attrs.crnDatasource),value=void 0;value=ngModelCtrl&&void 0!=ngModelCtrl?ngModelCtrl.$viewValue:this.value;var bindedFilter=filterTemplate.split("{value}").join(value);0==this.value.length&&(bindedFilter=""),setFilterInButton($element,bindedFilter,operator),autopost&&makeAutoPostSearch($element,bindedFilter,datasource,attrs)}):$element.on("change",function(){var datasource=eval(attrs.crnDatasource),value=void 0,typeElement=$(this).attr("type");if(void 0!=attrs.asDate&&(typeElement="date"),ngModelCtrl&&void 0!=ngModelCtrl)value=ngModelCtrl.$viewValue;else if("checkbox"==typeElement)value=$(this).is(":checked");else if("date"==typeElement){if(value=this.value,this.value.length>0){var momentDate=moment(this.value,patternFormat(this));value=momentDate.toDate().toISOString()}}else value=this.value;var bindedFilter=filterTemplate.split("{value}").join(value);0==value.toString().length&&(bindedFilter=""),setFilterInButton($element,bindedFilter,operator),autopost&&makeAutoPostSearch($element,bindedFilter,datasource,attrs)})},forceDisableDatasource=function(datasourceName,scope){var disableDatasource=setInterval(function(){try{var datasourceInstance=eval(datasourceName);datasourceInstance&&($(document).ready(function(){var e=0,t=setInterval(function(){e<10?(scope.$apply(function(){datasourceInstance.enabled=!1,datasourceInstance.data=[]}),e++):clearInterval(t)},20)}),clearInterval(disableDatasource))}catch(e){}},10)},buttonBehavior=function(scope,element,attrs,ngModelCtrl,$element,typeElement,operator,autopost){var datasourceName="";datasourceName=attrs.crnDatasource?attrs.crnDatasource:$element.parent().attr("crn-datasource");var datasource=eval(datasourceName),isOData=datasource.isOData(),requiredFilter=attrs.requiredFilter&&"true"==attrs.requiredFilter.toString();requiredFilter&&this.forceDisableDatasource(datasourceName,scope),$element.on("click",function(){var $this=$(this),filters=$this.data("filters");if(datasourceName&&datasourceName.length>0&&filters){var bindedFilter="";$(filters).each(function(){""!=bindedFilter&&(bindedFilter+=isOData?" and ":";"),bindedFilter+=this.bindedFilter});var datasourceToFilter=eval(datasourceName);requiredFilter?(datasourceToFilter.enabled=bindedFilter.length>0,datasourceToFilter.enabled?datasourceToFilter.search(bindedFilter,"true"==attrs.cronappFilterCaseinsensitive):scope.$apply(function(){datasourceToFilter.data=[]})):datasourceToFilter.search(bindedFilter,"true"==attrs.cronappFilterCaseinsensitive)}})};return{restrict:"A",require:"?ngModel",link:function(e,t,a,n){var i=$(t),r=i.data("type")||i.attr("type");void 0!=a.asDate&&(r="date");var o="=";a.cronappFilterOperator&&a.cronappFilterOperator.length>0&&(o=a.cronappFilterOperator);var l=!0;a.cronappFilterAutopost&&"false"==a.cronappFilterAutopost&&(l=!1),setTimeout(function(){"INPUT"==i[0].tagName?inputBehavior(e,t,a,n,i,r,o,l):buttonBehavior(e,t,a,n,i,r,o,l)},100)}}}]).directive("cronList",["$compile",function($compile){"use strict";const TEMPLATE='               <ion-list can-swipe="listCanSwipe">             \t   <ion-item class="item" ng-repeat="rowData in datasource">               \t   <div class="item-avatar"></div>               \t </ion-item>                </ion-list>                <ion-infinite-scroll></ion-infinite-scroll>                ';var getExpression=function(e){return"rowData in ".concat(e).concat(".data")},buildFormat=function(e){var t="";if(e.format)t=' | mask: "'+e.format+'"';else switch(e.type){case"date":t=' | mask: "date"';break;case"datetime":t=' | mask: "datetime"';break;case"number":t=' | mask: "number"';break;case"money":t=' | mask: "money"'}return t},addDefaultColumn=function(e,t){return t?"<h2>{{rowData."+e.field+buildFormat(e)+"}}</h2>":"<p>{{rowData."+e.field+buildFormat(e)+"}}</p>"},getEditCommand=function(e){return e+".startEditing(rowData)"},addDefaultButton=function(e,t){const a='<ion-option-button class="button-positive" ng-click="'+getEditCommand(e)+'"><i class="icon ion-edit"></i></ion-option-button>',n='<ion-option-button class="button-assertive" ng-click="'+e+'.remove(rowData)"><i class="icon ion-trash-a"></i></ion-option-button>';return"edit|destroy"==t.command?a.concat(n):"edit"==t.command?a:"destroy"==t.command?n:void 0},addImage=function(e){return'<img data-ng-src="data:image/png;base64,{{rowData.'+e.field+'}}">'},encodeHTML=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")},generateBlocklyCall=function(e){var t;if("client"==e.type){var a=e.blocklyClass.split("/"),n=a[a.length-1];t="blockly.js.blockly."+n,t+="."+e.blocklyMethod;var i="()";e.blocklyParams.length>0&&(i="(",e.blocklyParams.forEach(function(e){i+=(e.value?encodeHTML(e.value):"''")+","}.bind(this)),i=i.substr(0,i.length-1),i+=")"),t+=i}else if("server"==e.type){var n=e.blocklyClass+":"+e.blocklyMethod;t="cronapi.util.makeCallServerBlocklyAsync('"+n+"',null,null,",e.blocklyParams.length>0&&e.blocklyParams.forEach(function(e){t+=(e.value?encodeHTML(e.value):"''")+","}.bind(this)),t=t.substr(0,t.length-1),t+=")"}return t},addBlockly=function(e){return'<ion-option-button class="button-dark" ng-click="'+generateBlocklyCall(e.blocklyInfo)+'"><i class="icon ion-navigate"></i></ion-option-button>'},isImage=function(e,t){for(var a=0;a<t.length;a++){var n=t[a];if(e==n.name)return"Binary"==n.type}return!1},getSearchableList=function(e,t){return'              <label class="item item-input"> <i class="icon ion-search placeholder-icon"></i>                 <input type="text" ng-model="vars.__searchableList__" cronapp-filter="'+t+';" cronapp-filter-operator="" cronapp-filter-caseinsensitive="false" cronapp-filter-autopost="true"                 crn-datasource="'+e+'" placeholder="{{\'template.crud.search\' | translate}}">               </label>             '};return{restrict:"E",link:function(scope,element,attrs,ngModelCtrl){var optionsList={},dataSourceName="",content="",buttons="",image="";try{optionsList=JSON.parse(attrs.options),dataSourceName=optionsList.dataSourceScreen.name;for(var dataSource=eval(optionsList.dataSourceScreen.name),searchableField=null,isNativeEdit=!1,addedImage=!1,i=0;i<optionsList.columns.length;i++){var column=optionsList.columns[i];column.visible&&(column.field&&"Database"==column.dataType?!addedImage&&isImage(column.field,optionsList.dataSourceScreen.entityDataSource.schemaFields)?(image=addImage(column),addedImage=!0):(content=content.concat(addDefaultColumn(column,0==i)),column.filterable&&(searchableField=null!=searchableField?searchableField+";"+column.field:column.field)):"Command"==column.dataType?(buttons=buttons.concat(addDefaultButton(dataSourceName,column)),"edit"!=column.command&&"edit|destroy"!=column.command||(isNativeEdit=!0)):"Blockly"==column.dataType&&(buttons=buttons.concat(addBlockly(column))))}}catch(e){console.log("CronList invalid configuration! "+e)}var templateDyn=null;templateDyn=searchableField?$(getSearchableList(dataSourceName,searchableField)+TEMPLATE):$(TEMPLATE),$(element).html(templateDyn);var ionItem=$(element).find("ion-item");ionItem.attr("ng-repeat",getExpression(dataSourceName)),isNativeEdit&&ionItem.attr("ng-click",getEditCommand(dataSourceName));var ionAvatar=$(element).find(".item-avatar");ionAvatar.append(image),ionAvatar.append(content),ionAvatar.append(buttons),scope.nextPageInfinite=function(){dataSource.nextPage(),scope.$broadcast("scroll.infiniteScrollComplete")};var infiniteScroll=$(element).find("ion-infinite-scroll");infiniteScroll.attr("on-infinite","nextPageInfinite()"),infiniteScroll.attr("distance","1%"),$compile(templateDyn)(element.scope())}}}]).directive("cronInfiniteScroll",["$compile",function($compile){"use strict";return{restrict:"EA",link:function(scope,element,attrs){var dataSource=attrs.cronInfiniteScroll?eval(attrs.cronInfiniteScroll):attrs.crnDatasource?eval(attrs.crnDatasource):void 0;if(dataSource){scope.nextPageInfinite=function(){dataSource.nextPage(),scope.$broadcast("scroll.infiniteScrollComplete")};var templateDyn=$("<ion-infinite-scroll></ion-infinite-scroll>");$(element).html(templateDyn);var infiniteScroll=$(element).find("ion-infinite-scroll");infiniteScroll.attr("on-infinite","nextPageInfinite()"),infiniteScroll.attr("distance","1%"),$compile(templateDyn)(element.scope())}}}}]).filter("raw",["$translate",function(e){return function(e){if(null==e||void 0===e)return"";if("number"==typeof e)return e+"";if("boolean"==typeof e)return e+"";if(!(e instanceof Date))return e.length>=10&&e.match(ISO_PATTERN)?"datetimeoffset'"+e+"'":"'"+e+"'";e.toISOString()}}]).directive("xkeyField",["$compile",function(e){"use strict";return{restrict:"A",link:function(t,a,n){if(n.xkeyField&&n.xdisplayField){var i="";n.crnDatasource&&(i=n.crnDatasource);var r;a.removeAttr("xkey-field"),a.removeAttr("xdisplay-field"),n.multiple?(r="opt as opt."+n.xdisplayField+" for opt in "+i+".data track by opt."+n.xkeyField,a.attr("ng-options",r)):a.append('<option ng-repeat="opt in '+i+'.data" value="{{opt.'+n.xkeyField+'}}">{{opt.'+n.xdisplayField+"}}</option>"),e($(a))(t)}}}}])}(app);