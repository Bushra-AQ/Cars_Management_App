import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z]{2,}$/, "Invalid Name")
    .required("Name required"),
  type: yup.string().oneOf(Object.keys(CarsType), "Please select a valid type"),
  year: yup
    .number()
    .min(1900, "The year must be greater than or equal to 1900")
    .max(new Date().getFullYear(), "The year must not  exceed current year")
    .required("Year required"),
  mileage: yup
    .number()
    .required("Mileage required")
    .min(0, " Mileage Should be Positive "),
});

const AddModal = ({
  setShow,
  formType,
  selectedCar,
  getCarsData,
  carsList,
}) => {
  const isViewForm = () => formType === "view";
  const isUpdateForm = () => formType === "update";

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: isViewForm() || isUpdateForm() ? selectedCar.name : "",
      type: isViewForm() || isUpdateForm() ? selectedCar.type : "",
      year: isViewForm() || isUpdateForm() ? selectedCar.year : "",
      mileage: isViewForm() || isUpdateForm() ? selectedCar.mileage : "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (car) => {
    if (isUpdateForm()) {
      fetch(`${process.env.REACT_APP_API_URL}/cars/${selectedCar._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      })
        .then((response) => {
          response.json().then((resp) => {
            console.log("Updated Car", resp);
            // getCarsData();
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setShow(false);
      getCarsData();
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      }).then((response) => {
        console.log("result", response);
      });

      reset();
      setShow(false);
      getCarsData();
    }
  };
  const handleClose = () => {
    reset();
    setShow(false);
  };

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isUpdateForm()
              ? "Update Car"
              : isViewForm()
              ? "View Car"
              : "Add Car"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <br></br>

            <input
              type="text"
              id="name"
              name="name"
              {...register("name")}
              disabled={isViewForm()}
            />
            <p className="error-message">{errors.name?.message}</p>
            <br></br>

            {/*  */}
            <label htmlFor="type">
              <strong>Type</strong>
            </label>
            <select
              style={{ display: "flex", width: "40%", height: "30px" }}
              id="type"
              name="type"
              {...register("type")}
              disabled={isViewForm()}
            >
              <option value="none">None</option>
              {Object.entries(CarsType).map(([key, value], i) => (
                <option key={i} value={key}>
                  {value}
                </option>
              ))}
            </select>

            <p className="error-message">{errors.type?.message}</p>
            <br></br>
            <label htmlFor="year">
              <strong>Year</strong>
            </label>
            <br></br>
            <input
              type="text"
              id="year"
              name="year"
              {...register("year")}
              disabled={isViewForm()}
            />
            <p className="error-message">{errors.year?.message}</p>
            <br></br>
            <label htmlFor="mileage" className="label">
              <strong>Mileage</strong>
            </label>
            <br></br>
            <input
              type="text"
              id="mileage"
              name="mileage"
              {...register("mileage")}
              disabled={isViewForm()}
            />
            <p className="error-message">{errors.mileage?.message}</p>
            {!isViewForm() && <Button type="submit">Submit</Button>}
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddModal;
