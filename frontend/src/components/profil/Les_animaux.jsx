import React from 'react';
import { useSelector } from 'react-redux';
import Cardanimal from '../Cardanimal';

function Les_animaux({ ping, setping }) {
  const Animals = useSelector((state) => state.animal?.animalList || []);
  const users = useSelector((state) => state.user?.userlist || []);

  // filtrage des animaux selon le user
  const filteredAnimals = Animals.filter((animal) =>
    users.some((user) => user._id === animal.idanimal)
  );

  return (
    <div>
      <div className="card-animal">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map((el) => (
            <Cardanimal key={el._id} animal={el} ping={ping} setping={setping} />
          ))
        ) : (
          <p>Aucun animal disponible</p>
        )}
      </div>
    </div>
  );
}

export default Les_animaux;
