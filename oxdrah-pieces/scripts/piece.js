// 創建 piece DOM 的函數
function createPieceElement(piece) {
  const pieceFlipWrapperElement = document.createElement('div');
  pieceFlipWrapperElement.classList.add('piece-flip-wrapper');

  const pieceFacesElement = document.createElement('div');
  pieceFacesElement.classList.add('piece-faces');
  pieceFlipWrapperElement.appendChild(pieceFacesElement);

  const pieceElement = document.createElement('div');
  pieceElement.classList.add('piece');
  pieceElement.classList.add(`-${piece.symbol}`);
  pieceFacesElement.appendChild(pieceElement);

  piece.direction.forEach((direction) => {
    const pieceLinkElement = document.createElement('div');
    pieceLinkElement.classList.add('piece-link');
    pieceLinkElement.classList.add(`--${direction}`);
    pieceElement.appendChild(pieceLinkElement);
  });

  const pieceSymbolElement = document.createElement('div');
  pieceSymbolElement.classList.add('piece-symbol');

  pieceSymbolElement.innerHTML =
    piece.symbol === 'omu'
      ? circleSvg
      : piece.symbol === 'xro'
      ? xSvg
      : piece.symbol === 'det'
      ? triangleSvg
      : piece.symbol === 'rod'
      ? squareSvg
      : piece.symbol === 'ast'
      ? starSvg
      : hexagonSvg;

  pieceElement.appendChild(pieceSymbolElement);

  const piecePointsElement = document.createElement('div');
  piecePointsElement.classList.add('piece-point');
  piecePointsElement.innerHTML =
    piece.point === 6
      ? dice6Svg
      : piece.point === 5
      ? dice5Svg
      : piece.point === 4
      ? dice4Svg
      : piece.point === 3
      ? dice3Svg
      : piece.point === 2
      ? dice2Svg
      : dice1Svg;

  pieceElement.appendChild(piecePointsElement);

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
