/**
 *  emptyAlbumsList() clean the entire list of albums from sporify api
 *  @return   {void}
 */
var   emptyAlbumsList   = function emptyAlbumsList() {
  var $albumsList  = $("#albums-list");

  // Empty the albumsList if founded
  if($albumsList.length){
    $albumsList.empty();
  }
};

/**
 *  appendAlbum() append the album provided into parameters to the album's list
 * @param  {[type]} album [description]
 * @return {[type]}       [description]
 */
var   appendAlbum = function appendAlbum(album) {

  // TODO: ASK BRAIAN WHAT'S THE BEST WAY TO DO THIS
  var $albumsList  = $("#albums-list");

  var $albumImage   = $('<div class="img-wrapper"><img src="' + album.images[0].url + '"></div>');

  var $albumHeader  = $('<header><h4 class="lsit-item-header text-center">' + album.name + '</h4></header>');

  var $albumSubheader  = $('<h6 class="lsit-header-addon text-center">Album type: ' + album.album_type + '</h6>');

  var $albumBody    = $('<p class="text-center"><a href="' + album.external_urls.spotify + '">Go to spotify!</a></p>');

  var $albumItem    = $('<article class="lsit-item"></article>');

  var $listItemContainer  = $('<div class="lsit-item-container"></div>');

  $albumItem.append($albumImage);
  $albumHeader.append($albumSubheader);
  $albumItem.append($albumHeader);
  $albumItem.append($albumBody);
  $listItemContainer.append($albumItem);

  $albumsList.append($listItemContainer);
};

/**
 * loadAlbumsListSuccess() callback function to loadAlbumsList method()
 * @param  {Json}    data   Response data
 * @return {void}
 */
var loadAlbumsListSuccess   = function loadAlbumsListSuccess(data) {
    // Log the object into the console like requested    
    console.log(data);

    // If is some album into the items array
    if(data.albums.items.length){

      // Clean the entire albums list
      emptyAlbumsList();

      // For each album i will append it to the list
      $.each(data.albums.items,
        function(index, album){
          appendAlbum(album);
        }
      );

    }
};

/**
 * [loadAlbumsListError description]
 * @param  {[type]} xhr         [description]
 * @param  {[type]} textStatus  [description]
 * @param  {[type]} errorThrown [description]
 * @return {void}
 */
var loadAlbumsListError     = function loadAlbumsListError(xhr, textStatus, errorThrown){
  console.log(xhr);
  console.log("Status: " + textStatus);
  console.log("Error: " + errorThrown);

  // Empty the albums list
  emptyAlbumsList();

  // Append custom error message to the albums list container
  var $albumsList  = $("#albums-list");

  var $albumsListErrorContainer   =  $("<h4>", {"class": "is-error text-center"});
  $albumsListErrorContainer.html("Something went wrong, please try again");

  $albumsList.append($albumsListErrorContainer);
};

/**
 *  loadAlbumsList() search for the data type provided by searchType, filtered by the artistName
 *  then it appends it to the albums-list section
 *  
 *  @param  {String} artistName Name of the artist of interest
 *  @param  {String} searchType Search type of the ajax request
 *  @return {void}
 */
var   loadAlbumsList  = function loadAlbumsList(artistName, searchType) {
  $.ajax({
    type:     "GET",
    url:      "https://api.spotify.com/v1/search",
    dataType: "json",
    data:     { 
      q:    artistName,
      type: searchType
    }
  })
  .done(loadAlbumsListSuccess)
  .error(loadAlbumsListError);
};

;$(document).on("ready", function(){
  var $btnSearch  =  $("#btn-search");

  // Adding click evento to btn-search element
  $btnSearch.on("click", function(){
    var $txtArtistName   = $("#txt-artist-name");
    loadAlbumsList($txtArtistName.val(), "album");
  })

});
