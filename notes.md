How to run /n
open two terminals /n
cd into backend and run npm run start /n
cd in root and run npx serve . to run on host sites /n
cd into menu-admin and run npm run dev to run app by itself /n
after making changes in menu-admin - run npm run build to update sdk changes /n
 /n
Decisions /n
Tried to use minimal libraries to keep it lightweight /n
  Did not want to spend too much time with config or dependency management /n
  I.E. did not use Axios, react query, react-router, auth0, supabase, and countless other libraries /n
Did not obsess over file organization, structure, modularization, naming conventions and scalability /n
 /n
Stack /n
Backend /n
  Express Js, bettersqlite-3, bcyrpt and express-session for auth  /n
  restaurant table (id, name, password_hash) /n
  menu_item table (id, name, restaurant_id, description, price) /n
 /n
  Routes /n
  GET /api/auth/session - provides current session /n
  POST /api/auth/login - logs in user and creates sessino /n
  POST /api/auth/logout - deletes current session /n
 /n
  GET /api/restaurants/:restaurant_id - provides restaraunt with menu /n
 /
  POST '/api/menu-items', - auth protected and creates a menu-item /n
  PUT '/api/:menu_item_id' - auth protected and edits a menu-item /n
  DELETE '/api/:menu_item_id' - auth protected and deletes a menu-item /n
 /n
 /n
Menu-Admin /n
  React, Vite, Typescript, tailwindCSS /n
  A react,typescript, tailwindcss, app that is fed a restaurant_id and consumes the api /n
  contains sdk.tsx which is mounted on host using a shadow DOM to not cross pollute styles /n
 /n
restaurant-site-pizza and restaurant-site-taco /n
  2 simple html/css/js websites to demonstrate how a site mounts the sdk /n
 /n
Flow /n
Host provides a restaurant_id and mounts sdk /n
API fetches restaurant info and all menu_items where restaurant_id = restaurant_id and displays them /n
Create, Update and Delete are protected by auth and authentication /n
User can login by providing a password which is hashed using bycrpt and if it is matched to the host's restaurant_id then login  /nis successful
On a successful login, a session is created /n
The session restaurant_id is used to authenticate update, delete and create functions /n
User can log out /n
Because host provides restaraunt_id, user can only login to the "account" of the website it is embedded on /n
 /n
 /n
What's left out /n
A more robust login / authentication system /n
  In my design the restaurant is effectively the "account", so theres no way for multiple users to manage the same restaurant  /nwithout sharing the password
 /n
API naming convention could be better organized /n
 /n
Not verifying host domain in displaying menu or embedding SDK /n
  While Create, Update and Delete are protected, anyone can take a restaurant_id and display that menu on their own site. A  /npossible solutions is verifying host domain in requests
  i.e. associate restaurant_id = 1 with a certain host origin domain and only allow sdk with restaurant_id = 1 to be embedded on  /nthose domains
 /n
Session storage is using express' default memory storage /n
 /n
Did not add in theme customizeabilty due to time /n
 /n
Did not make API url customizeable for SDK /n
  Since all data is hitting the same backend to access their menu, I didn't see a need for this small demo to have that  /ncustomizeable
 /n
  currently, fetching menu items isn't protected by restaraunt_id session because menu items are public info and it is not a  /nmajor concern
 /n
What AI helped with /n
basic scaffolding boilerplate /n
stack decisions /n
helped with shadowdom and SDK implementation /n
used to audit such as checking for end to end type contracts /n
fully spun up resaurant-sites styles and copy /n
 /n
Where I Overrode AI /n
Using Tailwind 3 vs Tailwind 4 /n
  When implemnting shadow dom .. tailwind styles were not being injected correctly into sdk but working on standalone menu-admin  /napp. Eventually codex recommended to manually enable each --tw--* style into the css. I eventually just used tailwind3 which did not have the injection problem
AI overtyped everything, specifcally on backend /n
  I decided to keep things simple type wise when possible /n
No users table /n
  Ai suggested a users table for authentication and public keys. I felt as though that was over engineering for this demo /n
AI wanted to modularize more than me, using a MVC approach to the backend, which I felt was uneccessary  /n
Suggested separate folder for SDK and just using an API /n