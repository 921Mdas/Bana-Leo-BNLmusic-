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
    console.log("the top song here is ", this.bottom);
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
    } else {
      const temp = this.top;
      this.top = song;
      this.top.next = temp;
    }
    this.length++;
  }

  pop() {
    if (!this.top) return null;
    let holdTop = this.top;
    this.top = this.top.next;
    this.length--;
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
