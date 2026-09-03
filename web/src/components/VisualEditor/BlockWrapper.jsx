import React, { useState } from 'react';

export const BlockWrapper = ({ blockId, blockType, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

  if (!isPreview) {
    return <>{children}</>;
  }

  const handleClick = (e) => {
    e.stopPropagation();
    window.parent.postMessage({
      type: 'BLOCK_SELECTED',
      payload: { blockId, blockType }
    }, '*');
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={(e) => { e.stopPropagation(); setIsHovered(true); }}
      onMouseLeave={(e) => { e.stopPropagation(); setIsHovered(false); }}
      className="relative transition-all duration-200 cursor-pointer"
      style={{
        outline: isHovered ? '2px solid #3b82f6' : '2px dashed transparent',
        outlineOffset: '-2px',
        margin: '2px', // space for outline
      }}
    >
      {isHovered && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-br-md z-50 font-mono shadow-sm">
          {blockType}
        </div>
      )}
      {/* Make children non-interactive so clicks pass through to wrapper in preview mode */}
      <div className="pointer-events-none">
        {children}
      </div>
    </div>
  );
};
