# Nobul web

## Understanding the file structure

- `/config` - Global configuration file
  - `/pm2` - folder for pm2 scripts for runing app
    - `development.json` - pm2 scripts
- `/src` - Contains the source code for web

  - `/client` - For development

    - `index.ejs` - html template
    - `index.js` - component to render the app

  - `/images`- Images

  - `/locale` - Language translations

  - `/routes` - Routes folder

    - `routes.js` - Contains the routes

  - `/components` - Contains ALL the components used through the app (With the exception of shared components like Form fields, etc.)

    - `/Sample` - A sample component that is used somewhere in the app (Ex: PictureCarousel)
      - `index.js` - Exports the component
      - `styles.scss` - Contains the styles for the component

  - `/scenes` - Containers and Components are here

    - `/sample` - Name of the web-page (Ex: AgentLogin)
      - `connector.js` - Only gets required data from the Store
      - `container.js` - The actual business logic for the webpage. Handles local state if any, and imports any required components from the `Components` directory
      - `index.js` - Exports the Scene for use by routers, etc.
      - `styles.scss` - SCSS

  - `/shared` - Shared components for the App

  - `/utilities` - Functions that are commonly used in the app or serve to format data in some way

  - `/store` - Setup Redux store

  - `/theme` - Configure theme for the app

  - `/server` - Server Side Rendering folder

    - `index.js` - html template
    - `render.js` - Exspress app for Server Side Rendering
    - `store.js` - functions to initialize the redux state

  - `/test` - All test configuration and cases

## 🚀 Getting Started

### 1. Clone and Install

#### 1.1. Prerequisite

```bash
# install pm2 globally before you use production mode
# pm2 will monitor the status of app

npm install -g pm2
```

#### 1.2. Clone the web app

```bash
# Clone the repo
git clone --recurse-submodules -j8 `web-app-git-url`

cd <web-app>

# Install dependencies
`yarn install`
```

### 2. Setting .env variables

- Define the envirnoment variables by creating .env.development using Firebase credentials. Please contact your team lead or supervisor to obtain these credientials.

- During development, you can force the app to pick up the required environment file by changing the configuration in wepack.client.config.js. `DO NOT COMMIT THIS CHANGE TO SOURCE CONTROL`

- These variables can be accessed throughout the project using `process.env.<variable_name>`

- For example: `process.env.DB_NAME`

If you move into core folder and execute the following command, you should see that the core lives in its own repository and has its own source control:

```bash
git remote show origin
```

`Always make a new branch in the 'Core' repository while working on the Core folder. This is very important to remember!`

You may note that it’s pointing to the core module repository. If you make changes within the core folder, commit them and push them, they will be reflected in that repository.

The core is linked to any parent repository via Git submodules. The parent respository references a certain commit of the Core repository (you can to go Web and click on Core and see what happens). It is very important to maintain this link between parent and core repository.

#### 3.1. Start the App (Development mode)

```bash
# START IN DEVELOPMENT MODE
make dev
```

sometimes you may encounter "port 8080 in use" error (webpack-dev-server's default port is 8080), you can use the command below to clean the port (Mac and Linux)

```bash
# CLEAN DEVELOPMENT PORT
lsof -t -i:8080

kill -9 {PROCESS_ID_LISTED_BY_ABOVE_CMD}
```

#### 3.2. Start the App (Production mode)

```bash
# START IN PRODUCTION MODE
make start
```

```bash
# STOP PRODUCTION APP
make stop
```

```bash
# ZVIEW PRODUCTIO LOGS
pm2 log
```
