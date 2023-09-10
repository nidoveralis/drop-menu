import styles from './styles.module.css';
import cn from 'classnames';
import DropDownMenu from './components/DropDownMenu/DropDownMenu';
import Menu from './components/Menu/Menu';
import { useRef, useState } from 'react';

interface MenuItem {
  id: number;
  title: string;
  path: string;
}

const content = [
  {
    id: 0,
    title: 'Поделиться в социальных сетях',
    path: 'edit',
  },
  {
    id: 1,
    title: 'Редактировать страницу',
    path: 'share',
  },
  {
    id: 2,
    title: 'Удалить страницу',
    path: 'remove',
  },
];

function App() {
  const menuRef = useRef<HTMLButtonElement>(null);
  const menuLeftRef = useRef<HTMLButtonElement>(null);
  const menuRightRef = useRef<HTMLButtonElement>(null);
  const [activeMenu, setActiveMenut] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [coordinatMenu, setCoordinatMenut] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  function closeMenu() {
    setActiveMenut(false);
    setItems([]);
    setCoordinatMenut({ x: 0, y: 0 });
  }
  function openMenu() {
    setActiveMenut(true);
  }
  function handleClick(el: React.RefObject<HTMLButtonElement>) {
    if (!activeMenu) {
      openMenu();
      if (el.current) {
        const boundingRect = el.current.getBoundingClientRect();
        console.log(boundingRect);
        const positionX =
          window.innerWidth - boundingRect.left >= 260
            ? Math.floor(boundingRect.left)
            : Math.floor(boundingRect.left - 260 + boundingRect.width);
        const positionY =
          window.innerHeight - boundingRect.top >= 135
            ? Math.floor(boundingRect.top + boundingRect.height)
            : Math.floor(boundingRect.top - 135);
        setCoordinatMenut({ x: positionX, y: positionY });
        setItems(content);
      }
    } else {
      closeMenu();
    }
  }

  function handleClickContainer() {
    if (activeMenu) {
      closeMenu();
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <p>Нажми на меню</p>
      </header>
      <div className={styles.container} onClick={handleClickContainer}>
        <button className={styles.menu} onClick={() => handleClick(menuRef)} ref={menuRef} />
        <button
          className={cn(styles.menu, styles.left_menu)}
          onClick={() => handleClick(menuLeftRef)}
          ref={menuLeftRef}
        />
        <button
          className={cn(styles.menu, styles.right_menu)}
          onClick={() => handleClick(menuRightRef)}
          ref={menuRightRef}
        />
        {activeMenu && <Menu coordinatMenu={coordinatMenu} items={items} closeMenu={closeMenu} />}
      </div>
    </div>
  );
}

export default App;
//            // ? Math.floor(boundingRect.y + boundingRect.height)
