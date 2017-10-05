
import model from '../models';

const Message = model.Message;
const Group = model.Group;

export default {

  createMessage(req, res){
    Message.create({
      messageBody: req.body.messageBody, 
      messageOwner: req.body.messageOwner,
      groupId: req.body.groupId
    })
    .then( (data) => {
      let result = {
        'Message Text': data.messageBody,
        'Owner of Message': data.messageOwner,
        'Group ID': data.groupId 
      };
      res.status(201).send(result);})
    .catch( (error) => res.status(401).send(error));
  }, //end of function create message

  list(req, res){
    Message.findAll({
      include: [{
        model: Group,
        as: 'groupMess'
      }]
    })
    .then( data => {
      let results = [];
      data.forEach( (msg)=> {
        let result = {
          'Message Text': msg.messageBody,
          'Owner of Message': msg.messageOwner,
          'Group Name': msg.groupMess
        };
        results.push(result);
      });
      res.status(201).send(results);})
    .catch( (error) => res.status(401).send(error));
  }, //end of function list
}; //end of export default