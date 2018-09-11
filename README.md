# plugin-picthrive
PicThrive Plugin for Xola App Store

### Setup:
##### Register app:
1. Use `manifest\register_app.json` payload structure to register this app with **elrond**.

##### Update Configs:
2. Copy `config\default.json.` to `config\local.json` and update the configs in `config\local.json` accordingly. 
 

##### Setup:
1.Install server dependencies
```
npm install
```
2.Start the app with npm
 ```
 npm run start
  ```
##### Run test:
 ```
 npm test
  ```
##### Run the app with pm2 for environment like sandbox, production etc.
 ```
 pm2 start index.esm.js
  ```
