
import model from '../models';

const Group = model.Group;
const Message = model.Message;
const User = model.User;
const GroupUsers = model.GroupUsers;

export default {

  CreateGroup(req, res){
    Group.create({
      groupName: req.body.groupName,
      description: req.body.description
    })
    .then( (data) =>{ 
      let result = {
        'Group Name': data.groupName,
        Description: data.description
      };
      res.status(201).send(result);})
    .catch( (error) => res.status(401).send(error.messgage));
  }, //end of create group

  list(req, res){
    Group.findAll({
      include: [{
        model: Message,
        as: 'groupMessages'},
      {
        model: User,
        as: 'usersOfThisGroup'
      }] 
    })
    .then( (data) =>{ 
      let results = [] ;
      let body = [];
      data.forEach( (group) => {  
        let result = {
          'Group Name': group.groupName,
          Description: group.description,
        };
        group.groupMessages.map((msg)=>{ //used forEach in user controller
          body.push(msg.messageBody);
        });
        result['Group Mssages'] = body;
        body = [];
        group.usersOfThisGroup.map((usr)=>{
          body.push(usr.userName);
        });
        result['Group Users'] = body;
        body = [];
        results.push(result);
      }); //end of forEach
      res.status(201).send(results);})
    .catch( (error) => res.status(401).send(error));
  }, //end of list function

  addUser(req, res){
    Group.findById(req.params.id)
    .then((foundGroup) => {
      if(!foundGroup){
        res.send({message: 'Group Not Found'});
      }else{
        foundGroup.addUsersOfThisGroup(req.body.userid); //i used magic method 'addAlias' as-is in model definition
        GroupUsers.create({
          groupid: req.params.id,
          userid: req.body.userid
        });//end of GroupUsers 
        res.status(201).send({message: 'User added to Group succesfully'});} //end of else statement
    }) //end of then function
    .catch(error => res.status(401).send(error));
  }, //end of property addUser
}; //end of export default