# Customer_API_Handler
[Introduction](#introduction) | [Technologies](#technologies) | [Installation](#installation) | [Usage](#usage) | [Testing](#testing)

## Introduction
This is a application written in Node.js using the Express framework, tested in Mocha, Chai, Moxios.
- A customer can enter their unique customer GUID (globally unique identifier) and find details about all their accounts.
- API created based on a list of user stories (outlined below)
- API can return all customer account data (Epic Story 2)
- API can return account balance based on a specific account guid(Epic Story 2.1)
- API can return details of account based on specific account guid(Epic Story 2.2)
- API can return which accounts have an overdrawn balance(Epic Story 2.3)
- API can return account details for a customer view(Epic Story 2.4)
- API can return filtered information based on first and/or last name(Epic Bonus Story 3.1)
- API can return filtered information based on partially spelt/mispelt first and/or last name(Epic Bonus Story 3.2)
- API can return filtered information based on a minimum and maximum account balance(Epic Bonus Story 3.3)
- Application runs from http://localhost:3000 (Started by npm start via the command line.)
- Application has Swagger routes defined at http://localhost:3000/swagger-api

## Epic stories:

```
Epic 2: Expose dynamic data from our S3 bucket for all customers
Serve data dynamically from https://mvf-devtest-s3api.s3-eu-west-1.amazonaws.com/ for all customers in the bucket. Except for the data requirement, this epic has stories identical to Epic 1.
2.1 As an account holder, I want to check my balance, so that I know how much money I have.
2.2 As an account holder, I want to check the details being held about me, so that I can make sure the correct details are being stored.
Outputs: First name, Last name, Email, Telephone
2.3 As a customer, I want to get a list of accounts in debt, so that I can assess them for overdraft interest.
Outputs: account guid
2.4 As a customer, I want to get the name, email address, telephone and balance for an account, so that I can contact them and talk about their account.
Epic 3: Bonus Stories
3.1 As a customer, I want to search for accounts by firstname and/or lastname, so that I can find the right customer when they contact me
Inputs: firstname and/or lastname

Outputs: account guids

3.2 As a customer, I want to search for accounts by firstname and/or lastname, even when it's only partial or mis-spelled, so that I can quickly find the right customer when they contact me, even if I misheard their name.
Inputs: firstname and/or lastname

Outputs: account guids ordered by confidence metric

3.3 As a customer, I want to get a list of accounts with balances in certain limits, so that I can offer different products and services to savers and borrowers.
Inputs: minimum balance and/or maximum balance

Outputs: account guids ordered by balance
```

## Technologies:
- Node.js
- Express server
- ES6 Javascript
- Axios for API requests
- Async for asynchronous functions
- lodash for manipulating the data sets
- Mocha for testing
- Chai for testing GET requests
- Moxios for mocking out API responses
- REGEX and npm package stringSimilarity to evaluate bonus story requirements.
- Swagger routes

## Installation

- clone this repository
- download Node.js for your system (https://nodejs.org/en/download/)
- in the root of the directory run npm install from the command line

## Usage

- ``` npm install ``` to install all dependencies
![Imgur](https://imgur.com/EBMTzPU.png)
- ``` npm run start ``` to start application
![Imgur](https://imgur.com/LAkRjy5.png)
- Application starts at localhost:3000
- ```(GET /)```
![Imgur](https://imgur.com/FneWlTN.png)
- Place your customer GUID in the url to access data on all accounts for that customer.
- ```(GET /customerId)```
![Imgur](https://imgur.com/ZmE9Z9P.png)
- Search an accounts balance based on specific account GUID
- ```(GET /customerId/balance/accountId)```
![Imgur](https://imgur.com/F0dlDOu.png)
- Can return specific account details based on specific account GUID
- ```(GET /customerId/details/accountId)```
![Imgur](https://imgur.com/R0ZGEpx.png)
- Can return which accounts are overdrawn for customers account details
- ```(GET /customerId/accounts/overdrawn)```
![Imgur](https://imgur.com/gED2HHu.png)
- Can return account specifc details for a customer view based on account GUID
- ```(GET /customerId/customer/details/accountId)```
![Imgur](https://imgur.com/6c0KfbI.png)
- Can return filtered account details based on first name query.
- ```(GET /customerId/customer/account?firstname=firstName)```
![Imgur](https://imgur.com/wP4mqqY.png)
- Can return filtered account details based on last name query.
- ```(GET /customerId/customer/account?lastname=lastName)```
![Imgur](https://imgur.com/KZGKQaL.png)
- Can return account detail based on first and last name query.
- ```(GET /customerId/customer/account?firstname=firstName&lastname=lastName)```
![Imgur](https://imgur.com/uR2qo2i.png)
- Can return account detail based on partially spelt/misspelt first names for a 50% confidence metric.
- ```(GET /customerId/customer/account?firstname=firstName)```
![Imgur](https://imgur.com/5k83aRK.png)
- Can return account detail based on partially spelt/misspelt  lastnames for a 50% confidence metric.
- ```(GET /customerId/customer/account?lastname=lastName)```
![Imgur](https://imgur.com/8UHwysr.png)
- Can return account detail based on prtially spelt/misspelt first and last names for a 50% confidence metric
- ```(GET /customerId/customer/account?firstname=firstName&lastname=lastName)```
![Imgur](https://imgur.com/8UHwysr.png)
- Can filter accounts based on a query min balance amount ordered from highest balance to lowest.
- ```(GET /customerId/customer/account/balance?minamount=minAmount)```
![Imgur](https://imgur.com/HTRu4E2.png)
- Can filter accounts based on a query max balance amount ordered from highest balance to lowest.
- ```(GET /customerId/customer/account/balance?maxamount=maxAmount)```
![Imgur](https://imgur.com/fkJVRFF.png)
- Can filter accounts based on a query min and max balance amount ordered from highest balance to lowest.
- ```(GET /customerId/customer/account/balance?minamount=minAmount&maxamount=maxAmount)```
![Imgur](https://imgur.com/EY21TB4.png)
- ALL routes are defined in Swagger with swagger descriptions and details for a good indepth understanding of the application - Try it out!
- ```(GET /swagger-api)```
![Imgur](https://imgur.com/1abSDvQ.png)

## Testing

- Technologies used to test are Mocha, Chai, Sinon & Moxios.
- ran with ``` npm test ``` there are 36 tests, testing all functions used in the application as well as testing all applicable routes.
![Imgur](https://imgur.com/M1eLsTb.png)
![Imgur](https://imgur.com/wBw6qap.png)
