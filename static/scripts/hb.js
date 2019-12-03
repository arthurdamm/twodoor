const HB_URL = "https://intranet.hbtn.io";

let authToken;

const request_json = {
  api_key: getapikey(),
  email: getemail(),
  password: getpassword(),
  scope: "random_peers"
};

const authenticationRequest = json => ({
  async: true,
  crossDomain: true,
  url: `${HB_URL}/users/auth_token.json`,
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  data: JSON.stringify(json)
});


const authenticateUserHB = () => {
  $.ajax(authenticationRequest(request_json))
    .done(({ _authToken }) => {
      authToken = _authToken;
      console.log("Authentication successful:", authToken);
    })
    .fail(() => {
      console.log("Authentication failed.");
    });
}
