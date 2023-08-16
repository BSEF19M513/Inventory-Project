import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Barcode from "react-barcode";

export default function AddStore() {

  const [form, setForm] = useState({
    sno: "",
    name: "",
    barcode: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);


  const addProduct = () => {
    // check if all fields are filled
    if (form.sno === "" || form.barcode === "" || form.name === "") {
      alert("Please fill all the fields");
      return;
    }
    fetch("http://localhost:4002/api/store/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Product Added Successfully");
          setOpen(false);
        } else {
          alert(data.message);
        }
      }
      );

  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <form>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="sno"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Serial Number
                      </label>
                      <input
                        type="number"
                        name="sno"
                        id="sno"
                        value={form.sno}
                        required
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Serial Number"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Product Name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="barcode"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Barcode Value
                      </label>
                      <input
                        type="text"
                        name="barcode"
                        id="barcode"
                        value={form.barcode}
                        required
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter Barcode Value"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Preview Barcode
                      </label>
                      <Barcode value={form.barcode} height={40} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              onClick={addProduct}
            >
              Add Store
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setOpen(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition.Root>
  );
}