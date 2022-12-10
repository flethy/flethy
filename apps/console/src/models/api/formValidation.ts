import { Instance, types } from 'mobx-state-tree'

const InputForm = types.model({
	name: types.string,
	unique: types.maybeNull(types.array(types.string)),
	minLength: types.maybeNull(types.number),
	value: types.optional(types.union(types.string, types.number), ''),
	valid: types.optional(types.boolean, true),
	errorMessage: types.optional(types.string, ''),
})

export const FormValidationModel = types
	.model('FormValidationModel', {
		inputs: types.map(InputForm),
		valid: types.optional(types.boolean, true),
	})
	.actions((self) => {
		const add = (key: string, input: Instance<typeof InputForm>) => {
			self.inputs.set(key, input)
		}

		const update = (key: string, value?: string | number) => {
			if (value) {
				self.inputs.get(key)!.value = value
			} else {
				self.inputs.get(key)!.value = ''
			}
		}

		const validate = (key: string): boolean => {
			self.valid = true
			const input = self.inputs.get(key)
			if (!input) {
				return false
			}
			input.valid = true
			input.errorMessage = ''
			if (input.unique) {
				if (input.unique.includes(input.value as any)) {
					self.valid = false
					input.valid = false
					input.errorMessage = 'This value must be unique'
					return false
				}
			}
			if (input.minLength) {
				if ((input.value as string).length < input.minLength) {
					self.valid = false
					input.valid = false
					input.errorMessage = `This value must be at least ${input.minLength} characters`
					return false
				}
			}
			return true
		}

		const validateAll = () => {
			for (const key of self.inputs.keys()) {
				if (!validate(key)) {
					return
				}
			}
		}

		const clear = () => {
			self.inputs.clear()
		}

		return { add, update, validate, validateAll, clear }
	})
	.views((self) => {
		const isValid = (key: string) => {
			const input = self.inputs.get(key)
			if (input) {
				return input.valid
			}
			return true
		}

		const errorMessage = (key: string) => {
			const input = self.inputs.get(key)
			if (input) {
				return input.errorMessage
			}
			return ''
		}

		return { isValid, errorMessage }
	})
