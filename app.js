
var app = angular.module("collegeApp", ["ngRoute"]);

// Configure application routes
app.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix("!");

    $routeProvider
      .when("/", {
        templateUrl: "home.html",
        controller: "HomeController",
        controllerAs: "home"
      })
      .when("/about", {
        templateUrl: "about.html"
      })
      .when("/programs", {
        templateUrl: "programs.html",
        controller: "ProgramsController",
        controllerAs: "programs"
      })
      .when("/contact", {
        templateUrl: "contact.html",
        controller: "ContactController",
        controllerAs: "contact"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
]);

// Main navigation controller
app.controller("MainController", [
  "$location",
  function ($location) {

    var vm = this;

    vm.menuOpen = false;
    vm.year = new Date().getFullYear();

    vm.isActive = function (path) {
      return ($location.path() || "/") === path;
    };
  }
]);

// Homepage controller
app.controller("HomeController", function () {

  var vm = this;

  vm.features = [
    {
      icon: "fa-compass",
      title: "Explore with purpose",
      text: "Find a direction that connects your interests with future opportunities."
    },
    {
      icon: "fa-book-open",
      title: "Learn by doing",
      text: "Build practical knowledge through projects, collaboration, and discovery."
    },
    {
      icon: "fa-people-group",
      title: "Grow together",
      text: "Develop the confidence to contribute, communicate, and lead."
    }
  ];

  vm.stats = [
    { value: "12+", label: "Learning pathways" },
    { value: "4", label: "Core portal sections" },
    { value: "1", label: "Place to start" }
  ];
});

// Programs controller
app.controller("ProgramsController", function () {

  var vm = this;

  vm.searchText = "";
  vm.activeCategory = "All";

  vm.categories = [
    "All",
    "Technology",
    "Business",
    "Science",
    "Design"
  ];

  vm.items = [
    {
      title: "Computer Science",
      category: "Technology",
      duration: "4 years",
      icon: "fa-laptop-code",
      description: "Explore software development, algorithms, databases, and modern computing."
    },
    {
      title: "Artificial Intelligence",
      category: "Technology",
      duration: "4 years",
      icon: "fa-brain",
      description: "Study intelligent systems, machine learning, and data-driven problem solving."
    },
    {
      title: "Business Administration",
      category: "Business",
      duration: "3 years",
      icon: "fa-chart-line",
      description: "Build foundations in management, strategy, finance, and entrepreneurship."
    },
    {
      title: "Applied Sciences",
      category: "Science",
      duration: "3 years",
      icon: "fa-flask",
      description: "Develop scientific thinking through investigation, analysis, and experimentation."
    },
    {
      title: "Digital Design",
      category: "Design",
      duration: "3 years",
      icon: "fa-pen-ruler",
      description: "Combine visual communication, user experience, and creative problem solving."
    },
    {
      title: "Data Science",
      category: "Technology",
      duration: "4 years",
      icon: "fa-chart-pie",
      description: "Turn complex data into useful insights using statistics and computing."
    },
    {
      title: "Environmental Studies",
      category: "Science",
      duration: "3 years",
      icon: "fa-leaf",
      description: "Understand sustainability, ecosystems, and responsible environmental practices."
    },
    {
      title: "Commerce",
      category: "Business",
      duration: "3 years",
      icon: "fa-coins",
      description: "Learn about accounting, markets, business operations, and financial literacy."
    }
  ];

  vm.setCategory = function (category) {
    vm.activeCategory = category;
  };

  // Combine category filters and text search
  vm.visiblePrograms = function () {

    var query = (vm.searchText || "").toLowerCase().trim();

    return vm.items.filter(function (item) {

      var matchesCategory =
        vm.activeCategory === "All" ||
        item.category === vm.activeCategory;

      var searchableText =
        item.title + " " +
        item.description + " " +
        item.category;

      var matchesSearch =
        !query ||
        searchableText.toLowerCase().indexOf(query) !== -1;

      return matchesCategory && matchesSearch;
    });
  };
});

// Contact form controller
app.controller("ContactController", function () {

  var vm = this;

  vm.messageSent = false;

  vm.submitForm = function (form) {

    if (form && form.$valid) {
      vm.messageSent = true;
    }
  };

  vm.resetForm = function (form) {

    vm.messageSent = false;
    vm.formName = "";
    vm.formEmail = "";
    vm.topic = "";
    vm.message = "";

    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  };
});
