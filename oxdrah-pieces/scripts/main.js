const symbols = [
  'omu',
  'xro',
  'det',
  'rod',
  'ast',
  'hex',
  'ivo',
  'tov',
  'yax',
  'vez',
  'uyn',
  'mun',
  'sla',
  'pit',
  'edo',
  'kaz',
  'wir',
  'nuf',
];

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

const colors = ['crimson', 'royalblue', 'darkorange', 'seagreen', 'blueviolet', 'sienna'];

const colorNames = ['紅', '藍', '橙', '綠', '紫', '棕'];

const piecePropsArray = symbols.slice(0, 6).flatMap((_, symbolIndex) =>
  points.flatMap((point, pointIndex) =>
    directionArrays.map((directions, directionIndex) => ({
      symbol: symbols[symbolIndex + ((pointIndex + directionIndex) % 3) * 6],
      color: colors[symbolIndex % 6],
      point,
      serial: point + directionIndex * points.length,
      direction: directions[pointIndex],
      tiles: Math.floor((symbolIndex + ((pointIndex + directionIndex) % 3) * 6) / 6) + 1,
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
    case 'color':
      return colors.indexOf(piece.color);
    case 'tiles':
      return piece.tiles;
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
        case 'serial':
          pieceValue = piece.serial.toString();
          break;
        case 'bicolor':
          pieceValue = piece.bicolor;
          break;
        case 'color':
          pieceValue = piece.color;
          break;
        case 'tiles':
          pieceValue = piece.tiles.toString();
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
  const existingPieces = document.querySelectorAll('.pieces');
  const versionSelect = /** @type {HTMLSelectElement} */ (document.getElementById('versionSelect'));
  const stripedCutCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('stripedCutCheckbox'));
  const colorfulCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('colorfulCheckbox'));
  const printControlsCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('printControlsCheckbox'));
  const printPageCount = /** @type {HTMLInputElement} */ (document.getElementById('printPageCount'));
  existingPieces.forEach((el) => el.remove());

  // 過濾
  let filteredPiecePropsArray = filterPieces(piecePropsArray, filterConfigs);

  // 排序
  const sortedPiecePropsArray = sortPieces(filteredPiecePropsArray, sortConfigs);

  // 重新分組
  const chunkSize = Math.ceil(
    sortedPiecePropsArray.length /
      (sortedPiecePropsArray.length / (!printControlsCheckbox.checked ? 6 * 4 : Number(printPageCount.value)))
  );
  const sortedPiecePropsArrays = [];
  for (let i = 0; i < sortedPiecePropsArray.length; i += chunkSize) {
    sortedPiecePropsArrays.push(sortedPiecePropsArray.slice(i, i + chunkSize));
  }

  const selectedVersion = versionSelect.value;
  const stripedCut = stripedCutCheckbox.checked;
  const colorful = colorfulCheckbox.checked;
  // 根據版本選擇對應的創建函數
  const createElement = selectedVersion === 'v2' ? createPieceElementV2 : createPieceElement;

  // 重新生成 DOM
  sortedPiecePropsArrays.forEach((piecePropsArray) => {
    const piecesElement = document.createElement('div');
    piecesElement.classList.add('pieces');
    bodyElement.appendChild(piecesElement);

    piecePropsArray.forEach((piece) => {
      const pieceElement = createElement(piece, { stripedCut, colorful });
      piecesElement.appendChild(pieceElement);
    });
  });

  // 更新列印設定
  updatePrintSettings();
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
            : sym === 'mun'
            ? '六芒'
            : sym === 'sla'
            ? '閃電'
            : sym === 'pit'
            ? '圈線'
            : sym === 'edo'
            ? '雙十'
            : sym === 'kaz'
            ? '米字'
            : sym === 'wir'
            ? '菱線'
            : sym === 'nuf'
            ? '方叉'
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
    case 'serial':
      const uniqueSerials = [...new Set(piecePropsArray.map((p) => p.serial))].sort((a, b) => a - b);
      uniqueSerials.forEach((ser) => {
        const option = document.createElement('option');
        option.value = ser.toString();
        option.textContent = ser.toString();
        valueSelect.appendChild(option);
      });
      break;
    case 'color':
      colors.forEach((color) => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = colorNames[colors.indexOf(color)];
        valueSelect.appendChild(option);
      });
      break;
    case 'tiles':
      [1, 2, 3].forEach((tiles) => {
        const option = document.createElement('option');
        option.value = tiles.toString();
        option.textContent = tiles.toString();
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
          <option value="direction">向位</option>
          <option value="serial">序列</option>
          <option value="bicolor">雙色</option>
          <option value="color">顏色</option>
          <option value="tiles">磚紋</option>
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
          <option value="direction">向位</option>
          <option value="serial">序列</option>
          <option value="bicolor">雙色</option>
          <option value="color">顏色</option>
          <option value="tiles">磚紋</option>
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
const colorfulCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('colorfulCheckbox'));
versionSelect.addEventListener('change', () => {
  applyFiltersAndSort();
});
stripedCutCheckbox.addEventListener('change', () => {
  applyFiltersAndSort();
});
colorfulCheckbox.addEventListener('change', () => {
  applyFiltersAndSort();
});
// 列印控制
function updatePrintSettings() {
  const printBackground = /** @type {HTMLSelectElement} */ (document.getElementById('printBackground'));
  const printControlsCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('printControlsCheckbox'));
  const printVerticalGap = /** @type {HTMLInputElement} */ (document.getElementById('printVerticalGap'));
  const printHorizontalGap = /** @type {HTMLInputElement} */ (document.getElementById('printHorizontalGap'));
  const printVerticalPadding = /** @type {HTMLInputElement} */ (document.getElementById('printVerticalPadding'));
  const printHorizontalPadding = /** @type {HTMLInputElement} */ (document.getElementById('printHorizontalPadding'));
  const printRowCount = /** @type {HTMLInputElement} */ (document.getElementById('printRowCount'));
  const printColumnCount = /** @type {HTMLInputElement} */ (document.getElementById('printColumnCount'));
  const printPageWidth = /** @type {HTMLInputElement} */ (document.getElementById('printPageWidth'));
  const printPageHeight = /** @type {HTMLInputElement} */ (document.getElementById('printPageHeight'));

  if (!printControlsCheckbox.checked) {
    return;
  }

  document.body.style.backgroundColor = printBackground.value === 'white' ? '#fff' : '#000';

  const piecesElements = document.querySelectorAll('.pieces');
  piecesElements.forEach((piecesElement) => {
    const element = /** @type {HTMLElement} */ (piecesElement);
    element.style.setProperty('--pieces__width', `${printPageWidth.value}mm`);
    element.style.setProperty('--pieces__height', `${printPageHeight.value}mm`);
    element.style.setProperty('--pieces__gap__vertical', `${printVerticalGap.value}mm`);
    element.style.setProperty('--pieces__gap__horizontal', `${printHorizontalGap.value}mm`);
    element.style.setProperty('--pieces__padding__vertical', `${printVerticalPadding.value}mm`);
    element.style.setProperty('--pieces__padding__horizontal', `${printHorizontalPadding.value}mm`);
    element.style.setProperty('--pieces__row_count', printRowCount.value);
    element.style.setProperty('--pieces__column_count', printColumnCount.value);
  });

  piecesElements.forEach((piecesElement) => {
    for (let i = 0; i < Number(printRowCount.value) + 1; i++) {
      {
        const trimLine = document.createElement('div');
        trimLine.classList.add('trim-line');
        trimLine.classList.add(printBackground.value !== 'white' ? '-white' : '-black');
        trimLine.classList.add(`--top`);
        trimLine.style.setProperty('--trim-line__order', String(i + 1));
        piecesElement.appendChild(trimLine);
      }

      {
        const trimLine = document.createElement('div');
        trimLine.classList.add('trim-line');
        trimLine.classList.add(printBackground.value !== 'white' ? '-white' : '-black');
        trimLine.classList.add(`--bottom`);
        trimLine.style.setProperty('--trim-line__order', String(i + 1));
        piecesElement.appendChild(trimLine);
      }
    }

    for (let i = 0; i < Number(printColumnCount.value) + 1; i++) {
      {
        const trimLine = document.createElement('div');
        trimLine.classList.add('trim-line');
        trimLine.classList.add(printBackground.value !== 'white' ? '-white' : '-black');
        trimLine.classList.add(`--left`);
        trimLine.style.setProperty('--trim-line__order', String(i + 1));
        piecesElement.appendChild(trimLine);
      }

      {
        const trimLine = document.createElement('div');
        trimLine.classList.add('trim-line');
        trimLine.classList.add(printBackground.value !== 'white' ? '-white' : '-black');
        trimLine.classList.add(`--right`);
        trimLine.style.setProperty('--trim-line__order', String(i + 1));
        piecesElement.appendChild(trimLine);
      }
    }
  });
}

const printVerticalGap = /** @type {HTMLInputElement} */ (document.getElementById('printVerticalGap'));
const printHorizontalGap = /** @type {HTMLInputElement} */ (document.getElementById('printHorizontalGap'));
const printVerticalPadding = /** @type {HTMLInputElement} */ (document.getElementById('printVerticalPadding'));
const printHorizontalPadding = /** @type {HTMLInputElement} */ (document.getElementById('printHorizontalPadding'));
const printRowCount = /** @type {HTMLInputElement} */ (document.getElementById('printRowCount'));
const printColumnCount = /** @type {HTMLInputElement} */ (document.getElementById('printColumnCount'));
const printPageWidth = /** @type {HTMLInputElement} */ (document.getElementById('printPageWidth'));
const printPageHeight = /** @type {HTMLInputElement} */ (document.getElementById('printPageHeight'));
const printControlsCheckbox = /** @type {HTMLInputElement} */ (document.getElementById('printControlsCheckbox'));
const printBackground = /** @type {HTMLSelectElement} */ (document.getElementById('printBackground'));
const printPageCount = /** @type {HTMLInputElement} */ (document.getElementById('printPageCount'));
printVerticalGap.addEventListener('input', () => {
  applyFiltersAndSort();
});
printHorizontalGap.addEventListener('input', () => {
  applyFiltersAndSort();
});
printVerticalPadding.addEventListener('input', () => {
  applyFiltersAndSort();
});
printHorizontalPadding.addEventListener('input', () => {
  applyFiltersAndSort();
});
printRowCount.addEventListener('input', () => applyFiltersAndSort());
printColumnCount.addEventListener('input', () => applyFiltersAndSort());
printPageWidth.addEventListener('input', () => applyFiltersAndSort());
printPageHeight.addEventListener('input', () => applyFiltersAndSort());
printPageCount.addEventListener('input', () => applyFiltersAndSort());
printControlsCheckbox.addEventListener('change', () => applyFiltersAndSort());
printBackground.addEventListener('change', () => applyFiltersAndSort());
// 初始設定
applyFiltersAndSort();
