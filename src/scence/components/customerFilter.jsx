import React from 'react'
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;



export const CustomerFilter = ({setStartDate,setEndDate}) => {

    function selectDates(values){
        if (values && values.length >= 2) {
        const startDateFormatted = values[0]?.format("MM DD YYYY");
        const endDateFormatted = values[1]?.format("MM DD YYYY");
        setStartDate(startDateFormatted);
        setEndDate(endDateFormatted);
        }
      }


  return (
    
         <RangePicker format="DD/MM/YYYY"  onChange={selectDates}/>
      
   
  )
}


