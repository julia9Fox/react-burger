import constructorStyle from './BurgerConstructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';

function Burger() {
    const img="https://code.s3.yandex.net/react/code/sauce-04.png"
    return (
        <section className='test mt-25' >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end'}}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={img}
                />
                <div className={`${constructorStyle.constructor_list} flex-column`}>
                    <div className={`${constructorStyle.constructor_element}`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={img}
                        />
                    </div>
                    <div className={`${constructorStyle.constructor_element}`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={img}
                        />
                    </div>
                    <div className={`${constructorStyle.constructor_element}`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={img}
                        />
                    </div>
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            <div className={`${constructorStyle.sum} mt-10`}>
                <span className='text text_type_digits-medium mr-2'>610</span>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium">
                    Нажми на меня
                </Button>
            </div>
        </section>
    )
}

export default Burger