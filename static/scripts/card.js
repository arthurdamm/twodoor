$(function() {
  $('[name=text-answer]').keydown(function (e) {
    console.log("Enter Answer event");
    if (e.which == 13) {
      $('.front').hide();
      $('.back').css('visibility', 'visible');
      $('.back').css('position', 'relative');
    }
  });

  console.log("CLICKing...");
  $(".flippable").click(function () {
    console.log("CLICK");
    $(this).toggleClass("flipme");
  });
});