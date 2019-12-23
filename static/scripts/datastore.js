/**
 * @fileoverview Module for Data Store.
 * @package
 */



 /**
  * Loads requested deck data as JSON array.
  * @param {string} deckName The deck name to load.
  * @return {Array<Object>} Deck represented by JSON array of card objects.
  */
const loadDeck = (deckName) => {
  console.log("loadDeck()", deckName);
  return decks[deckName].factory().map((json, i) => getCardTemplate(json, i));
};

/**
 * Loads user-built decks from db
 */
const getBuiltDeck = () => {
  text = $('.game-component')[0].deckText;
  console.log("getBuiltDeck: " + text);
  const jsonArray = JSON.parse(text);
  for (obj of jsonArray.deck)
    if (typeof obj.regex === 'string')
      obj.regex = RegExp(obj.regex, 'i');
  saveUserData();
  return jsonArray.deck;
}

/**
 * Loads custom deck data from build input box.
 */
const getCustomDeck = () => {
  // const text = $('[name=text-input]').val()
  const text = $('.game-component')[0].deckText;
  const jsonArray = JSON.parse(text);
  for (obj of jsonArray.deck)
    if (typeof obj.regex === 'string')
      obj.regex = RegExp(obj.regex, 'i');
  return jsonArray.deck;
}

const saveUserData = () => {
  console.log("saveUserData()");
  if (user()) {
    const text = $('.game-component')[0].deckText;
    let userData = db.collection("users").doc(user().uid);

    userData.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            let data = doc.data();
            if (!data.settings)
              data.settings = {};
            for (const [key, val] of Object.entries(settings()))
              data.settings[key] = val;
            if (!data.decks)
              data.decks = [];
            if (text && data.decks.indexOf(text) === -1)
              data.decks.push(text);
            console.log("Saving data:", data);
            db.collection("users").doc(user().uid).set(data)
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            db.collection("users").doc(user().uid).set({
              name: user().displayName,
              decks: text ? [text] : [],
              settings: settings(),
            })
          .then(function() {
              console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
}

 /**
  * Creates a card object from a template populated with JSON data.
  * @param {Object} json The JSON data for this card.
  * @param {number} i This card's index in its deck.
  * @return {Object} The new card object.
  */
const getCardTemplate = (json, i) => {
  const card = {
    id: i,
    html: renderCardTemplate(json),
    performance: [],
  };
  return {...json, ...card};
};

/**
 * Maps demo performance data, as an array of values between 1 and 0, to each
 * card of the deck.
 * @param {Array<Object>} deck Deck to map.
 * @param {Array<number>} demoPerformance Data represented by array of card
 * successes.
 * @return {Array<Object} Deck mapped with formatted performance data.
 */
const mapDemoPerformances = (deck, demoPerformances) => {
  demoPerformances.forEach((l, i) => (deck[i] &&
    (deck[i].performance = [...Array(l).fill(1), ...Array(10 - l).fill(0)])));
  return deck;
}

/**
 * Creates a random array of 1's & 0's representing card performance data.
 * @param {number} length The number of performances.
 * @return {Array<number>} Card performance data represented as 1's & 0's.
 */
const getRandomPerformance = (length) =>
  [...Array(length)].map(x => Math.floor(Math.random() * 2));

/**
 * Enum for deck types.
 * @readonly
 * @enum {string}
 */
const decks = {
  HOLBIE: {
    name: 'HOLBIE', text: 'Team Holbie 🙃', factory: getCustomDeck
  },
  FACE: {
    name: 'FACE', text: 'Name Recognition', factory: getFaceDeck
  },
  BUILDER: {
    name: 'BUILDER', text: 'Build a Deck!', factory: getBuiltDeck
  },
  DINO: {
    name: 'DINO', text: 'Dino Deck', factory: getDinoDeck
  },
  COLOR: {
    name: 'COLOR', text: 'Color Coding', factory: generateColorDeck
  },
  TRIVIA: {
    name: 'TRIVIA', text: 'CSS Trivia', factory: getTriviaDeck
  },
  PRESENTATION: {
    name: 'PRESENTATION', text: 'PRESENTATION ❤️ DAY!', factory: getPresentationDeck
  },
  CUSTOM: {
    name: 'CUSTOM', text: 'Custom', factory: getCustomDeck
  },
  TUTORIAL: { 
    name: 'TUTORIAL', text: 'How to Play?', factory: getTutorialDeck
  },
};
