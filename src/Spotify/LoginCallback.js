export default (callback) => {
    let url = window.location.href || null;

    if(url !== null){
    let url = new URL(window.location.href);
    let code = url.searchParams.get("code");

    fetch("https://spotify-web-auth.herokuapp.com/login/"+code)
    .then(response => response.json())
    .then(data => {
      if(typeof data.access_token !== 'undefined'){
        window.history.replaceState({}, document.title, "/");
        callback.onSuccessfulAuthorization(data.access_token);

        setInterval(() => {
          fetch("https://spotify-web-auth.herokuapp.com/refresh_token/"+data.refresh_token)
          .then(response => response.json())
          .then(data => {
            callback.onSuccessfulAuthorization(data.access_token);
          });
        }, 3590000);
      }
    });
  }
};

