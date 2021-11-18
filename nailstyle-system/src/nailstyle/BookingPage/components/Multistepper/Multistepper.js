import React, { useState } from "react";

function Multistepper() {
  const [page, setPage] = useState(1);

  function nextPage() {
    if (page === 4) return;
    setPage((p) => p + 1);
  }

  return (
    <div>
      {/* <div className="progress-bar">bar</div>
      {page === 1 && "i am page 1"}
      {page === 2 && "i am page 2"}
      {page === 3 && "i am page 3"}
      {page === 4 && "i am page 4"}
      <button onClick={() => nextPage()}>next</button> */}
    </div>
  );
}

export default Multistepper;
