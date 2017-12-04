# Publishing on Expo

1. [Download and install Expo XDE](https://expo.io/tools)
2. It is possible to change the privacy of the project. It can be either `public` or `unlisted`.
By default it's public, to set the privacy to unlisted you have to change the file `app.json` in the root folder of your project. Set the key "privacy" to "unlisted".

	```json
	{
	  "expo": {
	    "sdkVersion": "19.0.0",
	    "privacy": "unlisted"
	  }
	}
	```

2. Launch Expo XDE and Sign in with the friendshipapp account.
3. Start the friendship project
4. On the top right of Expo XDE there is Publish button. Simply click on it and say yes. After a few seconds you will see a link in the Expo XDE terminal.
5. Open the link, you will be redirected to the Expo website and see a QR code.
6. Scan the QR code with the Expo app on your phone.
7. Done !