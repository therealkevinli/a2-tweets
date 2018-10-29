function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});


	// getting the top activities 
	var trackActivities = [];

	for (var i = 0; i< tweet_array.length; i++){
		
		tweet = tweet_array[i];
		if (trackActivities[tweet.activityType] > 0 ){
			trackActivities[tweet.activityType] += 1;
		}

		else {
			trackActivities[tweet.activityType] = [1];
		}
		//count += 1;
	}

	var sorted = trackActivities.sort(function(a, b) {
    	return parseFloat(b) - parseFloat(a);
	});

	console.log(sorted.slice(0,3))



	// activity_vis_spec = {
	//   "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	//   "description": "A graph of the number of Tweets containing each type of activity.",
	//   "data": {
	//     "values": tweet_array
	//   }
	//   //TODO: Add mark and encoding
	// };

	// activity_vis_spec = {
	//   "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
	//   "description": "A scatterplot showing horsepower and miles per gallons.",
	//   "data": {"url": "https://vega.github.io/vega-datasets/data/cars.json"},
	//   "mark": "point",
	//   "encoding": {
	//     "x": {"field": "Horsepower", "type": "quantitative"},
	//     "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
	//     "color": {"field": "Origin", "type": "nominal"},
	//     "shape": {"field": "Origin", "type": "nominal"}
	//   }
	// };

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
	  "description": "A scatterplot showing distance and days.",
	  "data": {"values": tweet_array},
	  "mark": "point",
	  "encoding": {
	    "x": {"field": "Days", "type": "quantitative"},
	    "y": {"field": "Distance", "type": "quantitative"},
	    "color": {"field": "Origin", "type": "nominal"},
	    "shape": {"field": "Origin", "type": "nominal"}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});
