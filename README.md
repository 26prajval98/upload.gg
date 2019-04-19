# upload.gg
___

## Self file hosting service with high data privacy

File uploading service with file ecryption and selected sharing <br/>

### Steps to reproduce:
* Add your build config in server 
	<b> server > config.js </b>
  <br />
  <code>
  		exports.secretKey = *some-secret-key*; <br/>
   		exports.uri = *mongodb-uri*;
  </code>
* Create the folders as shown below inside server > public
```
server
|
+--- public
    |
    +--- files
    |
    +--- decrypt

```
* Setting Up:
  1. Client:
		* npm install
		* npm start
  2. Server
		* npm install
		* nodemon / node app.js



# **upload.gg**

MIT Lisence