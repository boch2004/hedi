import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { AnimalService } from "./service/AnimalService";
import { useDispatch, useSelector } from "react-redux";
import { getanimal } from "../JS/userSlice/animalSlice";
import Cardanimal from "./Cardanimal";
import { Link } from "react-router-dom";

export default function NumScrollDemo() {
  const dispatch = useDispatch();

  const [localAnimals, setLocalAnimals] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const reduxAnimals = useSelector((state) => state.animal?.animalList || []);

  // Options for responsive carousel
  const responsiveOptions = [
    { breakpoint: "1400px", numVisible: 2, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "767px", numVisible: 2, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 },
  ];

  // Fetch animals for Carousel (local use)
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await AnimalService.getAnimalsSmall();
        setLocalAnimals(data.slice(0, 9)); // Limiting to 9 animals
      } catch (error) {
        console.error("Erreur lors de la récupération des animaux :", error);
      }
    };

    fetchAnimals();
  }, []);

  // Fetch animals into Redux store
  useEffect(() => {
    dispatch(getanimal());
  }, [dispatch]);

  const handleToggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const animalTemplate = (animal) => (
    <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
      <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={`http://localhost:5000/uploads/${animal.img}`}
          alt={animal.name}
          className="shadow-2"
          style={{ width: 220, height: 200 }}
        />
      </div>
      <h4 className="mb-1">{animal.name}</h4>
      <h6 className="mt-0 mb-3 animal-desc">
        <span className="h1name">Race:&nbsp;</span>{animal.race}
      </h6>
      <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
        <Link to={`/animaux/${animal._id}`}>
          <button className="info-button" style={{height:50,padding:10}}>Plus d'informations</button>
        </Link>
      </div>
    </div>
  );

  // Select animals to display in Cards
  const visibleAnimals = showAll ? reduxAnimals : reduxAnimals.slice(0, 0);

  return (
    <>
      {/* Carousel Section */}
      <div className="card" style={{ padding: "0 200px", background: "#efeff1" }}>
        <Carousel
          value={localAnimals}
          itemTemplate={animalTemplate}
          numScroll={1}
          numVisible={4}
          circular
          autoplayInterval={5000}
          responsiveOptions={responsiveOptions}
        />
        <Button
          label={showAll ? "Voir moins" : "Voir plus"}
          onClick={handleToggleShowAll}
          className="p-button-rounded p-button-outlined"
          style={{ marginTop: "20px" }}
        />
      </div>

      {/* Cards Section */}
      <div className="card-animal">
        {visibleAnimals.length > 0 ? (
          visibleAnimals.map((el) => <Cardanimal key={el._id} animal={el} />)
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
