const symbols = ['omu', 'xro', 'det', 'rod', 'ast', 'hex', 'ivo', 'tov', 'yax', 'vez', 'uyn', 'wir'];

const points = [1, 2, 3, 4, 5, 6];

const directionArrays = [
  [[], [], [], [], [], []],
  [['top'], ['bottom'], ['left'], ['right'], ['bottom'], ['right']],
  [
    ['top', 'left'],
    ['top', 'right'],
    ['bottom', 'left'],
    ['bottom', 'right'],
    ['bottom', 'left'],
    ['top', 'right'],
  ],
  [
    ['top', 'bottom'],
    ['top', 'bottom'],
    ['left', 'right'],
    ['left', 'right'],
    ['left', 'right'],
    ['top', 'bottom'],
  ],
  [
    ['top', 'bottom', 'right'],
    ['top', 'bottom', 'left'],
    ['top', 'left', 'right'],
    ['bottom', 'left', 'right'],
    ['top', 'left', 'right'],
    ['top', 'bottom', 'left'],
  ],
  [
    ['top', 'bottom', 'left', 'right'],
    ['top', 'bottom', 'left', 'right'],
    ['top', 'bottom', 'left', 'right'],
    ['top', 'bottom', 'left', 'right'],
    ['top', 'bottom', 'left', 'right'],
    ['top', 'bottom', 'left', 'right'],
  ],
];

const piecePropsArray = symbols.flatMap((symbol, symbolIndex) =>
  points.flatMap((point, pointIndex) =>
    directionArrays.map((directions, directionIndex) => ({
      symbol,
      point,
      serial: point + directionIndex * points.length,
      direction: directions[pointIndex],
      bicolor: (symbolIndex < 6 ? symbolIndex % 2 === 0 : symbolIndex % 2 === 1)
        ? directionIndex % 2 === 0
          ? point % 2 === 0
            ? 'dark'
            : 'light'
          : point % 2 === 0
          ? 'light'
          : 'dark'
        : directionIndex % 2 === 0
        ? point % 2 === 0
          ? 'light'
          : 'dark'
        : point % 2 === 0
        ? 'dark'
        : 'light',
    }))
  )
);

const chunkSize = Math.ceil(piecePropsArray.length / 9);

const piecePropsArrays = [];

for (let i = 0; i < piecePropsArray.length; i += chunkSize) {
  piecePropsArrays.push(piecePropsArray.slice(i, i + chunkSize));
}

const bodyElement = /** @type {HTMLBodyElement} */ (document.querySelector('body'));

// 獲取縱向值
function getVerticalType(direction) {
  const hasTop = direction.includes('top');
  const hasBottom = direction.includes('bottom');
  if (!hasTop && !hasBottom) return '無';
  if (hasTop && hasBottom) return '上下';
  if (hasTop) return '向上';
  return '向下';
}

// 獲取橫向值
function getHorizontalType(direction) {
  const hasLeft = direction.includes('left');
  const hasRight = direction.includes('right');
  if (!hasLeft && !hasRight) return '無';
  if (hasLeft && hasRight) return '左右';
  if (hasLeft) return '向左';
  return '向右';
}

// 排序函數
function getSortValue(piece, sortField) {
  switch (sortField) {
    case 'symbol':
      return symbols.indexOf(piece.symbol);
    case 'point':
      return piece.point;
    case 'direction':
      const sortedDir = [...piece.direction].sort().join(',');
      return piece.direction.length * 1000 + sortedDir.localeCompare('');
    case 'serial':
      return piece.serial;
    case 'bicolor':
      return piece.bicolor === 'light' ? 0 : 1;
    case 'vertical':
      const verticalType = getVerticalType(piece.direction);
      const verticalOrder = ['無', '向上', '向下', '上下'];
      return verticalOrder.indexOf(verticalType);
    case 'horizontal':
      const horizontalType = getHorizontalType(piece.direction);
      const horizontalOrder = ['無', '向左', '向右', '左右'];
      return horizontalOrder.indexOf(horizontalType);
    default:
      return 0;
  }
}

function sortPieces(pieceArray, sortConfigs) {
  const filteredConfigs = sortConfigs.filter((c) => c.field);
  if (filteredConfigs.length === 0) return pieceArray;

  return [...pieceArray].sort((a, b) => {
    for (const config of filteredConfigs) {
      const aVal = getSortValue(a, config.field);
      const bVal = getSortValue(b, config.field);
      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      else if (aVal > bVal) comparison = 1;

      // 如果是倒序，則反轉比較結果
      if (comparison !== 0) {
        return config.order === 'desc' ? -comparison : comparison;
      }
    }
    return 0;
  });
}

