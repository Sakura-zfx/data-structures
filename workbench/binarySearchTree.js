class BinarySearchTree {
  constructor () {
    this.root = null
  }

  insertNode (node, newNode) {
    if (!node) return
    // 左子树
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        // 左子树递归插入
        this.insertNode(node.left, newNode)
      }
    } else {
      // 右子树
      if (node.right === null) {
        node.right = newNode
      } else {
        // 右子树递归插入
        this.insertNode(node.right, newNode)
      }
    }
  }

  insert (key) {
    let node = {
      key,
      left: null,
      right: null
    }
    if (this.root === null) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }

  // 先序遍历
  preorderTraversal (callback, node = this.root) {
    if (node !== null) {
      callback(node.key)
      this.preorderTraversal(callback, node.left)
      this.preorderTraversal(callback, node.right)
    }
  }
  // 中序遍历
  inorderTraversal (callback, node = this.root) {
    if (node !== null) {
      this.preorderTraversal(callback, node.left)
      callback(node.key)
      this.preorderTraversal(callback, node.right)
    }
  }
  // 后序遍历
  postorderTraversal (callback, node = this.root) {
    if (node !== null) {
      this.preorderTraversal(callback, node.left)
      this.preorderTraversal(callback, node.right)
      callback(node.key)
    }
  }

  // 搜索
  search (key, node = this.root) {
    if (node === null) return false

    if (key < node.key) {
      return this.search(key, node.left)
    } else if (key > node.key) {
      return this.search(key, node.right)
    }

    return true
  }

  // 删除节点
  remove (key, node = this.root) {
    if (node === null) {
      throw new Error('Removing an empty tree')
    }
    if (key < node.key) {
      // 递归删除左子树
      this.remove(key, node.left)
    } else if (key > node.key) {
      // 递归删除右子树
      this.remove(key, node.right)      
    } else {
      // 1.删除节点为叶节点
      if (this.isLeafNode(node)) {
        node = null
        return node.key
      }
      // 2.删除节点拥有一个子节点
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }
      // 3.删除节点拥有两个子节点
      // 首先找到该节点右子树中的最小节点
      let minInRight = this.findMinNode(node)
      // 更新删除节点的值为最小节点的值
      node.key = minInRight.key
      // 删除该最小节点
      this.remove(minInRight.key, node.right)
      return node
    }
  }

  findMinNode (node = root) {
    if (node && node.left !== null) {
      this.findMinNode(node.left)
    }

    return node
  }

  isLeafNode (node) {
    return node.left === null && node.right === null
  }
}
const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(5)
tree.insert(67)
tree.insert(12)
tree.insert(10)