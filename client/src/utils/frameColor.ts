export const frameColor = (cost: number): string => {
  switch (true) {
    case cost === 1: return '#C0C0C0';
    case cost === 2: return '#2ECC71';
    case cost === 3: return '#3498DB';
    case cost === 4: return '#9B59B6';
    case cost >= 5: return '#FFD700';
    default: return '#C0C0C0';
  }
};
