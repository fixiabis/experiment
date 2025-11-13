const circleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="9.5"/></svg>`;

const xSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M4 4 L20 20"/><path d="M20 4 L4 20"/></svg>`;

const triangleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-icon lucide-triangle"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" transform="translate(0 -1.2)" /></svg>`;

const squareSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-icon lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>`;

const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`;

const hexagonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hexagon-icon lucide-hexagon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`;

const slashSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M20 4 L4 20"/></svg>`;

const plusSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M2 12h20"/><path d="M12 2v20"/></svg>`;

const asteriskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-asterisk-icon lucide-asterisk"><path d="M12 2v20"/><path d="M20.66 7 3.34 17"/><path d="M3.34 7 20.66 17"/></svg>`;

const diamondSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-diamond-icon lucide-diamond"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/></svg>`;

const pentagonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pentagon-icon lucide-pentagon"><path d="M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z"/></svg>`;

const hexagramSvg = `<svg id="hexStarStroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 12.000 1.500 L 14.625 7.453 L 21.093 6.750 L 17.250 12.000 L 21.093 17.250 L 14.625 16.547 L 12.000 22.500 L 9.375 16.547 L 2.907 17.250 L 6.750 12.000 L 2.907 6.750 L 9.375 7.453 Z"></path></path></svg>`;

const thunderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thunder-icon lucide-thunder"><path d="M12 3 L4 12 L20 12 L12 21"/></svg>`;

const circleWithSlashSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="6.5"/><path d="M20 4 L4 20"/></svg>`;

const equalWithVLineSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-equal-icon lucide-equal"><path d="M4 8H20"/><path d="M4 16H20"/><path d="M12 2V22"/></svg>`;

const xWithPlusSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M5 5 L19 19"/><path d="M19 5 L5 19"/><path d="M2 12h20"/><path d="M12 2v20"/></svg>`;

const diamondWithHLineSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-diamond-icon lucide-diamond"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/><path d="M2 12h20"/></svg>`;

const squareWithXSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-icon lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M5 5 L19 19"/><path d="M19 5 L5 19"/></svg>`;

const dice1Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dice1-icon lucide-dice-1"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M12 12h.01"/></svg>`;

const dice2Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dice2-icon lucide-dice-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M15 9h.01"/><path d="M9 15h.01"/></svg>`;

const dice3Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dice3-icon lucide-dice-3"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M12 12h.01"/><path d="M8 16h.01"/></svg>`;

const dice4Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dice4-icon lucide-dice-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M8 8h.01"/><path d="M8 16h.01"/><path d="M16 16h.01"/></svg>`;

const dice5Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dice5-icon lucide-dice-5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M8 8h.01"/><path d="M8 16h.01"/><path d="M16 16h.01"/><path d="M12 12h.01"/></svg>`;

