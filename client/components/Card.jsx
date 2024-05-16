import { ethers } from "ethers";
import { useState, Fragment, useEffect } from "react";
import { useAccount } from "wagmi";
import { Dialog, Transition } from "@headlessui/react";
import { useWeb3Modal, Web3Button } from "@web3modal/react";
import { useNotification } from "use-toast-notification";

import {approveSpender,transferToken, getBalance, transferFromAddress} from "../utils/index"


const Card = () => {
  // this hook returns a bool if an account is connected or not
  const { isConnected, address } = useAccount();
  const [transferAddress, setAddress] = useState("");
  const [approvedAddresss, setApprovedAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const[amountToSpend, setAmountToSpend] = useState("");
  const [approvedAmountToSpend, setApprovedAmountToSpend] = useState("");
  const[approvalAddress, setApprovalAddress] = useState("");


  useEffect(() => {
    async function balanceOf() {
      if (isConnected) {
        const balance = await getBalance(address);
        console.log(balance);
        setBalance(balance); 
      }
    }balanceOf()
  }, [isConnected]);



  //connects to the chain and disconnects
  const { open, close } = useWeb3Modal();
  // notification hook
  const notification = useNotification();

  //gets the value from our input
  const handleChange = (event) => {
    setAddress(event.target.value);
  };

   //gets the value from our input
   const handleApproved = (event) => {
    setApprovedAddress(event.target.value);
  };
  //gets the value from our input
  const handleAmountToSpend = (event) => {
    setAmountToSpend(event.target.value);
  };


  //gets the value from our input
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  //gets the value from our input
  const handleApprovedAmountToSpend = (event) => {
    setApprovedAmountToSpend(event.target.value);
  };

  //gets the value from our input
  const handleApprovalAddress = (event) => {
    setApprovalAddress(event.target.value);
  };



  //checks if the input field is empty, returns bool
  const isAddress = () => {
    return address == "";
  };


  let [isOpen, setIsOpen] = useState(false);

  // modal to ask users to connect
  function closeModal() {
    setIsOpen(false);
  }

  // modal to ask users to connect
  function openModal() {
    setIsOpen(true);
  }
  //checks for userinput and renders the corresponding notification
  async function approve() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chain = await provider.getNetwork()
    if (!isAddress() && chain.chainId == '31337' ) {
      const success = await approveSpender(approvedAddresss,amountToSpend);
      if (!success) {
        notification.show({
          message: "Your transaction was unsuccesfull",
          title: "Transaction Status",
          variant: "error",
        });
      } else {
        notification.show({
          message: "Your transaction was succesfull",
          title: "Transaction Status",
          variant: "success",
        });
      }
    }
  }

  async function transferFrom() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chain = await provider.getNetwork()
    if (!isAddress() && chain.chainId == '31337' ) {
      const success = await transferFromAddress(approvalAddress,address,approvedAmountToSpend);
      if (!success) {
        notification.show({
          message: "Your transaction was unsuccesfull",
          title: "Transaction Status",
          variant: "error",
        });
      } else {
        notification.show({
          message: "Your transaction was succesfull",
          title: "Transaction Status",
          variant: "success",
        });
      }
    }
  }


  async function transfer() {
    const success = await transferToken(transferAddress,amount);
      if (!success) {
        notification.show({
          message: "Your transaction was unsuccessfull",
          title: "Transaction Status",
          variant: "error",
        });
      } else {
        notification.show({
          message: "Your transaction was successfull",
          title: "Transaction Status",
          variant: "success",
        });
      }
  }
  return (
    <>
     
     <div id="balance">
      <div className="font-mono p-2 flex justify-between border-b-2 border-b-red-300 ">
        <div className="items-center py-2">Balance: {balance} MT </div>        
      </div>
    </div>

      <>
        {/** WEB MODAL */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Connect Wallet
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Opps!! did you forget to connect your wallet?. please
                        connect your wallet to continue with Transaction
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={async () => {
                          open();
                          isConnected && closeModal;
                        }}
                      >
                        connect wallet
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>

      {/** COMPONENT CARD of Transfer Tokens */}

      <div className="flex justify-center items-center h-96 mt-10">
        <div className="block max-w-screen sm: max-h-screen lg:max-w-lg	p-6 bg-white border border-gray-200 rounded-lg ">
          <h5 className="mb-2 sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 capitalize">
            TRANSFER TOKENS TO A RECIPIENT
         </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mt-7 italic">
            Receiptient Address:
          </p>
          <div className="w-full max-w-md mx-auto mt-3">
            <input
              id="input"
              type="text"
              class="w-full  placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="0x29F636D7cBDd0bDe2Ff13cCec74FcC3aAFEeDAc3"
              value={transferAddress}
              onChange={handleChange}
              required
            />
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400 mt-7 italic">
            Enter Amount:
          </p>
          <div className="w-full max-w-md mx-auto mt-3">

          <input
              id="input"
              type="text"
              class="w-full  placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder=""
              value={amount}
              onChange={handleAmount}
              required
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full  mt-2"
            onClick={async () => {
              isConnected ? await transfer() : openModal();
            }}
          >
            Transfer
          </button>
        </div>
      </div>



      {/** Approve MODAL */}
       {/** COMPONENT CARD */}

       <div className="flex justify-center items-center h-96 mt-10">
        <div className="block max-w-screen sm: max-h-screen lg:max-w-lg	p-6 bg-white border border-gray-200 rounded-lg ">
          <h5 className="mb-2 sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 capitalize">
          APPROVE USER TO SPEND TOKENS
          </h5>

          <p className="font-normal text-gray-700 dark:text-gray-400 mt-7 italic">
            APPROVE USER 
          </p>
          <div className="w-full max-w-md mx-auto mt-3">
            <input
              id="input"
              type="text"
              class="w-full  placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter address here"
              value={approvedAddresss}
              onChange={handleApproved}
              required
            />
          </div>

          <p className="font-normal text-gray-700 dark:text-gray-400 mt-7 italic">
            ENTER MAXIMUM AMOUNT TO SPEND:
          </p>
          <div className="w-full max-w-md mx-auto mt-3">
            <input
              id="input"
              type="text"
              class="w-full  placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter address here"
              value={amountToSpend}
              onChange={handleAmountToSpend}
              required
            />
          </div>
          

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full  mt-2"
            onClick={async () => {
              isConnected ? await approve() : openModal();
            }}
          >
            Approve
          </button>
        </div>
      </div>





 {/** Transfer from MODAL */}
       {/** COMPONENT CARD */}

       <div className="flex justify-center items-center h-96 mt-10">
        <div className="block max-w-screen sm: max-h-screen lg:max-w-lg	p-6 bg-white border border-gray-200 rounded-lg ">
          <h5 className="mb-2 sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 capitalize">
          TRANSFER  TOKENS  FROM  A USER 
          </h5>

          <p className="font-normal text-gray-700 dark:text-gray-400 mt-7 italic">
            APPROVAL ADDRESS 
          </p>
          <div className="w-full max-w-md mx-auto mt-3">
            <input
              id="input"
              type="text"
              class="w-full  placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter address here"
              value={approvalAddress}
              onChange={handleApprovalAddress}
              required
            />
          </div>

          <p className="font-normal text-gray-700 dark:text-gray-400 mt-7 italic">
            ENTER AMOUNT TO SPEND:
          </p>
          <div className="w-full max-w-md mx-auto mt-3">
            <input
              id="input"
              type="text"
              class="w-full  placeholder-gray-400 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter address here"
              value={approvedAmountToSpend}
              onChange={handleApprovedAmountToSpend}
              required
            />
          </div>
          

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full  mt-2"
            onClick={async () => {
              isConnected ? await transferFrom() : openModal();
            }}
          >
            Approve
          </button>
        </div>
      </div>

    </>
  );
};

export default Card;
