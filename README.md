Friendship app
===

Setup
-----

1. Clone this git repository
2. `cd friendship-app`
3. `yarn` or `npm install`
4. `yarn start` or `npm start`

Connect database from Android
-----------------------------

1. Install and run friendship-backend and database
2. Install Android Platform tools
  * On mac osx `brew install android-platform-tools`
3. Allow developer mode in your Android phone
4. Allow USB debugging in developer options of your phone
5. Connect your phone with USB to your development machine
6. Run on your development machine: `adb reverse tcp:3888 tcp:3888`

Generators
----------

You can use generators to automate tasks such as creating new components,
containers, views, etc...

Pepperoni app kit uses `plop` as its generator framework. All generators are
stored in `generators/` and any `.js` file is automatically loaded from this
directory. Feel free to create your own and modify existing generators
according to which common tasks you perform in your project!

### Generator setup

1. `yarn global add plop` or `npm install -g plop`
2. Run `plop` in the repository root
3. Follow the on-screen instructions!


#### Rest of documentation: TODO! :)
