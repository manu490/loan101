import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './loan.html';

Template.navbar.helpers({
  loggedin:function(){
    if(Meteor.userId()){
      return true;
    }
    return false;
  }
})

Template.navbar.events({
  'click .logout-button':function(){
      event.preventDefault();
      if(Meteor.user()){
          Meteor.logout();
      }
  }
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
      var Role;
      Role = Meteor.user().profile.role;
      if (Role==="A"){
          return LoanDB.find({Approved:true});
      }
      if(Role==="L"){
        return LoanDB.find({Approved:true,lenderId:Meteor.userId()});
      }
      if(Role==="B"){
        return LoanDB.find({Approved:true, user:Meteor.userId()});
      }
    }
  },
  curr_tranx:function(){
    if(!Meteor.user()){
        return null;
        }
    else{
      var Role;
      Role = Meteor.user().profile.role;
      if (Role==="A"){
          return LoanDB.find({Approved:false});
      }
      if(Role==="L"){
        return LoanDB.find({Approved:false});
      }
      if(Role==="B"){
        return LoanDB.find({Approved:false,user:Meteor.userId()});
      }
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
Template.Txn.events({
  'click .approve-stat':function(){
      event.preventDefault();
      if(Meteor.user().profile.role === "L"){
          LoanDB.update(this._id,{$set : {Approved:true, lenderId:Meteor.userId()}});
      }
  }
})
Template.requestForm.helpers({
lender_check:function(){
  if(Meteor.user()){
    return Meteor.user().profile.role === "B";
  }
  
},
})
Template.requestForm.events({
  'click .js-request-loan':function(){
    event.preventDefault();
    if(Meteor.user()){
      var amount;
      var amount = $('#amountId').val();
      console.log(amount);
      var loan = {Amount:amount,
        user:Meteor.user()._id,
        email:Meteor.user().emails[0].address,
        createdOn:new Date(),
        Approved:false
      }; 
      LoanDB.insert(loan);
    }
  }
});