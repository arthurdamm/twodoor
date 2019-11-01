const loadDeck = function (arg) {
  const decks = {
    "tutorial": getTutorialDeck,
    "face": getFaceDeck,
    "dino": getDinoDeck,
    "color": generateColorDeck,
    "trivia": getTriviaDeck,
    "presentation": getPresentationDeck,
  }
  return decks[arg]().map((json, i) => getCardTemplate(json, i));
};

const generateColorDeck = (amount) => {
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
  return deck;
}

const getCardTemplate = (json, i) => {
  const card = {
    "id": i,
    "html": renderCardTemplate(json),
    "performance": [],
  };
  return {...json, ...card};
};


const mapDemoPerformances = (deck, demoPerformances) => {
  demoPerformances.forEach((l, i) => (deck[i] &&
    (deck[i].performance = [...Array(l).fill(1), ...Array(10 - l).fill(0)])));
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
      "question": "How do you center a DIV element <em>vertically</em> within a flexbox of row direction?",
      "answer": "<i>align-items</i>: center;",
      "regex": /align-items:\s*center;?/i,
    },
    {
      "question": "How do you finish centering a DIV whose top-left corner has been centered with:<br /><i>position: absolute; <br />top: 0; left: 0;</i>?",
      "answer": "<i>transform</i>: translate(-50%, -50%);",
      "regex": /(transform:)?\s*translate\(-50%,\s*-50%\);?/i,
    },
    {
      "question": "How do you center a DIV element horizontally?",
      "answer": "<i>margin</i>: 0 auto;",
      "regex": /margin:\s*0?\s*auto;?/i,
    },
    {
      "question": "How do you center a DIV element <em>horizontally</em> within a flexbox of row direction?",
      "answer": "<i>justify-content</i>: center;",
      "regex": /justify-content:\s*center;?/i,
    },
    {
      "question": "How do you center TEXT horizontally?",
      "answer": "<i>text-align</i>: center;",
      "regex": /text-align:\s*center;?/i,
    },
    {
      "question": "How do you center TEXT vertically in a DIV of <i>height: 108px;</i>?",
      "answer": "<i>line-height</i>: 108px;",
      "regex": /line-height:\s*108px;?/i,
    },
    {
      "question": "With no styles applied, what is the default font size for normal text?",
      "answer": "16px",
      "regex": /16\s*(px)|(pixels)/i,
    },
    {
      "question": "What property automatically includes an element's border and padding in its size?",
      "answer": "<i>box-sizing</i>: border-box;",
      "regex": /box-sizing:\s*border-box;?/i,
    },
    {
      "question": "What selector selects a .mydiv class only if it is a direct child of the body tag?",
      "answer": "body > .mydiv {}",
      "regex": /body\s*>\s*\.mydiv(\s*{.*})?/i,
    },
    {
      "question": "How do you enable smooth scrolling of all links that target an anchor?",
      "answer": "html {<br><i>scroll-behavior</i>: smooth; }",
      "regex": /html\s*{\s*scroll-behavior:\s*smooth;?\s*}/i,
    },
  ];

const getTutorialDeck = () => 
  [
    {
      "question": "Question to answer<br/ ><i>(hit enter to see answer!)</i>",
      "answer": "I love learning!",
      "regex": /i love learning!*/i
    }
  ];

const getPresentationDeck = () =>
  [
    {
      "question": "Who are the developers of TwoDoor?",
      "answer": "Scout Curry &<br> Arthur Damm",
      "regex": /(scout\s*(curry)?)|(arthur\s*(damm)?)/i,
    },
    {
      "question": "What key attribute makes TwoDoor unique?",
      "answer": "Adaptive",
      "regex": /adapt|adaptive|adaptable|adaptability/i,
    },
    {
      "question": "What evidence-based learning technique optimizes study time?",
      "answer": "Spaced Repetition",
      "regex": /spaced?\s*rep(etition)?/i,
    },
    {
      "question": "What data-scientific function could be plotted to further optimize learning?",
      "answer": "Forgetting Curve",
      "regex": /forgetting\s*curve/i,
    },
    {
      "question": "What's the best software school around?",
      "answer": "Holberton School",
      "regex": /holberton|holbie|holby/i,
    },
  ];
