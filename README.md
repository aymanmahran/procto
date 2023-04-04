# Procto - Automated Proctoring Software

Procto is an automated proctoring software for invigilating assessments without human interaction. Through the web app, professors can:
- Add students to a course
- Create an assessment
- View student's answer to that assessment
- Give students marks for the assessment
- Be notified of any academic misconduct

In addition, students can:
- Start and submit an assessment
- View upcoming and past assessments

## Structure

The project has main 3 components:
- **Front-end web app (uses Vue.js)**
    - Involves the UI, interface components, and the presentation of data to the end user. Written on Vue.js, the interface is divided into views (pages) and reactive components (buttons, bars, boxes,...). The reactivity provided by Vue.js emulates Decorator and Proxy design patterns, where components providing certain functionalities are shown or hidden depending on the actor (student vs professor). 

- **Back-end API (procto-api)**
    - This is a Typescript package that acts as an interface between the web app and the cloud. It exports classes that supply the app with the needed methods to retrieve and update data. The relations between classes in this package are illustrated by the class diagram provided and explained in the design presentation. Though the concept of interfaces is slightly different in Typescript, the relations and patterns still hold.

- **Cloud infrastructure (on AWS)**
    - The cloud part represents the database and tables used to store information about assessments and grades. It also includes the authentication and verification of users.

## Progress

Use case diagrams for reference:

- First Iteration

![First](https://user-images.githubusercontent.com/55334062/228271092-32e88402-4b39-4c6d-bb9b-321c08fec8b1.png)


- Final Demo

![Final](https://user-images.githubusercontent.com/55334062/228271138-a7077d42-7927-436f-9993-19efb311398b.png)


Below is the work done so far in the project. Most of the use cases from the first iteration as well as some of the final demo use cases were covered. The first stage mainly focused on implementing the web app interface. The next stage involved the back-end implementation and functionality, as well as creating the database and tables.

**First stage:**
- Front-end:
    - Most of the features are implemented, this includes the main views and components
    - Student interface to view courses, upcoming and past assessments, and start and assessment
    - Professor interface to view courses and students, assessments, and view and mark students' responses

- Back-end:
    - Skeleton for main classes and interfaces are coded
    - Methods return dummy data for testing

- Cloud:
    - Authentication of users and logging in with Google account

**Final stage:**
- Front-end:
    - Interface for professors to add an assessment and add a student
    - Proctoring interface when taking an assessment

- Back-end:
    - Implementation of class methods and helper functions
    - Functions to make API requests to the database

- Cloud:
    - Created a database with tables to store professors, students, and assessments information
    - Created API endpoints and event functions to retrieve from and write to the tables

## Project setup

### Prerequisites

- Node.js and NPM (install from [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

- Vue.js CLI (after installing NPM, run `npm install -g @vue/cli`)

### Development

First, since the API package is not publicly published, it needs to be linked locally to the web app.

1. Go to the package folder

```
cd procto-api
npm link
```

2. Go into the app folder and link the package
```
cd procto
npm link procto-api
```

3. Now, the dependencies can be installed inside the app folder
```
npm install
```

After the local setup is done, the cloud infrastructure need to be deployed so that the app can communicate with a cloud storage. The web app uses AWS to host the cloud infrastructure. Deployment is made easy using AWS Amplify, where the resources information is specified with the project inside the `backend` folder.

4. First, create an account on AWS from [here](https://aws.amazon.com/console). Then set up Amplify inside the project folder by running the commands and following the terminal instructions

```
cd procto
amplify configure
amplify init
```

5. After that, deploy the project resources

```
amplify push
```
The app should be ready for development.

6. To launch a local server for testing, run serve inside the app folder
```
npm run serve
```

7. Finally, go to a browser and enter the local server address to view the website
```
http://localhost:3000/
```

The app would automatically update when making changes to the code

### Production

Follow the same steps as above. To compile and minify the app for production, run build
```
npm run build
```
The output in `dist` folder can then be deployed to any web hosting service (in this case, AWS). The folder can also be uploaded to services like Heroku for fast deployment.

To host the app on AWS:

1. Login to the [AWS Console](https://console.aws.amazon.com/console/home)
2. Launch the AWS Amplify Studio from the resources menu
3. Under `Hosting environment`, click `Deploy without Git provider`
4. Upload the project files
