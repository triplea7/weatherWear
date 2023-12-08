import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'users.signup'(username, password) {
        const usernameTaken = Meteor.users.findOne({ username });
        if (usernameTaken) {
            throw new Meteor.Error('username-is-taken', 'That username is already taken!');
        }

        const user = Accounts.createUser({ username, password });
        console.log("User successfully created!");
    },

    'users.login'(username, password) {
        try {
            Meteor.loginWithPassword(username, password);
            console.log('User logged in!');
        } catch (err) {
            console.error(err);
            throw new Meteor.Error('invalid-login', "Username or password is invalid!");
        }
    },

    'users.logout'() {
        Meteor.logout();
        console.log('User is logged out!');
    }

    
})