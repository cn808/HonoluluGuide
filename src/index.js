var Alexa = require('alexa-sdk');
var http = require('http');

var states = {
    SEARCHMODE: '_SEARCHMODE',
    TOPFIVE: '_TOPFIVE',
};

var location = "Honolulu";

var numberOfResults = 3;

var APIKey = "Provide your own";

var welcomeMessage = location + " Guide. You can ask me for an attraction, the local news, or  say help. What will it be?";

var welcomeRepromt = "You can ask me for an attraction, the local news, or  say help. What will it be?";

var locationOverview = "Honolulu is located on the island of Oahu, one of the eight islands within the Hawaiian island chain. With an estimated 351,792 residents as of 2016, Honolulu is the largest city in the state of Hawaii. Located in the Pacifics Ocean, Honolulu is the most remote city of its size in the world. What else would you like to know?";

var HelpMessage = "Here are some things you  can say: Give me an attraction. Tell me about " + location + ". Tell me the top five things to do. Tell me the local news.  What would you like to do?";

var moreInformation = "See your  Alexa app for  more  information."

var tryAgainMessage = "please try again."

var noAttractionErrorMessage = "There was an error finding this attraction, " + tryAgainMessage;

var topFiveMoreInfo = " You can tell me a number for more information. For example open number one.";

var getMoreInfoRepromtMessage = "What number attraction would you like to hear about?";

var getMoreInfoMessage = "OK, " + getMoreInfoRepromtMessage;

var goodbyeMessage = "OK, have a nice time in " + location + ".";

var newsIntroMessage = "These are the " + numberOfResults + " most recent " + location + " headlines, you can read more on your Alexa app. ";

var hearMoreMessage = "Would you like to hear about another top thing that you can do in " + location +"?";

var newline = "\n";

var output = "";

var alexa;

var attractions = [
	{ name: "Pearl Harbor Historic Site", content: "Located within 6 miles west of downtown Honolulu. Much of Pearl Harbor and surrounding lands is a United States Navy deep-water naval base. It is also the headquarters of the United States Pacific Fleet. Famous for The attack on Pearl Harbor incident by the Empire of Japan on December 7, 1941.  Which swiftly prompted the United States to enter into World War Two.", location: "1 Arizona Memorial Road, Honolulu, Hawaii 96818", contact: "808 454 1434" },
    { name: "Sea Life park", content: "A marine mammal park, bird sanctuary and aquarium found on East side Oahu. The park includes activies such as swimming with dolphins, sea lions, and rays, taking a sea safari in the aquarium, and feeding the sea turtles.", location: "41-202 Kalanianaole Highway, Waimanalo, Hawaii 96795", contact: "808 259 2500" },
    { name: "Iolani Palace", content: "Located in the capital district of downtown Honolulu. The Palace was once the royal residence of the rulers of the Kingdom of Hawaii. Currently registered as a National Historic Landmark. Iolani Palace have the unique distinction of being the only former royal palace on U S soil, since Hawaii was annexed by the United States in 1898.", location: "364 South King Sreet, Honolulu, Hawaii 96813", contact: "808 522 0822" },
    { name: "Bishop Museum", content: "Designated as the Hawaii State Museum of Natural and Cultural History, Bishop Museum is located in the historic Kalihi district of Honolulu.", location: "1525 Bernice Sreet, Honolulu, Hawaii 96817", contact: "808 847-3511" },
    { name: "Diamond Head", content: "A National Natural Monument located minutes from downtown Honolulu. Diamond Head provides a trail that leads visitors to the summit of this volcanic tuff cone and former fort with panoramic views. Diamond Head's name was given by British sailors in the 19th century, who mistook calcite crystals on the adjacent beach for diamonds.", location: "Honolulu, Hawaii 96815", contact: "808 587 0300" }
];

