import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './loan.html';
Meteor.subscribe("loandb");
import './l_events.js'

Template.navbar.helpers({
  loggedin:function(){
    if(Meteor.userId()){
      return true;
    }
    return false;
  }
})
Template.requestForm.helpers({
  borrow_check:function(){
    if(Meteor.user()){
      return Meteor.user().profile.role === "B";
    }
    
  },
  })
Template.Txn.helpers({
  loggedin:function(){
    if(Meteor.userId()){
      return true;
    }
    return false;
  },
  past_tranx:function(){
    if(!Meteor.user()){
        return null;
        }
    else{
      return LoanDB.find({Approved:true});
     /* var Role; Role = Meteor.user().profile.role;if (Role==="A"){return LoanDB.find({Approved:true});}
      if(Role==="L"){return LoanDB.find({Approved:true,lenderId:Meteor.userId()});}
      if(Role==="B"){return LoanDB.find({Approved:true, user:Meteor.userId()});}*/
    }
  },
  curr_tranx:function(){
    if(!Meteor.user()){
        return null;
        }
    else{
      return LoanDB.find({Approved:false});
      /*var Role;Role = Meteor.user().profile.role;
      if (Role==="A"){return LoanDB.find({Approved:false});}
      if(Role==="L"){return LoanDB.find({Approved:false});}
      if(Role==="B"){return LoanDB.find({Approved:false,user:Meteor.userId()});}*/
    }
  },
  action:function(){
    if(!Meteor.user()){
        return null;
        }
    else{
      var Role;
      Role = Meteor.user().profile.role;
      if (Role==="A"){
          return "Pending Approval";
      }
      if(Role==="L"){
        return "Approve";
      }
      if(Role==="B"){
        return "Pending Approval";
      }
    }
  }
})

