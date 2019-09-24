# Bikepackers.net

#### Trello https://trello.com/b/NnzfBuHy/to-do

## clientside (frontend)

### dependencies

- axios
- react
- react-redux
- redux
- node-sass
- http-proxy-middle
- gravatar

### routes

- Home => "/" => AuthComponent.js
- Store = > "/store" Store.js
- Profile => '/user_profile" => Profile.js

### File-Structure

- src/
  - components/
    - AuthComponent.js
    - Store.js
    - Profile.js
  - App.js
  - App.scss
  - index.js
  - reset.css
  - setupProxy.js
  - dux/
    - store.js
    - reducer.js
- .env (outside src)

## serverside (backend)

### dependecies

    - express
    - express-session
    - dotenv
    - bcryptjs
    - mongoose
    - express-validator
    - config
    - jsonwebtoken
    - request
    - nodemon
    - concurrently

### server file structure

- server/
  - index.js
  - controller/
    - userController.js
    - authController.js
  - middleware/
    - middleware.js => session check

### endpoints

**auth**

- login: => /api/login
- register: => /api/register_user
- logout: => /api/logout
- userSession: => /api/user_info

**Bikepacking.net endpoints**

- get => /api/get_users
- get =>
- post => /api/profile
- delete => /api/posts

## secrets

```text
CONNECTION_STRING=
SESSION_SECRET=
SERVER_PORT=
```

# Bikepackers.net
