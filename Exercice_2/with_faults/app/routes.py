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


@app.route('/check')
def check():
    username = request.args.get('username', None)
    result = User.query.filter_by(username=username).first()
    if result:
        return "ok", 200
    return "error", 404
