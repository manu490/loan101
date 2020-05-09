import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

// Meteor publish only currently logged in user's data
Meteor.publish("loandb",function(){
  if(Meteor.user()){
    var Role; 
    Role = Meteor.user().profile.role; // checks user role and returns appropriate data...
      if (Role==="A"){
        return LoanDB.find();
      }
      if(Role=='B'){
        return LoanDB.find({user:Meteor.userId()});
      }
      if(Role=='L'){
        return LoanDB.find(
          { $or:
            [{Approved:false} , {lenderId:Meteor.userId()}]
          });
      }
    }
  return null;
})
Meteor.methods({
  //Meteor method to update as approved along with lender Id who approved to pay
  set_this:function(loanId){
    console.log("Meteor call")
    if(Meteor.user().profile.role === "L"){
        LoanDB.update(loanId,{$set : {Approved:true, lenderId:Meteor.userId()}});
      }
  },
  //Meteor method for loan request
  RequestLoan:function(loan){
    if(Meteor.user()){
      LoanDB.insert(loan)
    }
  }
});