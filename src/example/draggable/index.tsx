import type { DragEventHandler, MouseEventHandler } from "react";
import React, { useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";

const title = "拖拽我";

function Draggable() {
  const [items] = useState([1, 2, 3, 4, 5]);
  const draggableContainerRef = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<HTMLDivElement>();

  const onDragStartHandler: DragEventHandler<HTMLDivElement> = async (event) => {
    // draggableContainerRef.current?.removeChild(event.currentTarget);
    setElement(event.currentTarget);
    event.dataTransfer.effectAllowed = "copyMove";
    event.dataTransfer.setData("text/html", event.currentTarget.outerHTML);
    event.dataTransfer.setDragImage(event.currentTarget, event.nativeEvent.offsetX * 2, event.nativeEvent.offsetY * 2);
    console.log("onDragStartHandler", event);
  };

  const onDragOverHandler: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    // console.log(event, event.movementY);
  };

  const onDragEnterHandler: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.nativeEvent.offsetY > event.currentTarget.offsetHeight / 2) {
      const index = event.currentTarget.getAttribute('data-index');
      if (index && Number.isInteger(+index)) {
        const children = React.Children.toArray(draggableContainerRef.current?.children);
        children.splice(+index, 0, element!)
        const ele = React.createElement('div', null, children);
        draggableContainerRef.current?.append()
      }
    }
  };

  const styleResetHanlder: MouseEventHandler<HTMLDivElement> = (event) => {
    event.currentTarget.removeAttribute('style');
  }

  const onMouseDownHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    event.currentTarget.setAttribute('style', 'border: 1px dotted red');
  }

  const DraggableItems = useMemo(
    () =>
      items.map((item) => (
        <div
          key={item}
          data-index={item}
          className={styles.dragItem}
          title={title}
          draggable={true}
          onDragStart={onDragStartHandler}
          onMouseDown={onMouseDownHandler}
          onMouseUp={styleResetHanlder}
          onMouseLeave={styleResetHanlder}
          onDragEnter={onDragEnterHandler}
        >
          <strong>{item}</strong>
        </div>
      )),
    [items],
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>

      </div>
      <div
        className={styles.right}
        ref={draggableContainerRef}
        onDragOver={onDragOverHandler}
        onDragEnter={onDragEnterHandler}
      >
        {DraggableItems}
      </div>
    </div>
  );
};

export default Draggable;
