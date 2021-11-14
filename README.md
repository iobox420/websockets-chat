# Websockets-chat
Chat on MERN stack
# Connection to MongoDB
When choosing the connection string to mongo, you must select driver code for node js version 2.2.12 or later

# /server/.env example
```
JWT_ACCESS_SECRET = jwt-sec
JWT_REFRESH_SECRET = jwt-refresh-sec-key
SMTP_HOST = 
SMTP_PORT = 
SMTP_USER = 
SMTP_USER_SEND = 
SMTP_PASSWORD = 
API_URL = http://localhost:5001
CLIENT_URL = http://localhost:3000
OUTSIDE_CLIENT_URL = http://frolov.store/websockets-chat
OUTSIDE_API_URL = http://auth.frolov.store

MJ_APIKEY_PUBLIC = 
MJ_APIKEY_PRIVATE = 

WS_SERVER_PORT = 5000

```
# /client/src/config.js
```
const config = {
  WS_SERVER: 'http://localhost:5000/',
  AUTH_URL: 'http://localhost:5001/api',
};

export default config;

```
