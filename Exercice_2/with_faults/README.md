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

* /: A page without a special function. It has a logout link that will redirect you to /login

## Vulnerabilities

* In the login and registration forms, the fields username and email are vulnerable to XSS attack. If you add for example
the text `"> <script>alert("XSS")</script>` and you try to login/register yo will see an alert whose text is XSS.

* In the login form, the field username is vulnerable to sql injection. You can add for example the text `' or '1'='1'--`
or the text `username'--` (in this case username should be a valid username) and you would be able to login regardless
of the password you enter (the password can not be empty). It is necessary that there is at least one user in the database
for this to work since otherwise the request will not return any results. In the password field we can add also `' or '1'='1'--`
and it will log in.

* In the home page, the title shows the user's username. So it is vulnerable to XSS attack. If you register for example
with the text `"> <script>alert("XSS")</script>`, every time you refresh the page, you will get an alert. 

* The password is saved as a text instead of being a hash.

## Comments

* There is another branch with another sql injection vulnerability in which you can code like `a'); DELETE FROM user WHERE username='user1';--` 

* The password is not save as a hash because we must verify if the password sent is correct. To do this we must first
  obtain the user and then verify with a function whether the password is correct or not. As we could not perform several
  sql commands at the same time (explained in the previous point) we could not save the password as a hash since otherwise
  it would not be possible to have such a sql vulnerability that we have (login without having a username and password)

