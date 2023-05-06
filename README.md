# basic-subscription-platform
This repository contains a Django app with some other necessary services to run a basic Subscription platform

## Description

Main use case scenario:
* Sign up
* Log in
* Add credits
* Activate/buy a Subscription
* Receive new invoice avery 10 seconds until either run out of credits or deactivate subscription
* deactivate subscription

## Getting Started

### Dependencies

* docker version 20.10 or higher (lower might also work)
* docker compose version 2.15 or higher (lower might also work)

### Running

* Clone project
```
git clone https://github.com/9Knight9n/basic-subscription-platform.git
```
* Change directory into cloned folder
```
cd basic-subscription-platform
```
* Create .env file from example .env file (use copy instead of cp in linux)
```
cp .env.example .env
```
* Run project with docker compose
```
docker compose up
```
* Visit http://localhost:3001/ to start


## In-depth

### Services
Services used in application
* Django: Back-end framework
* PostgreSQL: Database
* Redis: Message and database broker
* Celery: Task scheduler
* React.js: Front-end framework


### TODO
- [x] Initialize Django
- [x] Dockerize Django and PostgreSQL
- [x] Added Authentication (django Knox auth)
- [x] Create Customer Model and serializer
- [x] Add auto superuser creator script 
- [x] Add auto Migration script
- [x] Add auto DB population
- [x] Initialize React.js
- [x] Dockerize React.js
- [x] Add Login and Signup page
- [x] Add Subscription, Invoice and Customer-Subscription models
- [x] Add required APIs
- [x] Add Celery To project
- [x] Dockerize Celery
- [x] Add Schedule Task
- [x] Create readme
- [ ] Replace Interval API calling with WebSocket. (interval API calling is used for updating front-end data, didn't had time to implement WebSocket)
- [ ] Create Production version with Docker