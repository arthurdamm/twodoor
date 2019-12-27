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
  if (deckName.startsWith(DECKS.CUSTOM.name))
    deckName = DECKS.CUSTOM.name;
  return DECKS[deckName].factory().map((json, i) => getCardTemplate(json, i));
};

/**
 * Loads custom deck data from build input box. 
 */
const getBuiltDeck = () => {
  text = $('.game-component')[0].deckText;
  console.log("getBuiltDeck()", text);
  const jsonArray = JSON.parse(text);
  for (obj of jsonArray.deck)
    if (typeof obj.regex === 'string')
      obj.regex = RegExp(obj.regex, 'i');
  saveUserData();
  return jsonArray.deck;
}

/**
 * Loads user-built decks from db
 */
const getCustomDeck = () => {
  // const text = $('[name=text-input]').val()
  const text = $('.game-component')[0].deckText;
  console.log("getCustomDeck()", text);
  const jsonArray = JSON.parse(text);
  for (obj of jsonArray.deck)
    if (typeof obj.regex === 'string')
      obj.regex = RegExp(obj.regex, 'i');
  return jsonArray.deck;
}

const saveUserData = () => {
  console.log("saveUserData()");
  if (user()) {
    const userData = db.collection("users").doc(user().uid);
    if (userData) {
      const data = {};
      data.decks = {};
      for (const [name, deck] of Object.entries(decks())) {
        if (name.startsWith(DECKS.CUSTOM.name)) {
          data.decks[name] = deck;
        }
      }
      data.settings = settings();
      userData.set(data)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }
  }
}

/**
 * Loads user's custom decks and populates them into the home component
 * deck container.
 */
const loadUserData = () => {
  console.log("loadUserData()");
  if (user()) {
    let userData = db.collection("users").doc(user().uid);
    userData.get().then(function(doc) {
      if (doc.exists) {
        console.log("Found document:", doc.data());
        assignSettings(doc.data().settings);
        $('.custom-deck').remove();
        loadDeckSettings();
        for (let [i, deck] of doc.data().decks.entries()) {
          if (!deck.name)
            deck.name = `Custom Deck ${i}`;
          deck.custom = 1;
          deck.type = DECKS.CUSTOM.name;
          deck.i = i;
          addDeck(deck);
          // TODO not stringify/store text attr
          $(`.custom-deck-${i}`).attr('text', JSON.stringify(deck));
        }
      } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
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
 * Enum for deck types.
 * @readonly
 * @enum {string}
 */
const DECKS = {
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
