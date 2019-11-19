import React from 'react';

const SVG = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    display='block'
    preserveAspectRatio='xMidYMid'
    viewBox='0 0 100 100'
    style={{ margin: 'auto', background: '0 0' }}
  >
    <defs>
      <path id='a' fill='none' d='M50 15a15 35 0 010 70 15 35 0 010-70' />
      <path id='b' fill='none' d='M0 0a15 35 0 010 70A15 35 0 010 0' />
    </defs>
    <g>
      <use stroke='#dfdfdf' strokeWidth='3' href='#a' />
    </g>
    <g transform='rotate(60 50 50)'>
      <use stroke='#dfdfdf' strokeWidth='3' href='#a' />
    </g>
    <g transform='rotate(120 50 50)'>
      <use stroke='#dfdfdf' strokeWidth='3' href='#a' />
    </g>
    <g>
      <circle cx='50' cy='15' r='9' fill='#e15b64'>
        <animateMotion begin='0s' dur='1s' repeatCount='indefinite'>
          <mpath href='#b' />
        </animateMotion>
      </circle>
    </g>
    <g transform='rotate(60 50 50)'>
      <circle cx='50' cy='15' r='9' fill='#f8b26a'>
        <animateMotion
          begin='-0.16666666666666666s'
          dur='1s'
          repeatCount='indefinite'
        >
          <mpath href='#b' />
        </animateMotion>
      </circle>
    </g>
    <g transform='rotate(120 50 50)'>
      <circle cx='50' cy='15' r='9' fill='#abbd81'>
        <animateMotion
          begin='-0.3333333333333333s'
          dur='1s'
          repeatCount='indefinite'
        >
          <mpath href='#b' />
        </animateMotion>
      </circle>
    </g>
  </svg>
);

export default function Loader({ isFullPage }) {
  if (isFullPage) {
    return (
      <div className='loading-overlay'>
        <div className='loading-background'></div>
        {SVG}
      </div>
    );
  }

  return SVG;
}
