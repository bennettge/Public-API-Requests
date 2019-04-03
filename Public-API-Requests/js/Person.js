class Person {

  // Initializes data from passed data
  constructor(data, cardNum) {
    this.name = data.name.first + " " + data.name.last;
    this.picture = data.picture.medium;
    this.email = data.email;
    this.location = data.location.city + ", " + data.location.state;
    this.birthday = data.dob.date.slice(0, 10);
    this.phoneNumber = data.phone;
    this.address = data.location.street + ", " + this.location + ', ' +
                                                         data.location.postcode;
    this.cardNum = cardNum;
    this.cardID = "card-" + this.cardNum.toString();
    this.currentlyShown = true;
  }


  // Sets card to be shown or not and changes this.currentlyShown
  setShown(toShow) {
    this.currentlyShown = toShow;
    if (this.currentlyShown === true)
      $('#' + this.cardID).show();
    else
      $('#' + this.cardID).hide();
  }


  // Returns if the element is currently being shown
  getIsShown() {
    return this.currentlyShown;
  }


  // Creates person card
  createPerson() {
    const card = $('<div>').addClass('card').attr('id', this.cardID);
    card.append(this.createPersonImg());
    card.append(this.createPersonInfo());
    return card;
  }


  // Creates person image
  createPersonImg() {
    const cardImageContainer = $('<div>').addClass('card-img-container');
    const cardImage = $('<img>').addClass('card-img')
                                .attr('src', this.picture)
                                .attr('alt', 'profile picture');
    cardImageContainer.append(cardImage);
    return cardImageContainer;
  }


  // Creates person info for side of card
  createPersonInfo() {
    const cardInfoContainer = $('<div>').addClass();
    const cardInfoName = $('<h3>').addClass('card-name cap')
                                  .attr('id', 'name')
                                  .text(this.name);
    const cardInfoText = $('<p>').addClass('card-text')
                                 .text(this.email);
    const cardInfoTextCap = $('<p>').addClass('card-text cap')
                                    .text(this.location);
    cardInfoContainer.append(cardInfoName, cardInfoText, cardInfoTextCap);
    return cardInfoContainer;
  }


  // Creates modal window
  createModalWindow() {
    const modalContainer = $('<div>').addClass('modal-container');
    const modalWindow = $('<div>').addClass('modal');
    modalWindow.append(this.makeCloseButton());
    modalWindow.append(this.makeModalInfo());
    modalWindow.append(this.makeModalButtons())
    modalContainer.append(modalWindow);
    $('#gallery').after(modalContainer);
  }


  // Makes the close button
  makeCloseButton() {
    const modalButton = $('<button>').addClass('modal-close-btn')
                                     .attr('id', 'modal-close-btn')
                                     .attr('type', 'button');
    const strongTag = $('<strong>').text('X');
    modalButton.append(strongTag);
    return modalButton;
  }


  // Makes the information for the modal window
  makeModalInfo() {
    const modalInfo = $('<div>').addClass('modal-info-container');
    const modalImage = $('<img>').addClass('modal-img')
                                 .attr('src', this.picture)
                                 .attr('alt', 'profile picture');
    const modalH3 = $('<h3>').addClass('modal-name cap')
                             .attr('id', 'name')
                             .text(this.name);
    modalInfo.append(modalImage, modalH3,
                     this.makeModalPTag('modal-text', this.email),
                     this.makeModalPTag('modal-text cap', this.location),
                     this.makeModalPTag('modal-text', this.phoneNumber),
                     this.makeModalPTag('modal-text', this.address),
                     this.makeModalPTag('modal-text', "Birthday: " + this.birthday));
    return modalInfo;
  }


  // Makes the Prev and Next button for the modal window
  makeModalButtons() {
    const modalBtnContainer = $('<div>').addClass('modal-btn-container');
    const prevButton = $('<button>').addClass('modal-prev btn')
                                    .attr('id', 'modal-prev')
                                    .attr('type', 'button')
                                    .text('Prev');
    const nextButton = $('<button>').addClass('modal-next btn')
                                    .attr('id', 'modal-next')
                                    .attr('type', 'button')
                                    .text('Next');
    modalBtnContainer.append(prevButton, nextButton);
    return modalBtnContainer;
  }


  // Makes a P Tag for the addModalEventListeners
  makeModalPTag(className, textContent) {
    return ($('<p>').addClass(className)
                    .text(textContent));
  }
}
