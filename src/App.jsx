import { useState } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { InputBox } from './components/index.js'


function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const convert = () => {
    setConvertedAmount( Math.round((( amount * currencyInfo[to]) + Number.EPSILON) * 100) / 100)
  }

  const swap = () => {
    setAmount(convertedAmount);
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
  }


  return (
    <>
      <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1572791035467-379a14a6dafd?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}
      >

        <div className='w-full'>
          <div className='w-full max-w-md mx-auto border border-black-60 rounded-lg p-5 backdrop-blur-sm bg-white/50'>
            <form onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}>
              <div className='w-full mb-1'>
                <InputBox label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectedCurrency={from}
                />
              </div>

              <div className='relative w-full h-0.5'>
                <button className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-slate-800 text-white px-2 py-0.5'
                  onClick={swap}>
                  Swap
                </button>
              </div>

              <div className='w-full mb-1'>
                <InputBox label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectedCurrency={to}
                  amountDisabled={true}
                />
              </div>
              <button type='submit' className='w-full bg-slate-800 text-white px-4 py-3 rounded-lg'>
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
