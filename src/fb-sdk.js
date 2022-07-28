const initFacebookSdk = () => {
  window.fbAsyncInit = function () {
    FB.init({
      appId: process.env.VUE_APP_FACEBOOK_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v13.0'
    })
    FB.AppEvents.logPageView()
  };
  
  // Facebook SDK
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

export default initFacebookSdk;