type ParamValue = string | number | undefined;
type ParamValues = ParamValue[];
type Params = Record<string, ParamValue | ParamValues>;

type Entry = [string, string];
type Entries = Entry[];

export const mapParams = (params: Params): Entries => {
  const searchParams: [string, ParamValue | ParamValues][] = Object.entries(params ?? []);

  return searchParams.reduce<Entries>((acc, [key, value]) => {
    if (!value) return acc;
    if (Array.isArray(value)) {
      const entries: Entries = value.filter((val) => !!val).map((val) => [key, `${val}`]);
      return [...acc, ...entries];
    }
    return [...acc, [key, `${value}`]];
  }, []);
};
