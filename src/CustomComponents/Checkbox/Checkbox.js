import { useState } from 'react';
import './Checkbox.css';

export default function Checkbox(stateProps) {

const [checkedOne, setCheckedOne] = useState(stateProps.isComplete);
const updateOne = () => setCheckedOne(!checkedOne);

  return (
    <>
      <div>
        <input
          id="checkbox-2"
          className="checkbox-custom"
          name="checkbox-2"
          type="checkbox"
          checked={checkedOne}
          onChange={updateOne}
        />
        <label className="checkbox-custom-label" onClick={updateOne}>{stateProps.name}</label>
      </div>
    </>
  );
}
