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

    const message = `Love is like Emmental cheese slices cheesy feet. Melted cheese port-salut blue castello 
    say cheese cheese strings paneer halloumi chalk and cheese. Lancashire who moved my cheese cheese 
    triangles the big cheese squirty cheese the big cheese squirty cheese lancashire. Boursin swiss cheesy 
    grin chalk and cheese jarlsberg fromage chalk and cheese feta. Queso goat brie dolcelatte cheese on 
    toast dolcelatte danish fontina cheese and biscuits. Cream cheese cheese strings chalk and cheese pepper 
    jack melted cheese caerphilly bavarian bergkase ricotta. Cheese and wine the big cheese jarlsberg
     emmental ricotta stinking bishop cheese and biscuits port-salut. Edam babybel mozzarella cream cheese

       mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper 
       chantey doubloon starboard grog black jack gangway rutters.
       Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. 
       Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account 
       lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom 
       heave to.
       Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank 
       crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas 

       morbo vel maleficia? De Apocalypsi undead dictum mauris. Hi mortuis soulless creaturas, imo monstra
        adventus vultus comedat cerebella viventium. Qui offenderit rapto, terribilem incessu. The voodoo 
        sacerdos suscitat mortuos comedere carnem. Search for solum oculi eorum defunctis cerebro. Nescio an 
        Undead zombies. Sicut malus movie horror.`;
        

    const mailOptions = {
        from: USER_EMAIL,
        to: MAIL_TO,
        subject: 'Dream Come True',
        html: `<p>${message}</p>`,
    };

    return transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return (error.toString());
        }
        return ({ success: true });
    });

}