import { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import './Checkbox.css';

export default function Checkbox(stateProps) {

const [checkedOne, setCheckedOne] = useState(stateProps.isComplete);
const updateOne = () => { 
  if(!checkedOne){
    stateProps.items[stateProps.index].isComplete = true;
  }else{
    stateProps.items[stateProps.index].isComplete = false;
  }
  setCheckedOne(!checkedOne);
  stateProps.callback();
};

  return (
    <>
      <div>
        <input
        disabled={stateProps.disabled}
          id="checkbox-2"
          className="checkbox-custom"
          name="checkbox-2"
          type="checkbox"
          checked={checkedOne}
          onChange={updateOne}
        />
        <label className="checkbox-custom-label" onClick={updateOne}><span>{stateProps.name}</span></label>
        { stateProps.subtitle && <div><span className="checkbox-subtitle">{stateProps.subtitle}</span></div>}
      </div>
    </>
  );
}
