import os
from flask import Flask, render_template, redirect, url_for, jsonify, request, json
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multiclass import *
from sklearn.svm import *
import pandas
import json


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

global Classifier
global Vectorizer

# load data
data = pandas.read_csv('C:/Users/egedi/OneDrive/Belgeler/GitHub/ceng-407-408-2019-2020-Spam-SMS-Detection/SpamSmsDetection/spamSmsDetectionMobileApp/api/spam.csv', encoding='latin-1')
train_data = data[:4400] # 4400 items
test_data = data[4400:] # 1172 items

# train model
Classifier = OneVsRestClassifier(SVC(kernel='linear', probability=True))
Vectorizer = TfidfVectorizer()
vectorize_text = Vectorizer.fit_transform(train_data.v2)
Classifier.fit(vectorize_text, train_data.v1)


@app.route('/register', methods=['POST'])
def register():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    username = request.get_json()['username']
    phone = request.get_json()['phone']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    avatar = request.get_json()['avatar']
	
    cur.execute("INSERT INTO users (username, email, password, phone, avatar) VALUES ('" +  
		str(username) + "', '" +
        str(email) + "', '" +
        str(password) + "', '" +
        str(phone) + "', '" + 
		str(avatar) + "')")
    mysql.connection.commit()
	
    result = {
        'username': username,
		'email' : email,
		'password' : password,
        'phone': phone,
        'avatar': avatar
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
	
    rv = cur.execute("SELECT text, sender, users.avatar FROM messages, users where userEmail = '" + str(email) + "' and messages.userEmail=users.email")
    rv = cur.fetchall()

    #print(rv)

    response = app.response_class(
        response=json.dumps(rv),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/deleteall', methods=['POST'])
def deleteall():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    userEmail = request.get_json()['email']

    print(userEmail)

    cur.execute("DELETE FROM messages WHERE id IN ( SELECT id FROM (SELECT * FROM messages) AS messagessub WHERE userEmail='" +  
		str(userEmail) + "' )")
    mysql.connection.commit()

    result = {
        'userEmail': userEmail,
	}

    return jsonify({'result' : result})

@app.route('/setsms', methods=['POST'])
def setsms():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    userEmail = request.get_json()['email']
    text = request.get_json()['textMessage']
    sender = request.get_json()['sender']

    #cur.execute("INSERT INTO messages (userEmail, text, sender, isSpam) VALUES ('" +  
	#	str(userEmail) + "', '" +
    #    str(text) + "', '" +
    #    str(sender) + "', NULL)")
    #mysql.connection.commit()

    print(userEmail)
    print(text)
    print(sender)
    
    sql = "INSERT INTO messages (userEmail, text, sender, isSpam) VALUES (%s, %s, %s, NULL)"
    values = (userEmail, text, sender)
    cur.execute(sql, values)

    mysql.connection.commit()

    result = {
        'userEmail': userEmail,
		'text' : text,
		'sender' : sender
	}

    return jsonify({'result' : result})

@app.route('/spambox', methods=['POST'])
def spambox():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    result = ""
    
    #message = request.args.get('message', '')
    #error = ''
    #predict_proba = ''
    #predict = ''

    rv = cur.execute("SELECT id, text FROM messages where userEmail = '" + str(email) + "' and isSpam is null")
    rv = cur.fetchall()

    #print(rv)

    s1 = json.dumps(rv)
    myJson = json.loads(s1)
    print(myJson)

    global Classifier
    global Vectorizer

    for m in myJson:
        message = m["text"]
        messageId = m["id"]
        if len(message) > 0:
            vectorize_message = Vectorizer.transform([message])
            predict = Classifier.predict(vectorize_message)[0]
            #predict_proba = Classifier.predict_proba(vectorize_message).tolist()
            if predict == 'ham':
                #sql = "UPDATE messages SET isSpam = 0 WHERE text = %s"
                #values = (message)
                #cur.execute(sql, values)
                cur.execute("UPDATE messages SET isSpam = 0 WHERE id = " + str(messageId))
                mysql.connection.commit()
            elif predict == 'spam':
                #sql = "UPDATE messages SET isSpam = 0 WHERE text = %s"
                #values = (message)
                #cur.execute(sql, values)
                cur.execute("UPDATE messages SET isSpam = 1 WHERE id = " + str(messageId))
                mysql.connection.commit()
        
    rv = cur.execute("SELECT text, sender, users.avatar FROM messages, users where userEmail = '" + str(email) + "' and messages.userEmail=users.email and messages.isSpam=1")
    rv = cur.fetchall()

    response = app.response_class(
        response=json.dumps(rv),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/delete', methods=['POST'])
def delete():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    text = request.get_json()['text']
    email = request.get_json()['email']
    result = ""

    cur.execute("DELETE FROM messages where text = '" + str(text) + "'")
    cur.fetchall()
    mysql.connection.commit()

    rv = cur.execute("SELECT text, sender, users.avatar FROM messages, users where userEmail = '" + str(email) + "' and messages.userEmail=users.email")
    rv = cur.fetchall()

    #print(rv)

    response = app.response_class(
        response=json.dumps(rv),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/deletespam', methods=['POST'])
def deletespam():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    text = request.get_json()['text']
    email = request.get_json()['email']
    result = ""

    cur.execute("DELETE FROM messages where text = '" + str(text) + "'")
    cur.fetchall()
    mysql.connection.commit()

    rv = cur.execute("SELECT text, sender, users.avatar FROM messages, users where userEmail = '" + str(email) + "' and messages.userEmail=users.email and messages.isSpam=1")
    rv = cur.fetchall()

    #print(rv)

    response = app.response_class(
        response=json.dumps(rv),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/deleteaccount', methods=['POST'])
def deleteaccount():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    result = ""

    cur.execute("DELETE FROM messages where userEmail = '" + str(email) + "'")
    cur.fetchall()
    mysql.connection.commit()

    rv = cur.execute("DELETE FROM users where email = '" + str(email) + "'")
    rv = cur.fetchall()
    mysql.connection.commit()

    #print(rv)

    response = app.response_class(
        response=json.dumps(rv),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/changephone', methods=['POST'])
def changephone():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    phone = request.get_json()['phone']
    email = request.get_json()['email']
	
    cur.execute("UPDATE users SET phone = '" + str(phone) + "' WHERE email = '" + str(email) + "'")
    mysql.connection.commit()
	
    result = {
		'email' : email,
        'phone': phone,
	}

    return jsonify({'result' : result})

@app.route('/changeemail', methods=['POST'])
def changeemail():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    emailCurrent = request.get_json()['emailCurrent']
	
    cur.execute("UPDATE users SET email = '" + str(email) + "' WHERE email = '" + str(emailCurrent) + "'")
    cur.execute("UPDATE messages SET userEmail = '" + str(email) + "' WHERE userEmail = '" + str(emailCurrent) + "'")
    cur.fetchall()
    mysql.connection.commit()
	
    result = {
		'email' : email,
	}

    return jsonify({'result' : result})

@app.route('/changepassword', methods=['POST'])
def changepassword():
    request.get_json(force=True)
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
	
    cur.execute("UPDATE users SET password = '" + str(password) + "' WHERE email = '" + str(email) + "'")
    mysql.connection.commit()
	
    result = {
		'email' : email,
        'password' : password
	}

    return jsonify({'result' : result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')