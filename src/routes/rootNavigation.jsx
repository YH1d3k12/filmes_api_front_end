import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "../pages/Body.jsx";
import MovieList from "../pages/MovieList.jsx";
import Dashboard from "../pages/Dashboard.jsx";


/**
* Represents the root navigation setup for this application.
* It utilizes React Router for handling different routes.
*
* @returns a specified page based on the URL path.
*/		
export default function RootNavigation() {
    return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Routes>
                {/* The Body component serves as the top-level container for all other screens.*/}
				<Route path="/" element={<Body  />}>
					{/* 
                      	The following components are child screens rendered within the Outlet of the Body component.
                      	These components represent specific views or sections of the application.
                    */}
					<Route path="/" element={<Dashboard />} />
					<Route path="/list" element={<MovieList />} />
				</Route>
			</Routes>
	  </BrowserRouter>
	);
};