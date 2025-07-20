export const normalize = (value: string) => value.trim().toLowerCase();

export const isDuplicate = (arr: string[]) =>
  new Set(arr.map((v) => normalize(v))).size !== arr.length;
