import { BinaryTree } from "./BinaryTree";
import { BinaryTreeNode } from "./BinaryTreeNode";
import { FONT_SIZE, NODE_HEIGHT, NODE_WIDTH, RADIUS } from "./constant";
import { parseInput } from "./utils";

export const drawTree = (
  context: CanvasRenderingContext2D | null,
  input: string
) => {
  if (context == null) return;
  context.reset();
  const parsedInput = parseInput(input);
  const tree = new BinaryTree(parsedInput);
  const treeHeight = tree.getHeight();
  const possibleTreeWidth = Math.pow(2, treeHeight - 1);

  const canvasWidth = context.canvas.width;
  const requiredCanvasWidth = possibleTreeWidth * NODE_WIDTH;

  const root = tree.root;
  const requiredCanvasStartPoint = canvasWidth / 2 - requiredCanvasWidth / 2;
  const requiredCanvasEndPoint = canvasWidth / 2 + requiredCanvasWidth / 2;

  drawNodeRecursively(
    context,
    root,
    requiredCanvasStartPoint,
    requiredCanvasEndPoint,
    0.5
  );
};

const drawNodeRecursively = (
  context: CanvasRenderingContext2D,
  node: BinaryTreeNode | null,
  canvasStart: number,
  canvasEnd: number,
  nodelevel: number
) => {
  if (node == null) return [0, 0];
  const x = (canvasStart + canvasEnd) / 2;
  const y = nodelevel * NODE_HEIGHT;
  drawNode(context, node.val, x, y);

  if (node.left) {
    const leftChild = node.left;
    const leftChildCanvasStart = canvasStart;
    const leftChildCanvasEnd = x;
    const [leftChildX, leftChildY] = drawNodeRecursively(
      context,
      leftChild,
      leftChildCanvasStart,
      leftChildCanvasEnd,
      nodelevel + 1
    );

    const edgeXStart = x;
    const edgeYStart = y + RADIUS;
    const edgeXEnd = leftChildX;
    const edgeYEnd = leftChildY - RADIUS;
    drawEdge(context, edgeXStart, edgeYStart, edgeXEnd, edgeYEnd);
  }

  if (node.right) {
    const rightChild = node.right;
    const rightChildCanvasStart = x;
    const rightChildCanvasEnd = canvasEnd;
    const [rightChildX, rightChildY] = drawNodeRecursively(
      context,
      rightChild,
      rightChildCanvasStart,
      rightChildCanvasEnd,
      nodelevel + 1
    );

    const edgeXStart = x;
    const edgeYStart = y + RADIUS;
    const edgeXEnd = rightChildX;
    const edgeYEnd = rightChildY - RADIUS;
    drawEdge(context, edgeXStart, edgeYStart, edgeXEnd, edgeYEnd);
  }

  return [x, y];
};

const drawNode = (
  context: CanvasRenderingContext2D,
  value: any,
  x: number,
  y: number
) => {
  // draw circle
  context.beginPath();
  context.arc(x, y, RADIUS, 0, 2 * Math.PI);
  context.fillStyle = "brown";
  context.fill();

  // draw border
  context.beginPath();
  context.arc(x, y, RADIUS, 0, 2 * Math.PI);
  context.strokeStyle = "black";
  context.stroke();

  // draw value
  context.font = `${FONT_SIZE}pt Arial`;
  context.fillStyle = "yellow";
  context.textAlign = "center";
  context.fillText(value, x, y + FONT_SIZE / 2);
};

const drawEdge = (
  context: CanvasRenderingContext2D,
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number
) => {
  context.beginPath();
  context.moveTo(xStart, yStart);
  context.lineTo(xEnd, yEnd);
  context.stroke();
};
