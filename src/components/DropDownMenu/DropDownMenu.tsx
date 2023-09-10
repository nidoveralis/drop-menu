import styles from './DropDownMenu.module.css';
import cn from 'classnames';
interface DropProps {
  item: {
    id: number;
    title: string;
    path: string;
  };
  closeMenu: () => void;
}

function DropDownMenu({ item, closeMenu }: DropProps) {
  function handleClick() {
    console.log(`${item.title} ?`);
    closeMenu();
  }
  return (
    <>
      <button className={cn(styles.button, styles[item.path])} onClick={handleClick}>
        {item.title}
      </button>
    </>
  );
}
export default DropDownMenu;
