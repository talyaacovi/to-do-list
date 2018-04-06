from flask import Flask, render_template, request, redirect

app = Flask(__name__)

app.jinja_env.auto_reload = True

@app.route('/')
def home_page():
	return render_template('homepage.html')

@app.route('/login', methods=['POST'])
def login():
	email = request.args.get('email')
	password = request.args.get('password')

	# check DB if email exists and if password matches

@app.route('/signup-user', methods=['POST'])
def signup():
	email = request.args.get('email')
	password = request.args.get('password')

if __name__ == "__main__":
	app.debug = True
	app.run(host='0.0.0.0')