# Spam SMS Detection Mobile Application
This application has been developed to detect and filter SMS spam. With this application, we:
* Provide our users an SMS inbox which is much more relevant with respect to their interests.
* Make the SMS inboxes of our users neat and organized, thus sparing them time.
* Protect our users from the obtainment of their personal/confidential information use by SMS spammers and keyloggers via viruses and malicious software that are sent through spam SMS.

## Getting Started
First of all, this application only works on Android. So it is necessary to connect an Android phone to the computer. In order to connect an android phone to a computer and run the application, it is necessary to activate USB Debugging. More information: [Running your app on Android devices](https://reactnative.dev/docs/running-on-device)

## Installation
* Download the Visual Studio Code: [Download VS Code](https://code.visualstudio.com/download)
* Download the MySQL DB: [Download MySQL](https://www.mysql.com/downloads/)
* Open the VS Code and open terminal in VS Code. Clone the repository.
```
git clone https://github.com/CankayaUniversity/ceng-407-408-2019-2020-Spam-SMS-Detection.git
```
* Open MySQL and import the spam-sms-detection.sql file in the /SpamSmsDetection/spamSmsDetectionMobileApp/ directory into MySQL.
* Install Node.js and Node Package Manager(npm): [Install Node.js and npm](https://nodejs.org/en/)
* Check that you have node and npm installed.
```
node -v
npm -v
```
* Install React Native.
```
npm install -g react-native-cli
```
* Run the classifiers.py and test_score.py files in the /SpamSmsDetection/spamSmsDetectionMobileApp/api/ directory, respectively, by changing the csv file extensions in them.

![](https://github.com/CankayaUniversity/ceng-407-408-2019-2020-Spam-SMS-Detection/blob/master/img/classifiers.png) ![](https://github.com/CankayaUniversity/ceng-407-408-2019-2020-Spam-SMS-Detection/blob/master/img/test_score.png)

* Run the api.py file in the /SpamSmsDetection/spamSmsDetectionMobileApp/api/ directory by changing the csv file extension and database connections.

![](https://github.com/CankayaUniversity/ceng-407-408-2019-2020-Spam-SMS-Detection/blob/master/img/api.png)

* Search "serverUrl" text in the project folder and replace the all urls found in files with your computer's ip address.

![](https://github.com/CankayaUniversity/ceng-407-408-2019-2020-Spam-SMS-Detection/blob/master/img/ip_address.png)

* Open a new terminal and start the React Native.
```
cd /SpamSmsDetection/spamSmsDetectionMobileApp/android/
./gradlew clean
cd ..
react-native start --reset-cache
```
* Open a new terminal and run the application.
```
cd /SpamSmsDetection/spamSmsDetectionMobileApp/
react-native run-android
```
* And finally, the app will open on your phone.
