import styles from './NavBar.module.css'

const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <img src='https://yt3.ggpht.com/ytc/AKedOLSfkdfk_np9eCTdVKxn43It9n7a6vyJ6OuV2aTDwg=s900-c-k-c0x00ffffff-no-rj'
                 className={styles.logo}
                 alt='logo'
            />
            <h2 className={styles.header}>Кубок Гинкаммури</h2>
        </div>
    )
}

export default NavBar