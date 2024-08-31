import React from 'react';
import ingredientsStyle from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
// import PropTypes from 'prop-types'
import data from './../../utils/data.js'

// Product.propTypes = {
//     card: PropTypes.
// }

function Product(props:any) {
    return (
        <article className={`${ingredientsStyle.card} pl-4 pr-4`}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={props.card.image} alt={props.card.name} />
            <div className='flex-center mt-1 mb-1'>
                <span className='text text_type_digits-default mr-2'>{props.card.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className='text text_type_main-default' style={{minHeight: 48, margin: 0}}>{props.card.name}</p>
        </article>
    )
}
function Ingredients() {
    const [current, setCurrent] = React.useState('bun')
    const tabs:any = [
        {
            title: 'Булки',
            value: 'bun'
        },
        {
            title: 'Соусы',
            value: 'sauce'
        },
        {
            title: 'Начинки',
            value: 'main'
        }
    ] 
    let list:any = {}
    data.ingredients.forEach((item:any) => (item.type in list) ? list[item.type].push(item) : list[item.type] = [item])
        
    return (
        <section className='test' >
            <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
  
            <div style={{ display: 'flex' }} className='mt-5'>
                { tabs.map((item:any)=>
                    (<Tab key={`tab_${item.value}`} value={item.value} active={current === item.value} onClick={setCurrent}>
                        {item.title}
                    </Tab>)
                )}
            </div>
            <div className={`${ingredientsStyle.container_products} mt-10`}>
                {
                   tabs.map((el:any, i:number) => {
                        return (
                            <article key={`category_${i}`}>
                                <h3 className='text text_type_main-medium'>
                                    {el.title}
                                </h3>
                                <div className='flex-wrap mt-6 ml-4 mr-2' style={{gap: '32px 24px'}}>
                                    {
                                        list[el.value].map((item:any) => {
                                            return (<Product card={item} key={`Ingredient_${item._id}`} />)
                                        })
                                    }
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Ingredients