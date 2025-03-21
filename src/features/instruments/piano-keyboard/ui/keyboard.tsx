'use client';

import React from 'react';
import { PianoKey, pianoKeys } from '../model/notes-list';

interface Props {}

type KeyEventHandlers = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type KeyNode = React.FC<
  Pick<PianoKey, 'note'> & { handlers: KeyEventHandlers }
>;

const WhiteKey: KeyNode = ({ note, handlers }) => (
  <button
    {...handlers}
    className="h-40 w-8 flex-none bg-white border border-neutral-400"
    data-key={note}
  >
    {note}
  </button>
);

const BlackKey: KeyNode = ({ note, handlers }) => (
  <div className="relative w-0">
    <button
      {...handlers}
      className="absolute h-25 w-6 -ml-3 bg-black text-white text-center"
      data-key={note}
    >
      {note}
    </button>
  </div>
);

const createKey = (note: PianoKey['note'], type: PianoKey['type']) => {
  const eventHandlers: KeyEventHandlers = {
    onClick: (event) => {
      console.log(event.target.dataset);
    },
  };

  return type === 'white' ? (
    <WhiteKey key={note} note={note} handlers={eventHandlers} />
  ) : (
    <BlackKey key={note} note={note} handlers={eventHandlers} />
  );
};

export const PianoKeyboard: React.FC<Props> = (props) => {
  return (
    <div className="flex overflow-auto select-none text-xs">
      {pianoKeys.map(({ note, type }) => createKey(note, type))}
    </div>
  );
};
