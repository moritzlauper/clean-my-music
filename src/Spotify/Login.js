export default {
  logInWithSpotify: (() => {
    let client_id      = "50d472ee49114398bd218d62d9a88061";
    let redirect_uri   = "http://localhost:3000";
    let scopes         = "streaming user-read-private user-modify-playback-state playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-playback-state";
    let scopes_encoded = scopes.replace(" ", "%20");

    window.location = [
      "https://accounts.spotify.com/authorize",
      `?client_id=${client_id}`,
      `&redirect_uri=${redirect_uri}`,
      `&scope=${scopes_encoded}`,
      "&response_type=code",
      "&show_dialog=true"
    ].join('');
  })
};