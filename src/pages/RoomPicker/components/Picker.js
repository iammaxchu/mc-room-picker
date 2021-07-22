import PropTypes from "prop-types";

import "../index.css";
import minus_img from "../../images/minus.png";
import plus_img from "../../images/plus.png";

const buttonOpacityStyle = { opacity: 0.48 };

function Picker({ title, subtitle, max, count, setCount }) {
  // 手動輸入
  function handleInputChange(e) {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      setCount(0);
    } else {
      if (value < max) {
        setCount(value);
      } else {
        setCount(max);
      }
    }
  }

  // 按鈕 - 1
  function handleMinusOne() {
    setCount(prev => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  }

  // 按鈕 + 1
  function handlePlusOne() {
    setCount(prev => {
      if (prev >= max) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  }

  return (
    <div className="picker-main-container">
      <div className="picker-title-container">
        <div className="picker-title">{title}</div>
        <div className="picker-subtitle">{subtitle}</div>
      </div>
      <div className="picker-control-container">
        <div
          className="picker-button"
          style={count === 0 ? buttonOpacityStyle : null}
          onClick={handleMinusOne}
        >
          <img src={minus_img} alt="minus" />
        </div>
        <div className="picker-input-conatiner">
          <input
            className="picker-input"
            type="number"
            step={1}
            value={count}
            onChange={handleInputChange}
          />
        </div>
        <div
          className="picker-button"
          style={count === max ? buttonOpacityStyle : null}
          onClick={handlePlusOne}
        >
          <img src={plus_img} alt="plus" />
        </div>
      </div>
    </div>
  );
}

Picker.propTypes = {
  max: PropTypes.number
};

export default Picker;
