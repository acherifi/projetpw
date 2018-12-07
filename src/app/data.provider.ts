export default class Cards {

  url: String = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

  cardWithoutImage = {
    title: 'Je suis une carte sans image',
    image: null,
    description: 'Je suis petit'
  };

  cardWithLongDescription = {
    title: 'Je suis une carte avec longue description',
    image: this.url,
    // tslint:disable-next-line:max-line-length
    description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting. The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting. The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting. The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  };

  card = {
    title: 'Je suis une carte',
    image: this.url,
    description: 'Je suis petit'
  };

  cardWithoutImage2 = {
    title: 'Je suis une carte sans image',
    image: null,
    description: 'Je suis petit'
  };

  cardWithLongDescription2 = {
    title: 'Je suis une carte avec longue description',
    image: this.url,
    // tslint:disable-next-line:max-line-length
    description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting. The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
  };

  card2 = {
    title: 'Je suis une carte',
    image: this.url,
    description: 'Je suis petit'
  };


  // tslint:disable-next-line:max-line-length
  cards = [this.card, this.cardWithLongDescription, this.cardWithoutImage, this.cardWithLongDescription2, this.card2, this.cardWithoutImage2];

}
