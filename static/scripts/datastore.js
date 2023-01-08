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
  const factory = decks()[deckName].factory || DECKS.CUSTOM.factory;
  return factory(deckName).map((json, i) => getCardTemplate(json, i));
};

/**
 * Loads custom deck data from build input box. 
 */
const getBuiltDeck = (deckName) => {
  console.log("getBuiltDeck()", deckName);
  deck = $('.game-component')[0].deck;
  if (deckName != DECKS.HOLBIE.name) {
    Object.assign(deck, DECKS.CUSTOM);
    delete deck.factory;
    addDeck(deck);
    saveUserData();
  }
  return deck.deck;
}

/**
 * Loads user-built decks from db
 */
const getCustomDeck = (deckName) => {
  console.log("getCustomDeck()", deckName);
  const deck = decks()[deckName].deck;
  return deck;
}

const saveUserData = () => {
  console.log("saveUserData()");
  if (user()) {
    const userData = db.collection("users").doc(user().uid);
    if (userData) {
      const data = {};
      if (authToken) {
        data.authToken = authToken;
      } else {
        delete data.authToken;
      }
      data.decks = {};
      for (const [name, deck] of Object.entries(decks())) {
        if (deck.name == DECKS.CUSTOM.name) {
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
      if (doc.exists && doc.data()) {
        const data = doc.data();
        console.log("Found document:", data);
        if (!authToken && data.authToken) {
          authToken = data.authToken;
          requestUserProfile();
        } else if (authToken && !data.authToken) {
          saveUserData();
        }
        assignSettings(data.settings);
        holbieTheme(getSetting('holbie-theme'));
        $('.custom-deck').remove();
        loadDeckSettings();
        for (let [i, deck] of Object.entries(data.decks)) {
          addDeck(deck);
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
  FACE: {
    name: 'FACE', text: 'Name Recognition', factory: getFaceDeck
  },
  // DINO: {
  //   name: 'DINO', text: 'Dino Deck', factory: getDinoDeck
  // },
  COLOR: {
    name: 'COLOR', text: 'Color Coding', factory: generateColorDeck
  },
  TRIVIA: {
    name: 'TRIVIA', text: 'CSS Trivia', factory: getTriviaDeck
  },
  PRESENTATION: {
    name: 'PRESENTATION', text: 'DEMO ❤️ DAY!', factory: getPresentationDeck
  },
  CUSTOM: {
    name: 'CUSTOM', text: 'Custom', factory: getCustomDeck
  },
  // TUTORIAL: { 
  //   name: 'TUTORIAL', text: 'How to Play?', factory: getTutorialDeck
  // },
  BUILDER: {
    name: 'BUILDER', text: 'Create A Deck', factory: getBuiltDeck
  },
  HOLBIE: {
    name: 'HOLBIE', text: 'Team Holbie 🙃', factory: getBuiltDeck
  },
};
