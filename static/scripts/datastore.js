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
            if (doc.data().settings) {
              for (const [key, val] of Object.entries(doc.data().settings)) {
                console.log("entries in settings: ", key, val);
                putSetting(key, val);
              }
            }
            $('.custom-deck').remove();
            for (let [i, deck] of doc.data().decks.entries()) {
              let parsed = JSON.parse(deck);
              if (parsed.deckName == "")
                parsed.deckName = `Custom Deck ${i}`;
              parsed.custom = 1;
              parsed.name = decks.CUSTOM.name;
              parsed.text = parsed.deckName;
              parsed.i = i;
              addDeck(parsed);
              console.log("THIS DECK: ", deck);
              $(`.custom-deck-${i}`).attr('text', deck);
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
