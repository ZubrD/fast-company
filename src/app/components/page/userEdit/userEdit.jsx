import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import { rest } from "lodash";

const UserEdit = ({ match }) => {
    const history = useHistory();
    const userId = match.params.userId;
    const [data, setData] = useState();
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});
    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const handleChange = (target) => {
        setData((prevstate) => ({
            ...prevstate,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataQualitiesId = data.qualities.map((item) => {
            // Массив id (если изменяю качества, то value, если не изменяю, то _id)
            return typeof item._id === "string" ? item._id : item.value;
        });

        const dataQualities = [];
        dataQualitiesId.forEach((item) => {
            for (const key in qualities) {
                // Проход по массиву качеств в поисках совпадений по id
                if (qualities[key]._id === item) {
                    const itemObject = {
                        _id: qualities[key]._id,
                        name: qualities[key].name,
                        color: qualities[key].color
                    };
                    dataQualities.push(itemObject);
                }
            }
        });

        let dataProfessionId;
        typeof data.profession === "string"
            ? (dataProfessionId = data.profession) // Если профессию изменяют, data.profession - строка
            : (dataProfessionId = data.profession._id); // Если профессию НЕ изменяют, data.profession - объект
        let dataProfessionName;
        for (const key in professions) {
            if (professions[key]._id === dataProfessionId) {
                dataProfessionName = professions[key].name;
            }
        }
        api.users.update(userId, {
            email: data.email,
            sex: data.sex,
            profession: {
                name: dataProfessionName,
                _id: dataProfessionId
            },
            qualities: dataQualities
        });
        history.push(`/users/${userId}`);
    };
    return (
        data && (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="email"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                // error={errors.email}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professions}
                                onChange={handleChange}
                                value={data.profession._id}
                                // error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                // disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

UserEdit.propTypes = {
    match: PropTypes.object
};

export default UserEdit;
