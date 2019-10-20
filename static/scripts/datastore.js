const getDeck = function (arg) {
  const deck = [
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
  console.log(deck.length);
  return deck.map((json, i) => getCardTemplate(json, i));
};

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
  demoPerformances.forEach((l, i) => deck[i].performance = [...Array(l).fill(1), ...Array(10 - l).fill(0)]);
  return deck;
}

const getRandomPerformance = (length) =>
  [...Array(length)].map(x => Math.floor(Math.random() * 2));
