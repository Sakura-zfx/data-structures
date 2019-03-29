class Tree {

  /**
   * The tree has to start with a single parent, the "root" of the tree.
   */

  constructor() {
    this.root = null;
  }

  /**
   * We need a way to traverse our tree and call a function on each node in the
   * tree.
   */

  traverse(callback) {
    // We'll define a walk function that we can call recursively on every node
    // in the tree.
    function walk(node) {
      // First call the callback on the node.
      callback(node);
      // Then recursively call the walk function on all of its children.
      node.children.forEach(walk);
    }

    // Now kick the traversal process off.
    walk(this.root);
  }

  /**
   * Next we need a way to add nodes to our tree.
   */

  add(value, parentValue) {
    let newNode = {
      value,
      children: []
    };

    // If there is no root, just set it to the new node.
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    // Otherwise traverse the entire tree and find a node with a matching value
    // and add the new node to its children.
    this.traverse(node => {
      if (node.value === parentValue) {
        node.children.push(newNode);
      }
    });
  }
}

class BinarySearchTree {

  /**
   * Same as the previous Tree, we need to have a "root" of the binary search
   * tree.
   */

  constructor() {
    this.root = null;
  }

  /**
   * In order to test if the value exists in the tree, we first need to search
   * through the tree.
   */

  contains(value) {
    // We start at the root.
    let current = this.root;

    // We're going to keep running as long as we have another node to visit.
    // If we reach a `left` or `right` that is `null` then this loop ends.
    while (current) {

      // If the value is greater than the current.value we move to the right
      if (value > current.value) {
        current = current.right;

        // If the value is less than the current.value we move to the left.
      } else if (value < current.value) {
        current = current.left;

        // Otherwise we must be equal values and we return true.
      } else {
        return true;
      }
    }

    // If we haven't matched anything then we return false.
    return false;
  }

  /**
   * In order to add items to this tree we are going to do the same traversal
   * as before, bouncing between left and right nodes depending on them being
   * less than or greater than the value we're adding.
   *
   * However, this time when we reach a `left` or `right` that is `null` we're
   * going to add a new node in that position.
   */

  add(value) {
    // First let's setup our node.
    let node = {
      value: value,
      left: null,
      right: null
    };

    // Special case for when there isn't any root node and we just need to add
    // one.
    if (this.root === null) {
      this.root = node;
      return;
    }

    // We start at the root.
    let current = this.root;

    // We're going to loop until we've either added our item or discovered it
    // already exists in the tree.
    while (true) {

      // If the value is greater than the current.value we move to the right.
      if (value > current.value) {

        // If `right` does not exist, set it to our node, and stop traversing.
        if (!current.right) {
          current.right = node;
          break;
        }

        // Otherwise just move on to the right node.
        current = current.right;

        // If the value is less than the current.value we move to the left.
      } else if (value < current.value) {

        // If `left` does not exist, set it to our node, and stop traversing.
        if (!current.left) {
          current.left = node;
          break;
        }

        // Otherwise just move on to the left node.
        current = current.left;

        // If the number isn't less than or greater, then it must be the same and
        // we don't do anything.
      } else {
        break;
      }
    }
  }
}