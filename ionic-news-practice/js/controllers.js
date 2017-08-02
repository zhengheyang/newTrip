angular.module('starter.controllers', [])
  .controller('TabCtrl', function ($scope) {
    $scope.buttonState = {
      text: 'Edit',
      isDone: false
    }
    $scope.test = function () {
      $scope.buttonState.isDone = !$scope.buttonState.isDone;
      if ($scope.buttonState.isDone) {
        $scope.buttonState.text = 'Done';
      } else {
        $scope.buttonState.text = 'Edit';
      }
      $scope.$broadcast('buttonState', $scope.buttonState.isDone);
    }
  })
  .controller('DashCtrl', function ($scope, getData) {
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;

    $scope.$on('buttonState', function (e, d) {
      $scope.shouldShowDelete = d;
      $scope.shouldShowReorder = d;
    });

    $scope.moveItem = function(item, fromIndex, toIndex) {
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };

    var myUrl = 'http://api.jisuapi.com/news/get?channel=头条&num=10&appkey=5f612ec65ed1712c&callback=JSON_CALLBACK';
    $scope.pageData = {
      start: 0
    };
    getData.getNews(myUrl, $scope.pageData).then(function (data) {
      $scope.items = data.data.result.list;
    }, function (error) {
    });

    $scope.doRefresh = function () {
      getData.getNews(myUrl, $scope.pageData)
        .then(function (newItems) {
          $scope.items = newItems.data.result.list;
        })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };


    $scope.loadMore = function () {
      $scope.pageData.start += 10;
      getData.getNews(myUrl, $scope.pageData).then(function (items) {
        $scope.items = $scope.items.concat(items.data.result.list);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };


  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
