import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import AddStore from "../components/AddStore";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all stores data
  const fetchData = () => {
    fetch(`http://localhost:4002/api/store`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center ">
      <div className="flex flex-col gap-5 w-11/12 border-2">
        <div className="flex justify-between">
          <span className="font-bold text-center mt-4 ml-96">Manage Store</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
            onClick={toggleModal}
          >
            Add Store
          </button>
        </div>
        {showModal && <AddStore />}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border bg-white ">
            <thead>
              <tr>
                <th className="border p-2">Serial Number</th>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">Bar Code</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((element, index) => (
                <tr key={element._id} className="border">
                  <td className="border p-2 text-center ">{element.sno}</td>
                  <td className="border p-2 text-center">{element.name}</td>
                  <td className="border p-2 text-center">
                    <Barcode
                      value={element.barcode}
                      width={1}
                      height={40}
                      fontSize={12}
                      margin={0}
                      background="#ffffff"
                      lineColor="#000000"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Store;
