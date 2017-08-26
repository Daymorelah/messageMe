
import Promise from 'bluebird';
import db from '../models';

const Group = db.Group;
const Message = db.Message;
const User = db.User;


let groupData = [
  { groupName: 'Family',
    description: 'members of the family' },
  { groupName: 'Church',
    description: 'members of the church' },
  { groupName: 'School',
    description: 'school friends' },
  { groupName: 'Coders',
    description: 'members of the coding community' }
]; //end of groupData's array of objects

let userData = [
  { userName: 'Adewale',
    password: 'walexy',
    email: 'user1@gmail.com',
    bestFriend: 1},
  { userName: 'Adeshola',
    password: 'sholexy',
    email: 'user2@gmail.com',
    bestFriend: 1},
  { userName: 'Oluwasheun',
    password: 'shalexy',
    email: 'user3@gmail.com',
    bestFriend: 2},
  { userName: 'Bukumi',
    password: 'bulexy',
    email: 'user4@gmail.com',
    bestFriend: 3},
  { userName: 'Shade',
    password: 'shalexy',
    email: 'user5@gmail.com',
    bestFriend: 4},
  { userName: 'Adetunji',
    password: 'tunjexy',
    email: 'user6@gmail.com',
    bestFriend: 2},
  { userName: 'obinna',
    password: 'obinlexy',
    email: 'user7@gmail.com',
    bestFriend: 5},
  { userName: 'Aisha',
    password: 'aishexy',
    email: 'user8@gmail.com',
    bestFriend: 3},
]; //end of userData's array of objects

let messageData = [
  { messageOwner: 'Obinna',
    messageBody: 'Hello there!',
    groupID:  7},
  { messageOwner: 'Aisha',
    messageBody: 'Welcome home Boss!',
    groupID:  8},
  { messageOwner: 'Bukumi',
    messageBody: 'I love Apple pie',
    groupID:  4},
  { messageOwner: 'Shade',
    messageBody: 'Never give up on your hustle',
    groupID:  5},
  { messageOwner: 'Adewale',
    messageBody: 'Happy new year!',
    groupID:  1},
  { messageOwner: 'Adeshola',
    messageBody: 'Eid mubarak!',
    groupID:  2},
  { messageOwner: 'Aisha',
    messageBody: 'Always strive to be the best!',
    groupID:  8},
  { messageOwner: 'Adewale',
    messageBody: 'Every where you go!',
    groupID:  1},
  { messageOwner: 'Obinna',
    messageBody: 'Daily dose of your morning exercise is the best!',
    groupID:  7},
];

db.sequelize.sync({force:true})
.then( () => {
  console.log('Seeding the database...');
})
.then( () => {
  return Promise.map(userData, (data) =>{
    return User.create(data);
  });
})
.then( () => {
  return Promise.map(groupData, (data) =>{
    return Group.create(data);
  });
})
.then( () => {
  return Promise.map(messageData, (data) =>{
    return Message.create(data);
  });
})
.then( () =>{
  db.sequelize.close();
  console.log('Finished seeding the database!');
  return null;
});