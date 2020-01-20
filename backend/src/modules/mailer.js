require('dotenv/config');

const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

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

transport.use('compile', hbs(handlebarOptions));

// transport.use('compile', hbs({
//     viewEngine: 'handlebars',
//     viewPath: path.resolve('./src/resources/mail'),
//     extName: '.html'
// }))

module.exports = transport;