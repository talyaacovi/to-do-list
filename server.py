from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db = SQLAlchemy()

app.jinja_env.auto_reload = True



@app.route('/login', methods=['POST'])
def login():
	email = request.form.get('email')
	password = request.form.get('password')

	sql = """SELECT password FROM users WHERE email = :email"""

	cursor = db.session.execute(sql, {'email': email} )

	db_password = cursor.fetchone()
	
	if db_password[0] == password:
		msg = 'success'
	else:
		msg = 'wrong password'

	return jsonify(msg)

	# check DB if email exists and if password matches

@app.route('/signup-user', methods=['POST'])
def signup():
	email = request.form.get('email')
	password = request.form.get('password')

	sql = """INSERT INTO users (email, password)
			 VALUES (:email, :password)"""

	db.session.execute(sql, {'email': email,
							 'password': password} )
	db.session.commit()

	return jsonify('success');

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
	return render_template('index.html')


def connect_to_db(app, db_uri='postgresql:///todoapp'):
	app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
	app.config['SQLALCHEMY_ECHO'] = False
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
	app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

	db.app = app
	db.init_app(app)

if __name__ == "__main__":
	app.debug = True
	connect_to_db(app)
	app.run(host='0.0.0.0')