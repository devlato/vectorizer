console.log('Hello from a web worker!');

onmessage = (message) => {
  console.log(message);
};
