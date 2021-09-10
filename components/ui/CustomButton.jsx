import Link from 'next/link';

import styles from './CustomButton.module.css';

const CustomButton = ({ children, path, onClick }) => {
  if (path) {
    return (
      <Link href={path}>
        <a className={styles.btn}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;