function findTables(rootNode) {
  return Array.prototype.filter.call(rootNode.childNodes, node => node.tagName === 'TABLE');
}

function getRows(node) {
  if (node.tagName === 'TR') {
    return [node];
  }

  const childRows = Array.prototype.map
    .call(node.childNodes, childNode => getRows(childNode))
    .reduce((flatRows, subRows) => [...flatRows, ...subRows], []);

  return childRows;
}

function getCellsFromRow(row) {
  return Array.prototype.filter.call(row.childNodes, node => node.tagName === 'TD');
}

function workRow(row) {
  const cellArray = getCellsFromRow(row);
  let colspanCounter = 1;
  for (let i = 0; i < cellArray.length; i++) {
    const cell = cellArray[i];
    if (cell.innerText.startsWith('$')) {
      colspanCounter++;
      cell.parentNode.removeChild(cell);
    }
    else {
      cell.colSpan = colspanCounter;
      colspanCounter = 1;
    }
  }
}

function solveTableColSpan(text) {
  const rootNode = document.createElement('div');
  rootNode.innerHTML = text;

  const tableNodes = findTables(rootNode);
  const allRows = tableNodes.map(getRows).reduce((flatRows, subRows) => [...flatRows, ...subRows], []);


  allRows.forEach(workRow);

  return rootNode.innerHTML;
}


export function transformArticleText(text) {
  return solveTableColSpan(text);
}
