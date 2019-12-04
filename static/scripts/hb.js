const HB_URL = "https://intranet.hbtn.io";

let authToken;

let getemail = () => $("[name=holbie-email]").val();
let getpassword = () => $("[name=holbie-password]").val();
let getapikey = () =>  $("[name=holbie-apikey]").val();

const requestJson = () => ({
  api_key: getapikey(),
  email: getemail(),
  password: getpassword(),
  scope: "random_peers"
});

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

const randomPeersRequest = (authToken, number, cohorts) => ({
  async: true,
  crossDomain: true,
  url: `${HB_URL}/users/random_peers.json`,
  method: 'GET',
  data: {
    auth_token: authToken,
    number: number,
    cohorts: cohorts,
  }
});

const authenticateUserHB = () => {
  $.ajax(authenticationRequest(requestJson()))
    .done(({ auth_token }) => {
      authToken = auth_token;
      console.log("Authentication successful:", authToken);
      $('.holbie-status').html('Authentication successful...');
      populateRandomPeers();
    })
    .fail(() => {
      console.log("Authentication failed.");
      $('.holbie-status').html('Authentication failed!');
    });
};

const getRandomPeers = () => {
  $.ajax(randomPeersRequest(authToken, 5, 8))
    .done(data => console.log("PEERS:", data))
    .fail(data => console.log("PEERS FAILED:", data));
};

const populateRandomPeers = () => {
  $.ajax(randomPeersRequest(authToken, 5, 8))
    .done(data => {
      console.log("POPULATE PEERS:", data);
      const _deck = data.map(o => ({
        question: "Who is this?",
        answer: o.full_name + "<br>" + o.cohort,
        image: o.picture,
        regex: o.full_name.replace(/ /g, "|") + "|" +
          unidecode(o.full_name.replace(/ /g, "|")),
      }));
      const deck = {
        deckName: "Holbie",
        deck: _deck
      }
      $('.game-component')[0].deckType = decks.BUILDER;
      $('.game-component')[0].deckText = JSON.stringify(deck);
      showGame();
    })
    .fail(data => console.log("PEERS FAILED:", data));
};
