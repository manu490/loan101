import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './loan.html';
Meteor.subscribe("loandb");

Template.navbar.events({
    'click .logout-button':function(){
        event.preventDefault();
        if(Meteor.user()){
            Meteor.logout();
        }
    }
  })
  
  Template.Txn.events({
    'click .approve-stat':function(){
        event.preventDefault();
        if(Meteor.user()){
            loanId = this._id;
            Meteor.call('set_this',loanId); //Meteor call to update approval status
        }
    }
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
        Meteor.call('RequestLoan',loan); //Meteor call to take loan request details
      }
    }
  });