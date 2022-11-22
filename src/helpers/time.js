import dayjs from 'dayjs'
import { Timestamp } from 'firebase/firestore'

const inputTimeFormat = 'YYYY-MM-DDTHH:mm'
const displayTimeFormat = 'HH:mm DD.MM.YYYY'

export const toTimestamp = (datetime) => {
	return Timestamp.fromDate(new Date(datetime))
}

export const toDatetime = (timestamp) => {
	return new Date(timestamp.seconds * 1000)
}

export const toInputTimeFormat = (timestamp) => {
	return dayjs(timestamp.toDate()).format(inputTimeFormat)
}

export const toDisplayTimeFormat = (inputDatetime) => {
	return dayjs(inputDatetime).format(displayTimeFormat)
}
