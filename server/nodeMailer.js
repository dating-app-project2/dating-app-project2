const nodemailer = require('nodemailer');
require('dotenv').config();


const { CLIENT_ID, CLIENT_SECRET, USER_EMAIL, REFRESH_TOKEN } =
    process.env;


module.exports = (MAIL_TO) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: USER_EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const message = `Hi! Thank you for signing up to our dating app. We hope you find your soulmate!
    You are signed up to recive updates about our app and notifications of new matches and likes. Enjoy our app!`;

    const message2 = `For any questions or suggestions please contact us at this email. 
    To unsubscribe go to the app settings or click here: `;


    const mailOptions = {
        from: USER_EMAIL,
        to: MAIL_TO,
        subject: "Love is an open door!",
        html: `<p>${message}</p> <p>${message2}</p> <a href='https://youtu.be/DLzxrzFCyOs'>Unsubscribe</a>`,
    };

    return transporter.sendMail(mailOptions, (error) => {
        console.log('nodemailer', { error, info })
        if (error) {
            return (error.toString());
        }
        return ({ success: true });
    });

    //hi

}