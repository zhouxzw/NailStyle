import { Route, Redirect } from "react-router-dom";

function Protected({ auth: auth, component: Component, ...rest }) {
  console.log("Auth ", auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth === true) {
          return <Component />;
        } else {
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          ></Redirect>;
        }
      }}
    ></Route>
  );
}

export default Protected;
