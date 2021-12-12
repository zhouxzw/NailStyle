import "./Multistepper.css";

function Multistepper(props) {
  return (
    <div className="multistep-container">
      <div
        className="circle"
        style={{
          backgroundColor: props.page >= 1 ? "#DE7E98" : "#C4C4C4",
          border: props.page === 1 ? "0.75vw solid #EFBFCC" : "none",
        }}
      ></div>
      <hr
        className="bar"
        style={{ backgroundColor: props.page >= 2 ? "#DE7E98" : "#C4C4C4" }}
      ></hr>
      <div
        className="circle"
        style={{
          backgroundColor: props.page >= 2 ? "#DE7E98" : "#C4C4C4",
          border: props.page === 2 ? "0.75vw solid #EFBFCC" : "none",
        }}
      ></div>
      <hr
        className="bar"
        style={{ backgroundColor: props.page >= 3 ? "#DE7E98" : "#C4C4C4" }}
      ></hr>
      <div
        className="circle"
        style={{
          backgroundColor: props.page >= 3 ? "#DE7E98" : "#C4C4C4",
          border: props.page === 3 ? "0.75vw solid #EFBFCC" : "none",
        }}
      ></div>
      <hr
        className="bar"
        style={{ backgroundColor: props.page >= 4 ? "#DE7E98" : "#C4C4C4" }}
      ></hr>
      <div
        className="circle"
        style={{
          backgroundColor: props.page >= 4 ? "#DE7E98" : "#C4C4C4",
          border: props.page === 4 ? "0.75vw solid #EFBFCC" : "none",
        }}
      ></div>
    </div>
  );
}

export default Multistepper;
