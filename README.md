<h1>Innowise lab internship level 1 Clever To Do List</h1>

<h2>1. Link to the task</h2>

https://drive.google.com/file/d/18I1PxOxZn2lwm__YeOtMNoWeiXygKwwN/view

<h2>2. How to run the app</h2>

- `git clone https://github.com/AlekseyYuriev/innowise-lab-internship-level-1-clever-to-do-list.git` - clone the repository (HTTPS)
- `npm install` - install the dependencies
- `npm run dev` - run the app

<h2>3. Database snapshot</h2>
The entities structure in firebase is organized the following way:

<img width="600" src="./public/firebase1.png" alt="Структура данных Firebase">
<img width="600" src="./public/firebase2.png" alt="Структура данных Firebase">
<img width="600" src="./public/firebase3.png" alt="Структура данных Firebase">

<h2>4. Application stack and description of the file structure</h2>

The App is a Vue 3 based application. It was created using options API. The App includes several additional libraries:

- Vue Router for routing
- Vuex - official state management library
- Vuelidate for form validation
- Firebase - as a backend of the app

The App has the following file structure:

1. In the <strong>root</strong> folder you can find files that are used to configure and develop the app and <strong>index.html</strong> file.
   <br>
2. <strong>src</strong> folder contains the files of the app including <strong>main.js, App.vue</strong> and several folders:

- `API` - folder with the file responsible for requests to Firebase
- `assets` - folder with basic CSS files
- `components` - folder with Vue Components of the App
- `firebase` - folder with firebase configuration file
- `router` - folder with Vue Router configuration file
- `store` - folder with Vuex configuration file
- `utils` - folder with constants file
- `views` - folder with pages of the App
