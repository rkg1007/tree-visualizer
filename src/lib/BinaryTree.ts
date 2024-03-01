import { BinaryTreeNode } from "./BinaryTreeNode";

export class BinaryTree {
  root: BinaryTreeNode | null;

  constructor(arr: (number | null)[]) {
    this.root = this.constructTree(arr);
  }

  constructTree(arr: (number | null)[]) {
    const rootVal = arr[0];
    if (rootVal == null) return null;
    const root = new BinaryTreeNode(rootVal);
    let currLevel: BinaryTreeNode[] = [root];
    let currArrIdx = 1;
    while (currLevel.length > 0) {
      const nextLevel: BinaryTreeNode[] = [];
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

  getHeight(): number {
    return this.root?.getHeight() || 0;
  }
}
