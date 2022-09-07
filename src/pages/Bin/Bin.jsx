import Header from "../../components/Header";
import { BinContent, BinLeftSide } from "./Components";
const Bin = () => {
  return (
    <>
      <Header />
      <div className="bin-wrapper">
        <BinLeftSide />
        <BinContent />
      </div>
    </>
  );
};

export default Bin;
