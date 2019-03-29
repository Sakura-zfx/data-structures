class Queue {
  constructor() {
    this.list = [];
    this.length = 0;
  }

  enqueue(value) {
    this.length++;
    this.list.push(value);
  }

  dequeue() {
    if (this.length === 0) return;

    this.length--;
    return this.list.shift();
  }

  peek() {
    return this.list[0];
  }
}