type Test = {
  title: string;
  img: any; // pls don't tell anyone about this
  route: string;
};

type TestType = {
  title: string;
  tests: Test[];
};

export { Test, TestType };
