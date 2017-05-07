import React from 'react';

//Stateless functional component, not tied to React

const MainLayout = (props) => {
	return (
		<div className='main-layout'>
			{props.children}
		</div>
	)
}

export default MainLayout;
