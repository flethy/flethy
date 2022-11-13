export type LogLevel =
	| 'off'
	| 'fatal'
	| 'error'
	| 'warn'
	| 'info'
	| 'debug'
	| 'trace'
export interface EventPayload {
	level: LogLevel
	id: string
	message: string
	meta?: any
}

const LogLevelStyle: { [key: string]: string } = {
	fatal: 'background-color: #881798; font-weight: bold;',
	error: 'background-color: #C50F1F;',
	warn: 'background-color: orange; color: black;',
	info: 'background-color: #3A96DD; color: black;',
	debug: '',
}

class ConsoleEvents {
	private logLevel: LogLevel = 'off'

	public init(logLevel: LogLevel) {
		this.logLevel = logLevel
	}

	public send(payload: EventPayload) {
		// console logs
		this.printLog(payload)
	}

	private printLog(payload: EventPayload) {
		if (this.logLevel !== 'trace') {
			if (payload.level === 'off' || payload.level !== this.logLevel) {
				return
			}
		}

		ConsoleEvents.defaultLog(payload)
	}

	private static defaultLog(payload: EventPayload) {
		const style = LogLevelStyle[payload.level] ?? ''
		console.log(
			`%c${payload.level} | ${payload.id} | ${payload.message}`,
			style,
		)
		if (payload.meta) {
			console.log(payload.meta)
		}
	}
}

const consoleEvents = new ConsoleEvents()
export default consoleEvents
