import React from 'react'
import { useSelector } from 'react-redux';
import Cardanimal from '../Cardanimal';

function Les_animaux({ping, setping}) {
    const Animals = useSelector((state) => state.animal?.animalList || []);
  return (
    <div>
        <div className="card-animal" >
        {Animals.length > 0 ? (
          Animals.map((el) => <Cardanimal key={el.id} animal={el} ping={ping} setping={setping} />)
        ) : (
        <p> Aucun animal disponible</p>
        )}
      </div>
    </div>
  )
}

export default Les_animaux