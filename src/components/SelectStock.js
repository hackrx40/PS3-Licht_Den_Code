import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useState } from 'react';

const animatedComponents = makeAnimated();

export default function SelectStock() {

  const [stockList,setStockList] = useState([]);
  console.log(stockList)

    const options = [
        { value: 'ADANIENT.NS', label: 'ADANI ENTERPRISES' },
        { value: 'ADANI PORTS & SEZ', label: 'ADANI PORTS & SEZ' },
        { value: 'APOLLO HOSPITALS', label: 'APOLLO HOSPITALS' },
        { value: 'ASIAN PAINTS', label: 'ASIAN PAINTS' },
        { value: 'AXIS BANK', label: 'AXIS BANK' },
        { value: 'BAJAJ AUTO', label: 'BAJAJ AUTO' },
        { value: 'BAJAJ FINANCE', label: 'BAJAJ FINANCE' },
        { value: 'BAJAJ FINSERV', label: 'BAJAJ FINSERV' },
        { value: 'BHARTI AIRTEL', label: 'BHARTI AIRTEL' },
        { value: 'BPCL', label: 'BPCL' },
        { value: 'CIPLA', label: 'CIPLA' },
        { value: 'COAL INDIA', label: 'COAL INDIA' },
        { value: 'DIVIS LABORATORIES', label: 'DIVIS LABORATORIES' },
        { value: 'DR. REDDYS LAB', label: 'DR. REDDYS LAB' },
        { value: 'EICHER MOTORS', label: 'EICHER MOTORS' },
        { value: 'GRASIM', label: 'GRASIM' },
        { value: 'HCL TECHNOLOGIES', label: 'HCL TECHNOLOGIES' },
        { value: 'HDFC BANK', label: 'HDFC BANK' },
        { value: 'HDFC LIFE INSURANCE', label: 'HDFC LIFE INSURANCE' },
        { value: 'HERO MOTOCORP', label: 'HERO MOTOCORP' },
        { value: 'HINDALCO', label: 'HINDALCO' },
        { value: 'HUL', label: 'HUL' },
        { value: 'ICICI BANK', label: 'ICICI BANK' },
        { value: 'INDUSIND BANK', label: 'INDUSIND BANK' },
        { value: 'INFOSYS', label: 'INFOSYS' },
        { value: 'IOC', label: 'IOC' },
        { value: 'ITC', label: 'ITC' },
        { value: 'JSW STEEL', label: 'JSW STEEL' },
        { value: 'KOTAK MAHINDRA BANK', label: 'KOTAK MAHINDRA BANK' },
        { value: 'L&T', label: 'L&T' },
        { value: 'LTIMINDTREE', label: 'LTIMINDTREE' },
        { value: 'M&M', label: 'M&M' },
        { value: 'MARUTI SUZUKI', label: 'MARUTI SUZUKI' },
        { value: 'NESTLE', label: 'NESTLE' },
        { value: 'NTPC', label: 'NTPC' },
        { value: 'ONGC', label: 'ONGC' },
        { value: 'POWER GRID', label: 'POWER GRID' },
        { value: 'RELIANCE IND.', label: 'RELIANCE IND.' },
        { value: 'SBI', label: 'SBI' },
        { value: 'SBI LIFE INSURANCE', label: 'SBI LIFE INSURANCE' },
        { value: 'SUN PHARMA', label: 'SUN PHARMA' },
        { value: 'TATA CONSUMER', label: 'TATA CONSUMER' },
        { value: 'TATA MOTORS', label: 'TATA MOTORS' },
        { value: 'TATA STEEL', label: 'TATA STEEL' },
        { value: 'TCS', label: 'TCS' },
        { value: 'TECH MAHINDRA', label: 'TECH MAHINDRA' },
        { value: 'TITAN', label: 'TITAN' },
        { value: 'ULTRATECH CEMENT', label: 'ULTRATECH CEMENT' },
        { value: 'UPL', label: 'UPL' },
        { value: 'WIPRO', label: 'WIPRO' },
      ];      
      
      const handleChoose = (selectedOptions) => {
        const selectedStocks = selectedOptions.map(option => option.value);
        setStockList(selectedStocks);
        console.log(selectedStocks);
      }


  return (
    <div className=''>
        <Select 
        options={options} 
        isMulti 
        closeMenuOnSelect={false}
        components={animatedComponents}
        onChange={handleChoose}
      />
    </div>
  )
}
