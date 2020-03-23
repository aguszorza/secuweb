from app import app, db
from app.models import User
from flask import request


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route('/register', methods=["POST"])
def register():
    username = request.args.get('username', None)
    email = request.args.get('email', None)
    password = request.args.get('password', None)
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return "", 204


@app.route('/login')
def login():
    username = request.args.get('username', None)
    password = request.args.get('password', None)
    if not username:
        response = open("./templates/login.html").read()%("")
        return response, 404
    elif not password:
        response = open("./templates/login.html").read()%(username)
        return response, 404
    if check_user(username, password):
        # TODO: add session
        return "ok", 200
    response = open("./templates/login.html").read()%(username)
    return response


def check_user(username, password):
    result = User.query.filter_by(username=username).first()
    if result and password:
        return result.check_password(password)
    return False
