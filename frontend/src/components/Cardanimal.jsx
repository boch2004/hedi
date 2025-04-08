import React from 'react'

function Cardanimal({ product }) {
  return (
    <div>

       
          <div className="animal-card">
            <img style={{width:250,}} src={product?.img} alt={product?.titel} />
            <div className="animal-sec">
          <h4 className="animal-title" style={{textAlign:"center"}}>{product?.titel}</h4>
          <p className="animal-desc"><h1 className='h1name'>description:&nbsp;</h1>{product?.description}</p>
          <p className="animal-desc"><h1 className='h1name'>name:&nbsp;</h1>{product?.name}</p>
          <p className="animal-desc"><h1 className='h1name'>race:&nbsp;</h1>{product?.race}</p>
          <p className="animal-desc"><h1 className='h1name'>gender:&nbsp;</h1>{product?.gender}</p>
          <p className="animal-desc"><h1 className='h1name'>location:&nbsp;</h1>  {product?.location}</p>
            </div>
          </div>

      </div>
  )
}

export default Cardanimal