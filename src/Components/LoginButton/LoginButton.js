// import React from 'react';
// import "./LoginButton.css";

// class LoginButton extends React.Component {



//     render() {
//         return (
//             <div>
//                 <button className="loginButton">Log Into Spotify</button>
//             </div>
//         )
//     }
// };

// export default LoginButton;
const clientId = 'b2449bd311864d219aaba1dff293ce35';
const redirectUri = 'http://skinny-wood.surge.sh';
const scopes = 'user-top-read';

const SpotifyLogin = {
    login() {
        let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')
        
        window.spotifyCallback = (payload) => {
          // alert(payload)
          
          popup.close()
          
          fetch('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': `Bearer ${payload}`
            }
          }).then(response => {
            return response.json()
          }).then(data => {
            this.me = data
          })
        }
    },

    mounted() {
        const token = window.location.hash.from(1).split('&')[0].split("=")[1]
        
        if (token) {
          // alert(this.token)
          
          window.opener.spotifyCallback(token)
        }
    }

};

export default SpotifyLogin;