const dice6Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dice6-icon lucide-dice-6"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M16 12h.01"/><path d="M16 16h.01"/><path d="M8 8h.01"/><path d="M8 12h.01"/><path d="M8 16h.01"/></svg>`;

const pieceSymbolToSvg = {
  omu: circleSvg,
  xro: xSvg,
  det: triangleSvg,
  rod: squareSvg,
  ast: starSvg,
  hex: hexagonSvg,
  ivo: slashSvg,
  tov: plusSvg,
  yax: asteriskSvg,
  vez: diamondSvg,
  uyn: pentagonSvg,
  mun: hexagramSvg,
  sla: thunderSvg,
  pit: circleWithSlashSvg,
  edo: equalWithVLineSvg,
  kaz: xWithPlusSvg,
  wir: diamondWithHLineSvg,
  nuf: squareWithXSvg,
};

const piecePointToSvg = {
  1: dice1Svg,
  2: dice2Svg,
  3: dice3Svg,
  4: dice4Svg,
  5: dice5Svg,
  6: dice6Svg,
};

// 創建 piece DOM 的函數
function createPieceElement(piece, options = {}) {
  const { stripedCut = false, colorful = false } = options;
  const pieceFlipWrapperElement = document.createElement('div');
  pieceFlipWrapperElement.classList.add('piece-flip-wrapper');

  const pieceFacesElement = document.createElement('div');
  pieceFacesElement.classList.add('piece-faces');
  pieceFlipWrapperElement.appendChild(pieceFacesElement);

  const pieceElement = document.createElement('div');
  pieceElement.classList.add('piece');
  pieceElement.classList.add(`-${piece.bicolor}`);
  if (colorful) {
    pieceElement.classList.add('-colorful');
  }
  pieceFacesElement.appendChild(pieceElement);

  const pieceSymbolElement = document.createElement('div');
  pieceSymbolElement.classList.add('piece-symbol');
  pieceSymbolElement.classList.add(`-symbol-${piece.symbol}`);
  if (stripedCut) {
    pieceSymbolElement.classList.add('-striped-cut');
  }
  pieceSymbolElement.innerHTML = pieceSymbolToSvg[piece.symbol] || '';
  pieceElement.appendChild(pieceSymbolElement);

  const piecePointsElement = document.createElement('div');
  piecePointsElement.classList.add('piece-point');
  piecePointsElement.innerHTML = piecePointToSvg[piece.point] || '';

  pieceElement.appendChild(piecePointsElement);

  piece.direction.forEach((direction) => {
    const pieceLinkElement = document.createElement('div');
    pieceLinkElement.classList.add('piece-link');
    pieceLinkElement.classList.add(`--${direction}`);
    pieceElement.appendChild(pieceLinkElement);
  });

  const pieceSerialElement = document.createElement('div');
  pieceSerialElement.classList.add('piece-serial');
  pieceSerialElement.textContent = piece.serial;
  pieceElement.appendChild(pieceSerialElement);

  const pieceBackElement = document.createElement('div');
  pieceBackElement.classList.add('piece-back');
  pieceFacesElement.appendChild(pieceBackElement);

  const pieceBackTextElement = document.createElement('div');
  pieceBackTextElement.classList.add('piece-back-text');
  pieceBackTextElement.textContent = 'OXDRAH';
  pieceBackElement.appendChild(pieceBackTextElement);

  return pieceFlipWrapperElement;
}

function createPieceElementV2(piece, options = {}) {
  const { stripedCut = false, colorful = false } = options;
  const pieceFlipWrapperElement = document.createElement('div');
  pieceFlipWrapperElement.classList.add('piece-flip-wrapper');

  const pieceFacesElement = document.createElement('div');
  pieceFacesElement.classList.add('piece-faces');
  pieceFlipWrapperElement.appendChild(pieceFacesElement);

  const pieceElement = document.createElement('div');
  pieceElement.classList.add('piece');
  pieceElement.classList.add(`-${piece.bicolor}`);
  pieceElement.classList.add('-v2');
  pieceElement.classList.add(`-symbol-${piece.symbol}`);
  if (colorful) {
    pieceElement.classList.add('-colorful');
  }
  pieceFacesElement.appendChild(pieceElement);

  const pieceSymbolSvg = pieceSymbolToSvg[piece.symbol] || '';

  const piecePointSvg = piecePointToSvg[piece.point] || '';

  const pieceSymbolElement = document.createElement('div');
  pieceSymbolElement.classList.add('piece-symbol');
  pieceSymbolElement.classList.add(`-symbol-${piece.symbol}`);
  if (stripedCut) {
    pieceSymbolElement.classList.add('-striped-cut');
  }
  pieceSymbolElement.innerHTML = pieceSymbolSvg;
  pieceElement.appendChild(pieceSymbolElement);

  for (const direction of ['--top-right', '--bottom-left', '--top-left', '--bottom-right']) {
    const pieceSymbolElement = document.createElement('div');
    pieceSymbolElement.classList.add('piece-symbol');
    pieceSymbolElement.classList.add('-v2');
    pieceSymbolElement.classList.add(direction);
    pieceSymbolElement.innerHTML = pieceSymbolSvg;
    pieceElement.appendChild(pieceSymbolElement);
  }

  piece.direction.forEach((direction) => {
    const pieceLinkElement = document.createElement('div');
    pieceLinkElement.classList.add('piece-link');
    pieceLinkElement.classList.add(`--${direction}`);
    pieceElement.appendChild(pieceLinkElement);
  });

  for (const direction of ['--top-right', '--bottom-left', '--top-left', '--bottom-right']) {
    const piecePointsElement = document.createElement('div');
    piecePointsElement.classList.add('piece-point');
    piecePointsElement.classList.add('-v2');
    piecePointsElement.classList.add(direction);
    piecePointsElement.innerHTML = piecePointSvg;
    pieceElement.appendChild(piecePointsElement);
  }

  for (const direction of ['--top-right', '--bottom-left', '--top-left', '--bottom-right']) {
    const pieceSerialElement = document.createElement('div');
    pieceSerialElement.classList.add('piece-serial');
    pieceSerialElement.classList.add('-v2');
    pieceSerialElement.classList.add(direction);
    pieceSerialElement.textContent = piece.serial;
    pieceElement.appendChild(pieceSerialElement);
  }

  const pieceBackElement = document.createElement('div');
  pieceBackElement.classList.add('piece-back');
  pieceFacesElement.appendChild(pieceBackElement);

  const pieceBackTextElement = document.createElement('div');
  pieceBackTextElement.classList.add('piece-back-text');
  pieceBackTextElement.textContent = 'OXDRAH';
  pieceBackElement.appendChild(pieceBackTextElement);

  return pieceFlipWrapperElement;
}
