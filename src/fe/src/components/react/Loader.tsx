import { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = () => {
  return (
    <div className="absolute sweet-loading z-50 bg-neutral-600 opacity-35 w-full h-full flex justify-center items-center">
      <SyncLoader
        color="#000000"
        loading={true}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
