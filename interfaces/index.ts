// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface Key {
  id?: number;
  title: string;
  asset: string;
  emoji: string;
}

export interface ReactPlayerState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export interface Emoji {
  colons: string;
  emoticons: Array<any>;
  id: string;
  name: string;
  native: any;
  short_names: Array<string>;
  skin: string;
  unified: string;
}
