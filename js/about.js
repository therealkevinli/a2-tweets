var arr = [];

var earliest_time = new Date(Date.UTC(2018, 9, 29, 3, 0, 0));
var latest_time = new Date(Date.UTC(2018, 9, 29, 3, 0, 0));

var completedEventsNum = 0;
var liveEventsNum = 0;
var achievementsNum = 0;
var miscNum = 0;
var writtenNum = 0;
var totalNum = 0;


function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	$('#numberTweets').text(tweet_array.length);
	totalNum = tweet_array.length;
	//TODO: remove these
	
	// $('#firstDate').text(earliest_tweet.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
	// $('#lastDate').text(latest_tweet.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

	// console.log(earliest_tweet);
	var earliest_time = tweet_array[0].time;
	var latest_time = tweet_array[0].time;
	var count = 0;
	
	for (var i = 0; i< tweet_array.length; i++){
		tweet = tweet_array[i];
		if (tweet.time.getTime() < earliest_time.getTime()){
			earliest_time = tweet.time;
			// console.log(earliest_time);
		}
		else if (tweet.time.getTime() > latest_time.getTime()){
			latest_time = tweet.time;
			// console.log(latest_time);
		}
		else {
			// window.alert('this is the ' + count + ' time');
			arr.push(count);
		}
		count += 1;
	}

	//I could make this more efficient and put it in the tweet time
	//loop but that would make it hard to read
	//this loop is to update index.html for categories
	for (var i = 0; i< tweet_array.length; i++){
		tweet = tweet_array[i];
		if (tweet.source == 'achievement'){
			achievementsNum += 1;
		}
		else if (tweet.source == 'completed_event'){
			completedEventsNum += 1;
			if (tweet.written){
				writtenNum += 1;
			}
		}
		else if (tweet.source == 'live_event'){
			liveEventsNum += 1;
		}
		else if (tweet.source == 'miscellaneous'){
			miscNum += 1;
		}
		//count += 1;
	}
	// window.alert(earliest_time);
	// window.alert(latest_time);
	//Updating the first and last dates
	$('#firstDate').text(earliest_time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
	$('#lastDate').text(latest_time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

	document.getElementsByClassName('completedEvents')[0].innerHTML = completedEventsNum;
	document.getElementsByClassName('miscellaneous')[0].innerHTML = miscNum;
	document.getElementsByClassName('achievements')[0].innerHTML = achievementsNum;
	document.getElementsByClassName('liveEvents')[0].innerHTML = liveEventsNum;

	document.getElementsByClassName('completedEvents')[1].innerHTML = completedEventsNum;
	document.getElementsByClassName('written')[0].innerHTML = writtenNum;

	document.getElementsByClassName('completedEventsPct')[0].innerHTML = math.format(completedEventsNum/totalNum * 100,  {notation: 'fixed', precision: 2}) + '%';
	document.getElementsByClassName('miscellaneousPct')[0].innerHTML = math.format(miscNum/totalNum * 100,  {notation: 'fixed', precision: 2}) + '%';
	document.getElementsByClassName('achievementsPct')[0].innerHTML = math.format(achievementsNum/totalNum * 100,  {notation: 'fixed', precision: 2}) + '%';
	document.getElementsByClassName('liveEventsPct')[0].innerHTML = math.format(liveEventsNum/totalNum * 100,  {notation: 'fixed', precision: 2}) + '%';

	document.getElementsByClassName('writtenPct')[0].innerHTML = math.format(writtenNum/totalNum * 100,  {notation: 'fixed', precision: 2}) + '%';

}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});
