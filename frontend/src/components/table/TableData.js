import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import AddModal from "../AddModal";
import Loader from "../loader/Loader";
const CarsType = {
  aventador: "Aventador",
  huracan: "Huracan",
  land_cruiser: "Land Cruiser Prado",
  type_r: "Type R",
  type_s: "Type S",
  sedans: "Sedans",
  stype_uvs: "SUVs",
  fortuner: "Fortuner",
};

const TableData = () => {
  const [show, setShow] = useState(false);
  const [formType, setFormType] = useState("create");
  const [carsList, setCarsList] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (car) => {
    setSelectedCar(car);
    setShow(true);
    setFormType("update");
  };
  // -------------------Handle Create Function-----------------

  const handleCreate = () => {
    setSelectedCar(null);
    setShow(true);
    setFormType("create");
  };

  useEffect(() => {
    getCarsData();
  }, []);

  //-----------------------Delete Car--------------------------

  const handleDelete = (carId) => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/cars/${carId}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("Deleted Car", response);
        getCarsData();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //----------------------------insert car ----------------------
  const getCarsData = () => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/cars`)
      .then((response) => {
        response.json().then((result) => {
          setCarsList(result.data);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.log("error", error);
        alert("Error fetching data!");
      });
  };
  // ---------------------------View Cars info-------------------

  const handleView = (car) => {
    setSelectedCar(car);
    setFormType("view");
    setShow(true);
  };

  return (
    <>
      <div>
        <h1>Cars List</h1>
      </div>

      <Button
        variant="primary"
        onClick={handleCreate}
        style={{ display: "flex" ,marginLeft: "40px", marginBottom: "40px" ,width: "15% " , height: "50px" , paddingLeft: "40px" , paddingTop: "10px"}}
      >
        Add Cars
      </Button>
      {show && (
        <AddModal
          setShow={setShow}
          formType={formType}
          selectedCar={selectedCar}
          getCarsData={getCarsData}
          carsList={carsList}
          setIsLoading={setIsLoading}
        />
      )}

      {isLoading && <Loader />}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Year</th>
            <th>Mileage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carsList.map((car) => (
            <tr key={car._id}>
              <td>{car._id}</td>
              <td>{car.name}</td>
              <td>{CarsType[car.type]}</td>
              <td>{car.year}</td>
              <td>{car.mileage}</td>
              <td>
                <Button variant="info" onClick={() => handleUpdate(car)}>
                  Update
                </Button>

                <Button variant="danger" onClick={() => handleDelete(car._id)}>
                  Delete
                </Button>

                <Button variant="info" onClick={() => handleView(car)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableData;
