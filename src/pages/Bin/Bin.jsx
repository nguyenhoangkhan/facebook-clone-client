import Header from "../../components/Header";
import { BinContent, BinLeftSide } from "./Components";
const Bin = () => {
  return (
    <div className="bin">
      <Header />
      <div className="bin-wrapper">
        <BinLeftSide />
        <BinContent />
      </div>
    </div>
  );
};

export default Bin;
