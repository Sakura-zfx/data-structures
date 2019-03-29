// 单向链表
class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }
  // O(n)
  get(position) {
    // 判断position是否越界
    if (position >= this.length || position < 0) {
      throw new Error('Position outside of list range')
    }

    let current = this.head
    // 循环查找节点
    for (let index = 0; index < position; index++) {
      current = current.next
    }

    return current
  }

  // insert node anywhere O(1)
  insert(position, element) {
    let node = {
      data: element,
      next: null
    }
    // 头插入
    if (position === 0) {
      node.next = this.head
      this.head = node
    } else {
      // 查找插入位置的上一个节点
      let previous = this.get(position - 1)
      // 将要插入位置的元节点
      let current = previous.next
      // 将当前插入节点与原位置节点连接
      node.next = current
      // 上一个节点与插入节点连接
      previous.next = node
    }

    this.length++
  }

  push(element) {
    this.insert(this.length, element)
  }

  unshift(element) {
    this.insert(0, element)
  }

  // delete node O(1)
  remove(position) {
    if (!this.head) {
      throw new Error('Removing from an empty list')
    }

    if (position === 0) {
      this.head = this.head.next
    } else {
      let previous = this.get(position - 1)
      // 上一个节点与删除节点的下一个节点连接
      previous.next = previous.next.next
    }

    this.length--
  }

  // toString
  toString() {
    let current = this.head
    let string = ''
    while (current) {
      string += current.data + (current.next ? ' ' : '')
      current = current.next
    }

    return string
  }
}
// 双向链表
class DoubleLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  // 负数代表从后往前查找
  get(position) {
    const positionABS = position < 0 ? Math.abs(position) - 1 : Math.abs(position)
    if (positionABS >= this.length) {
      throw new Error('Position outside of list range')
    }
    let current = position < 0 ? this.tail : this.head
    // 循环查找节点
    for (let index = 0; index < positionABS; index++) {
      current = position < 0 ? current.prev : current.next
    }

    return current
  }
  // 负数代表从后往前插入
  insert(position, element) {
    let node = {
      data: element,
      prev: null,
      next: null
    }

    if (position === 0) {
      if (!this.head) {
        this.head = node
        this.tail = node
      } else {
        node.next = this.head
        this.head.prev = node
        this.head = node
      }
    } else if (position === this.length) {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    } else {
      let current = this.get(position)
      node.next = current // 新增节点next指向插入位置原节点
      current.prev.next = node // 插入位置上一个节点next指向新增节点

      node.prev = current.prev // 新增节点prev指向插入位置上一个节点
      current.prev = node // 插入位置原节点prev指向新增节点
    }

    this.length++
  }

  push(element) {
    this.insert(this.length, element)
  }

  unshift(element) {
    this.insert(0, element)
  }

  remove(position) {
    if (!this.head) {
      throw new Error('Removing from an empty list')
    }
    // 移除第一项
    if (position === 0) {
      this.head = this.head.next

      if (this.length === 1) {
        this.tail = null
      } else {
        this.head.prev = null
      }
    } else if (position === this.length - 1) {
      // 移除最后一项
      this.tail = this.tail.prev
      this.tail.next = null
    } else {
      let current = this.get(position)
      current.prev.next = current.next // 将上一节点的next指向下一节点
      current.next.prev = current.prev // 经下一节点的prev指向上一节点
    }

    this.length--
  }
}
