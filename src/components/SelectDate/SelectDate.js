import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelectDate = ({ datePick, setDatePick }) => {
  const [startDate, setStartDate] = useState(datePick);

  useEffect(() => {
    setDatePick(startDate);
  }, [startDate])

  return (
    <DatePicker 
        showIcon
        selected={startDate} 
        dateFormat="yyyy - MM - dd"
        onChange={(date) => setStartDate(date)} 
    />
  );
};

export default SelectDate;