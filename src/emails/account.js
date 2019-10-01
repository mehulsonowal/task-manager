const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to: 'mehulsonowal@gmail.com',
//     from: 'mehulsonowal@gmail.com',
//     subject: 'Hello World from SendGrid',
//     text: 'Hello World!'
// });

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
	to: email,
	from: 'mehulsonowal@gmail.com',
	subject: 'Welcome to Task App!',
	text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });  
};

const sendCancellationEmail = (email, name) => {
    sgMail.send({
	to: email,
	from: 'mehulsonowal@gmail.com',
	subject: 'Task App Cancellation',
	text: `Goodbye, ${name}! Is there anything we can do to make you stay?`
    });  
};

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
};
