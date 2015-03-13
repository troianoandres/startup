app.filter('tweetLink', [
  function() {
      return function(text) {
          if (!text) {
            return;
          }

          // replace #hashtags and send them to twitter
          var replaceHashtags = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
          replacedText = text.replace(replaceHashtags, '$1<a>#$2</a>');
          
          // replace @mentions but keep them to our site
          var replaceMentions = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
          replacedText = replacedText.replace(replaceMentions, '$1<a>@$2</a>');
          
          return replacedText;
      };
  }
]);