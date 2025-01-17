// import "ldrs/ring";
// import { cardio } from "ldrs";
// cardio.register();

const Loader = ({ title }: { title: string }) => {
  return (
    <div className="overlay">
      <div className="lds-default">
        {/* <l-cardio size="50" stroke="4" speed="2" color="blue"></l-cardio> */}
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
};
export default Loader;
