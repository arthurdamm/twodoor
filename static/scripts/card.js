// import * as datastore from "./datastore.js";

$(function() {
  let nextDoor;
  let currentDoor = $('#door2');
  let animating = false;
  const deck = getDeck()
  console.log("getDeck():", deck);

  currentDoor.html(deck[1].html);
  currentDoor.attr('door-id', deck[1].id);
  
  $('[name=text-answer]').focus();
  $('[name=text-answer]').keydown(function (e) {
    if (e.which == 13) {
      currentDoor.children('.front').hide();
      currentDoor.children('.success').css('visibility', 'visible');
      currentDoor.children('.back').css('visibility', 'visible');
      currentDoor.children('.back').css('position', 'relative');
      $('.btn--next').css('visibility', 'visible');
    }
  });
  
  $(".flippable").click(function() {
    $(this).toggleClass('flipme');
  });

  const nextDoorEvent = function() {
    if (animating) return;
    $('.btn--next').css('visibility', 'hidden');
    $('[name=text-answer]').val('');
    $('[name=text-answer]').focus();
    nextDoor = $(currentDoor.attr('id') === 'door1' ? '#door2' : '#door1');
    const door = getNextDoor(currentDoor, deck);
    nextDoor.html(door.html)
    nextDoor.attr('door-id', door.id);
    nextDoor.fadeIn(1);
    console.log("nextDoor:", nextDoor[0]);

    currentDoor.addClass('slide');
    currentDoor.fadeOut(500);
    animating = true;
    setTimeout(function () {
      currentDoor.removeClass('slide');
      currentDoor.removeClass('flipme');
      nextDoor.after(currentDoor);
      currentDoor = nextDoor;
      animating = false;
    }, 500);
  }

  $(document).on('keydown', function(e) {
    let tag = e.target.tagName.toLowerCase();
    if (e.which === 39)
      nextDoorEvent();
  });
  $('.btn--next').click(nextDoorEvent);
});

function getNextDoor(currentDoor, deck) {
  let doorId = (parseInt(currentDoor.attr('door-id')) + 1) % deck.length;

  for (const door of deck)
    if (door.id === doorId)
      return door;
}

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
