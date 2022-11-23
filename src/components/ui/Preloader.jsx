import React from 'react'

/**
 * Компонент "Предзагрузчик". Выводит анимацию ожидания загрузки
 * @returns {JSX.Element}
 */
const Preloader = () => {
	return (
		<svg className='Preloader' viewBox='25 25 50 50'>
			<circle
				className='Preloader__dash'
				cx='50'
				cy='50'
				r='20'
				fill='none'
				strokeWidth='0.5'
				strokeMiterlimit='10'
			/>
		</svg>
	)
}

export default Preloader
