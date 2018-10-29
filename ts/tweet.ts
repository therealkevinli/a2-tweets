class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

    //write rules for categroizing tweets for part 1
	//returns either 'live_event', 'achievement', 
    //'completed_event', or 'miscellaneous'
    get source():string {
        //write rules for categroizing tweets for part 1
        // let firstSixteen: string = this.text.substring(0,16);
        var firstSixteen = this.text.substring(0,16);
        let firstThirteen: string = this.text.substring(0,13);

        if(this.text.substr(0,8) == 'Achieved'){
            return "achievement";
        }

        // else if(firstSixteen == "Just posted a" || firstThirteen == "Just completed a"){
        //     return "completed_event";
        // }


        else if(this.text.substring(0,16) == "Just completed a"|| firstThirteen == "Just posted a"){
            return 'completed_event';
        }
        else if(this.text.substr(0,9) == 'Watch my '){ //element 17zzzzzzzzzzz
            return "live_event";
        }        
        // if (this.text == '' ){
        else{
            return "miscellaneous";
        }
        //return "unknown";
    }

    //write rules for categroizing tweets for part 1
    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {

        // if(this.source == "miscellaneous"){
        //     return true;
        // }

        // else{
        //     return false;
        // }

        if(this.source == "completed_event"){
            if (this.text.includes(' - ')){
                // probably has user written text
                // tweet 132 is an example
                return true;
            }
        }

        return false;

        //TODO: identify whether the tweet is written
    }

    //write rules for categroizing tweets for part 1
    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        // example from tweet number 132
        var writtenPart = this.text.split(' - ')[1];
        return writtenPart;
        //return "";
    }

    //First one to write in part 2
    //Only identify these values for completed tweets

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return this.text.split(' ')[5]
    }

    //second one to write in part 2

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        // convert everything to km
        if (this.text.split(' ')[4] == 'mi'){
            return parseFloat('this.text') * 1.609;
        }
        else{
            //Everything else will be in km anyways
            return parseFloat('this.text');    
        }
        
        //return this.text.split(' ')[5];
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}


// testingForLoop

// for(var i = 0; i< 10; i++){
//     console.log(tweet_array[i].text.substring(0,16));
//     if (tweet_array[i].text.substring(0,16) == 'Just completed a'){
//         console.log(true);
//     }
// }
