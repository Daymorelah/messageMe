
import chai from 'chai';
import chaiHTTP from 'chai-http';
import chaiARRAY from 'chai-array';
import app from '../../app';
import model from '../../server/models';

const should = chai.should();
const expect = chai.expect;
const User = model.User;
const Group = model.Group;
const Message = model.Message;
chai.use(chaiHTTP);
chai.use(chaiARRAY);

describe('Test Update-postIT\'s routes', () =>{
  before((done) => {
    User.destroy({
      where: {},
      truncate: true
    }); //end of model User
    Group.destroy({
      where:{},
      truncate: true
    }); //end of model Group
    Message.destroy({
      where:{},
      truncate: true
    }); //end of model Group
    done();
  }); //end of beforeEach hook.
  describe('Test for signup route', () => {
    it('should create a user after signup', (done) =>{
      chai.request(app).post('/user')
      .type('form').send({
        userName: 'tomiwa94',
        password: 'lowkeythings',
        email: 'waleuser@wemail.com',
        //bestFriend: 3
      })
      .end( (err, res) => {
        if(!err){
          res.should.have.status(201);
          res.body.Username.should.equal('tomiwa94');
          res.body.Email.should.equal('waleuser@wemail.com');
          res.body.should.not.have.a.property('password');
          done();
        }else{
          done(err);
        }
      });//end of chai.request
    }); //end of it block
  }); //end of inner test suite for signup route

  describe('Test for API routes to create a group', () => {
    it('should create a group', (done) => {
      chai.request(app).post('/group')
      .type('form').send({
        groupName: 'Family',
        description: 'Family members'
      }).end( (err, res) => {
        console.log(res.body);
        if(!err){
          res.body['Group Name'].should.equal('Family');
          res.body.Description.should.equal('Family members');
          res.should.have.status(201);
          done();}else{
          done(err);
        } //end of else statement
      }); //end of chai.request
    }); //end of it block
  }); //end of second decribe suite

  // describe('Test for API routes to create messages', () => {
  //   it('should create a message and attach it to a group', (done) => {
  //     chai.request(app).post('/message')
  //     .type('form').send({
  //       messageBody: 'Whats up cuz2',
  //       messageOwner: 'Group2',
  //       groupId: 1})
  //      .end( (err, res) => {
  //        //console.log(res.body);
  //        if(!err){
  //          res.body['Message Text'].should.equal('Whats up cuz2');
  //          //res.body.messageOwner.should.equal('Group2');
  //          res.body.should.have.a.property('Group ID');
  //          res.should.have.status(201);
  //          expect(res.statusCode).to.equal(201);
  //          expect(res.body).to.be.an('object');
  //          expect(res.body).to.have.property('Group ID');
  //          done();}else{
  //          done(err);
  //        } //end of else statement
  //      }); //end of chai.request
  //   }); //end of it block
  // }); //end of third describe test suite

  // describe('Test for API route to list Users in the database', () => {
  //   it('should reurn all users in the database', (done) => {
  //     chai.request(app).get('/user/list')
  //     .end( (err, res) => {
  //       if(!err){
  //         console.log('=========>', res.body);
  //         res.body.should.have.property('Username');
  //         expect(res.body).to.have.property('Email');
  //       //res.body.groupsForThisUser.should.have.property('groupName');
  //       //expect(res.body.userBestFriend).to.have.property('userName');
  //         res.statusCode.should.equal(201);
  //         done();} else{
  //         done(err);
  //       } //end of else statement
  //     }); //end of chai.request
  //   }); //end of it block
  // }); //end of fourth describe test suite

  describe('Test for API route to list Groups in the database', () => {
    it('should return all groups in the database', (done) => {
      chai.request(app).get('/group/list')
      .end( (err, res) => {
        console.log(res.body);
        if(!err){
          res.body[0]['Group Name'].should.to.equal('Family');
          res.body[0]['Description'].should.to.equal('Family members');
          expect(res.body).to.be.an('array');
          res.body[0].should.be.an('object');
          res.body[0].should.have.property('Group Name');
          expect(res.body[0]).to.have.all.keys('Group Name', 'Description');
          // expect(res.body.groupMessages).to.have.property('messageBody');
          // expect(res.status).to.be.equal(201);
          done();}else{
          done(err);
        } //end of else statement
      }); //end of chai.request
    }); //end of it block
  }); //end of fifth describe test suite

  // describe('Test for API route to list Messages in the database', () => {
  //   it('should return all Messages in the database', (done) => {
  //     chai.request(app).get('/message/list')
  //     .end( (err, res) => {
  //       console.log(res.body);
  //       if(!err){
  //         res.body.should.have.property('Message Text');
  //         expect(res.body).to.have.property('Owner of Message');
  //         res.body.groupMess.should.have.property('Group Name');
  //         expect(res.status).to.be.equal(201);
  //         done();}else{
  //         done(err);
  //       } //end of else statement
  //     }); //end of chai.request
  //   }); //end of it block
  // }); //end of sixth describe test suite

}); //end of main describe test suite for routes