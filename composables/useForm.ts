import type { UnwrapNestedRefs } from "vue";
import { reactive, watch } from 'vue';

interface FormValues {
    [key: string]: any; // TODO: Questionable decision here to fix warning of this[key]
    errors: { [key: string]: string };
    isValidated: boolean;
    data(): { [key: string]: string };
    reset(): void;
    validate(): boolean;
    isTypeFormData(key: string): boolean;
}

interface Error {
    [key: string]: string,
}

export const useForm = (initialValues: FormValues, messages: Error): UnwrapNestedRefs<FormValues> => {
    const form = reactive<FormValues>({
        ...initialValues,
        errors: {},
        messages: messages || {},
        isValidated: false,
        data() {
            const data: { [key: string]: string } = {};
            Object.keys(this).forEach((key) => {
                if (this.isTypeFormData(key)) {
                    data[key] = this[key];
                }
            });
            return data;
        },
        reset() {
            Object.keys(this).forEach((key) => {
                if (this.isTypeFormData(key)) {
                    this[key] = initialValues[key];
                }
            });
        },
        validate() {
            const check = !Boolean(
                Object.keys(this.data()).filter((key) => {
                    if (typeof this[key] !== 'function' && key && !this[key]) {
                        this.errors[key] = this.messages[key] ?? 'Field is required';
                        return true;
                    }
                    try{
                        if(this.errors[key]){
                            delete this.errors[key];
                        }
                    }catch(e){
                        console.error(e)
                    }
                    return false;
                }).length
            );
            this.isValidated = true;
            return check;
        },
        isTypeFormData(key) {
            if (
                typeof this[key] === 'function' ||
                ['rules', 'errors', 'isValidated', 'messages'].includes(key)
            ) {
                return false;
            }
            return true;
        },
    });

    watch(
        form,
        (newValue) => {
            if (form.isValidated) {
                form.validate();
            }
        },
        { deep: true }
    );

    return form;
};
