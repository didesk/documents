# ANGULAR JS 

##  Directivas comunes:

ng-app, ng-strict-di, ng-cloak,ngChange, ngChecked, ngClass, ngClick,ngController, ngCopy, ngDblclick, ngFocus, ngHide, ngIf, ngInclude, ngInit, ngModel,ngMousedown, ngMouseenter ngMouseleave, ngMousemove, ngMouseover, ngMouseup, ngOptions, ngRepeat, ngSelected,ngShow, ngSrc, ngSwitch

# Componentes de angular

Angular-mocks, (ng-Anotate para evitar problemas de minificacion anotando dependencias implicitamente),

## NGROUTE
npm install angular-route

dependencias a incluir en el config: $routeProvider y la etiqueta ng-view en el html
```
angualar.module('app', [ngRoute])
  .config(function($routeProvider){
    $routeProvidder
      .when('/home' {
        templateUrl: 'template/home.url';
        controller: 'homeController'
      })
      .otherwise('/')

  })
```
## UIROUTER
npm install angular-ui-router

dependencias a incluir en el config: $stateProvider, $urlRouteProvider y  la etiqueta ui-view en el html
```
angualar.module('app', [ui.router])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('/home' {
        url: "/home",
        templateUrl: 'template/home.url';
        controller: 'homeController'
      })
      .state("users", {
        url: "/login",
        templateUrl: "templates/users.html",
        controller: function($scope, $stateParams){
          $scope.userId = $stateParams.id;
        }
      })
      ....

      $urlRouteProvider.otherwise('/')

  })
```

## ANGULAR-MOCKS
Se usa para Testing. Angular-mocks nos provee de la funcion inject() gracias a la cual piodemos inyectar cualquier dependencia que necesitemos

### para testear lo primero es cargar el modulo
```
 beforeEach(module("app"));
 ```

### para testear un controlador hay que inyectar: 
```
 beforeEach(inject(function($rootScope, $controller)
 ```

### para testear un filtro: hay que poner el nombre del filtro + FILTER, que es como angular registra los filtros en el objeto $Injector
ejemplo
```
'use strict';
 
describe('Modulo app.decorator-filter', function () {
    
    beforeEach(function(){
        module('app.decorator-filter');
    });
 
    describe('Filtro decorator', function () {
        it('debe transformar en mayusculas cualquier string y anteponer asteriscos', 
        		inject(function (decoratorFilter) {
            var input = 'someThing';
            var expectedOutput = '**SOMETHING';
            expect(decoratorFilter(input)).toEqual(expectedOutput);
        }));
    });
});
```
### Otro ejemplo de test de un filtro (el del tutorial)
```
'use strict';

describe('Phone', function() {
  var $httpBackend;
  var Phone;
  var phonesData = [
    {name: 'Phone X'},
    {name: 'Phone Y'},
    {name: 'Phone Z'}
  ];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Phone` service before each test
  beforeEach(module('core.phone'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Phone_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('phones/phones.json').respond(phonesData);

    Phone = _Phone_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the phones data from `/phones/phones.json`', function() {
    var phones = Phone.query();

    expect(phones).toEqual([]);

    $httpBackend.flush();
    expect(phones).toEqual(phonesData);
  });

});
```


# Ejemplo de protractor e2e
Se hace test end to end cuando añadimos un elemento  la página que se inserta o trabaja directamente con el html.

```
describe('PhoneCat Application', function() {

  describe('phoneList', function() {

    beforeEach(function() {
      browser.get('index.html');
    });

    it('should filter the phone list as a user types into the search box', function() {
      var phoneList = element.all(by.repeater('phone in $ctrl.phones'));
      var query = element(by.model('$ctrl.query'));

      expect(phoneList.count()).toBe(3);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(2);
    });

  });

});
```

# filtros
Nos permiten cambiar el comportamiento de lo que se está visualizando

angular.module('app'. [])
.filter('filtro', fuciton(){

})



## Usando Sintaxis es6 típica bootstraping:

### html:
```
<body ng-app ="app" ng-strict-di ng-cloack>

   // carga del componente
   <app>
      Loading...
   </app>
</body>
```
### app.js:
```
//Imports de estilos
import 'bootstrap-css...';

//imports de dependencias js
import angular from 'angular';
import app.component from 'appComponent';

angular.module('app', [])
   .component('app'), appComponent);

```
### app.html:

```
<div>
   contenido del html del compoenente...
</div>
```


# Sintaxis de un componente normal
###app.component.js 

```
angular.
  module('phoneDetail').
  component('phoneDetail', {
    templateUrl: 'phone-detail/phone-detail.template.html',
    controller: ['$routeParams', 'Phone',
      function PhoneDetailController($routeParams, Phone) {
        var self = this;
        self.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
          self.setImage(phone.images[0]);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };
      }
    ]
  });
```

# Testing de un componente normal
###app.component.js 

```
'use strict';

