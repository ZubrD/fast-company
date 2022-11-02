import React, { useEffect, useState } from "react";
// import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevstate) => ({
            ...prevstate,
            [target.name]: target.value
        }));
    };
    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Пароль обязателен для заполенения")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать хотя бы одну заглавную букву"
            )
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Парольдолжен содержать один из специальных символов !@#$%^&*"
            )
            .matches(
                /(?=.{8,})/,
                "Пароль должен состоять как минимум из 8 символов"
            ),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполенения")
            .email("Email введён некорректно")
    });
    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполенения"
    //         },
    //         isEmail: {
    //             message: "Email введён некорректно"
    //         }
    //     },
    //     password: {
    //         isRequired: { message: "Пароль обязателен для заполенения" },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать хотя бы одну заглавную букву"
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одно число"
    //         },
    //         min: {
    //             message: "Пароль должен состоять как минимум из 8 символов",
    //             value: 8
    //         }
    //     }
    // };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        // setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;