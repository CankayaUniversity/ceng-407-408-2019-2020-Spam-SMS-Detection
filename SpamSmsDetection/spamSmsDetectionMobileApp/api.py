from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345'
app.config['MYSQL_DB'] = 'spam_sms_detection'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/register', methods=['POST'])
def register():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    username = request.get_json()['username']
    phone = request.get_json()['phone']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
	
    cur.execute("INSERT INTO users (username, email, password, phone) VALUES ('" +  
		str(username) + "', '" +
        str(email) + "', '" +
        str(password) + "', '" + 
		str(phone) + "')")
    mysql.connection.commit()
	
    result = {
        'username': username,
		'email' : email,
		'password' : password,
        'phone': phone
	}

    return jsonify({'result' : result})
	

@app.route('/login', methods=['POST'])
def login():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
	
    cur.execute("SELECT * FROM users where email = '" + str(email) + "'")
    rv = cur.fetchone()
	
    if bcrypt.check_password_hash(rv['password'], password):
        access_token = create_access_token(identity = {'email': rv['email']})
        result = access_token
    else:
        result = jsonify({"error":"Invalid email and password"})
    
    return result

@app.route('/home', methods=['POST'])
def home():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    result = ""
	
    rv = cur.execute("SELECT text, sender FROM messages where userEmail = '" + str(email) + "'")
    rv = cur.fetchall()

    print(rv)

    response = app.response_class(
        response=json.dumps(rv),
        status=200,
        mimetype='application/json'
    )
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')