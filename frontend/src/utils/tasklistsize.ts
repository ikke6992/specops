export const cols = (width: number) => {
  if (width > 2320) {
    return 6;
  } else if (width > 1940) {
    return 5;
  } else if (width > 1540) {
    return 4;
  } else if (width > 1160) {
    return 3;
  } else if (width > 630) {
    return 2;
  } else {
    return 1;
  }
};

export const rows = (height: number) => {
  if (height > 850) {
    return 3;
  } else if (height > 580) {
    return 2;
  } else {
    return 1;
  }
};

export const size = (height: number, width: number) => {
  return cols(width) * rows(height);
};
