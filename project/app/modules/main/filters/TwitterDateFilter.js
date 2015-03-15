/**
 *  @name     TwitterDateFilter
 *
 *  @description                      replace the provided date as string to fromNow time
 * 
 *  @param    {String}  date
 */
app.filter('twitterDate', [
  "$window",
  function($window) {
      return function(date) {

          // If there is no date provided will return undefined
          if (!date) {
            return;
          }

          var time = null,
              timeFromNow = null;

          // With moment js parse it to fromNow time
          time = date.split(" ");
          timeFromNow = $window.moment(new Date(Date.parse(time[1]+" "+time[2]+", "+time[5]+" "+time[3]+" UTC"))).fromNow();
          
          return timeFromNow;
      };
  }
]);