# Diarium
Diarium is an online journal where users can pen down their thoughts and feelings. :speech_balloon: :thought_balloon:
# Motivation
:ledger: :black_nib: :pencil2: People have thoughts, people feel things, ideas come and disappear; people need need an online diary where there feelings and ideas can be jotted down. More features will be added to **Diarium** with time. :man: :woman: :boy: :girl: :smile:
## Build Status
[![Build Status](https://travis-ci.org/wiztemple/Diarium.svg?branch=develop)](https://travis-ci.org/wiztemple/Diarium)
[![Coverage Status](https://coveralls.io/repos/github/wiztemple/Diarium/badge.svg?branch=develop)](https://coveralls.io/github/wiztemple/Diarium?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8b8c090d4367484c1c5a/maintainability)](https://codeclimate.com/github/wiztemple/Diarium/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8b8c090d4367484c1c5a/test_coverage)](https://codeclimate.com/github/wiztemple/Diarium/test_coverage)

## Style Guide
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/).
### App UI
[Diarium](https://wiztemple.github.io/Diarium/UI)

### Screenshots(User Interface Template)
![alt](./screenshots/landing.png)

## Technologies Used
* [Nodejs](https://nodejs.org/en/)
* [Expressjs](https://expressjs.com/)
* [node-postgres](https://node-postgres.com)

## Features

## Installation
1. Install [**Node JS**](https://nodejs.org/en/)
4. **cd** into the root of the **project directory**.
5. Run `npm install` on the terminal to install Dependecies
6. Create Postgresql database, Navigate to server directory and run migrations:
```
cd server
npm run migrations 
npm run seeders
```
7. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file is shown in the .env.sample

8. Start the application:
**_Different Build Environment_**

**Production**
```
npm start
```
**Development**
```
npm run dev
```
## Tests
``` npm test ```

## How to use?

## Contribute

## Acknowledgments
* [Andela](http://andela.com)
* [Stackoverflow](stackoverflow.com)
* [Medium](https://medium.com/@meakaakka/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3)
## Author
[Ukaegbu Sullivan Wisdom](http://github.com/wiztemple)

## License
This project is licensed under the **MIT** License