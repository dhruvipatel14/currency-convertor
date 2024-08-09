import { useId } from 'react'
import React from 'react'

function InputBox({ label, amount, onAmountChange, onCurrencyChange, currencyOptions = [],
    selectedCurrency = "usd", amountDisabled = false, currencyDisabled = false, className = "" }
) {

    const id = useId()

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }
    return (
        <div className={`bg-black/50 p-3 rounded-lg text-sm flex ${className}`}>
            <div className='w-1/2 '>
                <label htmlFor={id} className='text-gray-100 mb-2 inline-block'>{label}</label>

                <input type="number" id={id} className='rounded-lg w-full bg-transparent px-1 py-1 mb-2 outline-none bg-slate-100 text-left' placeholder='Amount'
                    disabled={amountDisabled}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className='w-1/2  flex-wrap justify-end text-right mb-2 inline-block'>
                <p className='text-gray-100 mb-1 w-full'>
                    Currency Type
                </p>
                <select className="rounded-lg px-1 py-1 mt-1 bg-slate-100 cursor-pointer outline-none"
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisabled}>
                    {currencyOptions.map((currency) => (
                        <option value={currency} key={currency}>{currency}</option>
                    ))}
                </select>
            </div>

        </div>
    )
}

export default InputBox