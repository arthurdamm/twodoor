const getDeck = function (arg) {
  const deck = [
    {
      "image": "static/images/tRex.jpg",
      "question": "Who is this person in the picture?",
      "answer": "Arthur Damm!"
    },
    {
      "image": "static/images/real_velociraptor.jpg",
      "question": "Who is in this picture?",
      "answer": "Scout Curry!"
    },
    {
      "image": "static/images/brontosaurus.jpg",
      "question": "What dino is this?",
      "answer": "Brontosaurus..."
    },
    {
      "image": "static/images/teradactyl.png",
      "question": "Yet it flies!?",
      "answer": "Teradactyl."
    },
  ];
  console.log(deck.length);
  return deck.map((door, i) => getDoorTemplate(door, i));
};

const getDoorTemplate = function (json, i) {
  
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
  const door = {
    "id": i,
    "html": template,
    "performance": [],
  };
  return door;

};
