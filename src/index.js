'use strict';

/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */
var unirest = require('unirest');

var farms = {
    "apple": {
        "personality_trait": "Apples are extremely rich in important antioxidants, flavanoids, and dietary fiber.",
         "price" : "$7",
        "state" : "Florida","reason" : "There is a price rise to decrease the impact of hurrican irma and help the farmers living in Florida."
},
    "apricot": {
        "personality_trait": "Apricot is rich in vitamins like beta-carotene, Vitamin A, C, E and K.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "avacado": {
        "personality_trait": "Also known as an alligator pear or butter fruit, the versatile avocado is the only fruit that provides a substantial amount of healthy monounsaturated fatty acids (MUFA).",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "banana": {
        "personality_trait": "It is loaded with essential vitamins and minerals such as potassium, calcium, manganese, magnesium, iron, folate, niacin, riboflavin, and B6.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "cherry": {
        "personality_trait": "The antioxidant activity of tart cherries was found superior to that of vitamin E and comparable to commercially available antioxidant products",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "citrus": {
        "personality_trait": "Citrus fruits have the advantage of containing several different antioxidants that may help prevent a range of health concerns, from cardiovascular disease and cancer to skin damage from sunlight",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "coconut": {
        "personality_trait": "Coconut milk is produced by mixing or blending the flesh or meat of the fruit and the water. ",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "dragonFruit": {
        "personality_trait": "Rich in antioxidants, they contain vitamin C (equivalent to 10 percent of the daily value), polyunsaturated (good) fatty acids, and several B vitamins for carbohydrate metabolism, as well as carotene and protein.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "durian": {
        "personality_trait": "It contains vitamin C, folic acid, thiamin, riboflavin, niacin, B6 and vitamin A.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "grapes": {
        "personality_trait": "Grapes contain powerful antioxidants known as polyphenols, which may slow or prevent many types of cancer, including esophageal, lung, mouth, pharynx, endometrial, pancreatic, prostate and colon.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "kiwi": {
        "personality_trait": "Their green flesh is sweet and tangy. It's also full of nutrients like vitamin C, vitamin K, vitamin E, folate, and potassium.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "melon": {
        "personality_trait": "The high content of carotenoids in melon fruit can prevent cancer and lower the risk of lung cancer.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "orange": {
        "personality_trait": "One orange provides a range of vitamins and minerals. a staggering 130 percent of your vitamin C needs for the day.",
         "price" : "$3",
 "state" : "NY","reason" : ""
},
    "papaya": {
        "personality_trait": "Zeaxanthin, an antioxidant found in papaya, filters out harmful blue light rays. ",
         "price" : "$2.45",
 "state" : "Ohio","reason" : ""
},
    "pear": {
        "personality_trait": "One pear contains up to 11 percent of our daily recommended intake of vitamin C and 9.5 percent of our daily recommended intake of copper.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
     "pineapple": {
        "personality_trait": "Pineapples may help in a range of conditions, including asthma and diabetes.",
         "price" : "$3",
 "state" : "California",

},
     "plum": {
        "personality_trait": "Yummy, succulent plums only have 46 calories per 100 g, contain no saturated fats and are full of minerals and vitamins.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "pomegranate": {
        "personality_trait": "Pomegranates have anti-oxidant, anti-viral and anti-tumor properties and are said to be a good source of vitamins, especially vitamin A, vitamin C, and vitamin E, as well as folic acid. ",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "raspberry": {
        "personality_trait": "Red Raspberries contain strong antioxidants such as Vitamin C, quercetin and gallic acid that fight against cancer, heart and circulatory disease and age-related decline.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "strawberry": {
        "personality_trait": "The red coloring contains anthocyanins, which stimulate the burning of stored fat.",
         "price" : "$10",
 "state" : "NY","reason" : ""
},
    "watermelon": {
        "personality_trait": "Watermelons are mostly water about 92 percent but this refreshing fruit is soaked with nutrients.",
        "price" : "$10",
        "state" : "NY"
    }
}


// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to the CryptoVille Farms. A universal platform to sell or buy agricultural goods without any human interference.';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Which Produce would you like to know about?';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you very much for visiting us!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createFavoriteColorAttributes(favoriteColor) {
    return {
        favoriteColor,
    };
}


/*
Sets fruits
*/
function SetProduceIntent(intent, session, callback) {
    


    const cardTitle = intent.name;
    const farm = intent.slots.LIST_OF_FRUITS.value;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = 'We have an Error';
    if(farms[farm]){
   
       speechOutput = `Sharing information about ${farm}. ${farms[farm].personality_trait}. `

    +`Current Price, ${farms[farm].price}. Available in ${farms[farm].state} state.`

    if(farms[farm].reason != undefined) 
       speechOutput= speechOutput + `${farms[farm].reason}`;
        
            repromptText = "What else do you want to know?";


            callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }
    

// var speechOutput = "We have error"

// unirest.post('http://mockbin.com/request')
// .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
// .send({ "parameter": 23, "foo": "bar" })
// .end(function (response) {
//   speechOutput = response.body;
// });

//   callback(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function setColorInSession(intent, session, callback) {
    const cardTitle = intent.name;
    const favoriteColorSlot = intent.slots.Color;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (favoriteColorSlot) {
        const favoriteColor = favoriteColorSlot.value;
        sessionAttributes = createFavoriteColorAttributes(favoriteColor);
        speechOutput = `I now know your favorite color is ${favoriteColor}. You can ask me ` +
            "your favorite color by saying, what's my favorite color?";
        repromptText = "You can ask me your favorite color by saying, what's my favorite color?";
    } else {
        speechOutput = "I'm not sure what your favorite color is. Please try again.";
        repromptText = "I'm not sure what your favorite color is. You can tell me your " +
            'favorite color by saying, my favorite color is red';
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getColorFromSession(intent, session, callback) {
    let favoriteColor;
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = false;
    let speechOutput = '';

    if (session.attributes) {
        favoriteColor = session.attributes.favoriteColor;
    }

    if (favoriteColor) {
        speechOutput = `Your favorite color is ${favoriteColor}. Goodbye.`;
        shouldEndSession = true;
    } else {
        speechOutput = "I'm not sure what your favorite color is, you can say, my favorite color " +
            ' is red';
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName == 'ProduceIntent'){
        SetProduceIntent(intent, session, callback);
    }
    else if (intentName === 'MyColorIsIntent') {
        setColorInSession(intent, session, callback);
    } else if (intentName === 'WhatsMyColorIntent') {
        getColorFromSession(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};
