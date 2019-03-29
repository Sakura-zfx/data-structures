class Stack {
  constructor() {
    this.list = [];
    this.length = 0;
  }

  push(value) {
    this.length++;
    this.list.push(value);
  }

  pop() {
    if (this.length === 0) return;

    this.length--;
    return this.list.pop();
  }
  // 查看栈顶元素
  peek() {
    return this.list[this.length - 1];
  }
}