var topFive = [
    { number: "1", caption: "Enjoy the world famous Waikiki", more: "Waikiki is a beachfront neighborhood of Honolulu, on the south shore of the island of Oahu.  Famous for its beach walk, as well as an overabundance of entertainment and activities.  Waikiki is a must go location for first time visitors to Hawaii.", location: "Beach Walk, Honolulu, Hawaii 96815", contact: "Not available"  },
	{ number: "2", caption: "See the USS Arizona Memorial and experience the history", more: "A 184-foot memorial honoring the 2,388 Americans who died during the Japanese attack on Pearl Harbor", location: "1 Arizona Memorial Road, Honolulu, Hawaii 96818", contact: "808 454 1434"  },
    { number: "3", caption: "Breathe in the culture of the Pacifics", more: "Polynesian Cultural Center is a themed park and living museum located in Laie, on the northern shore of Oahu. Inside the center there are eight simulated tropical villages, performers demonstrate various arts and crafts from throughout Polynesia.", location: "55-370 Kamehameha Highway, Laie, Hawaii 96762", contact: "800 367 7060" },
    { number: "4", caption: "Enjoy a scenic hike of the island", more: "Manoa Falls is a waterfall located in the Manoa Valley in Honolulu. It is located in the Manoa Falls Trail which is a 1.6 mile trail, which eventually lead up to the 150 foot waterfall.  The trail is beginner friendly, and it's a great way to enjoy one of Hawaii's many natural beauties.", location: "End of Manoa Road, Honolulu, Hawaii 96822", contact: "Not available" },
    { number: "5", caption: "Visit the Pali Lookout", more: "Pali, meaing cliff in Hawaiian. Is well known for strong tradewinds, forming a natural wind tunnel of sorts. It was here in 1795 that Kamehameha The Great conquered the island of Oahu in one of the bloodiest battles in Hawaiian history. More than 400 Hawaiian soldiers were driven off the edge of the cliff to their deaths 1,000 feet below", location: "5 mile drive northeast of Downtown Honolulu", contact: "Not available" }
];

var topFiveIntro = "Here are the top five things to  do in " + location + ".";

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        output = welcomeMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getTopFiveIntent': function(){
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
	'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
	'getNewsIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getNewsIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
};

var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'getOverview': function () {
        output = locationOverview;
        this.emit(':askWithCard', output, location, locationOverview);
    },
    'getAttractionIntent': function () {
        var cardTitle = location;
        var cardContent = "";

        var attraction = attractions[Math.floor(Math.random() * attractions.length)];
        if (attraction) {
            output = attraction.name + " " + attraction.content + newline + moreInformation;
            cardTitle = attraction.name;
            cardContent = attraction.content + newline + attraction.contact;

            this.emit(':tellWithCard', output, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage, tryAgainMessage);
        }
    },
    'getTopFiveIntent': function () {
        output = topFiveIntro;
        var cardTitle = "Top Five Things To See in " + location;

        for (var counter = topFive.length - 1; counter >= 0; counter--) {
            output += " Number " + topFive[counter].number + ": " + topFive[counter].caption + newline;
        }
        output += topFiveMoreInfo;
        this.handler.state = states.TOPFIVE;
        this.emit(':askWithCard', output, topFiveMoreInfo, cardTitle, output);
    },
    'AMAZON.YesIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.NoIntent': function () {
        output = HelpMessage;
        this.emit(':ask', HelpMessage, HelpMessage);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'getNewsIntent': function () {
        httpGet(location, function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by New York Times\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = newsIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.response.docs.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData.response.docs[i].headline.main;
                        var index = i + 1;

                        output += " Headline " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " See your Alexa app for more information.";
            }

            var cardTitle = location + " News";

            alexa.emit(':tellWithCard', output, cardTitle, cardContent);
        });
    },

    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

var topFiveHandlers = Alexa.CreateStateHandler(states.TOPFIVE, {
    'getAttractionIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getAttractionIntent');
    },
    'getOverview': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getOverview');
    },
    'getTopFiveIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getTopFiveIntent');
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },

    'getMoreInfoIntent': function () {
        var slotValue = this.event.request.intent.slots.attraction.value;
        var index = parseInt(slotValue) - 1;

        var selectedAttraction = topFive[index];
        if (selectedAttraction) {

            output = selectedAttraction.caption + ". " + selectedAttraction.more + ". " + hearMoreMessage;
            var cardTitle = selectedAttraction.name;
            var cardContent = selectedAttraction.caption + newline + newline + selectedAttraction.more + newline + newline + selectedAttraction.location + newline + newline + selectedAttraction.contact;

            this.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        } else {
            this.emit(':ask', noAttractionErrorMessage);
        }
    },

    'AMAZON.YesIntent': function () {
        output = getMoreInfoMessage;
        alexa.emit(':ask', output, getMoreInfoRepromtMessage);
    },
    'AMAZON.NoIntent': function () {
        output = goodbyeMessage;
        alexa.emit(':tell', output);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
    },

    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers, startSearchHandlers, topFiveHandlers);
    alexa.execute();
};

// Create a web request and handle the response.
function httpGet(query, callback) {
  console.log("/n QUERY: "+query);

    var options = {
      //http://api.nytimes.com/svc/search/v2/articlesearch.json?q=seattle&sort=newest&api-key=
        host: 'api.nytimes.com',
        path: '/svc/search/v2/articlesearch.json?q=' + query + '&sort=newest&api-key=' + APIKey,
        method: 'GET'
    };

    var req = http.request(options, (res) => {

        var body = '';

        res.on('data', (d) => {
            body += d;
        });

        res.on('end', function () {
            callback(body);
        });

    });
    req.end();

    req.on('error', (e) => {
        console.error(e);
    });
}

String.prototype.trunc =
      function (n) {
          return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
      };
