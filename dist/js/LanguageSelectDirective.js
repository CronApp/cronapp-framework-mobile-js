angular.module("MyApp").directive("ngTranslateLanguageSelect",["LocaleService",function(a){"use strict";return{restrict:"A",replace:!0,template:"<div class=\"language-select\" ng-if=\"visible\"><label><select ng-init=\"currentLocaleDisplayName = localesDisplayNames[0]\"ng-model=\"currentLocaleDisplayName\" ng-options=\"localesDisplayName for localesDisplayName in localesDisplayNames\" ng-change=\"changeLanguage(currentLocaleDisplayName)\">aria-label=\"Language Selector\"</select></label></div>",controller:["$scope",function(b){b.currentLocaleDisplayName=a.getLocaleDisplayName(),b.localesDisplayNames=a.getLocalesDisplayNames(),b.visible=b.localesDisplayNames&&1<b.localesDisplayNames.length,b.changeLanguage=function(b){a.setLocaleByDisplayName(b)}}]}}]);