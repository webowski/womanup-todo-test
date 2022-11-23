/**
 * Компонент "Лэйаут". Обёртка для страниц. Предполагает вывод футера, хедера, итп.
 * @returns {JSX.Element}
 */
const LayoutDefault = ({ children }) => {
	return <main className='Main'>{children}</main>
}
export default LayoutDefault
