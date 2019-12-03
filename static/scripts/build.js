/**
 * @fileoverview Module for Build Component
 * @package
 */

const saveCard = () => {
  console.log("saveCard()");
  const questionText = $('[name=question-field]').val();
  const answerText = $('[name=answer-field]').val();
  const regexText = $('[name=regex-field]').val();
  const card = {
    question: questionText,
    answer: answerText,
    regex: regexText,
  };
  const deck = getBuilderDeck();
  const cardIndex = getBuilderIndex() - 1;
  deck[cardIndex] = card;
}

const loadCard = () => {
  console.log("loadCard()");
  const deck = getBuilderDeck();
  const card = deck[getBuilderIndex() - 1] || {};
  $('[name=question-field]').val(card.question);
  $('[name=answer-field]').val(card.answer)
  $('[name=regex-field]').val(card.regex);
}

const getBuilderDeck = () =>
  $('.build-component')[0].deck || ($('.build-component')[0].deck = [])
const setBuilderDeck = (deck) => $('.build-component')[0].deck = deck;

const getBuilderIndex = () => parseInt($('.card-index').html()) || 1;
const setBuilderIndex = (index) => parseInt($('.card-index').html(index));

const getBuilderLength = () => parseInt($('.deck-length').html()) || 1;
const setBuilderLength = (length) => parseInt($('.deck-length').html(length));

const goRight = function() {
  console.log("goRight()");
  saveCard();
  if (getBuilderIndex() < getBuilderLength()) {
    setBuilderIndex(getBuilderIndex() + 1);
    loadCard();
  }
}

const goLeft = function() {
  console.log("goLeft()");
  saveCard();
  if (getBuilderIndex() > 1) {
    setBuilderIndex(getBuilderIndex() - 1);
    loadCard();
  }
}

const goPlus = function() {
  console.log("goPlus()");
  saveCard();
  setBuilderLength(getBuilderLength() + 1);
  setBuilderIndex(getBuilderLength());
  loadCard();
}

const goMinus = function() {
  console.log("goMinus()");
  if (getBuilderLength() > 1)
    setBuilderLength(getBuilderLength() - 1);
  getBuilderDeck().splice(getBuilderIndex() - 1, 1);
  if (getBuilderIndex() > getBuilderLength())
    setBuilderIndex(getBuilderLength());
  loadCard();
}
