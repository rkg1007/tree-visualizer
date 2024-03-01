export class BinaryTreeNode {
  val: number;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }

  setLeft(leftNode: BinaryTreeNode) {
    this.left = leftNode;
  }

  setRight(rightNode: BinaryTreeNode) {
    this.right = rightNode;
  }

  getHeight(): number {
    const leftHeight = this.left?.getHeight() || 0;
    const rightHeight = this.right?.getHeight() || 0;
    return Math.max(leftHeight, rightHeight) + 1;
  }
}
