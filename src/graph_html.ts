type NodeType = 'module' | 'sensor';

let topNext = 100;
const topDelta = 150;
const graph = document.getElementById('graph');
const canvas = document.getElementById("canvas");

export module GraphHTML {
  function _dragElement(elem: HTMLElement) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.getElementById(elem.id + "-header").onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
       e.preventDefault();
       pos1 = pos3 - e.clientX;
       pos2 = pos4 - e.clientY;
       pos3 = e.clientX;
       pos4 = e.clientY;
       elem.style.top = (elem.offsetTop - pos2) + "px";
       elem.style.left = (elem.offsetLeft - pos1) + "px";
    }

    function closeDragElement(e: MouseEvent) {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  function _renderNode(id: string, ty: NodeType): HTMLDivElement {
    let node = document.createElement("div");
    node.id = id;
    node.className = "node " + ty;
    node.style.top = topNext.toString() + 'px';
    topNext += topDelta;
    let header = document.createElement("div");
    header.id = id + "-header";
    header.className = "node-header " + ty + "-header";
    header.appendChild(document.createTextNode("Click here to move"))
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(id));
    node.appendChild(header);
    node.appendChild(p);
    // modify the DOM
    graph.appendChild(node);
    _dragElement(node);
    return node;
  }

  export function renderModule(id: string): HTMLDivElement {
    return _renderNode(id, 'module')
  }

  export function renderSensor(id: string): HTMLDivElement {
    return _renderNode(id, 'sensor')
  }

  export function renderDataEdge(source: HTMLElement, target: HTMLElement) {
    let x1 = source.offsetLeft + source.offsetWidth / 2;
    let y1 = source.offsetTop + source.offsetHeight / 2;
    let x2 = target.offsetLeft + target.offsetWidth / 2;
    let y2 = target.offsetTop + target.offsetHeight / 2;
    // https://dev.to/gavinsykes/appending-a-child-to-an-svg-using-pure-javascript-1h9g
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '2px');
    canvas.append(line);
  }

  export function renderStateEdge(source: HTMLElement, target: HTMLElement) {

  }
}