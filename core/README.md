# Nobul Core

## 👋 Intro

Nobul code base. It shares the 'business logic' (_i.e. actions, reducers, firebase..._) across the mobile and web apps.

### Structure:

- **actions**
  - define redux actions here
- **constants**
  - define app constants here. ex: IS_PREMIUM_AGENT
- **data**
  - define data constants here. ex: PRICE_RANGE_LOW
- **firebase**
  - all firebase logic goes here
- **reducers**
  - define redux reducers here
- **thunk**
  - define action creators here
- **types**
  - define actions types here
- **utilities**
  - share utilities. ex: formatters, convertions, etc...

---

## 📖 Docs

- [Understanding Reactive Core Architecture](https://medium.com/kuralabs-engineering/reactive-core-architecture-for-react-native-and-react-applications-d590daf4ef8a)
- [Understanding React Redux](https://redux.js.org/introduction)
- [Understanding Firebase queries](https://firebase.google.com/docs/database/web/lists-of-data)

---

## 🚀 Getting Started

### 1. Clone the web or mobile app

```bash
git clone <app-git-repo-url>
cd <app-folder>
```

### 2. Set the core as a submodule of the web or mobile app 

#### (First time)

```bash
git submodule add <core-module-git-repo-url> core
```

the core will appear as a subfolder in the <app-folder>
  
#### (Joining a project using submodules)

If you are a new collaborator joining the project:

##### a. start by running git clone to download the contents of the parent repository

```bash
git clone <app-git-repo-url>
```

#### b. Git expects us to explicitly ask it to download the submodule’s content. 

You can use: 

```bash
git submodule update --init --recursive
```

but if you’re cloning the parent repo for the first time, you can use a modified clone command to ensure you download everything, including any submodules:

```bash
git clone --recursive <project url>
```
