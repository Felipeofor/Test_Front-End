import '../../Styles/Products.css'
import React, { useEffect, useState } from 'react'
import api from '../../Api/get'

import Slider from 'react-slick'

import { ReactComponent as ArrowLeft } from '../../assets/img/arrowLeft.svg'
import { ReactComponent as ArrowRight } from '../../assets/img/arrowRight.svg'
import { ReactComponent as StarFull } from '../../assets/img/starFull.svg'
import { ReactComponent as StarEmpty } from '../../assets/img/starEmpty.svg'

function ProductsGet({ titleProducts, productPurchase }) {
  const [products, setProducts] = useState([])
  const [selectProduct, setSelectProduct] = useState(0)

  useEffect(() => {
    api
      .get('products')
      .then((res) => {
        setProducts(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handlePurchase = () => {
    productPurchase((value) => {
      const newValue = value + 1
      sessionStorage.setItem('purchase', newValue)
      return newValue
    })
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", height: "60" }}
        onClick={onClick}
      >
        {props.children}
      </div>
    );
  }

  

  const settings = {
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow><ArrowLeft /></SamplePrevArrow>,
    nextArrow: <SamplePrevArrow><ArrowRight /></SamplePrevArrow>,
  }

  const convertBRL = (price) => {
    let priceConvert = Number(price).toFixed(2) / 100
    return priceConvert.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <section className='section'>
      <h3 className='name'>Más Vendidos</h3>
      <Slider className='slider' {...settings}>
    <div className='contenedor'>
        {products.map((item, index) => (
            <div className='product'
            onClick={() => setSelectProduct(item.productId)}
            key={index}
            >

            <img
            src={item.imageUrl}
            alt={`imagem ${item.productName}`}
            />

            <div className='description'>
            <h4>{item.productName}</h4>

            <div  className='starts center'>
            {Array.from({ length: 5 }, (_, index) =>
            index <= item.stars - 1 ? 'filled' : 'unfilled'
            ).map((item, index) => {
            return item === 'filled' ? (
            <li key={index}>
            <StarFull />
            </li>
            ) : (
            <li key={index}>
            <StarEmpty />
            </li>
            )
            })}
            </div>

            <p className='center'>
            {item.listPrice ? `de ${convertBRL(item.listPrice)}` : ''}
            </p>
            <p className='center cuotas'>{`por $ ${convertBRL(item.price)}`}</p>

            <div className='center'>
            {item.installments.length
            ? item.installments.map((info) => {
            return `o en ${info.quantity}x de ${convertBRL(
            info.value
            )}`
            })
            : ''}
            </div>

            {item.productId === selectProduct ? (
            <button onClick={handlePurchase}>Comprar</button>
            ) : (
            <button style={{ visibility: 'hidden' }}>Comprar</button>
            )}
            </div>
            </div>    
        ))}
    </div>

      </Slider>
    </section>
  )
}

export default ProductsGet