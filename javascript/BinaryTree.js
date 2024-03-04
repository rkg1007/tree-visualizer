import { BinaryTreeNode } from "./BinaryTreeNode.js";

export class BinaryTree {
  constructor(arr) {
    this.root = this.constructTree(arr);
  }

  constructTree(arr) {
    const rootVal = arr[0];
    if (rootVal == null) return null;
    const root = new BinaryTreeNode(rootVal);
    let currLevel = [root];
    let currArrIdx = 1;
    while (currLevel.length > 0) {
      const nextLevel = [];
      for (let currNode of currLevel) {
        if (currArrIdx < arr.length) {
          const currArrIdxVal = arr[currArrIdx];
          if (currArrIdxVal != null) {
            const leftChild = new BinaryTreeNode(currArrIdxVal);
            currNode.setLeft(leftChild);
            nextLevel.push(leftChild);
          }
        }
        currArrIdx += 1;
        if (currArrIdx < arr.length) {
          const currArrIdxVal = arr[currArrIdx];
          if (currArrIdxVal != null) {
            const rightChild = new BinaryTreeNode(currArrIdxVal);
            currNode.setRight(rightChild);
            nextLevel.push(rightChild);
          }
        }
        currArrIdx += 1;
      }
      currLevel = nextLevel;
    }
    return root;
  }

  getHeight() {
    return this.root?.getHeight() || 0;
  }
}
