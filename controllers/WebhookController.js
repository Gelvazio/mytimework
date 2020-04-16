const Webhook = require('../models/Webhook');

module.exports = {

    async ping(req, res) {
        return res.json({ webhook: "dados do webhook", data: new Date()});
    },

    async index(req, res) {
        var url =  "https://mytimework.herokuapp.com/webhook";

        const webhooks = await Webhook.find({ url : url });

        return res.json(webhooks);
    },

    async store_old(req, res) {
        var descricao = "Webhook de testes";
        var url = "https://mytimework.herokuapp.com/webhook";
        var data_inicial = new Date();
        var data_final = new Date();

        webhook = await Webhook.create({ descricao,
                                         url,
                                         data_inicial,
                                         data_final
                                        });
        return res.json({ webhook });
    },

    async store(req, res) {
        var body = req.body;
        var query = req.query;
        var headers = req.headers; 

        var descricao = "Webhook de testes";
        var url =  "https://mytimework.herokuapp.com/webhook";
        var data = new Date();        

        webhook = await Webhook.create({
                                            descricao,        
                                            url,
                                            data,
                                            body : JSON.stringify(body),
                                            query : JSON.stringify(query),
                                            headers : JSON.stringify(headers)
                                        });
        return res.json({ webhook });
    },

    async excluiAll(req, res) {
        const apagou = await Webhook.remove({});        
        return res.status(200).json({ sucesso: 'Todos Webhooks apagados!'});        
    },

    async dialogflow(req, res) {
        function atendimento_preco(){
            var d = new Date();
            var n = d.getSeconds();
            var s = n * 1.5;

            agent.add(`O preço das nossas consultas variam de R$` + n + ' até R$' + z);
        }

        //return res.json({ webhook: "dados do webhook", data: new Date()});

        // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
        // for Dialogflow fulfillment library docs, samples, and to report issues
        'use strict';
        
        const functions = require('firebase-functions');
        const { WebhookClient } = require('dialogflow-fulfillment');
        const { Card, Suggestion } = require('dialogflow-fulfillment');
        
        process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
        
        exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
            const agent = new WebhookClient({ request, response });
            console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
            console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
            
            function welcome(agent) {
                agent.add(`Welcome to my agent!`);
            }
            
            function fallback(agent) {
                agent.add(`I didn't understand`);
                agent.add(`I'm sorry, can you try again?`);
            }

            // // Uncomment and edit to make your own intent handler
            // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
            // // below to get this function to be run when a Dialogflow intent is matched
            // function yourFunctionHandler(agent) {
            //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
            //   agent.add(new Card({
            //       title: `Title: this is a card title`,
            //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
            //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
            //       buttonText: 'This is a button',
            //       buttonUrl: 'https://assistant.google.com/'
            //     })
            //   );
            //   agent.add(new Suggestion(`Quick Reply`));
            //   agent.add(new Suggestion(`Suggestion`));
            //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
            // }

            // // Uncomment and edit to make your own Google Assistant intent handler
            // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
            // // below to get this function to be run when a Dialogflow intent is matched
            // function googleAssistantHandler(agent) {
            //   let conv = agent.conv(); // Get Actions on Google library conv instance
            //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
            //   agent.add(conv); // Add Actions on Google library responses to your agent's response
            // }
            // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
            // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

            // Run the proper function handler based on the matched Dialogflow intent name
            let intentMap = new Map();
            intentMap.set('Default Welcome Intent', welcome);
            intentMap.set('Default Fallback Intent', fallback);
            // intentMap.set('your intent name here', yourFunctionHandler);
            // intentMap.set('your intent name here', googleAssistantHandler);
            agent.handleRequest(intentMap);
        });        
    }
};