import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import Picker from "./Picker";

import "../index.css";

function Room({ room, index, updateDisbution }) {
  // 房間人數
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  // 偵測人數變動時，向上通報
  useEffect(() => {
    updateDisbution(index, { adult: adultCount, child: childCount });
  }, [adultCount, childCount]);

  return (
    <div className="room-main-container">
      <div className="room-title">房間：{adultCount + childCount}人</div>
      <Picker
        title="大人"
        subtitle="年齡 20+"
        max={room.max - childCount}
        count={adultCount}
        setCount={setAdultCount}
      />
      <Picker
        title="小孩"
        subtitle="年齡 0+"
        max={room.max - adultCount}
        count={childCount}
        setCount={setChildCount}
      />
    </div>
  );
}

Room.propTypes = {
  room: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default Room;
