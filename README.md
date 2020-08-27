*IMPORTANT*

1. git checkout *develop*
2. npm i

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
