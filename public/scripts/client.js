/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const $error = $('#error-message');

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {
    const timestamp = new Date(tweet.created_at).toLocaleString();
    const $tweet = `
      <article class="tweet">
        <header>
          <div class="tweet__left">
            <img class="avatar" src="${tweet.user.avatars}">
            <h2 class="name">${tweet.user.name}</h2>
          </div>
            <span class="handle">${tweet.user.handle}</span>
        </header>
        <div class="content">
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <span class="timestamp">${timeago.format(tweet.created_at)}</span>
          <span>
            <i name="retweet" class="fas fa-retweet icon-1"></i>
            <i name="flag" class="fas fa-flag icon-2"></i>
            <i name="heart" class="fas fa-heart icon-3"></i>
          </span>  
        </footer>
      </article>
    `;
    return $tweet;
  };

  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    })
      .then(function (data) {
        renderTweets(data);
      });
  };
  loadTweets();

  $('form').on('submit', function (event) {
    event.preventDefault();

    const formData = $(this).serialize();

    // CHECK IF TWEET IS PRESENT AND UNDER 140 CHARACTERS.

    const tweetContent = $('textarea').val().length;
    console.log(tweetContent)
    if (tweetContent === 0) {
      $error.text('Tweet content is required');
      return;
    } else if (tweetContent > 140) {
      $error.text('Tweet content is too long').slideDown();
      return;
    }

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
    })
      .then(function (data) {
        loadTweets()
        $('form').trigger('reset');
      });
  });
});



















