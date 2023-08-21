import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";
import Barcode from "react-barcode";

function PurchaseDetails() {
  
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchPurchaseData();
    fetchProductsData();
  }, [updatePage]);

  const fetchPurchaseData = () => {
    fetch(`http://localhost:4002/api/sales/get`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-2 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}

        <div className="w-full rounded-lg border border-gray-200">
          <div className="flex justify-between pt-3 pb-2 px-3">
            <div className="flex gap-4 items-center">
              <span className="font-bold text-xl">Items Details</span>
            </div>
          </div>
          <table className="table-auto border-collapse w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-1">Item No</th>
                <th className="border p-1">Bar Code</th>
              </tr>
            </thead>
            <tbody>
              {purchase.map((item, index) => (
                <tr key={index}>
                  <td className="border p-1 text-center ">{item.barcode}</td>
                  <td className="border p-1">
                    <Barcode value={item.barcode}
                    // show only barcode (without value in the bottom)
                    displayValue={false}
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

export default PurchaseDetails;
