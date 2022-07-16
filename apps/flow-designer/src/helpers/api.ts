import events, { LogLevel } from '../events/events'
import { rootStore } from '../models/root'

export class HttpError extends Error {
	public status: number
	constructor(message: string, status: number) {
		super(message)
		this.status = status
	}
}

export type HttpBase = 'origin' | 'test'

export interface RequestPayload {
	base?: HttpBase
	url: string
	method: 'get' | 'post' | 'put' | 'delete' | 'patch'
	headers?: { [key: string]: string }
	type?: 'json' | 'text' | 'form' | 'none'
	responseType?: 'json' | 'text' | 'form' | 'none'
	auth?: boolean
	body?: any
}

export async function request(payload: RequestPayload): Promise<any> {
	let headers: { [key: string]: string } = payload.headers || {}
	if (payload.auth === undefined || payload.auth === true) {
		// auth?
	}
	const type = payload.type ?? 'json'
	if (type) {
		switch (type) {
			case 'json':
				headers['Content-Type'] = 'application/json'
				break
			case 'text':
				headers['Content-Type'] = 'text/plain'
				break
			case 'form':
				headers['Content-Type'] = 'multipart/form-data'
				break
		}
	}
	const body = payload.body ? JSON.stringify(payload.body) : undefined
	let base = undefined
	if (payload.base) {
		switch (payload.base) {
			case 'origin':
				base = window.location.origin
				break
			case 'test':
				base = `https://test`
				break
		}
	}
	const url = base ? `${base}/${payload.url}` : payload.url
	const start = performance.now()
	const response = await fetch(url, {
		method: payload.method,
		headers,
		body,
	})
	const end = performance.now()
	let logLevel: LogLevel = 'debug'
	let success = true
	if (response.status >= 400 && response.status < 500) {
		logLevel = 'info'
		success = false
	}
	if (response.status >= 500) {
		logLevel = 'error'
		success = false
	}
	events.send({
		level: logLevel,
		id: `http-request-${payload.method}`,
		message: `${response.status} ${response.statusText} | ${end - start}ms`,
		meta: payload,
	})

	if (!success) {
		throw new HttpError(response.statusText, response.status)
	}

	const responseType = payload.responseType ?? type

	switch (responseType) {
		case 'json':
			return response.json()
		case 'text':
			return response.text()
		case 'form':
			return response.formData()
		default:
			return response
	}
}

export interface RequestOptions {
	headers?: { [key: string]: string }
	method: 'get' | 'post' | 'put' | 'delete' | 'patch'
	url: string
	body?: any
	type?: 'json' | 'form'
}

export async function httpRequest<T>(options: RequestOptions): Promise<T> {
	const headers = options?.headers ? options.headers : {}
	const type = options?.type ? options.type : 'json'
	let body = undefined
	switch (type) {
		case 'json':
			headers['Content-Type'] = 'application/json'
			if (options.body) {
				body = JSON.stringify(options.body)
			}
			break
		case 'form':
			// headers['Content-Type'] = 'multipart/form-data'
			if (options.body) {
				body = options.body
			}
			break
	}
	const method =
		options.method !== 'get' ? options.method.toUpperCase() : undefined
	const fetchOptions = {
		headers,
		method,
		body,
	}
	const response = await fetch(options.url, fetchOptions)
	return response.json()
}

export async function get(url: string, options?: RequestOptions) {
	const headers = options?.headers ? options.headers : {}
	if (headers['Content-Type'] === undefined) {
		headers['Content-Type'] = 'application/json'
	}
	const response = await fetch(url, {
		headers,
	})

	return response
}
