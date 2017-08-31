import React from 'react';

import FixedMenu from '../FixedMenu.jsx';

//Stateless functional component, not tied to React

const MainLayout = ({children}) =>
	<div className='main-layout'>
		<FixedMenu />
		{children}
	</div>

export default MainLayout;