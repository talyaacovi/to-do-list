from flask import Flask, render_template, request, redirect, jsonify

app = Flask(__name__)

app.jinja_env.auto_reload = True

@app.route('/')
def home_page():
	return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
	email = request.form.get('email')
	password = request.form.get('password')

	# check DB if email exists and if password matches

@app.route('/signup-user', methods=['POST'])
def signup():
	email = request.form.get('email')
	password = request.form.get('password')

	

	return jsonify('hello')

if __name__ == "__main__":
	app.debug = True
	app.run(host='0.0.0.0')