import { reactive, watch } from 'vue';

export const useForm = (initialValues) => {
    const form = reactive({
        ...initialValues,
        isValidated: false,
        data: function() {
            const data = {}
            Object.keys(this).forEach((key) => {
                if (this.isTypeFormData(key)) {
                    data[key] = this[key]
                }
            });

            return data;
        },
        reset: function () {
            Object.keys(this).forEach((key) => {
                if (this.isTypeFormData(key)) {
                    this[key] = initialValues[key]
                }
            })
        },
        validate: function () {
            const check = !Boolean(Object.keys(this).filter((key) => {
                if (typeof this[key] !== 'function' && key && !this[key]) {
                    this.errors[key] = 'Field is required';
                    return true;
                }

                delete this.errors[key];
                return false;
            }).length)

            this.isValidated = true;
            return check;
        },
        isTypeFormData: function (key) {
            if (typeof this[key] === 'function' || ['rules', 'errors', 'isValidated'].includes(key)) {
                return false;
            }

            return true;
        }
    })

    watch(form, (newValue) => {
        if (form.isValidated) {
            form.validate();
        }
    }, { deep: true })

    return form;
}