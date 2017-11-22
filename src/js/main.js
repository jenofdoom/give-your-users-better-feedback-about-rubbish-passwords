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

    if (password.length) {
      var suggestions = '';
      var warnings = '';

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
      // console.log(validation);
      // THESE ARE FOR DEMO PURPOSES ONLY!

      // create help text from suggestions
      if (validation.feedback.suggestions) {
        validation.feedback.suggestions.forEach(function(text, index) {
          if (text.slice(-1) !== '.') {
            validation.feedback.suggestions[index] = text + '.';
          }
        });
        suggestions = validation.feedback.suggestions.join(' ');
        $('.password-field .alert-info').text(suggestions);
        $('.password-field .alert-info').removeClass('hidden');
      } else {
        $('.password-field .alert-info').addClass('hidden');
      }

      // create help text from warning
      if (validation.feedback.warning) {
        warnings = validation.feedback.warning;
        if (validation.feedback.warning.slice(-1) !== '.') {
          warnings = warnings + '.'
        }
        $('.password-field .alert-warning').text(warnings);
        $('.password-field .alert-warning').removeClass('hidden');
      } else {
        $('.password-field .alert-warning').addClass('hidden');
      }

      // adjust the password strength score bar
      strengthBar.attr('data-strength', validation.score);

      // make strength available for submit button enable/disable logic
      passwordField.data('strength', validation.score);
    } else {
      // no text, make sure feedback is hidden
      $('.password-field .alert').addClass('hidden');
    }
  });
});
