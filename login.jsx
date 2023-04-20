import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
    const [accessToken, setAccessToken] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "560881356109-dr033lhpea54f28vm4cdgt2p3ikjtv0s.apps.googleusercontent.com",
        iosClientId: "560881356109-fbn2ekuk3ttchu77ceetdttio3jn17ha.apps.googleusercontent.com",
        androidClientId: "560881356109-uskjooad8nfghnln94bm8kl2lq4dgt1m.apps.googleusercontent.com"
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            setAccessToken(id_token);
            accessToken && fetchUserInformation();
           
        }
    }, [response, accessToken]);

  async function fetchUserInformation() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = () => {
    if(user) {
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
          <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
        </View>
      )
    }
  }  

  return (
    <View style={styles.container}>
      {user && <ShowUserInfo />}
      {user === null &&
          <>
          <Text style={{fontSize: 35, fontWeight: 'bold'}}>Welcome</Text>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'gray'}}>Please login</Text>
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
            }} 
        >
          <Text>Holaaaa</Text>
        </TouchableOpacity>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Login;



    