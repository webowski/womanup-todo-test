import dayjs from 'dayjs'
import { Timestamp } from 'firebase/firestore'

const inputTimeFormat = 'YYYY-MM-DDTHH:mm'
const displayTimeFormat = 'HH:mm DD.MM.YYYY'

/**
 * Преобразует время, полученное из поля формы, в Firebase Timestamp
 * @param {string} datetime Время в формате 'YYYY-MM-DDTHH:mm'
 * @returns Firebase Timestamp
 */
export const toTimestamp = (datetime) => {
	return Timestamp.fromDate(new Date(datetime))
}

/**
 * Преобразует объект Firebase Timestamp в строку вида 'YYYY-MM-DDTHH:mm' для записи значения в поле &lt;input type="datetime-local"&gt;
 * @param {object} timestamp Объект Firebase Timestamp
 * @returns Строка в формате 'YYYY-MM-DDTHH:mm'
 */
export const toInputTimeFormat = (timestamp) => {
	return dayjs(timestamp.toDate()).format(inputTimeFormat)
}

/**
 * Преобразует значение поля &lt;input type="datetime-local"&gt; в отображаемый на странице формат 'HH:mm DD.MM.YYYY'
 * @param {string} inputDatetime Значение поля &lt;input type="datetime-local"&gt;
 * @returns Строка в формате 'HH:mm DD.MM.YYYY'
 */
export const toDisplayTimeFormat = (inputDatetime) => {
	return dayjs(inputDatetime).format(displayTimeFormat)
}
