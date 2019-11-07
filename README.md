# TwoDoor
   ![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/doorClose200px.png)
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
___
## Introduction
Twodoor is an _adaptive_ virtual flashcard tutor written in Javascript & currently deployed as a wep application at: http://twodoor.herokuapp.com/

Written with ❤️ by:
* [Scout Curry](https://www.linkedin.com/in/scout-curry-96356217a/) - Full-Stack Developer
* [Arthur Damm](https://www.linkedin.com/in/arthur-damm-96527042/) - Full-Stack Developer

## Features
- Adaptive Algorithm
- Pre-Built Decks
- Inuitive UX

## Installation
TwoDoor runs entirely on the front-end client-side with no local dependencies. Simply clone this repository and open the _main.html_ with your browser or point your web server's document root at it.

## Usage

### Home
Whose ready to play?
![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/tutorial_all.jpg)

The homepage is your access to all of the prebuilt decks. Each one was made for a purpose, to emphasize the wide usage of the app. User-made decks coming soon!

![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/decks_face_recog_and_dino.jpg)

Some fun examples made in the early stages of development to test functionality. Remembering coworkers faces is an excellent use of this app.

![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/deck_color_coding.jpg)

Using the app during development, we were getting used to the answers. When this was becoming a factor during tests of the algorithm, The "random" deck was created. the word answer is connected to a random color, so you have to guess. After three minutes, you'll see that you are actually learning them!

![alt-text](https://github.com/arthurdamm/twodoor/blob/scout/static/images/deck_css_trivia.jpg)

Since we are making this app for ourselves as much as for the user, the css trivia deck was fun to create and quiz ourselves on, so we dont forget all the useful info!

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

## Related Projects


### Tech

TwoDoor uses just a few basic technologies:
* [JQuery](https://jquery.com/)
* [DS3.js](https://d3js.org/)
* Javascript
* HTML & CSS

License

MIT
