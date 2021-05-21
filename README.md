# Lab8_Starter
Partners:

Yue Zhuo &
Anokhi Mehta

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

 (1)Within a Github action that runs whenever code is pushed.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No, because the "message" feature involves both sending and writing which are separate parts of the code that should be tested separately.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes, because it is a small feature that does not need to interact with other features in order to be tested individually.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

It would run the default, or run the tests without a browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

You would need to use await page.click('header > img'); instead of using the goto url. 