describe('phoneDetail', function() {

  // Load the module that contains the `phoneDetail` component before each test
  beforeEach(module('phoneDetail'));

  // Test the controller
  describe('PhoneDetailController', function() {
    var $httpBackend, ctrl;
    var xyzPhoneData = {
      name: 'phone xyz',
      images: ['image/url1.png', 'image/url2.png']
    };

    beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData);

      $routeParams.phoneId = 'xyz';

      ctrl = $componentController('phoneDetail');
    }));

    it('should fetch the phone details', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.phone).toEqual({});

      $httpBackend.flush();
      expect(ctrl.phone).toEqual(xyzPhoneData);
    });

  });

});

```

# Sintaxis de un controlador
###ejemplo.controller.js 

```
var myApp = angular.module('myApp',[]);

myApp.controller('MyController', function($scope) {
  $scope.spices = [{"name":"pasilla", "spiciness":"mild"},
                   {"name":"jalapeno", "spiciness":"hot hot hot!"},
                   {"name":"habanero", "spiciness":"LAVA HOT!!"}];
  $scope.spice = "habanero";
});
```

# Testing de un controlador
###ejemplo.controller.spec.js 

Existen varias maneras de probar un controlador, una de las mejores convenciones, consiste en inyectar $ rootScope y $ controller.

```
describe('myController function', function() {

  describe('myController', function() {
    var $scope;

    beforeEach(module('myApp'));

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('MyController', {$scope: $scope});
    }));

    it('should create "spices" model with 3 spices', function() {
      expect($scope.spices.length).toBe(3);
    });

    it('should set the default value of spice', function() {
      expect($scope.spice).toBe('habanero');
    });
  });
});
```

 Si se pretende probar un controlador anidado hay que crear la misma jerarquía de ámbito en su prueba que existe en el DOM:

 ###ejemplo2.controller.spec.js

```
describe('state', function() {
    var mainScope, childScope, grandChildScope;

    beforeEach(module('myApp'));

    beforeEach(inject(function($rootScope, $controller) {
        mainScope = $rootScope.$new();
        $controller('MainController', {$scope: mainScope});
        childScope = mainScope.$new();
        $controller('ChildController', {$scope: childScope});
        grandChildScope = childScope.$new();
        $controller('GrandChildController', {$scope: grandChildScope});
    }));

    it('should have over and selected', function() {
        expect(mainScope.timeOfDay).toBe('morning');
        expect(mainScope.name).toBe('Nikki');
        expect(childScope.timeOfDay).toBe('morning');
        expect(childScope.name).toBe('Mattie');
        expect(grandChildScope.timeOfDay).toBe('evening');
        expect(grandChildScope.name).toBe('Gingerbread Baby');
    });
});
```

# Servicios (factory)
###ejemplo.service.js 

Para crear un servicio existen varias técnicas pero las recomendadas son .factory y .service. A los sevicios se les suele inyectar sus propas dependencias directamente si las necesitan.

```
angular.
  module('core.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('phones/:phoneId.json', {}, {
        query: {
          method: 'GET',
          params: {phoneId: 'phones'},
          isArray: true
        }
      });
    }
  ]);
```
otro ejemplo
```
angular.
module('myServiceModule', []).
 controller('MyController', ['$scope', 'notify', function($scope, notify) {
   $scope.callNotify = function(msg) {
     notify(msg);
   };
 }]).
factory('notify', ['$window', function(win) {
   var msgs = [];
   return function(msg) {
     msgs.push(msg);
     if (msgs.length === 3) {
       win.alert(msgs.join('\n'));
       msgs = [];
     }
   };
 }]);
```
# Registrando un servicio en la configuracion a través de $provider
También puede registrar servicios a través del servicio $ provide dentro de la función de configuración de un módulo:
```
angular.module('myModule', []).config(['$provide', function($provide) {
  $provide.factory('serviceId', function() {
    var shinyNewServiceInstance;
    // factory function body that constructs shinyNewServiceInstance
    return shinyNewServiceInstance;
  });
}]);
```

# Testing Servicios (factory)
###ejemplo.service.spec.js 

Este ejemplo usa un spy de jasmine 

```
var mock, notify;
beforeEach(module('myServiceModule'));
beforeEach(function() {
  mock = {alert: jasmine.createSpy()};

  module(function($provide) {
    $provide.value('$window', mock);
  });

  inject(function($injector) {
    notify = $injector.get('notify');
  });
});

it('should not alert first two notifications', function() {
  notify('one');
  notify('two');

  expect(mock.alert).not.toHaveBeenCalled();
});

it('should alert all after third notification', function() {
  notify('one');
  notify('two');
  notify('three');

  expect(mock.alert).toHaveBeenCalledWith("one\ntwo\nthree");
});

it('should clear messages after alert', function() {
  notify('one');
  notify('two');
  notify('third');
  notify('more');
  notify('two');
  notify('third');

  expect(mock.alert.calls.count()).toEqual(2);
  expect(mock.alert.calls.mostRecent().args).toEqual(["more\ntwo\nthird"]);
});
```