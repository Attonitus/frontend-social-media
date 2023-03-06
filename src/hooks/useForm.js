import { useState } from "react"

export const useForm = (initialState = {}) => {
    const[form, setForm] = useState(initialState)

    const onInputChange=({target}) => {
        const {value, name} = target
        setForm({
            ...form,
            [name]: value
        })
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        form,
        onInputChange,
        onResetForm,
    }

}