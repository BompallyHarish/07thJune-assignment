const sgMail = require('@sendgrid/mail')
const SENDGRID_API_KEY = 'Secret_key'

sgMail.setApiKey(SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name, userEmail, userPassword) => {
    sgMail.send({
        to: email,
        from: 'bompallyharish@gmail.com',
        subject: 'New User Joined!',
        text: `New user has joined in the store table here are the details
        Name: ${name},
        Email: ${userEmail},
        Password: ${userPassword}`
    })
}


module.exports = sendWelcomeEmail