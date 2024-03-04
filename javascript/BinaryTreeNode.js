export class BinaryTreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }

  setLeft(leftNode) {
    this.left = leftNode;
  }

  setRight(rightNode) {
    this.right = rightNode;
  }

  getHeight() {
    const leftHeight = this.left?.getHeight() || 0;
    const rightHeight = this.right?.getHeight() || 0;
    return Math.max(leftHeight, rightHeight) + 1;
  }
}
