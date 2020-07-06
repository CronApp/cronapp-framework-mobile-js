var cronappModules=["ionic","ui.router","ngResource","ngSanitize","custom.controllers","custom.services","report.services","datasourcejs","pascalprecht.translate","tmh.dynamicLocale","ui-notification","ngFileUpload","angularMoment"];window.customModules&&(cronappModules=cronappModules.concat(window.customModules));var app=function(){return angular.module("MyApp",cronappModules).constant("LOCALES",{locales:{pt_br:"Portugues (Brasil)",en_us:"English"},preferredLocale:"pt_br"}).run(["$ionicPlatform",function(a){a.ready(function(){setTimeout(function(){navigator.splashscreen&&navigator.splashscreen.hide()},100),window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$httpProvider",function(a){a.interceptors.push(["$q","$rootScope",function(){return{request:function(a){var b=JSON.parse(sessionStorage.getItem("_u"));return b&&b.token&&(a.headers["X-AUTH-TOKEN"]=b.token),a}}}])}]).config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",function(a,b,c){c.navBar.alignTitle("center"),ionic.Platform.isIOS()&&c.scrolling.jsScrolling(!1)}]).config(["$stateProvider","$urlRouterProvider","NotificationProvider",function(a,b,c){c.setOptions({delay:5e3,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"right",positionY:"top"}),window.customStateProvider?window.customStateProvider(a):a.state("index",{url:"",controller:"HomeController",templateUrl:"views/home.view.html"}).state("main",{url:"/",controller:"HomeController",templateUrl:"views/home.view.html"}).state("home",{url:"/home",controller:"HomeController",templateUrl:"views/home.view.html"}).state("pages",{url:"/app/{name:.*}",cache:!1,controller:"PageController",templateUrl:function(a){return"views/"+a.name+".view.html"}}).state("404",{url:"/error/404",controller:"PageController",templateUrl:function(){return"views/error/404.view.html"}}).state("403",{url:"/error/403",controller:"PageController",templateUrl:function(){return"views/error/403.view.html"}}),b.otherwise("/error/404")}]).config(["$translateProvider","tmhDynamicLocaleProvider",function(a,b){a.useMissingTranslationHandlerLog(),a.useStaticFilesLoader({prefix:"i18n/locale_",suffix:".json"}),a.registerAvailableLanguageKeys(["pt_br","en_us"],{"en*":"en_us","pt*":"pt_br","*":"pt_br"});var c=(window.navigator.userLanguage||window.navigator.language||"pt_br").replace("-","_");a.use(c.toLowerCase()),a.useSanitizeValueStrategy("escaped"),b.localeLocationPattern("node_modules/angular-i18n/angular-locale_{{locale}}.js")}]).directive("crnValue",["$parse",function(a){return{restrict:"A",require:"^ngModel",link:function(b,c,d,e){var f;f=d.value?d.value:a(d.crnValue)(b),c.attr("data-evaluated",JSON.stringify(f)),c.bind("click",function(){b.$apply(function(){e.$setViewValue(f)}.bind(c))})}}}]).decorator("$xhrFactory",["$delegate","$injector",function(a,b){return function(c,d){var e=a(c,d),f=b.get("$http"),g=f.pendingRequests[f.pendingRequests.length-1];return angular.isFunction(g.onProgress)&&e.upload.addEventListener("progress",g.onProgress),e}}]).controller("PageController",["$scope","$stateParams","Notification","$location","$http","$rootScope","$ionicModal","$translate",function(a,b,c,d,e,f,g,h){for(var i in app.registerEventsCronapi(a,h,g),f.http=e,a.Notification=c,app.userEvents)a[i]=app.userEvents[i].bind(a);a.params=b,a.$http=e;var j=d.search();for(var k in j)j.hasOwnProperty(k)&&(a.params[k]=j[k]);registerComponentScripts();try{var l=$controller("AfterPageController",{$scope:a});app.copyContext(l,this,"AfterPageController")}catch(a){}}]).run(["$rootScope","$state",function(a,b){a.$on("$stateChangeError",function(){if(6<=arguments.length){var a=arguments[5];(404===a.status||403===a.status)&&b.go(a.status.toString())}else b.go("404")}),a.$on("$stateChangeSuccess",function(){setTimeout(function(){$($(".icon.ion-plus-round").parent()).off("click"),$($(".icon.ion-plus-round").parent()).on("click",function(){$("[required]").removeClass("input-validation-error"),$("input:invalid").removeClass("input-validation-error")}),$($(".icon.ion-checkmark").parent()).off("click"),$($(".icon.ion-checkmark").parent()).on("click",function(){$("[required].ng-invalid-required, [required].ng-invalid, [required].ng-empty").addClass("input-validation-error"),$("input:invalid").addClass("input-validation-error")}),$("input").off("keydown"),$("input").on("keydown",function(){$(this).removeClass("input-validation-error")})},300)}),setInterval(()=>$("ion-nav-view[name=\"menuContent\"] .button.button-clear.hide").removeClass("hide"),300)}])}(window);app.userEvents={},app.config={},app.config.datasourceApiVersion=2,app.config.defaultRoute="/app",app.bindScope=function(a,b){var c={};for(var d in b)c[d]="string"==typeof b[d]||"boolean"==typeof b[d]?b[d]:"function"==typeof b[d]?b[d].bind(a):app.bindScope(a,b[d]);return c},app.registerEventsCronapi=function(a,b,c){for(var d in app.userEvents)a[d]=app.userEvents[d].bind(a);a.vars={},a.$evt=$evt;try{cronapi&&(a.cronapi=app.bindScope(a,cronapi),a.cronapi.$scope=a,a.cronapi.$scope.$ionicModal=c,a.safeApply=safeApply,b&&(a.cronapi.$translate=b))}catch(a){console.info("Not loaded cronapi functions"),console.info(a)}try{blockly&&(blockly.cronapi=cronapi,a.blockly=app.bindScope(a,blockly))}catch(a){console.info("Not loaded blockly functions"),console.info(a)}},window.safeApply=function(a){var b=this.$root.$$phase;"$apply"==b||"$digest"==b?a&&"function"==typeof a&&a():this.$apply(a)};var registerComponentScripts=function(){$(".carousel-indicators li").on("click",function(){var a="#"+$(this).parent().parent().parent().attr("id"),b=$(a+" .carousel-indicators li").index(this);$(a+" #carousel-example-generic").carousel(b)})};