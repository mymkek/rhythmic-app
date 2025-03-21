import React from 'react';

type MetronomeBarProps = { isActive: boolean };

export const MetronomeBarComponent = ({ isActive }: MetronomeBarProps) => {
  const activeClasses = isActive ? 'bg-radial from-pink-400 from-40% to-fuchsia-700' : 'bg-neutral-400';

  return (
    <span className="relative flex size-3 h-16 mx-5">
      {isActive ? (
        <span className="absolute h-full w-full animate-fade-out-scale rounded-full bg-rose-400"></span>
      ) : null}
      <span className={'relative w-full h-full rounded-full ' + activeClasses}></span>
    </span>
  );
};
