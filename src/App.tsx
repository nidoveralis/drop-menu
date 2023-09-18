import styles from './styles.module.css';
import cn from 'classnames';
import DropDownMenu from './components/DropDownMenu/DropDownMenu';
import Menu from './components/Menu/Menu';
import { useEffect, useRef, useState } from 'react';

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
  const [scrollWin, setScrollWin] = useState(0);
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeButton, setActiveButton] = useState<React.RefObject<HTMLButtonElement>>(menuLeftRef);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [coordinatMenu, setCoordinatMenut] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  function closeMenu() {
    setActiveMenu(false);
    setItems([]);
    setCoordinatMenut({ x: 0, y: 0 });
  }
  function openMenu() {
    setActiveMenu(true);
  }
  function handleClick(el: React.RefObject<HTMLButtonElement>) {
    if (!activeMenu) {
      openMenu();
      if (el.current) {
        setActiveButton(el);
        const boundingRect = el.current.getBoundingClientRect();
        const boundingElement = el.current;
        const positionX =
          window.innerWidth - boundingElement.offsetLeft >= 260
            ? Math.floor(boundingElement.offsetLeft)
            : Math.floor(boundingElement.offsetLeft - 260 + boundingElement.offsetWidth);
        const positionY =
          window.innerHeight - boundingRect.top >= 135
            ? Math.floor(boundingElement.offsetTop + boundingElement.offsetHeight)
            : Math.floor(boundingElement.offsetTop - 135);
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

  useEffect(() => {
    const handleScroll = (event: Event) => {
      setScrollWin(window.scrollY);
      if (window.scrollY > coordinatMenu.y) {
        handleClick(activeButton);
        console.log(coordinatMenu);
      } else if (window.scrollY > coordinatMenu.y + 135) {
        console.log('lllll');
      }
      console.log(coordinatMenu, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeMenu]);

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
