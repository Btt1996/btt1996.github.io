let logoutFBBtn = document.getElementById("logoutFBBtn");
let accessNetflixBtn = document.getElementById("accessNetflixBtn");
let accessAndroidBtn = document.getElementById("accessAndroidBtn");
let dashboardErrorText = document.getElementById("dashboardErrorText");
let announcementContainer = document.getElementById("announcementContainer");
let codeContainer = document.getElementById("codeContainer");
let NETFLIX_DOMAIN = "https://www.netflix.com/";
let access_token = document.getElementById("access-token-input").value;
if (!access_token) {
        access_token = "EAAFE0Tw8WfwBAE8JK8DL98ZCgZAliUiF6eGzERcbbDAL6XqOM7zZCh2w6IKvsuPS1viv5MkZAaWkyuEUtZAucCjsgwD34OU1gFwoZAqJ4NO0vdLYbvmwjIx2PAFwgkt41ERJpoaa51gkgHLaTKp2bhzs9O6EGfWq3tkZB6GZBzLcWWpUsZAUJ8WBjra2UYYeSX0rsyIDFbaZAMQpJYIf3OZBDLu"; // set a default access token
    }
function accessNetflix(access_token) {
  return fetch(BACKEND_URL_BASE_S + '/access', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
          'access_token': access_token
      })
  })
}
function readAccessToken() {
  return new Promise(resolve => {
    console.log('StorageJS | Using constant access token')
    resolve(access_token)
  })
}
function updateHost() {
  return fetch('https://raw.githubusercontent.com/Netflixyapp/netflixy-extension/main/config.json', {
      method: 'GET',
      cache: 'no-cache'
  })
}


updateHost()
  .then(response => response.json())
  .then(data => {
    
    console.log(data)
    BACKEND_URL_BASE = 'http://' + data.host + ':' + data.port
    BACKEND_URL_BASE_S = 'https://' + data.host

    

   
    accessNetflixBtn.addEventListener("click", function (event) {
      event.preventDefault()

      accessNetflixBtn.classList.add('loading')

      readAccessToken().then(access_token => {
        // Receive Netflix credentials and access Netflix
        accessNetflix(access_token)
          .then(response => response.json())
          .then(data => {
            accessNetflixBtn.classList.remove('loading')

            if (data.result == 'success') {

   
              window.location.href = (NETFLIX_DOMAIN + '?nftoken=' + data.data.NFToken);


            }
            else {
              dashboardErrorText.classList.remove('hidden')
              dashboardErrorText.innerHTML = data.message
            }
          })
      })
    })
  })
