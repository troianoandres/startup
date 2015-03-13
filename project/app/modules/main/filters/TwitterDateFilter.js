app.filter('twitterDate', [
  "$window",
  function($window) {
      return function(date) {
          if (!date) {
            return;
          }

          var time = null,
              timeFromNow = null;

          time = date.split(" ");
          timeFromNow = $window.moment(new Date(Date.parse(time[1]+" "+time[2]+", "+time[5]+" "+time[3]+" UTC"))).fromNow();
          
          return timeFromNow;
      };
  }
]);