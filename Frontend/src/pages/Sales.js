import React, { useState, useEffect, useContext } from "react";
import AddSale from "../components/AddSale";
import AuthContext from "../AuthContext";

function Sales() {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [sales, setAllSalesData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchSalesData();
    fetchProductsData();
    fetchStoresData();
  }, [updatePage]);

  // Fetching Data of All Sales
  const fetchSalesData = () => {
    fetch(`http://localhost:4002/api/sales/get`)
      .then((response) => response.json())
      .then((data) => {
        setAllSalesData(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4002/api/product/get`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Stores
  const fetchStoresData = () => {
    fetch(`http://localhost:4002/api/store/get`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setShowSaleModal(!showSaleModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showSaleModal && (
          <AddSale
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            stores={stores}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Sales</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
              >
                Add Sales
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Order Number
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Barcode
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Sales Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Delivered Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {sales.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.productName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.orderNumber}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.barcode}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.dateRequired}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.dateCompleted}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 mx-4 ">
                      {/* do conditoinal rendering 
                      if required date is less than current date then show status as not received
                      (red) else show status as received(green)
                      */}
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          // here I want to change the date and want to add today date
                          new Date() < element.dateCompleted
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                          }`}
                      >
                        {new Date() < element.dateCompleted
                          ? "Not Received"
                          : "Received"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sales;
