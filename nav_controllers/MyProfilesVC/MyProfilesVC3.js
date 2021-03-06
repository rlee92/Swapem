'use strict';
// Login UI components
exports.FBSDKLoginButton = require('../../node_modules/react-native-fbsdklogin/js-ui/FBSDKLoginButton.ios.js');

// Login native modules
exports.FBSDKLoginManager = require('../../node_modules/react-native-fbsdklogin/js-modules/FBSDKLoginManager.ios.js');

var React = require('react-native');
var FBSDKCore = require ('react-native-fbsdkcore');
var FBSDKLogin = require('react-native-fbsdklogin');
var FBURL;
var FBName;


var {
  FBSDKLoginButton,
    FBSDKLoginManager,
} = FBSDKLogin;

var {
  FBSDKAccessToken,
  FBSDKGraphRequest,
  FBSDKGraphRequestManager,
} = FBSDKCore;

var {
  Text,
  StyleSheet,
  Component,
  View, 
  LinkingIOS,
} = React;

var styles = StyleSheet.create({
  redirect: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'center',
    margin: 10,
  },
});


class MyProfilesVC3 extends Component { 
  render() {
    return (
      <View>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
                if (result.isCanceled) {
                  alert('Login cancelled.');
                  } else {
                    alert('Logged in.');
                    var token = new FBSDKAccessToken.getCurrentAccessToken(token => 
                      console.log (token, 'Type of Token is:' + typeof token));
                    }
                  }
                }
            }
            onLogoutFinished={() => alert('Logged out.')} 
            readPermissions={[]}
            publishPermissions={['publish_actions']}/>
            <Text style={styles.redirect} onPress = {() => LinkingIOS.openURL(FBURL)}>
              {FBName}
            </Text>
      </View>
    );
  }
}


var fetchURL = new FBSDKGraphRequest ((error, result) => {
  if (error) {
    // alert('Error making request');
    } else {
      console.log('FBSDKGraphRequest', error, result);
      // alert(JSON.stringify(result.link));
      FBURL = (result.link);
      FBName = (JSON.stringify(result.name));
      }
    }, 'me?fields=link,name');
FBSDKGraphRequestManager.batchRequests([fetchURL], function() {}, 60);


FBSDKLoginManager.setLoginBehavior('native');
FBSDKLoginManager.logInWithReadPermissions([], (error, result) => {
  if (error) {
    alert('Error logging in.');
  } else {
    if (result.isCanceled) {
      alert('Login cancelled.');
    } else {
      alert('Logged in.');
    }
  }
});


module.exports = MyProfilesVC3;
