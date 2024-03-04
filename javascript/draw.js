import { FONT_SIZE, NODE_HEIGHT, NODE_WIDTH, RADIUS } from "./constant.js";
import { BinaryTree } from "./BinaryTree.js";
import { isValidInput, parseInput } from "./utils.js";

const drawNode = (context, value, x, y) => {
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

const drawEdge = (context, xStart, yStart, xEnd, yEnd) => {
  const yMiddle = (yStart + yEnd) / 2;
  context.beginPath();
  context.moveTo(xStart, yStart);
  context.bezierCurveTo(xStart, yMiddle, xEnd, yMiddle, xEnd, yEnd);
  context.stroke();
};

const drawNodeRecursively = (
  context,
  node,
  canvasStart,
  canvasEnd,
  nodelevel
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

const drawTree = (input, context) => {
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

const clearEveything = (textArea, canvasContext) => {
  textArea.value = '';
  canvasContext.reset();
}

const init = () => {
  const textArea = document.querySelector("textarea");
  const canvas = document.querySelector("canvas");
  const canvasContext = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const drawButton = document.querySelector('.draw-button');
  const clearButton = document.querySelector('.clear-button');

  clearButton.onclick = () => clearEveything(textArea, canvasContext);
  drawButton.onclick = () => {
    const inputValue = textArea.value;
    if (isValidInput(inputValue)) {
      canvasContext.reset();
      drawTree(inputValue, canvasContext);
    }
  };
};


init();
