import DropDownMenu from '../DropDownMenu/DropDownMenu';
import styles from './Menu.module.css';
interface MenuItem {
  id: number;
  title: string;
  path: string;
}
interface MenuProps {
  coordinatMenu: {
    x: number;
    y: number;
  };
  items: MenuItem[];
  closeMenu: () => void;
}
function Menu({ coordinatMenu, items, closeMenu }: MenuProps) {
  console.log(coordinatMenu);
  return (
    <div className={styles.drop} style={{ top: coordinatMenu.y, left: coordinatMenu.x }}>
      {items.map((item) => (
        <DropDownMenu key={item.id} item={item} closeMenu={closeMenu} />
      ))}
    </div>
  );
}
export default Menu;
