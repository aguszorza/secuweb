from app import app, db
from flask import request, jsonify
from app.models import User
from flask_login import login_user, logout_user, login_required

REGISTER_ERROR = {'in_use': 'The username or the email is already in use',
                  'empty_fields': 'You must fill all the fields'
                  }

LOGIN_ERROR = "Username or password incorrect"


@app.route('/')
@app.route('/index')
@login_required
def index():
    response = {
        'content': 'You conected with our service. We are making some changes so the page is not available for the moment.',
    }
    return jsonify(response), 200


@app.route('/login')
def login():
    username = request.args.get('username', None)
    password = request.args.get('password', None)
    if not username or not password:
        return jsonify(create_error(LOGIN_ERROR)), 404
    user = get_user(username, password)
    if user:
        login_user(user)
        return '', 204
    return jsonify(create_error(LOGIN_ERROR)), 404


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
            return '', 204
    return jsonify(create_error(error_message)), 404


@app.route('/logout')
def logout():
    logout_user()
    return '', 204


def get_user(username, password):
    try:
        result = User.query.filter_by(username=username).first()
    except Exception:
        return None
    if result and result.check_password(password):
        return result
    return None


def save_user(email, username, password):
    try:
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return True
    except Exception:
        return False


def create_error(error_message):
    success = False
    response = {
        'success': success,
        'error': {
            'message': error_message
        },
    }
    return response
