var node = {
    createNode(tagNode, className, text) {
      const node = document.createElement(tagNode);
      // node.classList.add(className);
      node.className = className;
      if (text !== undefined) {
        node.textContent = text;
      }
      return node;
    },
    addDom(parentNode, childNode) {
      parentNode.appendChild(childNode);
    }
}

export default node;