const moment = require('moment');


function formatMessage(userName, message) {
      return{
            userName: userName,
            message: message,
            time:moment().format('h:mm a')
      }

}
module.exports= formatMessage;