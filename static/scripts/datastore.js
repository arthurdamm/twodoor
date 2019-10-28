const loadDeck = function (arg) {
  const decks = {
    "tutorial": getTutorialDeck,
    "face": getFaceDeck,
    "dino": getDinoDeck,
    "color": generateColorDeck,
    "trivia": getTriviaDeck,
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
  ];

const getTriviaDeck = () =>
  [
    {
      "question": "How do you finish centering a DIV whose top-left corner has been centered with:<br /><i>position: absolute; <br />top: 0; left: 0;</i>?",
      "answer": "transform: translate(-50%, -50%);",
      "regex": /(transform:)?\s*translate\(-50%,\s*-50%\);?/i,
    },
    {
      "question": "How do you center a DIV element horizontally?",
      "answer": "margin: 0 auto;",
      "regex": /margin:\s*0?\s*auto;?/i,
    },
    {
      "question": "How do you center a DIV element <em>vertically</em> within a flexbox of row direction?",
      "answer": "align-items: center;",
      "regex": /align-items:\s*center;?/i,
    },
    {
      "question": "How do you center a DIV element <em>horizontally</em> within a flexbox of row direction?",
      "answer": "justify-content: center;",
      "regex": /justify-content:\s*center;?/i,
    },
    {
      "question": "How do you center TEXT horizontally?",
      "answer": "text-align: center;",
      "regex": /text-align:\s*center;?/i,
    },
    {
      "question": "How do you center TEXT vertically in a DIV of <i>height: 108px;</i>?",
      "answer": "line-height: 108px;",
      "regex": /line-height:\s*108px;?/i,
    },
    {
      "question": "With no styles applied, what is the default font size for normal text?",
      "answer": "16px",
      "regex": /16\s*(px)|(pixels)/i,
    },
    {
      "question": "Which CSS unit scales to viewport height?",
      "answer": "vh",
      "regex": /vh;?/i,
    },
    {
      "question": "What selector selects a .mydiv class only if it is a direct child of the body tag?",
      "answer": "body > .mydiv {}",
      "regex": /body\s*>\s*\.mydiv(\s*{.*})?/i,
    },
  ];

const getTutorialDeck = () => 
  [
    {
      "question": "Question to answer (answer: I love learning!)",
      "answer": "I love learning!",
      "regex": /(i love learning)?(!*)/i
    }
  ];

