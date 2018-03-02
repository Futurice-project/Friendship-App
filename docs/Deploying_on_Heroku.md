# Deploying on Heroku

1. [Install Heroku CLI on your computer.](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

2. Open your terminal.
3. Move to your local Back-End repository `$ cd /xyz/friendship-backend`
4. Write `heroku login` and then insert the friendship account and password.

```
$ heroku login
Enter your Heroku credentials.
Email: your@email.com
Password: yourpassword
```
5. The first time we use heroku we have to add the Heroku remote to our Git repository.
 ``$ heroku git:remote -a friendshipapp-backend``
**friendshipapp-backend** is the name of our app on Heroku.

6. Be sure that your repository have a clean working tree (Commit if you have to).
7. Push to Heroku
 ```
 $ git push heroku master
 ```
8. [you can login on the heroku website with the same email and password as shown above.](https://id.heroku.com/login)

9. In the app dashboard you can chose to host the Postgres Database on Heroku. Go to the ressource tab and install the Heroku Postgres Add-on.
(You shouldn't need to do it since we installed it already).
10. The configs variables can be edited and added in the settings tab. The main one for now are DATABASE_URL and SECRET. (Heroku add these two variables when you install the Heroku Posgres Add-on.)
11. To see if everything is running as expected you can check the logs.
On the top right of the dashboard there are two button: Open app and More.
click on **More** and then click to View logs.
From this page you can see if the server is running or if there are errors.
12. Lastly if you need to run command on the server you can either click on the **More** button in the dashboard or in your local terminal do:
```
$ heroku run bash
```

# list of encountered problems 

- I Had to use yarn to install the dependencies and I had to delete the files created by npm.
- When using `Heroku run bash` if you push a new master to heroku you have to restart the bash terminal.
- If you want to use DataGrip in the advanced properties of your data source you have to set ssl to true and sslfactory to org.postgresql.ssl.NonValidatingFactory