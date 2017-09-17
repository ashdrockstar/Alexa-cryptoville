var farms = {
    "apple": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Apricot": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Avacado": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Banana": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Cherry": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Citrus": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Coconut": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "DragonFruit": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Durian": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Grapes": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Kiwi": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Melon": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Orange": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Papaya": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Pear": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Pineapple": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Plum": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Pomegranate": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Raspberry": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Strawberry": {
        "property": "sweet and healthy",
        "price" : "$10"
    },
    "Watermelon": {
        "property": "sweet and healthy",
        "price" : "$10"
    }
}
// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your price's application ID to
         * prevent someone else from configuring a price that sends requests to this function.
         */

    if (event.session.application.applicationId !== "amzn1.ask.price.2484e6dd-48bd-4723-9b76-901cd0137e29") {
        // context.fail("Invalid Application ID");
     }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    // add any session init logic here
}

/**
 * Called when the user invokes the price without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this price.
 */
function onIntent(intentRequest, session, callback) {

    var intent = intentRequest.intent
    var intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here

    if (intentName == "FarmIntent")
    {
        handleFarmResponse(intent,session,callback)
    }else if(intentName == "AMAZON.YesIntent"){
        handleYesResponse(intent,session,callback)
    }else if(intentName == "AMAZON.NoIntent"){
        handleNoResponse(intent,session,callback)
    }else if(intentName == "AMAZON.HelpIntent"){
        handleGetHelpRequest(intent,session,callback)
    }else if(intentName == "AMAZON.StopIntent"){
        handleFinishSessionRequest(intent,session,callback)
    }else if(intentName == "AMAZON.CancelIntent"){
        handleFinishSessionRequest(intent,session,callback)
    }else{
        throw "Invalid Intent"
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the price returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {

}

// ------- price specific logic -------

function getWelcomeResponse(callback) {
    var speechOutput = "Welcome to CryptoVille. I can tell you about available price for each produce. Such as "+
    "Apple, Avocado, Banana, Cherry and Coconut. Tell me which produce do you want to choose?"
    var reprompt = "Which produce are you interested in?"
    var header = "Farm facts"
    var shouldEndSession = false
    var sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt,

    }

    callback(sessionAttributes,buildSpeechletResponse,speechOutput,reprompt,shouldEndSession)
}

 function handleFarmResponse(intent,session,callback){
    var farm = intent.slots.LIST_OF_FRUITS.value
    // farm = "apple"

    if(!farms[farm])
    {
        var speechOutput = farm+" That Produce is not available. Try asking about another like Apple, Avocado, Banana, Cherry and Coconut."
        var reprompt = "Try asking about another Produce."
        var header = "Not available."
    }
    else
    {
        var property = farms[farm].property
        var price = farms[farm].price
        var speechOutput = farm+" "+property+" and "+price+". Do you want to continue?"
        var repromptText = farm

    }

    var shouldEndSession = false
    callback(session.attributes, buildSpeechletResponse(header, speechOutput, repromptText, shouldEndSession))
 }

function handleYesResponse(intent,session,callback) {
    var speechOutput = "Great! which produce? Apple, Avocado, Banana, Cherry and Coconut."
    var repromptText = speechOutput
    var shouldEndSession = false
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput,repromptText,shouldEndSession))
}

function handleNoResponse(intent,session,callback) {
    handleFinishSessionRequest(intent,session.attributes,callback)
    var speechOutput = ""
    var repromptText = speechOutput
    var shouldEndSession = false
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput,repromptText,shouldEndSession))
}

function handleGetHelpRequest(intent, session, callback) {
    
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }
    var speechOutput =  "I can tell the prices of Apple, Avocado, Banana, Cherry and Coconut. Which Produce do you want?"
    var repromptText = speechOutput
    var shouldEndSession = false
    callback(session.attributes,buildSpeechletResponseWithoutCard(speechOutput,repromptText,shouldEndSession))
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye! Thank for using CryptoVille!", "", true));
}


// ------- Helper functions to build responses for Alexa -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };

function capitalizerFirst(s){
    s.charAt(0).toUpperCase() + s.slice(1)
}
}