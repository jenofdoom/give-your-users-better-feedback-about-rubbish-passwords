# Give your users better feedback about rubbish passwords with zxcvbn

An introduction to zxcvbn, an open source library that provides better password
feedback, rating passwords on how long they would take for a brute force
cracking tool, or if they are a commonly used sequence. We'll see how to
implement zxcvbn in your frontend in order to give better advice to your users.

## Passwords are fundamentally broken

how bad is it
https://www.staysmartonline.gov.au/news/top-25-most-common-passwords
https://blog.keepersecurity.com/2017/01/13/most-common-passwords-of-2016-research-study/

as devs or inforsec pros we know better:

- we use password managers
- we follow xkcd's advice about horse battery staplers
- we use 2fa and maybe even physical tokens

our users...  don't seem to know better... but it's not their fault

## Why users do a bad job

Perverse system - we teach them all the wrong things
- rotating passwords
- capital letter and a number and a symbol
  - just different enough from site to site to make it a nightmare
- provide bad advice about complexity

## How zxcvbn can help

zxcvbn has been around since 2012, created by an engineer at dropbox
https://blogs.dropbox.com/tech/2012/04/zxcvbn-realistic-password-strength-estimation/

## Demo - how you can use it

- Score for strength meter
- Provide user inputs to prevent guessable fragements
- Show suggestions and warnings

## Summary

Make sure you use the same rules on your backend - ported to many languages
https://github.com/dropbox/zxcvbn
