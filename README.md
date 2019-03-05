# FHP-Kursplaner

# How to get started?

### 1. Start the Backend

---

To start the application, you need to run the backend API first. It provides the frontend prototype with all the sample data it needs to render all courses. The dataset is from the „Wintersemester 2018 / 2019“. Go to the `/backend` folder and run:

    $ npm install
    
    $ npm run start

It starts a development MongoDB service which is powered by MongoDB Atlas. You can access the data via `localhost:3000/courses`.

### 2. Start the Frontend

---

In the `frontend` folder you will find a Vue.js frontend prototype. You can run the prototype by executing:

    $ npm install
    
    $ npm run serve
