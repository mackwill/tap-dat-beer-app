# Tap Dat Beer App

Tap Dat Beer App is a tool designed too enhance the craft beer drinking experience for both experienced drinkers and newcomers.

Tap Dat allows for a user to pull out their phone, open up our scanner (that uses machine learning) and scan a beer. If the beer is in our database (and the model for that beer has been trained), a page will automatically be brought up that shows details about the beer as well as its overall ranking and other user reviews.
Registered users of our site can:

- Leave a review for a beer (and go back to edit or delete it later)
- Save beers to their wishlist
- Leave personal tasting notes just for themselves to remind them how the beer tasted

As a registered user, the more you participate, the more you are rewarded. Leaving more reviews will give our recommendation engine more data to work with and will be able to provide that user with recommendations more tailored to them.

### Final Product

Instead of including screenshots, checkout our demo site here:
https://tap-dat-beer-app.netlify.app/

## Dependencies

- @material-ui/core: 4.11.0
- @material-ui/icons: 4.9.1
- @material-ui/lab: 4.0.0-alpha.56
- axios: 0.20.0
- bootstrap: 4.5.2
- ml5 0.5.0
- react: 16.13.1
- react-bootstrap: 1.3.0
- react-dom: 16.13.1
- react-elastic-carousel: 0.7.4
- react-scripts: 3.4.3
- react-share: 4.2.1
- styled-components 5.1.1

## Getting Started

- Install all dependencies using `npm install` command
- Clone the tap-dat-beer-app-api from https://github.com/mackwill/tap-dat-beer-app-api and run the development server from the scheduler-api root folder using `npm start`
- On a separate terminal, run development build using `npm start` from project root folder

## Current Functionality

- Visitors can view the homepage and user reviews
- Scan a beer (list of supported beers will be growing) to pull up information and reviews for that beer
- Registered users can:
  - Leave reviews for beers
  - Save notes about specific beers
  - Edit & delete their reviews
  - Wishlist their favourite beers
  - Edit their account informations
  - Get recommendations based on our recommendation engine

## Further Development

- Incorporate web scrapers to further automate our data aggregation
- Continue to grow the list of supported beers in our trained models
- Add a quiz on registration to allow for a more developed recommendation from the minute of registration
- Add badges and awards to reward users for their contributions

## Authors

- William Mindenhall - [GitHub](https://github.com/mackwill)
- Rob Polisena - [GitHub](https://github.com/robpolisena)
- Vincent Bedard Legault - [GitHub](https://github.com/vbedardl)
