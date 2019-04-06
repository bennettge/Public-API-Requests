$(document).ready(function () {

  const listOfPeople = [];
  let currPerson;

  /////////////////////////// Card Place Functions ///////////////////////////

  // Shows matching cards
  function showMatches(currPhrase) {
    const nameRegEx = new RegExp(currPhrase);
    let nameOfPerson;

    // Loops through all Person objects to determine if card is displayed
    for (let index = 0; index < 12; index++) {

      // Displays card if matched
      nameOfPerson = listOfPeople[index].name;
      listOfPeople[index].setShown(nameRegEx.test(nameOfPerson));

    }
  }


  // Makes a search bar
  function makeSearchBar() {
    const newBar = $('<form>').attr('action', '#').attr('method', 'get');
    const searchInputElement = $('<input>').attr('type', 'search')
                                           .attr('id', 'search-input')
                                           .attr('placeholder', 'Search...')
                                           .addClass('search-input');
    const searchSubmitElement = $('<input>').attr('type', 'submit')
                                            .attr('id', 'search-submit')
                                            .attr('value', 'Search!')
                                            .addClass('search-submit');
    newBar.append(searchInputElement);
    newBar.append(searchSubmitElement);
    $('.search-container').append(newBar);
  }


  // Places cards, instantiates 12 Person objects, and puts them into a list
  function placeCards() {

      // Gets JSON to make 12 Person Objects and make cards for each one
      $.getJSON('https://randomuser.me/api/?nat=gb,us&results=12', function (data) {
        for (let index = 0; index < 12; index++) {
          listOfPeople.push(new Person(data.results[index], index));
          $('#gallery').append(listOfPeople[index].createPerson());
        }
      });

  }


  // Adds modal event listeners for the new generated modal window
  function addModalEventListeners() {

    // Event Listener for closing out of modal window
    $('#modal-close-btn').click(function(event) {
      $('.modal-container').remove();
    });

    // Event Listener for the Next button
    $('#modal-next').click(function(event) {
      $('.modal-container').remove();

      // Progresses to next shown element
      if (currPerson < 11) {
        do {
          currPerson++;
        } while (listOfPeople[currPerson].getIsShown() === false &&
                 currPerson < 11);
        if (listOfPeople[currPerson].getIsShown() === true)
          listOfPeople[currPerson].createModalWindow();
      }

      // Re-adds modal Event listeners on click
      addModalEventListeners()

    });

    // Event Listener for Prev button
    $('#modal-prev').click(function(event) {
      $('.modal-container').remove();

      // Progresses to previous shown element
      if (currPerson > 0) {
        do {
          currPerson--;
        } while (listOfPeople[currPerson].getIsShown() === false &&
                 currPerson > 0);
        if (listOfPeople[currPerson].getIsShown() === true)
          listOfPeople[currPerson].createModalWindow();
      }

      // Re-Adds modal Event Listeners
      addModalEventListeners();
    });
  }

  // Makes search bar and places cards on page
  makeSearchBar();
  placeCards();

  // Event listener for a card click
  $("#gallery").click(function () {

    // Only allows clicks on card elements
    if (event.target.className != 'gallery') {

      // Loops through cards to find clicked element
      for (let index = 0; index < 12; index++) {

        // Creates modal window if one is not there
        if (event.target.closest('.card').getAttribute('id') === listOfPeople[index].cardID &&
            $('.modalContainer').length === 0) {
          currPerson = index;
          listOfPeople[currPerson].createModalWindow();
          addModalEventListeners();
        }

      }

    }
  });

  // Event listener for search bar
  $('#search-submit').click(function(event) {
    showMatches($('#search-input').val());
    event.preventDefault();
  });

});