// 過濾函數
function getDirectionType(direction) {
  const len = direction.length;
  if (len === 0) return '無向';
  if (len === 1) return '一向';
  if (len === 2) {
    const opposites = [
      ['top', 'bottom'],
      ['bottom', 'top'],
      ['left', 'right'],
      ['right', 'left'],
    ];
    const sorted = [...direction].sort();
    const isOpposite = opposites.some((opp) => sorted[0] === opp[0] && sorted[1] === opp[1]);
    return isOpposite ? '兩面' : '兩夾';
  }
  if (len === 3) return '三向';
  if (len === 4) return '四向';
  return '';
}

function filterPieces(pieceArray, filterConfigs) {
  if (filterConfigs.length === 0) return pieceArray;

  // 按字段和操作符分組過濾條件
  const filtersByField = {};
  filterConfigs.forEach((filter) => {
    if (!filter.field || !filter.value) return;
    if (!filtersByField[filter.field]) {
      filtersByField[filter.field] = { include: [], exclude: [] };
    }
    filtersByField[filter.field][filter.operator === 'include' ? 'include' : 'exclude'].push(filter);
  });

  return pieceArray.filter((piece) => {
    // 不同字段組之間使用 AND 邏輯
    return Object.keys(filtersByField).every((field) => {
      const fieldFilters = filtersByField[field];

      // 獲取該字段的實際值
      let pieceValue;
      switch (field) {
        case 'symbol':
          pieceValue = piece.symbol;
          break;
        case 'point':
          pieceValue = piece.point.toString();
          break;
        case 'direction':
          pieceValue = getDirectionType(piece.direction);
          break;
        case 'vertical':
          pieceValue = getVerticalType(piece.direction);
          break;
        case 'horizontal':
          pieceValue = getHorizontalType(piece.direction);
          break;
        case 'serial':
          pieceValue = piece.serial.toString();
          break;
        case 'bicolor':
          pieceValue = piece.bicolor;
          break;
        default:
          return true;
      }

      // include 條件：使用 OR 邏輯（只要滿足任何一個 include 條件即可）
      const includeMatch =
        fieldFilters.include.length === 0 ||
        fieldFilters.include.some((filter) => {
          return pieceValue === filter.value || pieceValue.toString() === filter.value;
        });

      // exclude 條件：使用 AND 邏輯（必須不滿足所有 exclude 條件）
      const excludeMatch = fieldFilters.exclude.every((filter) => {
        return pieceValue !== filter.value && pieceValue.toString() !== filter.value;
      });

      // 必須同時滿足 include 和 exclude 條件
      return includeMatch && excludeMatch;
    });
  });
}

// 渲染 pieces 的函數
function renderPieces(sortConfigs = [], filterConfigs = []) {
  // 刪除所有現有的 pieces
  const existingPieces = document.querySelectorAll('.pieces');
  existingPieces.forEach((el) => el.remove());

  // 過濾
  let filteredPiecePropsArray = filterPieces(piecePropsArray, filterConfigs);

  // 排序
  const sortedPiecePropsArray = sortPieces(filteredPiecePropsArray, sortConfigs);

  // 重新分組
  const chunkSize = Math.ceil(sortedPiecePropsArray.length / (sortedPiecePropsArray.length / (6 * 4)));
  const sortedPiecePropsArrays = [];
  for (let i = 0; i < sortedPiecePropsArray.length; i += chunkSize) {
    sortedPiecePropsArrays.push(sortedPiecePropsArray.slice(i, i + chunkSize));
  }

  // 獲取選擇的版本和 striped-cut 設定
  const versionSelect = /** @type {HTMLSelectElement} */ (document.getElementById('versionSelect'));
  const stripedCutCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('stripedCutCheckbox'));
  const selectedVersion = versionSelect.value;
  const stripedCut = stripedCutCheckbox.checked;

  // 根據版本選擇對應的創建函數
  const createElement = selectedVersion === 'v2' ? createPieceElementV2 : createPieceElement;

  // 重新生成 DOM
  sortedPiecePropsArrays.forEach((piecePropsArray) => {
    const piecesElement = document.createElement('div');
    piecesElement.classList.add('pieces');
    bodyElement.appendChild(piecesElement);

    piecePropsArray.forEach((piece) => {
      const pieceElement = createElement(piece, { stripedCut });
      piecesElement.appendChild(pieceElement);
    });
  });
}

// 過濾器管理

