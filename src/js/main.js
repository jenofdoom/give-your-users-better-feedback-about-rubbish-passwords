$(document).ready(function() {
  'use strict';

  // enable create account button when form valid
  $('input').keyup(function() {
    var isFormValid = $('form')[0].checkValidity() === true;
    var passwordStrength = $('#password').data('strength');
    if (isFormValid && passwordStrength && parseInt(passwordStrength, 10) > 2) {
      $('button[type=submit]').prop('disabled', false);
    } else {
      $('button[type=submit]').prop('disabled', true);
    }
  });

  // password strength checking
  var passwordField = $('#password');
  passwordField.keyup(function(event) {
    var password = passwordField.val();
    var strengthBar = passwordField.parent();
    var helptext = strengthBar.next();

    if (password.length) {
      var feedback = '';

      // evaluate the password, penalising against reuse of user data
      // and words associated with the site
      var validation = zxcvbn(password, [
        $('#email').val(),
        $('#username').val(),
        'sekrit',
        'treehouse'
      ]);

      // THESE ARE FOR DEMO PURPOSES ONLY!
      console.log(password);
      console.log(validation);
      // THESE ARE FOR DEMO PURPOSES ONLY!

      // create help text from suggestions and warnings
      if (validation.feedback.suggestions) {
        validation.feedback.suggestions.forEach(function(text, index) {
          if (text.slice(-1) !== '.') {
            validation.feedback.suggestions[index] = text + '.';
          }
        });
        feedback = validation.feedback.suggestions.join(' ');
      }
      if (validation.feedback.warning) {
        if (validation.feedback.suggestions) {
          feedback = feedback + ' '; // add spacing
        }
        feedback = feedback + validation.feedback.warning;
        if (validation.feedback.warning.slice(-1) !== '.') {
          feedback = feedback + '.'
        }
      }

      // adjust the password strength score bar
      strengthBar.attr('data-strength', validation.score);

      // make strength available for submit button enable/disable logic
      passwordField.data('strength', validation.score);

      helptext.text(feedback);
    } else {
      helptext.text('');
    }
  });
});
