const nodemailer = require('nodemailer')
const brevoTransport = require('nodemailer-brevo-transport')

//transport
const transporter = nodemailer.createTransport(
     new brevoTransport({
        auth:{
            api_key: process.env.API_BREVO,
        },
    })
);

const sendEmailController = (req,res) => {
    try{
        const {name,email,msg} = req.body

        //validation
        if(!name || !email || !msg){
            return res.status(500).send({
                success: false,
                message:"Please Provide all fields"
            });
            
        }

        //email matter
        transporter.sendMail({
            to:'chouhanpriyam138@gmail.com',
            from:'chouhanpriyam138@gmail.com',
            subject:'Regarding mern portfolio',
            html:`
                <h5>Detail Information</h5>
                <ul>
                <li><p>Name: ${name}</p></li>
                <li><p>Email: ${email}</p></li>
                <li><p>Message: ${msg}</p></li>
                </ul>`
        })
        return res.status(200).send({
            success:true,
            message: "Your message send successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"send email api error",
            error
        })
    }};


module.exports = {sendEmailController};