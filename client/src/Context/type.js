export const baseURLtype = "http://localhost:3005";

export const COMMANDS = {
  GET_TRACKS_BY_ID: "GET_TRACKS_BY_ID",
  GET_ALL_ARTISTS: "GET_ALL_ARTISTS",
  REMOVE_AN_ARTIST: "REMOVE_AN_ARTIST",
  UPDATE_ARTIST: "UPDATE_ARTIST",
  GOTO_NEXT_PAGE: "GOTO_NEXT_PAGE",
  GOTO_PREVIOUS_PAGE: "GOTO_PREVIOUS_PAGE",
  SET_ARTISTS: "SET_ARTISTS",
  CREATE_NEW_ARTISTS: "CREATE_NEW_ARTISTS",
  SEARCH_ARTIST: "SEARCH_ARTIST",
  STORE_ALL_ARTISTS: "STORE_ALL_ARTISTS",
  UPDATE_USERONLINE: "UPDATE_USERONLINE",
  GETALL_TRACKS: "GETALL_TRACKS",
  PLAYTRACK: "PLAYTRACK",
  LOGGEDIN: "LOGGEDIN",
  RESETUPDATE: "RESETUPDATE",
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
};

// ****** needed links for local DEV
// const localDevArt = `${baseURLtype}/artists`;
// const localDevPlayMusic = `${baseURLtype}/tracks/${id}/uploadsongs`;
// const localDevUpload = `${baseURLtype}/tracks/${idTracker}/uploadsongs`;
// const localDevRemoveArt = `${baseURLtype}/artists/remove/:${id}`;

// const onlineDevArt = `/artists`;
// const onlineDevPlayMusic = `/tracks/${id}/uploadsongs`;
// const onlineDevUpload = `/tracks/${idTracker}/uploadsongs`;
// const onlineDevRemoveArt = `/artists/remove/:${id}`;
