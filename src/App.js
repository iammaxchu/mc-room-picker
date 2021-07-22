import RoomPicker from "./pages/RoomPicker/RoomPicker";

const PEOPLE = 5;
const ROOMS = [
  { min: 2, max: 5 },
  { min: 1, max: 2 }
];

function handleDistribution(distributions) {
  console.log("handleDistribution change:");
  console.table(distributions);
}

function App() {
  return (
    <RoomPicker
      people={PEOPLE}
      rooms={ROOMS}
      handleDistribution={handleDistribution}
    />
  );
}

export default App;
