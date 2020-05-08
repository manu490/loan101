//Boilerplate code for accounts config
import { Accounts } from 'meteor/accounts-base'
AccountsTemplates.addField({
  _id: "role",
    type: "radio",
    displayName: "Role",
    required:true,
    select: [
        {
            text: "Admin",
            value: "A",
        },
        {
            text: "Lender",
            value: "L",
        },
        {
          text: "Borrower",
          value: "B",
      },
    ],
});
AccountsTemplates.configure({
  // Behavior
  forbidClientAccountCreation: false,
});