function updateFilterValueOptions(valueSelect, fieldSelect) {
  const field = fieldSelect.value;
  valueSelect.innerHTML = '';

  if (!field) {
    valueSelect.disabled = true;
    return;
  }

  valueSelect.disabled = false;

  // 添加"尚未選擇"選項
  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = '尚未選擇';
  valueSelect.appendChild(placeholderOption);

  switch (field) {
    case 'symbol':
      symbols.forEach((sym) => {
        const option = document.createElement('option');
        option.value = sym;
        option.textContent =
          sym === 'omu'
            ? '圈圈'
            : sym === 'xro'
            ? '交叉'
            : sym === 'det'
            ? '三角'
            : sym === 'rod'
            ? '方形'
            : sym === 'ast'
            ? '五芒'
            : sym === 'hex'
            ? '六邊'
            : sym === 'ivo'
            ? '斜線'
            : sym === 'tov'
            ? '加號'
            : sym === 'yax'
            ? '星號'
            : sym === 'vez'
            ? '菱形'
            : sym === 'uyn'
            ? '五邊'
            : sym === 'wir'
            ? '六芒'
            : '';
        valueSelect.appendChild(option);
      });
      break;
    case 'point':
      points.forEach((pt) => {
        const option = document.createElement('option');
        option.value = pt.toString();
        option.textContent = pt.toString();
        valueSelect.appendChild(option);
      });
      break;
    case 'direction':
      ['無向', '一向', '兩夾', '兩面', '三向', '四向'].forEach((dir) => {
        const option = document.createElement('option');
        option.value = dir;
        option.textContent = dir;
        valueSelect.appendChild(option);
      });
      break;
    case 'vertical':
      ['無', '向上', '向下', '上下'].forEach((ver) => {
        const option = document.createElement('option');
        option.value = ver;
        option.textContent = ver;
        valueSelect.appendChild(option);
      });
      break;
    case 'horizontal':
      ['無', '對左', '對右', '左右'].forEach((hor) => {
        const option = document.createElement('option');
        option.value = hor;
        option.textContent = hor;
        valueSelect.appendChild(option);
      });
      break;
    case 'serial':
      const uniqueSerials = [...new Set(piecePropsArray.map((p) => p.serial))].sort((a, b) => a - b);
      uniqueSerials.forEach((ser) => {
        const option = document.createElement('option');
        option.value = ser.toString();
        option.textContent = ser.toString();
        valueSelect.appendChild(option);
      });
      break;
    case 'bicolor':
      ['light', 'dark'].forEach((bicolor) => {
        const option = document.createElement('option');
        option.value = bicolor;
        option.textContent = bicolor === 'light' ? '淺色' : '深色';
        valueSelect.appendChild(option);
      });
      break;
  }
}

function createFilterItem() {
  const item = document.createElement('div');
  item.classList.add('filter-controls-item');

  const fieldSelect = document.createElement('select');
  fieldSelect.classList.add('filter-controls-field');
  fieldSelect.innerHTML = `
          <option value="">選擇</option>
          <option value="symbol">符號</option>
          <option value="point">點數</option>
          <option value="direction">方向</option>
          <option value="vertical">縱向</option>
          <option value="horizontal">橫向</option>
          <option value="serial">序列</option>
          <option value="bicolor">雙色</option>
        `;

  const operatorSelect = document.createElement('select');
  operatorSelect.classList.add('filter-controls-operator');
  operatorSelect.innerHTML = `
          <option value="include">包含</option>
          <option value="exclude">不含</option>
        `;

  const valueSelect = document.createElement('select');
  valueSelect.classList.add('filter-controls-value');
  valueSelect.disabled = true;

  const removeButton = document.createElement('button');
  removeButton.classList.add('filter-controls-remove');
  removeButton.textContent = '刪除';
  removeButton.addEventListener('click', () => {
    item.remove();
    // 自動應用
    applyFiltersAndSort();
  });

  fieldSelect.addEventListener('change', () => {
    updateFilterValueOptions(valueSelect, fieldSelect);
    // 自動應用（在選項更新後）
    setTimeout(applyFiltersAndSort, 0);
  });

  // 添加變化監聽
  operatorSelect.addEventListener('change', applyFiltersAndSort);
  valueSelect.addEventListener('change', applyFiltersAndSort);

  item.appendChild(fieldSelect);
  item.appendChild(operatorSelect);
  item.appendChild(valueSelect);
  item.appendChild(removeButton);

  return item;
}

function getFilterConfigs() {
  const items = document.querySelectorAll('.filter-controls-item');
  return Array.from(items).map((item) => {
    const fieldSelect = /** @type {HTMLSelectElement} */ (item.querySelector('.filter-controls-field'));
    const operatorSelect = /** @type {HTMLSelectElement} */ (item.querySelector('.filter-controls-operator'));
    const valueSelect = /** @type {HTMLSelectElement} */ (item.querySelector('.filter-controls-value'));
    return {
      field: fieldSelect.value,
      operator: operatorSelect.value,
      value: valueSelect.value,
    };
  });
}

