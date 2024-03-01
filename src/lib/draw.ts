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

  const canvasWidth = context.canvas.width;

  const root = tree.root;
  const rootXStart = canvasWidth / 2 - NODE_WIDTH / 2;
  const rootXEnd = canvasWidth / 2 + NODE_WIDTH / 2;

  drawNodeRecursively(context, root, rootXStart, rootXEnd, 0.5);
};

const drawNodeRecursively = (
  context: CanvasRenderingContext2D,
  node: BinaryTreeNode | null,
  nodeXStart: number,
  nodeXEnd: number,
  nodelevel: number
) => {
  if (node == null) return;
  const x = (nodeXStart + nodeXEnd) / 2;
  const y = nodelevel * NODE_HEIGHT;
  drawNode(context, node.val, x, y);
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
