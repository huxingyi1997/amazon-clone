export const isPathMatch = (
  paths: string[] | undefined | string,
  targetPath: string,
): boolean => {
  if (typeof paths === 'string') {
    paths = [paths];
  }
  if (paths?.includes('*')) {
    return true;
  }
  return paths?.some((path) => new RegExp(path).test(targetPath));
};
