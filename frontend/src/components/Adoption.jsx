import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { ProductService } from "./service/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { getanimal } from "../JS/userSlice/animalSlice";
import Cardanimal from "./Cardanimal";
import { Link } from "react-router";

export default function NumScrollDemo() {
  const [products, setProducts] = useState([]);

  const responsiveOptions = [
    { breakpoint: "1400px", numVisible: 2, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "767px", numVisible: 2, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 },
  ];

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      case "OUTOFSTOCK":
        return "danger";
      default:
        return null;
    }
  };

  useEffect(() => {
    ProductService.getProductsSmall()
      .then((data) => setProducts(data.slice(0, 9)))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const productTemplate = (product) => (
    <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
      <div style={{ display: "flex", justifyContent: "center" }} className="mb-3">
        <img style={{width:220,height:200}} src={`http://localhost:5000/uploads/${product.img}`} alt={product.name} className=" shadow-2" />
      </div>
      <div>
        <h4 className="mb-1">{product.name}</h4>
        <h6 style={{justifyContent: "center"}} className="mt-0 mb-3 animal-desc">
  <span className='h1name'>race:&nbsp;</span>{product.race}
</h6>
        <Tag value={product.inventoryStatus} severity={getSeverity(product)} />
        <div className="mt-5 flex flex-wrap gap-2 justify-content-center">

          <Link to={`/animaux/${product._id}`}>
          <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
          </Link>

        </div>
      </div>
    </div>
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getanimal()); // جلب البيانات عند تحميل الصفحة
  }, [dispatch]);


  // mapping ✅ استخدم optional chaining لتجنب الأخطاء
    const [showAll, setShowAll] = useState(false); // ✅ جديد
  
    // ...
  
    const Animals = useSelector((state) => state.animal?.animalList || []);
    const visibleAnimals = showAll ? Animals : Animals.slice(0, 0); // ✅ جديد

  return (
    <>
      <div style={{ padding: "0 200px", background:"#efeff1" }} className="card">
        <Carousel
          autoplayInterval={5000}
          circular={true}
          value={products}
          numScroll={1}
          numVisible={4}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
        />
        <Button
          label={showAll ? "Show Less" : "Show More"}
          onClick={() => setShowAll(!showAll)}
          className="p-button-rounded p-button-outlined"
        />
      </div>
      <div className="card-animal">
      {visibleAnimals.length > 0 ? (
  visibleAnimals.map((el) => <Cardanimal key={el.id} animal={el} />)
) : null}


  {/* ✅ الزرّ يظهر إذا فما أكثر من 6 حيوانات */}
  {Animals.length > 0 && (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
    </div>
  )}
</div>

    </>
  );
}