function updateSortLabels() {
  const items = document.querySelectorAll('.sort-controls-row');
  items.forEach((it, index) => {
    const lbl = it.querySelector('.sort-controls-label');
    if (lbl) {
      lbl.textContent = `${index + 1}:`;
    }
    // 更新往上按鈕狀態
    const upButton = /** @type {HTMLButtonElement} */ (it.querySelector('.sort-controls-up'));
    if (upButton) {
      upButton.disabled = index === 0;
    }
  });
}

function createSortItem() {
  const item = document.createElement('div');
  item.classList.add('sort-controls-row');

  const label = document.createElement('div');
  label.classList.add('sort-controls-label');
  label.textContent = `${/** @type {HTMLDivElement} */ (document.getElementById('sortList')).children.length + 1}:`;

  const fieldSelect = /** @type {HTMLSelectElement} */ (document.createElement('select'));
  fieldSelect.classList.add('sort-controls-select');
  fieldSelect.innerHTML = `
          <option value="">無</option>
          <option value="symbol">符號</option>
          <option value="point">點數</option>
          <option value="direction">方向</option>
          <option value="vertical">縱向</option>
          <option value="horizontal">橫向</option>
          <option value="serial">序列</option>
          <option value="bicolor">雙色</option>
        `;

  const orderSelect = /** @type {HTMLSelectElement} */ (document.createElement('select'));
  orderSelect.classList.add('sort-controls-order');
  orderSelect.innerHTML = `
          <option value="asc">正序</option>
          <option value="desc">倒序</option>
        `;

  const upButton = /** @type {HTMLButtonElement} */ (document.createElement('button'));
  upButton.classList.add('sort-controls-up');
  upButton.textContent = '往上';
  upButton.addEventListener('click', () => {
    const sortList = /** @type {HTMLDivElement} */ (document.getElementById('sortList'));
    const items = Array.from(sortList.children);
    const currentIndex = items.indexOf(item);
    if (currentIndex > 0) {
      // 與前一個項目交換位置
      const prevItem = items[currentIndex - 1];
      sortList.insertBefore(item, prevItem);
      updateSortLabels();
      // 自動應用
      applyFiltersAndSort();
    }
  });

  const removeButton = document.createElement('button');
  removeButton.classList.add('sort-controls-remove');
  removeButton.textContent = '刪除';
  removeButton.addEventListener('click', () => {
    item.remove();
    updateSortLabels();
    // 自動應用
    applyFiltersAndSort();
  });

  // 添加變化監聽
  fieldSelect.addEventListener('change', applyFiltersAndSort);
  orderSelect.addEventListener('change', applyFiltersAndSort);

  item.appendChild(label);
  item.appendChild(fieldSelect);
  item.appendChild(orderSelect);
  item.appendChild(upButton);
  item.appendChild(removeButton);

  return item;
}

function getSortConfigs() {
  const items = document.querySelectorAll('.sort-controls-row');
  return Array.from(items).map((item) => {
    const fieldSelect = /** @type {HTMLSelectElement} */ (item.querySelector('.sort-controls-select'));
    const orderSelect = /** @type {HTMLSelectElement} */ (item.querySelector('.sort-controls-order'));
    return {
      field: fieldSelect.value,
      order: orderSelect.value,
    };
  });
}

function applyFiltersAndSort() {
  const sortConfigs = getSortConfigs();
  const filterConfigs = getFilterConfigs();
  renderPieces(sortConfigs, filterConfigs);
}

// 初始渲染
renderPieces();

// 排序控制
const sortList = /** @type {HTMLDivElement} */ (document.getElementById('sortList'));
const addSortButton = /** @type {HTMLButtonElement} */ (document.getElementById('addSort'));

addSortButton.addEventListener('click', () => {
  const item = createSortItem();
  sortList.appendChild(item);
  updateSortLabels();
  // 不需要自動應用，因為新項目的選擇器都是默認值，等待用戶選擇後再應用
});

// 過濾控制
const filterList = /** @type {HTMLDivElement} */ (document.getElementById('filterList'));
const addFilterButton = /** @type {HTMLButtonElement} */ (document.getElementById('addFilter'));

addFilterButton.addEventListener('click', () => {
  const item = createFilterItem();
  filterList.appendChild(item);
});

// 外觀控制
const versionSelect = /** @type {HTMLSelectElement} */ (document.getElementById('versionSelect'));
const stripedCutCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('stripedCutCheckbox'));
versionSelect.addEventListener('change', () => {
  applyFiltersAndSort();
});
stripedCutCheckbox.addEventListener('change', () => {
  applyFiltersAndSort();
});
