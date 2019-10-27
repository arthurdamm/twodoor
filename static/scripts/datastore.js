const loadDeck = function (arg) {
  const decks = {
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
      question: "Which word has been coded to this color?",
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
      "question": "What dino is this?",
      "answer": "Tyrannosaurus Rex",
      "regex": /((t?yrann?osaurus)|t)?\s*rex/i,
    },
    {
      "image": "static/images/velociraptor.jpg",
      "question": "What dino is this?",
      "answer": "Velociraptor",
      "regex": /(veloci)?raptor/i,
    },
    {
      "image": "static/images/brontosaurus.jpg",
      "question": "What dino is this?",
      "answer": "Brontosaurus",
      "regex": /brontosaurus|bronto|saurus/i,
    },
    {
      "image": "static/images/teradactyl.png",
      "question": "What is this flying dino?",
      "answer": "Pteradactyl",
      "regex": /p?teradac.*/i,
    },
    {
      "image": "static/images/plesiosaur.jpg",
      "question": "What is this water dino?",
      "answer": "Plesiosaur",
      "regex": /plesiosaur/i,
    },
    {
      "image": "static/images/mosasaurus.jpg",
      "question": "What is this water dino?",
      "answer": "Mosasaurus",
      "regex": /mosasaurus/i,
    },
    {
      "image": "static/images/helicoprion.jpg",
      "question": "What is this water dino?",
      "answer": "Helicoprion",
      "regex": /helicoprion/i,
    },
    {
      "image": "static/images/nothosaurus.jpg",
      "question": "What is this water dino?",
      "answer": "Nothosaurus",
      "regex": /nothosaurus/i,
    },
    {
      "image": "static/images/triceratops.jpg",
      "question": "What dino is this?",
      "answer": "Triceratops",
      "regex": /triceratops/i,
    },
    {
      "image": "static/images/stego.jpg",
      "question": "What dino is this?",
      "answer": "Stegosaurus",
      "regex": /stegosaurus/i,
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
