/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const STREAM_URL = 'https://n09.radiojar.com/8s5u5tpdtwzuv?rj-ttl=5&rj-tok=AAABmJg84xkAfrrubGMK19tuiA';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        let speakOutput, title, subtitle;
        
        if (locale === 'ar-EG') {
            speakOutput = 'أهلاً وسهلاً بك في إذاعة القرآن الكريم من القاهرة. هذه الإذاعة الحبيبة رافقت أجيال من المؤمنين لعقود طويلة. الآن، أينما كنت، يمكنك الاستماع إلى أصوات الوطن المقدسة. دع التلاوات المباركة من القاهرة تملأ قلبك مرة أخرى.';
            title = 'راديو القرآن الكريم من القاهرة';
            subtitle = 'تلاوة القرآن الكريم من القاهرة';
        } else {
            speakOutput = 'Welcome to إذاعة القرآن الكريم من القاهرة - Cairo Quran Radio. For decades, this beloved station has been the spiritual companion of millions across Egypt and the Arab world. Now, wherever you are, you can reconnect with the sacred sounds of home. Let the timeless recitations from Cairo fill your heart once again.';
            title = 'Cairo Quran Radio 24/7';
            subtitle = 'Holy Quran Recitation from Cairo';
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective('REPLACE_ALL', STREAM_URL, 'cairo-quran-radio-stream', 0, null, {
                title: title,
                subtitle: subtitle,
                art: {
                    sources: [{
                        url: 'https://via.placeholder.com/512x512/1e3a8a/ffffff?text=Cairo+Quran+Radio'
                    }]
                }
            })
            .getResponse();
    }
};

const PlayStreamIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PlaybackAction<object@MusicCreativeWork>' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayRadioIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective('REPLACE_ALL', STREAM_URL, 'cairo-quran-radio-stream', 0, null, {
                title: 'Cairo Quran Radio 24/7',
                subtitle: 'Holy Quran Recitation from Cairo',
                art: {
                    sources: [{
                        url: 'https://via.placeholder.com/512x512/1e3a8a/ffffff?text=Cairo+Quran+Radio'
                    }]
                }
            })
            .getResponse();
    }
};

const PauseStreamIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        let speakOutput, repromptText;
        
        if (locale === 'ar-EG') {
            speakOutput = 'هذه إذاعة القرآن الكريم من القاهرة - الصوت الذي تردد في البيوت المصرية لأجيال. يمكنك قول "شغل" لبدء الاستماع، أو "توقف" لإيقاف الراديو، أو "استمر" لمتابعة الاستماع. تماماً مثل أيام الراديو القديمة في القاهرة، تبدأ الإذاعة تلقائياً عند فتح المهارة. بارك الله فيك وجعل هذه التلاوات المباركة تملأ قلبك سكينة وذكرى الوطن.';
            repromptText = 'ماذا تريد أن تفعل؟';
        } else {
            speakOutput = 'This is إذاعة القرآن الكريم من القاهرة - the voice that has echoed through Egyptian homes for generations. You can say "play" to start listening, "pause" to pause, or "stop" to stop. Just like the old radio days in Cairo, the station starts automatically when you tune in. May these blessed recitations bring you peace and memories of home.';
            repromptText = 'What would you like to do?';
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        let speakOutput;
        
        if (locale === 'ar-EG') {
            speakOutput = 'بارك الله فيك وجعل في ميزان حسناتك. إلى اللقاء، إذاعة القرآن الكريم من القاهرة تودعك. ستبقى الإذاعة هنا دائماً، في انتظار عودتك إلى أصوات الوطن.';
        } else {
            speakOutput = 'May Allah bless you. Until we meet again, إذاعة القرآن الكريم من القاهرة bids you farewell. The station will always be here, ready to welcome you back home.';
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const AudioPlayerEventHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type.startsWith('AudioPlayer.');
    },
    handle(handlerInput) {
        const { requestEnvelope } = handlerInput;
        const audioPlayerEventName = requestEnvelope.request.type.substring('AudioPlayer.'.length);
        
        console.log(`AudioPlayer event: ${audioPlayerEventName}`);
        
        switch (audioPlayerEventName) {
            case 'PlaybackStarted':
                console.log('Playback started');
                break;
            case 'PlaybackFinished':
                console.log('Playback finished');
                break;
            case 'PlaybackStopped':
                console.log('Playback stopped');
                break;
            case 'PlaybackFailed':
                console.log('Playback failed');
                console.log(requestEnvelope.request.error);
                break;
            default:
                break;
        }
        
        return handlerInput.responseBuilder.getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayStreamIntentHandler,
        PauseStreamIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        AudioPlayerEventHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('cairo-quran-radio/v1.0')
    .lambda();