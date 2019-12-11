const HB_URL = "https://intranet.hbtn.io";

const MAX_POLL_COUNT = 20;

/**
 * Enum for cohort types
 * @readonly
 * @enum {string}
 */
const cohorts = {
  8: ['NHV-0119', 'BOG-0119', 'SF-0119']
};

let authToken;

let peerCache = {};
let lastCacheSize = 0;
let pollCount = 0;
let stopPoll = false;

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
      // repopulateRandomPeers();
      showHolbie();
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
        regex: o.full_name.trim().replace(/( )+/g, "|") + "|" +
          unidecode(o.full_name.trim().replace(/( )+/g, "|")),
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

const repopulateRandomPeers = () => {
  console.log("repopulateRandomPeers()");
  if (stopPoll || ++pollCount > MAX_POLL_COUNT) return;
  $.ajax(randomPeersRequest(authToken, 5, 8))
    .done(data => {
      printObj(data);
      data = data.filter(o => !peerCache[o.cohort] || !peerCache[o.cohort][o.full_name]);
      const _deck = data.map(o => ({
        ...o,
        question: "Who is this?",
        answer: o.full_name + "<br>" + o.cohort,
        image: o.picture,
        regex: o.full_name.trim().replace(/( )+/g, "|") + "|" +
          unidecode(o.full_name.trim().replace(/( )+/g, "|")),
      }));
      _deck.forEach(o => ((!peerCache[o.cohort] && (peerCache[o.cohort] = {})),
        peerCache[o.cohort][o.full_name] = o));
      console.log("REPOPULATE PEERS: " + Object.keys(peerCache).length);
      updateDeckFromCache();
      // if (!peerCache['SF-0119'] || Object.keys(peerCache['SF-0119']).length < 20)
      //   repopulateRandomPeers();
    })
    .fail(data => console.log("REPEERS FAILED:", data));
};

const updateDeckFromCache = () => {
  console.log("updateDeckFromCache()");
  const _deck = Object.values(peerCache['SF-0119'] || {});
  if (_deck.length <= lastCacheSize)
    return console.log("lastCacheSize fail");
  lastCacheSize = _deck.length;
  const deck = {
    deckName: "Holbie",
    deck: _deck,
  };
  $('.game-component')[0].deckType = decks.BUILDER;
  $('.game-component')[0].deckText = JSON.stringify(deck);
  $('.game-component')[0].updateDeck(loadDeck($('.game-component')[0].deckType));
  showGame();
}

const printObj = (obj) => {
  str = '';
  if (obj.length > 0) {
    str += '[';
    for (let e of obj)
      str += `${e}, `;
    str += ']\n'
  } else {
    str += '{';
    for (let [key, value] in Object.entries(obj))
      str += `${key}: ${value}, `;
    str += '}\n';
  }
  console.log(str);
};
