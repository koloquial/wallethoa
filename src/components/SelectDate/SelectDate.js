import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelectDate = ({ datePick, setDatePick }) => {
  const [startDate, setStartDate] = useState(datePick);

  useEffect(() => {
    setDatePick(startDate);
  }, [startDate])

  return (
    <div style={{marginBottom: '10px'}}>
      <p>Select Date:</p>
      <DatePicker 
          showIcon
          selected={startDate} 
          dateFormat="yyyy - MM - dd"
          onChange={(date) => setStartDate(date)} 
      />
    </div>
  );
};

export default SelectDate;