export class Show {
  private date: Date;
  private shows: String[];
  private version: String;
  private type: String;
  async init(movieJSON) {
    await this.fillData(movieJSON);
  }
  getDate(): Date {
    return this.date;
  }
  getVersion(): String {
    return this.version;
  }
  getShows(): String[] {
    return this.shows;
  }
  getType(): String {
    return this.type;
  }
  toString(): String {
    let res = 'date: ' + this.date + ' version: ' + this.version + ' type: ' + this.type + ' showTime: ';
    for (let i = 0; i < this.shows.length; ++i) {
      res += this.shows[i] + ' ';
    }
    return res;
  }

  private async fillData(filmShow) {
    const tempoDate = filmShow.day.split('-');
    this.date = new Date(parseInt(tempoDate[0], 10), parseInt(tempoDate[1], 10), parseInt(tempoDate[2], 10));
    this.version = filmShow.version;
    this.type = filmShow.type;
    this.shows = [];
    for (let i = 0; i < filmShow.shows.length; ++i) {
      await this.shows.push(filmShow.shows[i]);
    }
  }

}
