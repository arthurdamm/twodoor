const loadDeck = function (arg) {
  const decks = {
    "dino": getDinoDeck,
    "color": generateColorDeck,
  }
  return decks[arg]().map((json, i) => getCardTemplate(json, i));
};

const generateColorDeck = (amount) => {
  console.log("generateColorDeck()...");
  const words = ["agility", "altruism", "appeal", "beneficial", "bold", "creative", "capable", "dynamic", "drive", "empathy", "educate", "determination", "eager", "encourage", "fun", "helpful", "joy", "nice", "optimist", "polite", "quality", "reliable", "rockstar", "skilled", "spontaneous", "stellar", "teach", "tolerance", "value"];
  const colors = ["crimson", "hotpink", "yellow", "orange", "darkgreen", "lightgreen", "cyan", "indigo", "blue", "lightgray"];
  const deck = [];
  let word;
  amount = amount || 10;
  while (amount--)
    deck.push({
      color: popRandomElement(colors),
      question: "What is this inspiration?",
      answer: word = popRandomElement(words),
      regex: RegExp(word),
    });
  console.log("done.");
  return deck;
}

const getCardTemplate = (json, i) => {
  console.log("Template NEW:", JSON.stringify(json, i));
  const card = {
    "id": i,
    "html": renderCardTemplate(json),
    "performance": [],
  };
  return {...json, ...card};
};


const mapDemoPerformances = (deck, demoPerformances) => {
  demoPerformances.forEach((l, i) =>
    deck[i].performance = [...Array(l).fill(1), ...Array(10 - l).fill(0)]);
  return deck;
}

const getRandomPerformance = (length) =>
  [...Array(length)].map(x => Math.floor(Math.random() * 2));

const getDinoDeck = () =>
  [
    {
      "image": "static/images/tRex.jpg",
      "question": "Who is this person in the picture?",
      "answer": "Arthur Damm!",
      "regex": /(arthur)|(d.*a.*m.*m)/i,
    },
    {
      "image": "static/images/velociraptor.jpg",
      "question": "Who is in this picture?",
      "answer": "Scout Curry!",
      "regex": /(Scout)|(Curry)/i,
    },
    {
      "image": "static/images/brontosaurus.jpg",
      "question": "What dino is this?",
      "answer": "Brontosaurus...",
      "regex": /bronto?saurus/i,
    },
    {
      "image": "static/images/teradactyl.png",
      "question": "Yet it flies!?",
      "answer": "Pteradactyl.",
      "regex": /p?teradac.*/i,
    },
    {
      "image": "static/images/water_dino_1.jpg",
      "question": "What is this water dino?",
      "answer": "bob",
      "regex": /bob/i,
    },
    {
      "image": "static/images/water_dino_2.jpg",
      "question": "What is this water dino?",
      "answer": "john",
      "regex": /john/i,
    },
    {
      "image": "static/images/water_dino_3.jpg",
      "question": "What is this water dino?",
      "answer": "smith",
      "regex": /smith/i,
    },
    {
      "image": "static/images/water_dino_4.jpg",
      "question": "What is this water dino?",
      "answer": "george",
      "regex": /george/i,
    },
    {
      "image": "static/images/triceratops.jpg",
      "question": "Who is this now?",
      "answer": "charles",
      "regex": /charles/i,
    },
    {
      "image": "static/images/stego.jpg",
      "question": "Name this person?",
      "answer": "morris",
      "regex": /morris/i,
    },
  ];