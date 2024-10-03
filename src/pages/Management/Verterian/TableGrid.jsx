import React, { useState, useRef } from "react";
import TimeBlock from "./TimeBlock";
import { DARK_GREEN, LIGHT_PINK } from "~/theme";
import { Box } from "@mui/material";

const text = 'rgb(22, 21, 21)';
const dayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeArr = ['9', '10', '11', '12', '13', '14', '15', '16', '17'];
const timeBlockArr = [];

// Assuming timeArr and dayArr are defined
timeArr.slice(0, timeArr.length - 1).forEach((time) => {
  dayArr.forEach((day) => {
    timeBlockArr.push(`${day} ${time}:00`); // Push hour time blocks
  });
  dayArr.forEach((day) => {
    timeBlockArr.push(`${day} ${time}:30`); // Push half-hour time blocks
  });
});


const TableGrid = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [isBoxSelected, setIsBoxSelected] = useState();
  const [selectionBox, setSelectionBox] = useState();
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const selectionRef = useRef(null);
  const containerRef = useRef(null);

  const startSelecting = (e) => {
    if (!containerRef.current) return;
    console.log(e.target.id)

    if (selectedBoxes.includes(e.target.id)) setIsBoxSelected(true);
    else setIsBoxSelected(false);

    const containerRect = containerRef.current.getBoundingClientRect();

    const startX = e.clientX - containerRect.left;  // Relative to container
    const startY = e.clientY - containerRect.top;   // Relative to container

    setIsSelecting(true);
    setSelectionBox({
      startX,
      startY,
      width: 0,
      height: 0,
    });
  };

  const stopSelecting = () => {
    setIsSelecting(false);
  };

  const handleMouseMove = (e) => {
    if (!isSelecting || !selectionBox || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const currentX = e.clientX - containerRect.left;
    const currentY = e.clientY - containerRect.top;

    const newWidth = Math.abs(currentX - selectionBox.startX);
    const newHeight = Math.abs(currentY - selectionBox.startY);

    const newSelectionBox = {
      ...selectionBox,
      width: newWidth,
      height: newHeight,
      startX: Math.min(currentX, selectionBox.startX),
      startY: Math.min(currentY, selectionBox.startY),
    };

    setSelectionBox(newSelectionBox);

    const selected = selectedBoxes;
    timeBlockArr.forEach((timeBlock) => {
      const boxElement = document.getElementById(timeBlock);
      if (boxElement) {
        const boxRect = boxElement.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const relativeBoxRect = {
          left: boxRect.left - containerRect.left,
          right: boxRect.right - containerRect.left,
          top: boxRect.top - containerRect.top,
          bottom: boxRect.bottom - containerRect.top,
        };

        if (
          newSelectionBox.startX < relativeBoxRect.right &&
          newSelectionBox.startX + newSelectionBox.width > relativeBoxRect.left &&
          newSelectionBox.startY < relativeBoxRect.bottom &&
          newSelectionBox.startY + newSelectionBox.height > relativeBoxRect.top
        ) {
          // Deselect => PINK
          const index = selected.indexOf(timeBlock);
          console.log(index)
          if (isBoxSelected && index > -1) {
            selected.splice(index, 1); // 2nd parameter means remove one item only
          }
          else if (!isBoxSelected && index == -1) {
            selected.push(timeBlock);
          }
        }
      }
    });
    setSelectedBoxes(selected);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid #000'
      }}
      onMouseDown={startSelecting}
      onMouseMove={handleMouseMove}
      onMouseUp={stopSelecting}
    >

      {isSelecting && selectionBox && (
        <div
          ref={selectionRef}
          style={{
            position: "absolute",
            border: "1px dashed #000",
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            zIndex: 1000,
            left: selectionBox.startX + "px",
            top: selectionBox.startY + "px",
            width: selectionBox.width + "px",
            height: selectionBox.height + "px",
            pointerEvents: "none", // Prevent interaction with selection box
          }}
        ></div>
      )}

      {/* TABLE GRID */}
      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: `repeat(${dayArr.length}, 1fr)`,
          width: '100%',
          borderTop: `1px solid ${text}`,
          transition: '0.5s'
        }}
      >
        {/* Time block */}
        {timeBlockArr.map((timeBlock) => (
          <TimeBlock
            key={timeBlock}
            title={timeBlock}
            backgroundColor={selectedBoxes.includes(timeBlock) ? DARK_GREEN : LIGHT_PINK}
            borderBottom={timeBlock.includes('30') ? 'solid' : 'dashed'}
          ></TimeBlock>
        ))}
      </div>
    </Box>
  );
};

export default TableGrid;
