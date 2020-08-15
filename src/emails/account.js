const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to : email,
        from : 'pankajy330@gmail.com',
        subject : 'thanks for joining',
        text : `Welcome to the app ${name}`,
    })
}

const sendCancelationEmail = (email, name)=>{
    sgMail.send({
        to : email,
        from : 'pankajy330@gmail.com',
        subject : 'thanks for joining',
        text : `sorry to the app ${name}`,
    })
}

module.exports = {
    sendWelcomeEmail : sendWelcomeEmail,
    sendCancelationEmail : sendCancelationEmail
}