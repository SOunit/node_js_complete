(() => {
  const sum = (a, b) => {
    if (a && b) {
      return a + b;
    }

    throw new Error('Invalid arguments');
  };

  console.log(sum(1, 2));

  try {
    console.log(sum(1));
  } catch (error) {
    console.log(error);
    console.log('error occured!');
  }

  // error without error handling stops app execution
  //   sum(1);
  console.log('this works!');
})();
