import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "../screens/body.jsx";
import DashboardScreen from "../screens/dashboardScreen.jsx";
import MovieListScreen from "../screens/movieListScreen.jsx";


/**
* Represents the root navigation setup for this application.
* It utilizes React Router for handling different routes.
*
* @returns a specified screen based on the URL path.
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
					<Route path="/" element={<DashboardScreen />} />
					<Route path="/movies" element={<MovieListScreen />} />
				</Route>
			</Routes>
	  </BrowserRouter>
	);
};