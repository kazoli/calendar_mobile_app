#DESCRIPTION

Calendar mobile app created in React Native with Typescript, useReducer and useContext hooks based global state managment and JSS styling.

#FEATURES

1. A day can be selected by a date selector on the top of the calendar
2. New event can be added besides the date selector by clicking on the icon of top-right corner
3. Title, start date, end date, importance and location can be set to an event
4. Events are shown in the calendar side by side if they are intraday and overlaping each others
5. Events which are outside the day boundaries are listed in a top menu that is expandable if it contains more than 3 elements
6. Events can be opened by clicking on their field in the calendar
7. Deletion or editing of an opened event can be found if you click on the top-right menu
8. Importance is shown by a related color in the calendar

#BEFORE RUN ANY CODE

1. Check out the setup of development enviroment: https://reactnative.dev/docs/environment-setup
2. Clone / download codes and use a command line, enter in the main folder and install packages: "npm i"
3. To bundle and run on IOS you may need to run 'npx pod-install' to work correctly

#RUN THE APP

1. Use a command line, enter in the main folder and run this command to start metro: "npm start"
2. Use an other parallel command line, enter in the main folder and run this command to build your app: "npm run android"
3. If it does not start to run, click on the app in your virtual mobile to launch
