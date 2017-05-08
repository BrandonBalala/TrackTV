import React from 'react';

//Stateless functional component, not tied to React

const MainLayout = ({children}) =>
	<div className='main-layout'>
		{children}
	</div>

export default MainLayout;