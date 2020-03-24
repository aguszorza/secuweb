# Application with faults

##Setup

* Run: `python3 -m venv venv`
* Run: `source venv/bin/activate` 
* Run: `pip install -r requirements.txt`
* Run: `flask db init`
* Run: `flask db migrate`
* Run: `flask db upgrade`

* To execute the program run: `flask run`

## Endpoints

* /login: You will see a form asking for the username and the password. If the data entered is correct you will be
redirected to /welcome 

* /register: You will see a form asking for the username, the email and the password. If the user and email are new you
will be registered and redirected to /login

* /welcome: A page without a special function. It has a logout link that will redirect you to /login

## Vulnerabilities

* In the login and registration forms, the fields username and email are vulnerable to XSS attack. If you add for example
the text `"> <script>alert("XSS")</script>` and you try to login/register yo will see an alert whose text is XSS.

* In the login form, the field username is vulnerable to sql injection. You can add for example the text `' or '1'='1'--`
or the text `username'--` (in this case username should be a valid username) and you would be able to login regardless
of the password you enter (the password can not be empty). It is necessary that there is at least one user in the database
for this to work since otherwise the request will not return any results. In the password field we can add also `' or '1'='1'--`
and it will log in.

* In the register form, the field password is vulnerable to sql injection. You can add for example the text
`a'); delete from user where username='user1';--` and you would delete the user whose username is user1 from the database.

* The password is saved as a text instead of being a hash.

## Comments

* In the code we have two database libraries (sqlite3 and SqlAlchemy) because SqlAlchemy allows us to create the database
and the migrations of the new tables in an easy way. SqlAlchemy is used only for that to avoid setting and creating the 
database by hand. For all the requests (login and register) the program uses sqlite3 when it interacts with the database.

* The password is not save as a hash because we must verify if the password sent is correct. To do this we must first
  obtain the user and then verify with a function whether the password is correct or not. If we save the password as a
  hash we would not be able to have an sql vulnerability in the login form.
