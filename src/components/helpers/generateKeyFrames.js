const injectStyle = (style) => {
  const styleElement = document.createElement('style');
  let styleSheet = null;

  document.head.appendChild(styleElement);

  styleSheet = styleElement.sheet;

  styleSheet.insertRule(style, styleSheet.cssRules.length);
};

const generatKeyFrames = (startPosition, endPosition) => {
  injectStyle(`
    @-webkit-keyframes slide-tab {
      0%   { transform: translateY(${startPosition}px); }
      100% { transform: translateY(${endPosition}px); }
    }
  `);

  injectStyle(`
    @keyframes slide-tab {
      0%   { transform: translateY(${startPosition}px); }
      100% { transform: translateY(${endPosition}px); }
    }
  `);
};

export default generatKeyFrames;
