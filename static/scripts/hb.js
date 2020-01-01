const HB_URL = "https://intranet.hbtn.io";
const HOLBERTON_EMAIL = "@holbertonschool.com"

const MAX_POLL_ATTEMPTS = 30;
const PEER_CACHE_TTL = 600;


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
let _profile;

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
  data: JSON.stringify(json),
  statusCode: {
    429: () => alert('429 Too Many Requests: try again later!'),
  },
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
  },
  statusCode: {
    401: () => showHolbie(true),
    429: () => alert('429 Too Many Requests: try again later!'),
  },
});

const profileRequest = (authToken) => ({
  async: true,
  crossDomain: true,
  url: `${HB_URL}/users/me.json`,
  method: 'GET',
  data: {
    auth_token: authToken,
  },
  statusCode: {
    401: () => showHolbie(true),
    429: () => alert('429 Too Many Requests: try again later!'),
  },
});

const requestUserProfile = () => {
  $.ajax(profileRequest(authToken))
    .done((data) => {
      console.log("requestUserProfile()", data);
      _profile = data;
      showUserName();
    })
    .fail((error) => {
      console.log("requestUserProfile() failed:", error);
    });
}

const authenticateUserHB = async function () {
  const email = getemail().trim();
  const hashedPass = await sha256(getpassword());
  $.ajax(authenticationRequest(requestJson()))
    .done(({ auth_token }) => {
      authToken = auth_token;
      console.log("Authentication successful:", authToken);
      $('.holbie-status').html('Authentication successful...');
      authenticateUserFirebase(email, hashedPass);
      requestUserProfile();
      showHolbie();
      saveUserData();
    })
    .fail(() => {
      console.log("Authentication failed!");
      $('.holbie-status').html('Authentication failed!');
    });
};

const authenticateUserFirebase = (email, hashedPass) => {
  if (!email.endsWith(HOLBERTON_EMAIL))
    email += HOLBERTON_EMAIL;
  console.log("USING EMAIL", email);
  firebase.auth().createUserWithEmailAndPassword(email, hashedPass).catch(function(error) {
    console.log("createUserWithEmailAndPassword()", error);
    if (error.code == "auth/email-already-in-use") {
      firebase.auth().signInWithEmailAndPassword(email, hashedPass).catch(function(error) {
        console.log("signInWithEmailAndPassword()", error);
      });
    }
  });
}

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
      const _deck = data.map(o => ({
        ...o,
        question: "Who is this?",
        answer: o.full_name + "<br>" + o.cohort,
        image: o.picture,
        regex: o.full_name.trim().replace(/( )+/g, "|") + "|" +
          unidecode(o.full_name.trim().replace(/( )+/g, "|")),
        timestamp: timestamp(),
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
  filterPeerCache(cohort);
  const _deck = Object.values(peerCache[cohort] || {});
  if (_deck.length) {
    const deck = {
      deckName: DECKS.HOLBIE.name,
      deck: _deck,
    };
    $('.game-component')[0].deckType = DECKS.HOLBIE.name;
    $('.game-component')[0].deck = deck;
    $('.game-component')[0].updateDeck(loadDeck(DECKS.HOLBIE.name));
    showGame();
  }
};

const populateCohortSelectors = () => {
  console.log('populateCohortSelectors()');
  // $('#holbie-cohort-select option').remove()
  let first = true
  for (const cohortNum in cohorts) {
    console.log("pop: ", cohortNum);
    for (const cohort of cohorts[cohortNum]) {
      if (first) {
        $('#holbie-cohort-select')
          .append(`<option value="${cohort}" selected>${cohort}</option>`);  
        first = false;
      } else {
        $('#holbie-cohort-select')
          .append(`<option value="${cohort}">${cohort}</option>`);
      }
    }
  }
};

const getCohortNum = (cohort) => {
  let ret = cohortToNumMap[cohort];
  if (!ret) {
    for (const cohortNum in cohorts)
      for (const _cohort of cohorts[cohortNum])
        cohortToNumMap[_cohort] = cohortNum;
    ret = cohortToNumMap[cohort];
  }
  return parseInt(ret);
};

const filterPeerCache = (cohort) => {
  console.log("filterPeerCache()", cohort);
  const deck = Object.values(peerCache[cohort] || {});
  const now = timestamp();
  deck.forEach(card =>
    now - card.timestamp >= PEER_CACHE_TTL && delete peerCache[cohort][card.full_name])
};

const profile = () => _profile;

const showUserName = () => {
  if (profile())
    $('.signin-welcome').text(`Hi ${profile().first_name}!`);
};
