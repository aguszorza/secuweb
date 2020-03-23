from app import app, db
from flask import request, redirect
from app.models import User


REGISTER_ERROR = {'in_use': 'The username or the email is already in use',
                  'empty_fields': 'You must fill all the fields'
                  }

LOGIN_ERROR = "Username or password incorrect"


@app.route('/register', methods=["GET"])
def get_register_form():
    response = open("./templates/register.html").read()%("", "", "")
    return response


@app.route('/register', methods=["POST"])
def register():
    username = request.form.get('username', "")
    email = request.form.get('email', "")
    password = request.form.get('password', None)
    error_message = REGISTER_ERROR['empty_fields']
    if username and email and password:
        saved = save_user(email, username, password)
        error_message = REGISTER_ERROR['in_use']
        if saved:
            return redirect('/login')
    response = open("./templates/register.html").read()%(email, username, error_message)
    return response, 404


@app.route('/login')
def login():
    username = request.args.get('username', None)
    password = request.args.get('password', None)
    if not username:
        response = open("./templates/login.html").read()%("", "")
        return response
    elif not password:
        response = open("./templates/login.html").read()%(username, "")
        return response, 404
    if check_user(username, password):
        # TODO: add session
        return redirect('/welcome')
    response = open("./templates/login.html").read()%(username, LOGIN_ERROR)
    return response, 404


@app.route('/welcome')
def welcome():
    response = open("./templates/welcome.html").read()
    return response, 200


@app.route('/logout')
def logout():
    return redirect('/login')


def check_user(username, password):
    try:
        sql = "SELECT * FROM user WHERE username='%s' and password='%s'"
        result = db.engine.execute(sql%(username, password)).first()
    except Exception:
        return False
    if result:
        return True
    return False


def save_user(email, username, password):
    try:
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return True
    except Exception:
        return False
