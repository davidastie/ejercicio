var restify = require('restify');
var builder = require('botbuilder');


// Levantar restify



var server = restify.createServer();


server.listen(process.env.port || process.env.PORT || 3978, function () {

console.log('%s listening to %s', server.name, server.url); 

});



// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.

var connector = new builder.ChatConnector({

appId: '',
appPassword: ''

});


// Ahora utilizamos un UniversalBot

var bot = new builder.UniversalBot(connector);

server.post('/api/messages', connector.listen());


bot.dialog('/', [

function (session) {

builder.Prompts.text(session, '¿Hola, cómo te llamas?');

},

function (session, results) {

let msj = results.response;

session.send(`Hola ${msj}! Bienvenido a ShopBMX`);

session.send("![ShopBMX](http://www.360bs.net/wp-content/uploads/2013/09/default.jpg)");

session.beginDialog('/preguntarLugar');

}

]);

bot.dialog('/preguntarLugar', [

function (session) {

builder.Prompts.text(session, '¿De donde eres?');

},

function (session, results) {

let lugar = results.response;
session.userData.lugar = lugar;

session.send(`Hay buenos lugares para practicar BMX por ${lugar}`);

session.beginDialog('/deporte');


}

]);

bot.dialog('/deporte', [

function (session) {

builder.Prompts.text(session, '¿Te interesa la marca Fiend? es muy buena y gama Pro');

},

function (session, results) {


session.send(`En ${session.userData.lugar} tenemos distribuidores de diferentes marcas`);

session.beginDialog('/compra');

}

]);

bot.dialog('/compra', [

function (session) {

builder.Prompts.text(session, '¿Deseas realizar una compra?');

},

function (session, results) {

session.beginDialog('/lugares');

}

]);

bot.dialog('/lugares', [

function (session) {
    session.send(`Debes enviarnos tus datos personales para enviarlo a ${session.userData.lugar}`);
    builder.Prompts.text(session, 'Demora de 1 a 2 dias');

    
},

function (session, results) {

//let lugares = results.response;

session.beginDialog('/producto2');

}

]);

bot.dialog('/producto2', [

function (session) {
session.send('Ah que bueno, espero lo disfrutes mucho');
builder.Prompts.text(session, 'Si necesitas algun otro producto o repuesto no dudes en contactarno');

},

function (session, results) {

let lugares = results.response;

session.beginDialog('/Pormayor');

}

]);

bot.dialog('/Pormayor', [

function (session) {

session.send(session,'Estamos para servirte');
session.send(session, 'Claro, al por mayor te haremos un super descuento');
builder.Prompts.text(session,`Y por esa compra te obsequiamos un producto`);
},

function (session, results) {

let lugares = results.response;

session.beginDialog('/lista');

}

]); 

bot.dialog('/lista', [

function (session) {

session.send( 'Te enviaremos un catalogo con todos los productos disponibles');
session.send( "![lista](https://360bs.files.wordpress.com/2017/02/bvdfg.png?w=480)");
builder.Prompts.text(session,`Nos llegan mas marcas la semana que viene`);

},

function (session, results) {

let lugares = results.response;

session.beginDialog('/pedido');

}

]);

bot.dialog('/pedido', [

function (session) {

builder.Prompts.text(session, 'Ya sabes como es el proceso del envio');

},

function (session, results) {

let lugares = results.response;



session.beginDialog('/reclamo');

}

]);

bot.dialog('/reclamo', [

function (session) {
session.send(`Listo, entonces estaremos en contacto`);
builder.Prompts.text(session, 'Hola! como te fue con el reclamo de los productos');

},

function (session, results) {

session.beginDialog('/gracias');

}

]);

bot.dialog('/gracias', [

function (session) {
session.send(`Excelente`);
session.send( 'Es un placer atenderte, estamos para sevirte');
builder.Prompts.text(session,`Gracias por tu compra`);

},

function (session, results) {

session.cancelDialog('Estamos para servirte')

}

]);