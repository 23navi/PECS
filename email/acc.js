

//npm i @sendgrid/mail

const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY);




  const sendNotification=(emailId,action,user)=>{

    const msg = {
      to: emailId, 
      from: 'surekanavi@gmail.com', 
      subject: `Request from ${user}`,
      html: `<strong>${user} wants to have ${action}</strong>`,
    }
    sgMail
      .send(msg)
      .then(() => {
       console.log('Email sent')
    })
      .catch((error) => {
       console.error(error)
    })
  }



  module.exports={
    sendNotification
  }