const loadDeck = function (arg) {
  const decks = {
    "tutorial": getTutorialDeck,
    "face": getFaceDeck,
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
      question: "What inspiration is this?",
      answer: word = popRandomElement(words),
      regex: RegExp(word, "i"),
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
      "answer": "Arthur",
      "regex": /(arthur)/i,
    },
    {
      "image": "static/images/velociraptor.jpg",
      "question": "Who is in this picture?",
      "answer": "Scout",
      "regex": /(Scout)/i,
    },
    {
      "image": "static/images/brontosaurus.jpg",
      "question": "What dino is this?",
      "answer": "Bronto",
      "regex": /bronto/i,
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


const getFaceDeck = () =>
  [
    {
      "image": "static/images/face1.jpg",
      "question": "Who is this?",
      "answer": "Haley",
      "regex": /haley/i,
    },
    {
      "image": "static/images/face2.jpg",
      "question": "Who is this?",
      "answer": "Camila",
      "regex": /camila/i,
    },
    {
      "image": "static/images/face3.jpg",
      "question": "Who is this?",
      "answer": "Paola",
      "regex": /paola/i,
    },
    {
      "image": "static/images/face4.jpg",
      "question": "Who is this?",
      "answer": "Isabela",
      "regex": /isabell?a/i,
    },
    {
      "image": "static/images/face5.jpg",
      "question": "Who is this?",
      "answer": "Sarah",
      "regex": /sarah?/i,
    },
    {
      "image": "static/images/face6.jpg",
      "question": "Who is this?",
      "answer": "Henry",
      "regex": /henry/i,
    },
    {
      "image": "static/images/face7.jpg",
      "question": "Who is this?",
      "answer": "Davis",
      "regex": /davis/i,
    },
    {
      "image": "static/images/face8.jpg",
      "question": "Who is this?",
      "answer": "Isaac",
      "regex": /isaac/i,
    },
    {
      "image": "static/images/face9.jpg",
      "question": "Who is this?",
      "answer": "Elliot",
      "regex": /elliot/i,
    },
    {
      "image": "static/images/face10.jpg",
      "question": "Who is this?",
      "answer": "Ruben",
      "regex": /ruben/i,
    },
  ]
const getTutorialDeck = () => 
  [
    {
      "question": "Question to answer (answer: I love learning!)",
      "answer": "I love learning!",
      "regex": /i love learning!/i,
    }
  ]