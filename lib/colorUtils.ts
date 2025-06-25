
export function generateRandomColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

export function generateOptions(correctColor: string): string[] {
  const options = new Set<string>();
  options.add(correctColor);

  while (options.size < 4) {
    options.add(generateRandomColor());
  }

  // Setを配列に変換し、シャッフルする
  return Array.from(options).sort(() => Math.random() - 0.5);
}
