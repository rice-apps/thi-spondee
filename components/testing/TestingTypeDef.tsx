type Test = {
  title: string;
  uri: string;
  route: string;
};

type TestType = {
  title: string;
  tests: Test[];
};

export { Test, TestType };
