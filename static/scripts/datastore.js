export const getDeck = function (arg) {
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
    }
  ];
  console.log(deck.length);
  return deck.map(door => getDoorTemplate(door));
}

export const getDoorTemplate = function (door) {
  
  console.log("Template:", JSON.stringify(door));

  const template =`
          <div class="card front" style="width: 18rem;">
              <img class="card-img-top" src="${door.image}" alt="card image cap">
              <div class="card-body">
                  <h5 class="card-title">Question</h5>
                  <p class="card-text">${door.question}</p>
              </div>
          </div>
          <div class="card back" style="width: 18rem;">
              <div class="card-body">
                  <h5 class="card-title">Answer</h5>
                  <p class="card-text">${door.answer}</p>
              </div>
          </div>
          <div class="card success" style="width: 18rem;">
              <div class="card-body">
                  <h5 class="card-title">Success!</h5>
                  <p class='card-text'>Keep Going :)</p>
              </div>
          </div>
      `;
  return template;
}
