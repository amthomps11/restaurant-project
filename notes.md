How to run /
open two terminals /
cd into backend and run npm run start /
cd in root and run npx serve . to run on host sites /
cd into menu-admin and run npm run dev to run app by itself /
after making changes in menu-admin - run npm run build to update sdk changes /
 /
Decisions /
Tried to use minimal libraries to keep it lightweight /
  Did not want to spend too much time with config or dependency management /
  I.E. did not use Axios, react query, react-router, auth0, supabase, and countless other libraries /
Did not obsess over file organization, structure, modularization, naming conventions and scalability /
 /
Stack /
Backend /
  Express Js, bettersqlite-3, bcyrpt and express-session for auth  /
  restaurant table (id, name, password_hash) /
  menu_item table (id, name, restaurant_id, description, price) /
 /
  Routes /
  GET /api/auth/session - provides current session /
  POST /api/auth/login - logs in user and creates sessino /
  POST /api/auth/logout - deletes current session /
 /
  GET /api/restaurants/:restaurant_id - provides restaraunt with menu /
 /
  POST '/api/menu-items', - auth protected and creates a menu-item /
  PUT '/api/:menu_item_id' - auth protected and edits a menu-item /
  DELETE '/api/:menu_item_id' - auth protected and deletes a menu-item /
 /
 /
Menu-Admin /
  React, Vite, Typescript, tailwindCSS /
  A react,typescript, tailwindcss, app that is fed a restaurant_id and consumes the api /
  contains sdk.tsx which is mounted on host using a shadow DOM to not cross pollute styles /
 /
restaurant-site-pizza and restaurant-site-taco /
  2 simple html/css/js websites to demonstrate how a site mounts the sdk /
 /
Flow /
Host provides a restaurant_id and mounts sdk /
API fetches restaurant info and all menu_items where restaurant_id = restaurant_id and displays them /
Create, Update and Delete are protected by auth and authentication /
User can login by providing a password which is hashed using bycrpt and if it is matched to the host's restaurant_id then login  /is successful
On a successful login, a session is created /
The session restaurant_id is used to authenticate update, delete and create functions /
User can log out /
Because host provides restaraunt_id, user can only login to the "account" of the website it is embedded on /
 /
 /
What's left out /
A more robust login / authentication system /
  In my design the restaurant is effectively the "account", so theres no way for multiple users to manage the same restaurant  /without sharing the password
 /
API naming convention could be better organized /
 /
Not verifying host domain in displaying menu or embedding SDK /
  While Create, Update and Delete are protected, anyone can take a restaurant_id and display that menu on their own site. A  /possible solutions is verifying host domain in requests
  i.e. associate restaurant_id = 1 with a certain host origin domain and only allow sdk with restaurant_id = 1 to be embedded on  /those domains
 /
Session storage is using express' default memory storage /
 /
Did not add in theme customizeabilty due to time /
 /
Did not make API url customizeable for SDK /
  Since all data is hitting the same backend to access their menu, I didn't see a need for this small demo to have that  /customizeable
 /
  currently, fetching menu items isn't protected by restaraunt_id session because menu items are public info and it is not a  /major concern
 /
What AI helped with /
basic scaffolding boilerplate /
stack decisions /
helped with shadowdom and SDK implementation /
used to audit such as checking for end to end type contracts /
fully spun up resaurant-sites styles and copy /
 /
Where I Overrode AI /
Using Tailwind 3 vs Tailwind 4 /
  When implemnting shadow dom .. tailwind styles were not being injected correctly into sdk but working on standalone menu-admin  /app. Eventually codex recommended to manually enable each --tw--* style into the css. I eventually just used tailwind3 which did not have the injection problem
AI overtyped everything, specifcally on backend /
  I decided to keep things simple type wise when possible /
No users table /
  Ai suggested a users table for authentication and public keys. I felt as though that was over engineering for this demo /
AI wanted to modularize more than me, using a MVC approach to the backend, which I felt was uneccessary  /
Suggested separate folder for SDK and just using an API /