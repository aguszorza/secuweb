from werkzeug.security import generate_password_hash, check_password_hash

# ...
from app import db
from flask_login import UserMixin
from app import login
class User(db.Model):
    # ...

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        if password:
            return check_password_hash(self.password_hash, password)
        else :
            return false

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)


@login.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
