/**
 *  @name     TweetLinkFilter
 *
 *  @description                        replace hashtags and mentions into anchors
 *
 *  @param    {String}    text          text to apply the filter
 */
app.filter('tweetLink', [
  function() {
      return function(text) {

          // If there is no text provided will return undefined
          if (!text) {
            return;
          }

          // replace hashtags
          var replaceHashtags = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
          replacedText = text.replace(replaceHashtags, '$1<a>#$2</a>');
          
          // replace mentions
          var replaceMentions = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
          replacedText = replacedText.replace(replaceMentions, '$1<a>@$2</a>');
          
          return replacedText;
      };
  }
]);