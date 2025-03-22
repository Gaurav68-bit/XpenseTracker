// import { useEffect, useRef, useState } from 'react'
// //styles
// import './App.css';
// //components
// import Navbar from './components/Navbar/Navbar'
// import AppHead from './components/AppHead/AppHead'
// import AppBody from './components/AppBody/AppBody';
// //contexts
// import { TransactionsContext, MoneyContext } from "./Contexts/AllContexts"
// //variables
// import { dummyData } from './dummyTransactions';

// function App() {
//   const [money, setMoney] = useState({
//     balance: 5000,
//     expenses: 0
//   })
//   const [transactionData, setTransactionData] = useState([]);
//   const initialRender = useRef(true);

//   // useEffect(()=>{
//   //   if(initialRender.current)  onLoad();

//   //   return(() => {
//   //     initialRender.current = false;
//   //   })
//   // }, [])
//   useEffect(() => {
//     if (!initialRender.current) {
//         localStorage.setItem("expenses", JSON.stringify(transactionData)); // Store only transactionData
//     }
// }, [transactionData]); 


//   useEffect(()=> {
//     //save data to local storage and if it is initial render skip saving
//     if(!initialRender.current) localStorage.setItem("expenses", JSON.stringify({money, transactionData}));
//   }, [money, transactionData])

//   //functions
//   // const onLoad = () => {
//   //   const localData = localStorage.getItem("expenses");
//   //   if (localData) {
//   //     const { money, transactionData } = JSON.parse(localData);
//   //     setMoney(money);
//   //     setTransactionData(transactionData);
//   //   } else {
//   //     // If no local storage data, set initial values
//   //     localStorage.setItem("expenses", JSON.stringify({
//   //       money: { balance: 5000, expenses: 0 },
//   //       transactionData: []
//   //     }));
//   //   }
//   // };
//   const onLoad = () => {
//     const localData = localStorage.getItem("expenses");
//     if (localData) {
//         const transactionData = JSON.parse(localData);
//         setTransactionData(transactionData); // Load only transaction data
//     } else {
//         localStorage.setItem("expenses", JSON.stringify([])); // Store an empty array initially
//     }
// };

  
  

//   return (
//     <main className='App'>
//       <MoneyContext.Provider value={[money, setMoney]}>
//       <TransactionsContext.Provider value={[transactionData, setTransactionData]}>
//         <Navbar />
//         <AppHead balance={money.balance} expenses={money.expenses}/>
//         <AppBody transactionData={transactionData}/>
//       </TransactionsContext.Provider> 
//       </MoneyContext.Provider>
//     </main>
//   )
// }

// export default App


import { useEffect, useRef, useState } from 'react';
//styles
import './App.css';
//components
import Navbar from './components/Navbar/Navbar';
import AppHead from './components/AppHead/AppHead';
import AppBody from './components/AppBody/AppBody';
//contexts
import { TransactionsContext, MoneyContext } from './Contexts/AllContexts';

function App() {
  const [money, setMoney] = useState({
    balance: 5000,
    expenses: 0
  });

  const [transactionData, setTransactionData] = useState([]);
  const initialRender = useRef(true);

  // useEffect(() => {
  //   if (initialRender.current) {
  //     onLoad();
  //   }

  //   return () => {
  //     initialRender.current = false;
  //   };
  // }, []);


  useEffect(() => {
    if (initialRender.current) {
      onLoad();
      initialRender.current = false;
    }
  }, []);

  useEffect(() => {
    if (!initialRender.current) {
      // ✅ Store only transactionData as an array (ensures expenses.length works)
      localStorage.setItem('expenses', JSON.stringify(transactionData));
      console.log("🔹 Data saved to localStorage:", JSON.parse(localStorage.getItem("expenses")));

    }
  }, [transactionData]); // Only persist transactions
  

  // Load transactions from localStorage
  const onLoad = () => {
    const localData = localStorage.getItem("expenses");
    console.log("🔍 Loaded Data from localStorage:", localData);
  
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log("✅ Parsed Data:", parsedData);
  
        if (Array.isArray(parsedData)) {
          setTransactionData(parsedData);
        } else {
          setTransactionData(parsedData.transactionData || []);
        }
      } catch (error) {
        console.error("❌ Error parsing localStorage data:", error);
        setTransactionData([]);
      }
    } else {
      setTransactionData([]);
    }
  };
  

  return (
    <main className='App'>
      <MoneyContext.Provider value={[money, setMoney]}>
        <TransactionsContext.Provider value={[transactionData, setTransactionData]}>
          <Navbar />
          <AppHead balance={money.balance} expenses={money.expenses} />
          <AppBody transactionData={transactionData} />
        </TransactionsContext.Provider>
      </MoneyContext.Provider>
    </main>
  );
}

export default App;


