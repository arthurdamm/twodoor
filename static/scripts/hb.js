const HB_URL = "https://intranet.hbtn.io";

const MAX_POLL_ATTEMPTS = 20;

/**
 * Enum for cohort types
 * @readonly
 * @enum {string}
 */
const cohorts = {
  8: ['BOG-0119', 'NHV-0119', 'SF-0119'],
  9: ['BOG-0619', 'MED-0619', 'NHV-0619', 'SF-0619'],
  10: ['BOG-0919', 'CAL-0919', 'MED-0919', 'NHV-0919', 'SF-0919', 'TUN-0919'],
};

const cohortToNumMap = {};

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
      showHolbie();
    })
    .fail(() => {
      console.log("Authentication failed!");
      $('.holbie-status').html('Authentication failed!');
    });
};

const getRandomPeers = () => {
  $.ajax(randomPeersRequest(authToken, 5, 10))
    .done(data => console.log("PEERS:", data))
    .fail(data => console.log("PEERS FAILED:", data));
};

const repopulateRandomPeers = (cohort, numPeers, attempts) => {
  cohort = cohort || cohorts['8'][0];
  numPeers = numPeers || 5;
  attempts = ++attempts || 1;
  console.log(`repopulateRandomPeers() cohort: ${cohort} attempts:${attempts}`);
  if (stopPoll || attempts >= MAX_POLL_ATTEMPTS) return;
  $.ajax(randomPeersRequest(authToken, 5, getCohortNum(cohort)))
    .done(data => {
      data = data.filter(o => !peerCache[o.cohort] || !peerCache[o.cohort][o.full_name]);
      console.log("New data: " + JSON.stringify(data));
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
      updateDeckFromCache(cohort);
      if (!peerCache[cohort] || Object.keys(peerCache[cohort]).length < numPeers)
        repopulateRandomPeers(cohort, numPeers, attempts);
    })
    .fail(data => (console.log("REPEERS FAILED: ", data),
      updateDeckFromCache(cohort)));
};

const updateDeckFromCache = (cohort) => {
  console.log(`updateDeckFromCache() cohort:${cohort}`);
  const _deck = Object.values(peerCache[cohort] || {});
  if (_deck.length) {
    const deck = {
      deckName: "Holbie",
      deck: _deck,
    };
    $('.game-component')[0].deckType = decks.BUILDER;
    $('.game-component')[0].deckText = JSON.stringify(deck);
    $('.game-component')[0].updateDeck(loadDeck($('.game-component')[0].deckType));
    showGame();
  }
}

const populateCohortSelectors = () => {
  console.log('populateCohortSelectors()');
  // $('#holbie-cohort-select option').remove();
  for (const cohortNum in cohorts) {
    console.log("pop: ", cohortNum);
    for (const cohort of cohorts[cohortNum]) {
      $('#holbie-cohort-select')
        .append(`<option value="${cohort}">${cohort}</option>`);
    }
  }
}

const getCohortNum = (cohort) => {
  let ret = cohortToNumMap[cohort];
  if (!ret) {
    for (const cohortNum in cohorts)
      for (const _cohort of cohorts[cohortNum])
        cohortToNumMap[_cohort] = cohortNum;
    ret = cohortToNumMap[cohort];
  }
  return parseInt(ret);
}
