import type { DragEventHandler } from "react";
import React, { useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";

const title = "拖拽我";

const Draggable: React.FC = () => {
  const [items] = useState([1, 2, 3, 4, 5]);
  const draggableContainerRef = useRef<HTMLDivElement>(null);

  const onDragStartHandler: DragEventHandler<HTMLDivElement> = async (event) => {
    // draggableContainerRef.current?.removeChild(event.currentTarget);
    event.dataTransfer.effectAllowed = "copyMove";
    event.dataTransfer.setData("text/html", event.currentTarget.outerHTML);
    event.dataTransfer.setDragImage(event.currentTarget, 0, 0);
    console.log("onDragStartHandler", event);
  };

  const onDragOverHandler: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    console.log(event, event.movementY);
  };

  const onDragEnterHandler: DragEventHandler<HTMLDivElement> = (event) => {
    if (draggableContainerRef.current) {
      const { children } = draggableContainerRef.current;
      for (let i = 0; i < children.length; i++) {
        const currentChildren = children.item(i);
        if (currentChildren) {
          const currentIndex = currentChildren.getAttribute("data-index");
          if (currentIndex && currentIndex === event.currentTarget.dataset.index) {
          }
        }
      }
    }
  };

  const DraggableItems = useMemo(
    () =>
      items.map((item) => (
        <div
          key={item}
          className={styles.dragItem}
          title={title}
          draggable={true}
          onDragStart={onDragStartHandler}
          data-index={item}
        >
          <strong>{item}</strong>
        </div>
      )),
    [items],
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>TODO</div>
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
