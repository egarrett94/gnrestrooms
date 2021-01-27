import React from 'react';

const Socials = () => {
	return(
		<div>
			<p className='signature'>Made with <span>&hearts;</span> by <a href='http://www.github.com/egarrett94/gnrestrooms'>Lemon Garrett</a></p>
			<div className='socials'>
				<a href='http://www.github.com/egarrett94'><i className="fab fa-github"></i></a>
				<a href='http://www.linkedin.com/in/emariegarrett94'><i className='fab fa-linkedin-in'></i></a>
				<a href='mailto:e.marie.garrett@gmail.com'><i className='fas fa-envelope-square'></i></a>
			</div>
			<p className='signature'>Special Thanks to <a href='http://www.refugerestrooms.org'>RefugeRestrooms API</a></p>
		</div>
	)
}

export default Socials;
