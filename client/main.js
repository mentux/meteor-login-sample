import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './main.html';

Router.route('/x', function () {
    this.render('inicio');
});

Router.route('/navegacao', {
    name: 'navegacao',
    template: 'navegacao'
});

Template.register.events({
    'submit form': function (event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        });
    }
});

Template.login.events({
    'submit form': function (event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error) {
            if(error){
                console.log(error.reason);
            } else {
                //direcionando o usuário para a rota "home"
                Router.go("home");
            }
        });
    }
});

Template.dashboard.events({
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout();
    }
});

