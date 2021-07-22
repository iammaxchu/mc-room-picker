import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";

import Room from "./components/Room";
import "./index.css";

function checkRoomsMinLimit(people, rooms) {
  let totalMin = rooms.reduce((currCount, room) => room.min + currCount, 0);
  return people >= totalMin;
}

function RoomPicker({ people, rooms, handleDistribution }) {
  // 檢查總人數及房間最小入住人數
  const isWrongLimit = useMemo(() => {
    return checkRoomsMinLimit(people, rooms);
  }, [people, rooms]);

  // 總房間人數分配
  const [distributions, setDistributions] = useState(() =>
    rooms.map(() => {
      return { adult: 0, child: 0 };
    })
  );

  // 通報總房間人數分配
  useEffect(() => {
    handleDistribution(distributions);
  }, [distributions]);

  function updateDisbution(index, distribution) {
    // 更新總房間人數分配
    setDistributions(prev => {
      return [...prev.slice(0, index), distribution, ...prev.slice(index + 1)];
    });
  }

  return (
    <div className="main-container">
      <div className="main-title">
        住客人數：{people}人 / {rooms.length}房
        {isWrongLimit === true || (
          <div style={{ color: "red" }}>(住客人數與最小入住人數不符)</div>
        )}
      </div>
      {rooms.map((room, index) => (
        <div key={index} className="main-sub-container">
          {index > 0 ? <div className="root-devider" /> : null}
          <Room
            room={room}
            index={index}
            updateDisbution={updateDisbution}
            disabled={!isWrongLimit}
          />
        </div>
      ))}
    </div>
  );
}

RoomPicker.propTypes = {
  people: PropTypes.number,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    })
  ),
  handleDistribution: PropTypes.func
};

export default RoomPicker;
