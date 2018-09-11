var myApp=angular.module('blog',['ngRoute']);


myApp.controller('createBlogCtrl',['$scope','$http','$location',function($scope,$http,$location){

 $scope.sentRequest=function(){

   var userBlogData={
     title:$scope.title,
     allTags:$scope.tags,
     category:$scope.categoryByUser,
     body:$scope.body,
     authorName:$scope.author_name,
     authorEmail:$scope.author_email
   }
   console.log(userBlogData);

   $http.post('http://localhost:3000/queries/createBlog', userBlogData)
   .then(successCallback, errorCallback);

     function successCallback(response){
       console.log(response);
       $location.path('/allBlogs');
     }
     function errorCallback(response){
       console.log(response);
      $scope.error=response.data;
      console.log($scope.error);
      $location.path('/createBlog')
     }
 }
}])

myApp.controller('viewBlogCtrl',['$scope','$http','$location',
'$route',function($scope,$http,$location,$route){

   $http.get('http://localhost:3000/queries/viewAllBlogs')
   .then(successCallback, errorCallback);

     function successCallback(response){
       console.log(response);
       $scope.allBlogsData=response.data.message;
     }
     function errorCallback(response){
       console.log(response);
     }
     $scope.numlimit=100;
     $scope.showReadBtn=true;
     $scope.showUpdateBtn=false;
     $scope.showDeleteBtn=false;

     $scope.displayWholeBlog=function(){
       $scope.numlimit=Infinity;
       $scope.showReadBtn=false;
       $scope.showUpdateBtn=true;
       $scope.showDeleteBtn=true;
     }

     $scope.deleteBlog=function(id){
       console.log('id '+id);

       $http.get('http://localhost:3000/queries/deleteBlog/'+id)
       .then(successCallback, errorCallback);

         function successCallback(response){
           console.log(response);
           $route.reload();
         }
         function errorCallback(response){
           console.log(response);
         }
     }
}])

myApp.controller('updateBlogCtrl',['$scope','$http','$routeParams',
'$location',function($scope,$http,$routeParams,$location){

   $http.get('http://localhost:3000/queries/viewBlog/'+$routeParams.id)
   .then(successCallback, errorCallback);

     function successCallback(response){
       console.log(response);
       $scope.blogData=response.data.message;
       console.log($scope.blogData);
     }
     function errorCallback(response){
       console.log(response);
     }
     $scope.sentRequest=function(){

       var userBlogData={
         title:$scope.title,
         allTags:$scope.tags,
         category:$scope.categoryByUser,
         body:$scope.body,
         authorName:$scope.author_name,
         authorEmail:$scope.author_email
       }
       console.log(userBlogData);

       $http.post('http://localhost:3000/queries/updateBlog/'+$routeParams.id, userBlogData)
       .then(successCallback, errorCallback);

         function successCallback(response){
           console.log(response);
           $location.path('/allBlogs');
         }
         function errorCallback(response){
           console.log(response);
         }
     }

}])
