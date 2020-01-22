# TwoDoor
   ![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/doorClose200px.png)
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
___
## Introduction
Twodoor is an _adaptive_ virtual flashcard tutor written in JQuery, HTML5 & CSS3 & currently deployed as a wep application at: http://twodoor.herokuapp.com/


Written with ❤️ by:
* [Scout Curry](https://www.linkedin.com/in/scout-curry-96356217a/) - Full-Stack Developer
* [Arthur Damm](https://www.linkedin.com/in/arthur-damm-96527042/) - Full-Stack Developer

## Features
* _Adaptive Algorithm_ - we use a custom implementation of the Leitner System, an evidence-based method of spaced-repetition. It serves as a robust way to show you the cards you don’t know more frequently than the ones you do, and staggers how many cards you are working with in the active tag at any given time to keep the information manageable.
* _Polished UX_ - We know that if the learning game is not fun and engaging, no one will want to play it. So we invested a large part of our design and development time into creating an agile, intuitive interface with eye-catching animations that keep the user actively engaged with positive and negative reinforcement.
* _Responsive_ - TwoDoor is designed to display on any screen and is desktop, tablet, and mobile-friendly so you can use it to train or refresh your memory with any device, anytime, anywhere.
* _Profiles_ - Thanks to Firebase, you can build your own decks that will be saved to your personal account.
* _Holberton API_ - If you're a Holberton student with an API key, you can use the new _holbie app_! Memorize your peer's names and faces from any cohort! 

## Installation
TwoDoor runs entirely on the front-end client-side with no local dependencies. Simply clone this repository and open the _main.html_ with your browser or point your web server's document root at it.

## Usage

### Home
Who's ready to play?
![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/tutorial_all.jpg)

The homepage is your access to all of the prebuilt decks. Each one was made for a purpose, to emphasize the wide usage of the app. User-made decks coming soon!

![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/decks_face_recog_and_dino.jpg)

Some fun examples made in the early stages of development to test functionality. Remembering coworkers faces is an excellent use of this app.

![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/deck_color_coding.jpg)

Using the app during development, we were getting used to the answers. When this was becoming a factor during tests of the algorithm, The "random" deck was created. the word answer is connected to a random color, so you have to guess. After three minutes, you'll see that you are actually learning them!

![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/deck_css_trivia.jpg)

Since we are making this app for ourselves as much as for the user, the css trivia deck was fun to create and quiz ourselves on, so we don't forget all the useful info!

### Game Session

![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/tutorial_learningGame.jpg)

Ihe simple yet effective interface provides feedback for each answer through unique animations.

![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/tutorial_toolbar.jpg)

The toolbar has three components: the *home logo*, *timer*, and *algorithm button*.
The *home logo* will take you back to the home page at any point during the session. the *timer* starts at 3 minutes, and when it reaches zero the *summary page* is rendered. The *algorithm button* was implemented to remove the deck staggering, for presentation purposes.



![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/tutorial_learningGame_control.jpg)

Again, the control has three components: The *cancel session* button closes the session and renders the summary overlay. the *input text* is auto-focused when you start the session, and used to type and submit your answer. the *next* button also submits your answer, for people who arent as comfortable with pressing *enter*.


![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/tutorial_summary.jpg)

Whether you cancel beforehand or play the game until the end of the session, the summary overlay screen will show. Unless you get none of the answers correct during your session, it will display your statistics for the game played. This module will be expanded later, to show progress throughout all of your sessions, once a backend makes persisting data possible. 
You can keep playing after the summary screen is shown :)


## Contributing
TwoDoor is open to contributions. Please contact the developers before submitting pull requests.


## The Story

The goal is to make an adaptive flashcard tutoring app that we, as well as any user, will use to help convert information from short-term to long-term memory. The simple process of memorization is a key component to any learning structure. 
This app was Arthur's vision, as he has been a tutor for 7 years before joining the Holberton curriculum. Scout joined in on the team for project-partnering experience as well as enthusiasm for the potential the product holds. We spent most of the time pair programming the app and had an amazing experience working together. We implemented features as we saw fit, which led to muddled roles throughout development, but led to an overall sense that the app is but an extension of our capabilities.


## TwoDoor ToDo's

* _Featured Decks_: sharing privileges for decks, so that you can send your favorite decks to your freinds, or even a featured section with the highest rated decks on top.
* _New Algorithms_: The _Leitner Box_ learning algorithm has proven to work well, but new selection algorithms are always good! 
* _Framework Implementations_: Using basic JavaScript, JQuery, HTML and CSS has provided an excellent backbone to add features quickly and easily, but it's now time to implement _React_ or other frameworks to provide a more dynamic and beautiful webpage.


## Tech

TwoDoor uses just a few basic technologies:
* [JQuery](https://jquery.com/)
* [HTML5](https://html5.org/)
* [CSS3](https://www.w3.org/Style/CSS/Overview.en.html)
* [DS3.js](https://d3js.org/)

## License

MIT
