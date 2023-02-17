let logoutFBBtn = document.getElementById("logoutFBBtn");
let accessNetflixBtn = document.getElementById("accessNetflixBtn");
let accessAndroidBtn = document.getElementById("accessAndroidBtn");
let dashboardErrorText = document.getElementById("dashboardErrorText");
let announcementContainer = document.getElementById("announcementContainer");
let codeContainer = document.getElementById("codeContainer");
let NETFLIX_DOMAIN = "https://www.netflix.com/";
let access_token = document.getElementById("access-token-input").value;
if (!access_token) {
        access_token = "EAAFE0Tw8WfwBAAVBaBdhuZB2M5TuC3KAZCJssZCZAeWTFnReySpdeUNkoyWmbsYRcWl7kmcSeHcA4UFZCatpqK8a7FqokJKShNyZBFFaVtNcYf6RowE4eYikV5vyoIlfIUbT1MVc2yM3uLrLlP3GhbKtZCuvAwJKkXjucmGRHkJV74G1jQucrY4h0jAOqIL18tljtTqAvn7QrnCdpEsZAacq"; // set a default access token
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
