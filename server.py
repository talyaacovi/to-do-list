from flask import Flask, render_template, request, redirect, jsonify, session
from flask_sqlalchemy import SQLAlchemy
import os
import requests

API_KEY = os.environ['TMDB_API_KEY']

app = Flask(__name__)

db = SQLAlchemy()

app.jinja_env.auto_reload = True
app.secret_key = "ABC123"



@app.route('/login', methods=['POST'])
def login():
	email = request.form.get('email')
	password = request.form.get('password')

	sql = """SELECT password, id FROM users WHERE email = :email"""

	cursor = db.session.execute(sql, {'email': email} ).fetchone()

	db_password, uid = cursor
	
	if db_password == password:
		msg = 'success'
		session['user_id'] = uid
	else:
		msg = 'wrong password'

	return jsonify({ 'msg': msg, 'uid': uid })

@app.route('/get-tasks')
def get_tasks():
	print 'in get tasks route!'
	uid = request.args.get('userid')
	sql = """SELECT description FROM items WHERE user_id = :uid"""

	cursor = db.session.execute(sql, {'uid': uid} )
	items = cursor.fetchall()

	items = map(lambda x: x[0], items)
	print items

	return jsonify({'tasks': items})

@app.route('/add-task', methods=['POST'])
def add_task():
	task = request.form.get('task')
	user_id = request.form.get('userid')
	sql = """INSERT INTO items (description, user_id) VALUES (:description, :user_id)"""

	db.session.execute(sql, {'description': task, 'user_id': user_id} )
	db.session.commit()

	cursor = db.session.execute("SELECT description FROM items WHERE user_id = :id", {'id': user_id} )
	items = cursor.fetchall()

	items = map(lambda x: x[0], items)

	return jsonify(items)

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

@app.route('/movie-api')
def search_movies():
	term = request.args.get('term')
	url = 'https://api.themoviedb.org/3/search/movie'
	disc_url = 'https://api.themoviedb.org/3/discover/movie'

	payload = {
		'api_key': API_KEY,
		'query': term
	}

	disc_payload = {
		'api_key': API_KEY,
		'sort_by': 'popularity.desc'
	}

	r = requests.get(url, params=payload)
	data = r.json()

	disc = requests.get(disc_url, params=disc_payload)
	disc_data = disc.json()

	return render_template('movies.html', movies=data['results'], discover=disc_data['results'])


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
	app.run(host='0.0.0.0', threaded=True)