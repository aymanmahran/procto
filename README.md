# Procto - Automated Proctoring Software

Procto is an automated proctoring software for invigilating assessments without human interaction. It allows professors to create assessments and invite students to take them virtually. Professors can mark the assessments and will be notified of any academic misconduct.

## Structure

The project has main 3 components:
- Front end web app (uses Vue.js)
    - Involves the UI, interface components, and the presentation of data to the end user. Written on Vue.js, the interface is divided into views (pages) and reactive components (buttons, bars, boxes,...). The reactivity provided by Vue.js emulates Decorator and Proxy design patterns, where components providing certain functionalities are shown or hidden depending on the actor (student vs professor). 
- Back end API (procto-api)
    - This is a Typescript package that acts as an interface between the web app and the cloud. It exports classes that supply the app with the needed methods to retrieve and update data. The relations between classes in this package is illustrated by the class diagram provided and explained in the design presentation. Though the concept of interfaces is slightly different in Typescript, the relations and patterns still hold.
- Cloud infrastructure (on AWS)
    - The cloud part represents the database and tables used to store information about assessments and grades. It also includes the authentication and verification of users.

## Progress



## Project setup

**Prerequisite**

- Node.js and NPM (install from [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

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

4. To launch a local server for testing, run serve
```
npm run serve
```

### Production

Follow the same steps as above. To compile and minify the app for production, run build
```
npm run build
```
The output in `dist` folder can then be deployed to any web hosting service (in this case, AWS).