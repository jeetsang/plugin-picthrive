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
3.Start the app with pm2
 ```
 pm2 start index.esm.js
  ```
##### Run test:
 ```
 npm test
  ```
