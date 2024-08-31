import { ListIcon, Logo , BurgerIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyle from './AppHeader.module.css'

const Header = () => {
    return (
        <header className={headerStyle.header_menu} >
            <nav className={`container pt-4 pb-4 ${headerStyle.nav}`}>
                <a href="#" className={`text text_type_main-default pr-5 pl-5 ${headerStyle.active_page}`}>
                    <BurgerIcon type="primary" />
                    <p>Конструктор</p>
                </a>
                <a href="#" className='text text_type_main-default pr-5 pl-5 ml-2'>
                    <ListIcon type="secondary" />
                    <p>Лента заказов</p>
                </a>
                <div className={headerStyle.logo}>
                    <Logo />
                </div>
                <a href="#" className={`text text_type_main-default pr-5 pl-5 ${headerStyle.login}`}>
                    <ProfileIcon type="secondary" />
                    <p>Личный кабинет</p>
                </a>
            </nav>
        </header>
    )
}

export default Header

