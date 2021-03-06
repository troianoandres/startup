define([
	'underscore',
	'backbone',
	'localStorage',
	'models/movie'
], function( _, Backbone, Store, Movie ) {


	var MovieCollection = Backbone.Collection.extend({
		model: Movie,
		localStorage: new Store("movies-backbone")
	});

	/*
	var movies = new MovieCollection();

	var scaryMovie 	=	 new Movie({
		name:"Scary Movie I",
		year: 2000,
		description: "Scary Movie is a 2000 horror comedy spoof film directed by Keenen Ivory Wayans. " + 
		"It is an American dark comedy that heavily parodies the horror, slasher, and mystery genres. " +
		"Several mid- and late-90s films and TV shows are spoofed, especially Scream, along with I Know " +
		"What You Did Last Summer, Buffy the Vampire Slayer, The Sixth Sense, The Usual Suspects, The Matrix," +
		" The Blair Witch Project, and Dawson's Creek.",
		genre: "Comedy",
		runtime: 90,
		image: "http://upload.wikimedia.org/wikipedia/en/2/29/Movie_poster_for_%22Scary_Movie%22.jpg"
	});	
	movies.add( scaryMovie );				
	scaryMovie.save();

	var starWars 	=	 new Movie({
		name:"Star Wars III: Revenge of the Sith",
		year: 2005,
		description: "During a space battle over Coruscant between the Galactic Republic and the Separatist Alliance, " +
		"Jedi Knights Obi-Wan Kenobi and Anakin Skywalker lead a mission to rescue the kidnapped Supreme Chancellor " +
		"Palpatine from Separatist leaders Count Dooku and General Grievous. After infiltrating Grievous' flagship, " +
		"the Jedi engage Dooku in a lightsaber duel, which ends with Anakin killing Dooku at Palpatine's urging. " +
		"Grievous flees the battle-torn cruiser, which the Jedi crash-land on Coruscant. There, Anakin reunites with his wife, " +
		"Padmé Amidala, who reveals she is pregnant. Initially excited, Anakin begins to have premonitions of Padmé dying in " +
		"childbirth.",
		genre: "Sci-Fi",
		runtime: 140,
		image: "http://upload.wikimedia.org/wikipedia/en/thumb/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg/220px-Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg"
	});
	movies.add( starWars );
	starWars.save();

	return movies;
	*/

	return new MovieCollection();
});
