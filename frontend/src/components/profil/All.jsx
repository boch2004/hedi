import React from 'react'
import { useSelector } from 'react-redux';
import Cardanimal from '../Cardanimal';

function All() {
    const Animals = useSelector((state) => state.animal?.animalList || []);
  return (
    <div>
        <div className="card-animal" >
        {Animals.length > 0 ? (
          Animals.map((el) => <Cardanimal key={el.id} product={el} />)
        ) : (
          <p>No animals available</p>
        )}
      </div>
    </div>
  )
}

export default All