# Customer_API_Handler
[Introduction](#introduction) | [Technologies](#technologies) | [Installation](#installation) | [Working Overview](#screenshots) |

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