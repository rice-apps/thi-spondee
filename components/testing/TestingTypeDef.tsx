type Test = {
  title: string;
  uri: string;
};

type TestType = {
  title: string;
  tests: Test[];
};

export { Test, TestType };
