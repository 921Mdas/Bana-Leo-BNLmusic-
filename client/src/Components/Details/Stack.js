import React from "react";

class Song {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class PlayList {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  start() {
    return this.top;
  }

  reset() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  push(value) {
    const song = new Song(value);
    if (this.length === 0) {
      this.top = song;
      this.bottom = song;
    }
    song.next = this.top;
    this.top = song;

    this.length++;
  }

  next() {
    let tempPrev = this.top.next;
    this.top = tempPrev;
    return tempPrev;
  }

  prev() {
    this.prev = this.top;
  }
}

export const CongoPlayLists = new PlayList();
