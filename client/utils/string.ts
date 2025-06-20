export const toConstantCase = (message: string) => message.replaceAll(' ', '_').toUpperCase();

export const queryString = (params: Record<string, unknown>) => {
  let resultParams = { ...params };

  for (const key of Object.keys(resultParams)) {
    resultParams = {
      ...resultParams,
      [key]: String(resultParams[key]),
    };
  }

  return new URLSearchParams(resultParams as Record<string, string>).toString();
};
