#Intro to Angular.js

Angular is a web framework for the front end of your application.  It's responsible for accepting data from the middleware of your application and vice versa.  Angular.js is similar to other templating engines.  For those of you coming from python, Angular is similar to jinja2.  For those of you coming from ruby this is similar to HAML.   

   
##Prerequisites

Before writing applications with Angular.js its probably best to ensure a solid foundation in the core of JavaScript, Node.js, and Express.js.  Please do check out [this introduction to javascript](http://www.syncano.com/getting-know-javascript-intro/), [this intro to express](http://www.syncano.com/intro-to-express-js), and [this introduction to node](http://www.syncano.com/intro-to-node-js) if you are unfamiliar.

##A first example

Angular.js is extremely easy to make use of.  Below I include a simple example:

```
<!doctype html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
</head>
<body>
<div ng-app="" ng-init="default='Eric'">
 <p>Name: <input type="text" ng-model="name"></p>
 <p>Hello there, {{name}}</p>
 <p>Hello there, <span ng-bind="default"></span></p>
</div>
</body>
</html>
```

Notice how easy it is to make use of Angular.js, all you need to is include the CDN ([content delivery network](http://en.wikipedia.org/wiki/Content_delivery_network)).  And then we're off to the races.

##Directives
Despite it's simplicity there is a ton of conceptual stuff going on here.  First we need to understand the notion of directives, which Angular makes use of to manipulate the DOM (Document Object Model).  There are a number of directives, in the above example we see four very common ones: ng-app, ng-model, ng-init and ng-bind.  

Def: The **ng-app** directive tells defines the tag that should be treated as the root of the Angular app.  

Essentially this tells the rendering engine where the dynamic content will live.  The reason this is nice, is you need not have all of your html code be dynamic unnecessarily.  Of course, if you're free to to simply make the whole document dynamic by passing ng-app as an attribute to the html tag.

Def: The **ng-model** directive binds the value of the input field to the application variable.

In our case ng-model binds the variable name to the user accepted input field.  This variable is then accessible throughout the Angular-app section of the html document.  

Notice that to make use of this variable we simply need to add opening `{{` and closing `}}` around the variable name.  As an aside, the double open and close braces can also be used to evaluate statements generally.  So,

```
<div ng-app="">
 <p>5+5 = {{5 + 5}}</p>
</div>
```

Will show 5+5 = 10.

Def: The **ng-init** directive assigns default values to different variable names.  These names are given onload.

Def: The **ng-bind** directive binds the application data to the html 

Notice that the ng-bind has the same effect as the double curly braces.  Typically choosing to use one or the other comes down to a matter of taste.

##Adding a controller: sending data to the frontend.

Now that we can manipulate our view, it's time to see the true power of angular: making use of the controller.  

processing.js

```
angular.module('processing', [])
 .controller("ProcessingController", function(){
    this.first = 1;
    this.second = 2;
    this.listing = [1,2,3,4];
    this.lookup = {
      name: "Eric",
      age: "29",
      company: "Syncano"
     };

    this.getFirst = function getFirst(){
       return this.first; 
    };
	
	this.setFirst = function setFirst(val){
		this.first = val;
	};
	
   });
```

Our controller isn't particularly sophisticated for right now, since we are defining all our data on the front end (for now).  Essentially the controller is just a call back that passes an object to the front end.  For those of you unfamiliar with callbacks or javascript objects please check out [intro to node.js for callbacks](http://www.syncano.com/intro-to-node-js) and [introduction to javascript for javascript objects](http://www.syncano.com/data-structures-in-javascript/).


processing.html

```
<!doctype html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
</head>
<body>
<div ng-app="processing" ng-controller="ProcessingController as processing"> 
 <p> Adding {{processing.first}} + {{processing.second}}: {{processing.first + processing.second}}</p>
 <p> Getting all the elements in listing:</p>
  <span ng-repeat="elem in processing.listing">
    {{elem}},
  </span> 
 <p> Change First:<input type="number" ng-model="val"><button class="btn" ng-click="processing.setFirst(val)">change first</button>
 <p>Doing a lookup:</p>
 <p>Name: {{processing.lookup["name"]}}</p>
 <p>Age: {{processing.lookup["age"]}}</p>
 <p>Company: {{processing.lookup["company"]}}</p>
</div> 
</body>
</html>
```

Here we see how to interact with the controller object on the front end - which is the secret sauce for angular.  

Notice how easy iteration is: 
```
<span ng-repeat="elem in processing.listing">
    {{elem}},
</span>

```
Also, notice how easy changing values on the front end is:
```
<p> Change First:<input type="number" ng-model="val"><button class="btn" ng-click="processing.setFirst(val)">change first</button>
```

Finally, notice how easy accessing values in the object is:
```
 <p>Doing a lookup:</p>
 <p>Name: {{processing.lookup["name"]}}</p>
 <p>Age: {{processing.lookup["age"]}}</p>
 <p>Company: {{processing.lookup["company"]}}</p>
```

##Understanding scope

scoping.html
```

<!DOCTYPE html>
<html>

<head>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
</head>

<body>

<div ng-app="myApp" ng-controller="customersCtrl"> 

<ul>
  
    <p>Name:{{ name }}</p>
    <p>Email: {{email}}</p>
 
</ul>

</div>

<script>
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope) {
    $scope.name = "Eric Schles";
    $scope.email = "eric.schles@syncano.com"
});
</script>

</body>
</html>

```

In angular, $scope is the application object - owner of application variables and functions.  So anything defined in the templated html will be available to your controller via the $scope object.

##Understanding http


viewer.html
```
<!DOCTYPE html>
<html>

<head>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
</head>

<body>

<div ng-app="myApp" ng-controller="customersCtrl"> 

<ul>
  
    <p>Name:{{ name }}</p>
    <p>Email: {{email}}</p>
 
</ul>

</div>

<script>
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  $http.get("http://localhost:5000/api")
  .success(function (response) {
    $scope.name = response["name"];
    $scope.email = response["email"]});
});
</script>

</body>
</html>
```

api.js
```
var express = require("express");

var app = express();

app.get("/api",function(req,res){
    res.send({name:"Eric Schles",email:"eric.schles@syncano.com"})
});

app.get("/viewer",function(req,res){
  res.sendfile("./viewer.html");
});
app.listen(5000);
console.log("running");
```

The `$http` object is extremely powerful.  It's primary use is to ingest data from the backend.  As we see here, using $http object we are able to interact with express directly.
