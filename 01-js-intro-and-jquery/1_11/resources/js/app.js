;$(document).on("ready", function(){

	$.ajax({
  	type: 	"GET",
  	url: 		"https://api.spotify.com/v1/search",
  	data: 	{ 
  		q: 		"Rolling Stones",
  		type: "album"
  	}
	})
  .done(function(data) {
    console.log(data);
  })
  .error(function(){

  })
  .complete(function(){

  })
  .always(function(){

  });

});