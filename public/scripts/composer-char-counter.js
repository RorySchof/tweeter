// CHARACTER COUNTER FUNCTIONALITY 

$(document).ready(function () {
  $("#tweet-text").on("input", function (event) {
    let counter = $(this).parent().children().find(".counter");
    let length = $(this).val().length;
    let update = $(counter).val(140 - length);
    update;

    if (update.val() < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });

  $(".back-to-top").hide();

  $(window).scroll(toggleBackToTopBtn);

  $(".back-to-top").on("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    toggleBackToTopBtn();
  });
}); 