# Customer_API_Handler
[Introduction](#introduction) | [Technologies](#technologies) | [Installation](#installation) | [Usage](#usage) | [Testing](#testing)| [Retrospective](#retrospective) | [DeepDive](#deepdive)



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
- Express framework
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
![Imgur](https://imgur.com/CCaqdKj.png)
- Can return account detail based on partially spelt/misspelt  lastnames for a 50% confidence metric.
- ```(GET /customerId/customer/account?lastname=lastName)```
![Imgur](https://imgur.com/okw50PZ.png)
- Can return account detail based on prtially spelt/misspelt first and last names for a 50% confidence metric
- ```(GET /customerId/customer/account?firstname=firstName&lastname=lastName)```
![Imgur](https://imgur.com/FwGiAc5.png)
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

- Technologies used to test are Mocha, Chai, Sinon & Moxios. Tested against realistic stubbed data in stubData.json file.
- ran with ``` npm test ``` there are 36 tests, testing all functions used in the application as well as testing all applicable routes.
![Imgur](https://imgur.com/M1eLsTb.png)
![Imgur](https://imgur.com/wBw6qap.png)

## Retrospective

- Fully completed all epic stories and bonus stories to a high degree with testing.
- Code is clean and readable and user friendly readMe
- Overall I'm really happy with how I tackled the project and the end result.  Feedback always weclomed!

## DeepDive

- Here we go for a in depth look at the code, going through the app files and an in depth look at how the code works to achieve the application outcome.

## app.js
- The app file is where the application starts. It contains all the logic that brings the application together. Here we define the port the localhost application runs on, the url for swagger routes, the url for our main API routes index, the view engine used to render our Error.html page if there is an error.
![Imgur](https://imgur.com/cS74err.png)

## package.json
- A file detailing all our node package dependencies as well as scripts to run and test the application from the command line.
![Imgur](https://imgur.com/RJoCwux.png)

## config.json
- A simple config file that is used throughout the application. Containing our baseUrl, a base customer ID to use if necessary and our initial message at the root of our application.
![Imgur](https://imgur.com/idt3xlP.png)

## services/apiServices.js
- The apiServices file contains a simple function ```getFromAxios``` to call API end points, using the node package Axios and returning the result of the request on success.
![Imgur](https://imgur.com/K54Olmg.png)

## services/inMemoryApiData.js
- This file contains the class ```InMemoryApiData``` which is created every on load of this application and used to store and manipulate the customer data that is seen in our API url endpoints.
![Imgur](https://imgur.com/0qhSRf4.png)

# Function in depth look:
- ```getDataFromApi```
- This function requires the ```getFromAxios``` function and uses it to make an api call to the baseUrl (defined in ```config.json``` as the AWS link) and takes a parameter customerId to make an API call to recieve customer data depending on which customer GUID is entered.  The response is then saved to ```this.responseData```.
![Imgur](https://imgur.com/7x0Nv51.png)

- ```getAccountHolderBalance```
- This function takes an account GUID as a paramter then using ```lodash``` iterates over the data found in ```this.responseData``` to return the balance for the account matching that GUID.
![Imgur](https://imgur.com/5GBSBhd.png)

- ```getAccountHolderDetails```
- This function takes an account GUID as a parameter then using ```lodash``` iterates over the data found in ```this.responseData``` to return firstname, lastname, email, telephone details matching that account GUID.
![Imgur](https://imgur.com/MmKJ1sh.png)

- ```getAccountsOverdrawn```
- This function uses ```lodash``` to iterate over the data and return a list of all account ids who have overdrawn balances.
![Imgur](https://imgur.com/fXBBsVr.png)

- ```getAccountForCustomerView```
- This function takes an account GUID as a parameter then using ```lodash``` iterates over the data found in ```this.responseData``` to return firstname, lastname, email, balance details matching that account GUID for a customer viewpoint.
![Imgur](https://imgur.com/5FBl98i.png)

- ```getAccountByFirstOrLastName```
- This function takes two optional parameters, firstName and lastName, then based on if either parameter is present using ```lodash``` it iterates over the data finding if the parameters input match any of the first and/or last names in the data and returns those account GUID ids.
![Imgur](https://imgur.com/1wWWqJW.png)

- ```getAccountByBestMatchedFirstOrLastName```
- This function takes two optional parameters, firstName and lastName, then based on if either parameter is present using ```lodash``` it iterates over the data finding names that are up to a 50% confidence match to the input parameters.  This is evaluated using the node package ```stringSimilarity```.  The accounts returned have the following data structure: Confidence metric, input first name, input last name, possible first name, possible last name, id for account.  Using more ```lodash``` we order the account data by how high the confidence metric is and then we order it by highest confidence using ```.reverse()```
![Imgur](https://imgur.com/UnyZE8q.png)

- ```getAccountByName```
- This function takes two optional parameters, firstName and lastName and combines ```getAccountByFirstOrLastName``` & ```getAccountByBestMatchedFirstOrLastName``` and evaluates which function should be used.  If ```getAccountByFirstOrLastName``` does not return anything then logically the first and last name parameters are passed on to ```getAccountByBestMatchedFirstOrLastName```.
- Logically I could remove ```getAccountByFirstOrLastName``` and let ```getAccountByBestMatchedFirstOrLastName``` handle all name filtering but felt it necessary to keep both as a design choice.
![Imgur](https://imgur.com/9YpWyNC.png)

- ```getNoCommasAndPutToFloat```
- This function iterates over the account data in ```this.responseData``` and using ```REGEX``` removes every occurance of a comma ',' in the balance field for accounts and then turns it from a string to a floating integer.
![Imgur](https://imgur.com/Cnz4mVr.png)

- ```getAccountFilteredByBalance```
- This function takes two optional parameters, minAmount and maxAmount, using the above function to set the balance data to the correct format then using ```lodash``` filters through the data where balance is between the min and max amount parameters.
![Imgur](https://imgur.com/t318bGU.png)

## routes/index.js
- This file contains all the routes used for the API and the logic behind what is displayed at each one, using the functions defined above in the ```InMemoryApiData``` class.
![Imgur](https://imgur.com/NaFxjjk.png)

# Function in depth look:
- ```GET('/')```
- This is the base application route, it just returns a message defined in our ```config.json``` file.
![Imgur](https://imgur.com/HR5QjUI.png)

- ```GET('/:customerId')```
- This route allows the user to pass a customer GUID into the url, using this customerId parameter it passes the guid to the ```inMemoryApiData``` class instance (defined at the top of the file) and makes a request to the API and the response is then returned.
![Imgur](https://imgur.com/W7jPnjl.png)

- ```GET('/:customerId/balance/:accountId')```
- This route takes the customerId and accountId parameters and calls the api for that customerID data.  Then using that data uses ```inMemoryApiData.getAccountHolderBalance``` to return an account GUIDs balance.
![Imgur](https://imgur.com/OaiXiKv.png)

- ```GET('/:customerId/details/:accountId')```
- This route takes the customerId and accountId parameters and calls the api for that customerID data. Then using that data uses ```inMemoryApiData.getAccountHolderDetails```
to return the specific accounts details.
![Imgur](https://imgur.com/I8qcFhg.png)

- ```GET('/:customerId/accounts/overdrawn')```
- This route takes the customerId parameters and calls the api for that customerID data.  Then using that data uses ```inMemoryApiData.getAccountsOverdrawn()``` to return the specific accounts who are overdrawn in their balance.
![Imgur](https://imgur.com/kmsGYOh.png)

- ```GET('/:customerId/customer/details/:accountid')```
- This route takes the customerId and accountId parameters and calls the api for that customerID data. Then using that data uses ```inMemoryApiData.getAccountForCustomerView``` to return data for a specific account GUID intended for a customer viewpoint.
![Imgur](https://imgur.com/8QbJzeW.png)

- ```GET('/:customerId/customer/account')```
- This route takes the customerId and calls the api for that customerID data. It also takes in two optional query parameters ```firstname``` and ```lastname```. Then using that data uses ```inMemoryApiData.getAccountByName``` to return specific accounts based on the firstname and lastname query parameters in the url.
![Imgur](https://imgur.com/jFMoJxO.png)

- ```GET('/:customerId/customer/account/balance')```
- This route takes the customerId and calls the api for that customerID data. It also takes in two option query parameters ```minamount``` and ```maxamount```. Then using that data uses ```inMemoryApiData.getAccountFilteredByBalance``` to return all accounts within the minamount and/or maxamount parameters.
![Imgur](https://imgur.com/3Thkp28.png)

## swagger.json
- This file contains all the setup for our swagger routes defined at ```http://localhost:3000/swagger-api```.  It should be well documented that you can explore each route just by reading the descriptions. Give it a whirl!!
![Imgur](https://imgur.com/u3Kkxj8.png)


## Fin

- I Hope you had as much fun reading as I did coding! :)