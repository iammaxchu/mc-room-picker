import PropTypes from "prop-types";
import { useState } from "react";

import "../index.css";
import minus_img from "../../images/minus.png";
import plus_img from "../../images/plus.png";

const buttonOpacityStyle = { opacity: 0.48 };
const inputFocusStyle = { border: "1px solid #1e9fd2" };
const inputBlurStyle = { border: "1px solid #bfbfbf" };

function Picker({ title, subtitle, max, count, setCount, disabled }) {
  // 儲存輸入框的 focus 狀態
  const [inputFocus, setInputFocus] = useState(false);

  // 手動輸入
  function handleInputChange(e) {
    if (disabled) return;
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

  // 點選輸入框時
  function handleInputClick() {
    setInputFocus(true);
  }

  // 離開輸入框時
  function handleInputBlur() {
    setInputFocus(false);
  }

  // 按鈕 - 1
  function handleMinusOne() {
    if (disabled) return;
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
    if (disabled) return;
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
          style={count === 0 || disabled ? buttonOpacityStyle : null}
          onClick={handleMinusOne}
        >
          <img src={minus_img} alt="minus" />
        </div>
        <div
          style={inputFocus ? inputFocusStyle : inputBlurStyle}
          className="picker-input-conatiner"
        >
          <input
            className="picker-input"
            type="number"
            step={1}
            value={count}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onBlur={handleInputBlur}
            disabled={disabled}
          />
        </div>
        <div
          className="picker-button"
          style={count === max || disabled ? buttonOpacityStyle : null}
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
