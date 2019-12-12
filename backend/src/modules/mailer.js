const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const { mailer } = require('../.env');

const transport = nodemailer.createTransport(mailer);

const handlebarOptions = {
    viewEngine: {
        extName: '.html',
        defaultLayout: null,
        partialsDir: path.join('./src/resources/mail'),
        layoutsDir: path.join('./src/resources/mail'),
    },
    viewPath: path.join('./src/resources/mail'),
    extName: '.html',
}

transport.use('compile',hbs(handlebarOptions));

// transport.use('compile', hbs({
//     viewEngine: 'handlebars',
//     viewPath: path.resolve('./src/resources/mail'),
//     extName: '.html'
// }))

module.exports = transport;