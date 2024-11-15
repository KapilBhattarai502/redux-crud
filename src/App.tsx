import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./Components/Loader";
import list from "./Routerlist";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {list.map((item, index) => (
          <Route path={item.path} element={<item.component />} key={index}>
            {item.children?.map((child, childIndex) => (
              <Route
                path={child.path}
                element={<child.component />}
                key={childIndex}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
};

export default App;
