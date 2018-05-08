export const subtract = (a, b) => {
  let result = parseFloat((a * 100 - b * 100) / 100).toFixed(2);
  return +result;
};

export const add = (a, b) => {
  let result = parseFloat((a * 100 + b * 100) / 100).toFixed(2);
  return +result;
};

/**
 * Find opposite item index.
 * */
const findOppositeItemIndex = (items, changedItemIndex, isSearchMin) => {
  let checker = isSearchMin ? 111 : -1;
  let oppositeItemIndex = null;

  items.forEach((item, index) => {
    let condition = isSearchMin
      ? item.percent <= checker && index !== changedItemIndex
      : item.percent >= checker && index !== changedItemIndex;

    if (condition) {
      checker = item.percent;
      oppositeItemIndex = index;
    }
  });

  return oppositeItemIndex;
};

/**
 * Find second opposite item index.
 * */
const findSecondOppositeItemIndex = (items, changedItemIndex, firstOppositeItemIndex, isSearchMin) => {
  let checker = isSearchMin ? 111 : -1;
  let secondOppositeItemIndex = null;

  if (items.length === 2) {
    return changedItemIndex;
  }

  items.forEach((item, index) => {
    let condition = isSearchMin
      ? item.percent <= checker && index !== changedItemIndex && index !== firstOppositeItemIndex
      : item.percent >= checker && index !== changedItemIndex && index !== firstOppositeItemIndex;

    if (condition) {
      checker = item.percent;
      secondOppositeItemIndex = index;
    }
  });

  return secondOppositeItemIndex;
};

/**
 * Calculates delta value for current step.
 * */
const calculateStepDelta = (items, firstOppositeMaxIndex, secondOppositeMaxIndex, newValue, changedItemIndex) => {
  const checkDeltaSize = (delta) => {
    // If delta is greater than target value, recalculate it.
    if (delta > Math.abs(subtract(newValue, items[changedItemIndex].percent))) {
      return Math.abs(subtract(newValue, items[changedItemIndex].percent));
    } else if (delta === 0) {
      return Math.abs(subtract(newValue, items[changedItemIndex].percent));
    } else {
      return delta;
    }
  };

  let delta;

  // If have two equals values, return first of them.
  if (items[firstOppositeMaxIndex].percent === items[secondOppositeMaxIndex].percent) {
    delta = items[firstOppositeMaxIndex].percent;
    delta = checkDeltaSize(delta);
    return delta;
  }

  // Calculate delta.
  delta = Math.abs(subtract(items[firstOppositeMaxIndex].percent, items[secondOppositeMaxIndex].percent));
  delta = checkDeltaSize(delta);

  return delta;
};

/**
 * Calculates index of opposite item for current step.
 * */
const calculateStepOppositeIndex = (items, firstOppositeMinIndex, secondOppositeMinIndex) => {
  if (items[firstOppositeMinIndex].percent === items[secondOppositeMinIndex].percent) {
    return firstOppositeMinIndex < secondOppositeMinIndex
      ? firstOppositeMinIndex
      : secondOppositeMinIndex;
  } else {
    return firstOppositeMinIndex;
  }
};

/**
 * Main calculation utility. Calculates next items values, when values changes.
 * */
export const doChangeStep = (items, changedItemIndex, oldValue, newValue) => {
  // Define if item was increased or decreased.
  const wasItemIncreased = newValue - oldValue > 0;
  let thisStepDelta;
  let thisStepOppositeIndex;
  let firstOppositeIndex;
  let secondOppositeIndex;

  if (items.length === 1) {
    items[changedItemIndex].percent = add(0, newValue);
    return items;
  }

  // Пока не присвоим новое значение элементу.
  while (items[changedItemIndex].percent !== newValue) {
    if (wasItemIncreased) {
      // Index of first max.
      firstOppositeIndex = findOppositeItemIndex(items, changedItemIndex, false);
      // Index of second max
      secondOppositeIndex = findSecondOppositeItemIndex(items, changedItemIndex, firstOppositeIndex, false);
      // Calculate delta for this step.
      thisStepDelta = calculateStepDelta(items, firstOppositeIndex, secondOppositeIndex, newValue, changedItemIndex);
      thisStepOppositeIndex = calculateStepOppositeIndex(items, firstOppositeIndex, secondOppositeIndex);

      items[changedItemIndex].percent = add(items[changedItemIndex].percent, thisStepDelta);
      items[thisStepOppositeIndex].percent = subtract(items[thisStepOppositeIndex].percent, thisStepDelta);
    } else {
      // Index of first min.
      firstOppositeIndex = findOppositeItemIndex(items, changedItemIndex, true);
      // Index of second min
      secondOppositeIndex = findSecondOppositeItemIndex(items, changedItemIndex, firstOppositeIndex, true);
      // Calculate delta for this step.
      thisStepDelta = calculateStepDelta(items, firstOppositeIndex, secondOppositeIndex, newValue, changedItemIndex);
      thisStepOppositeIndex = calculateStepOppositeIndex(items, firstOppositeIndex, secondOppositeIndex);

      items[changedItemIndex].percent = subtract(items[changedItemIndex].percent, thisStepDelta);
      items[thisStepOppositeIndex].percent = add(items[thisStepOppositeIndex].percent, thisStepDelta);
    }
  }

  return items;
};

/**
 * Handle potential server response errors in percents distribution.
 * */
export const distributePercents = (items) => {
  // If we have single item with percent less than 100.
  if (items.length === 1 && items[0].percent <= 100) return items;

  // Calculate percents sum.
  let sum = 0;
  items.forEach((item) => {
    sum += item.percent;
  });

  // Append first item.
  if (sum <= 100 && items.length > 1) {
    return items.map((item, index) => {
      item.percent = index === 0 ? item.percent += (100 - sum) : item.percent;
      return item
    });
  } else if (sum > 100 && items.length > 1) {
    // Set 100 percents for the first item.
    return items.map((item, index) => {
      item.percent = index === 0 ? 100 : 0;
      return item
    });
  }
};
