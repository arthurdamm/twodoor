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
      "regex": /(Scout)|(Curry)/,
    },
    {
      "image": "static/images/brontosaurus.jpg",
      "question": "What dino is this?",
      "answer": "Brontosaurus...",
      "regex": /brontosaurus/i,
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

const getCardTemplate = function (json, i) {
  console.log("Template:", JSON.stringify(json, i));
  const template =`
          <div class="card front" style="width: 18rem;">
              <img class="card-img-top" src="${json.image}" alt="card image cap">
              <div class="card-body">
                  <h5 class="card-title">Question</h5>
                  <p class="card-text">${json.question}</p>
              </div>
          </div>
          <div class="card back" style="width: 18rem;">
              <div class="card-body">
                  <h5 class="card-title">Answer</h5>
                  <p class="card-text">${json.answer}</p>
              </div>
          </div>
          <div class="card success" style="width: 18rem;">
              <div class="card-body">
                  <h5 class="card-title">Success!</h5>
                  <p class='card-text'>Keep Going :)</p>
              </div>
          </div>
      `;
  const card = {
    "id": i,
    "html": template,
    "performance": [],
  };
  return {...json, ...card};
};
