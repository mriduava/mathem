*IMPORTANT*
    *In the console*
1. git checkout *develop*
2. npm i

    *In windows*
1. Download MongoDB(use default)
2. Open cmd promp in windows
3. Uncomment the commented block in server.js
4. In VSC, open a new terminal and run npm start or start script
5. In the open cmd, locate mongo bin folder, default is: 
    *C:\Program Files\MongoDB\Server\4.4\bin*
6. Run mongod 
7. Run mongo
8. Run show dbs
9. Confirm that mathem is shown in the list displayed
10. Comment the uncommented block from earlier 

*Note* 

If anything fails that's probably some issues when MongoDB got installed, try reinstall with defaults in C: disk

*Dev info*

Routes are defined in *App.js*
For app-wide css usage, import the css in *index.js*
To create a route with link to the page see App.js existing route to home and see *src/Pages/homePage.js* for example.
To make it simpel:
    1. Create the page in *src/Pages* folder.
    2. Import the page in *App.js* (see homePage import as example).
    3. Create route tag with corresponding path of choice and component i.e *<Route exact path=*path* component={*page*}/>*
And you're done!

*Note*

The Route tag must be placed inside the switch tag in *App.js*
