import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import React, { useEffect, useState } from "react";
import { useSelector, connect, shallowEqual } from "react-redux";
import { onValue, set } from "firebase/database";

import { logOut, userRef } from "../services/firebase";
import { changeName, toggleCheckbox } from "../store/profile/actions";
import { selectName } from "../store/profile/selectors";

import { TextField, Button } from "@mui/material";

export const Profile = ({ checkboxValue, setName, changeChecked }) => {
    const name = useSelector(selectName, shallowEqual);
    const [value, setValue] = useState(name);

    useEffect(() => {
        const unsubscribe = onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            setName(userData?.name || "");
        });

        return unsubscribe;
    }, [setName]);

    const handleChangeText = (e) => {
        setValue(e.target.value);
    };

    const handleChange = () => {
        changeChecked();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        set(userRef, {
            name: value,
        });
    };

    const handleLogOutClick = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="profile">
            <h3>Profile</h3>
            <FormControlLabel className="label" control={<Checkbox checked={checkboxValue} onChange={handleChange}/>} label="Click!" />
            <form onSubmit={handleSubmit}>
                <TextField size="small" type="text" value={value} onChange={handleChangeText} />
                <TextField size="small" type="submit" />
            </form>
            <Button className="buttonOut" variant="contained" type="submit" size="medium" onClick={handleLogOutClick}>OUT</Button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    name: state.profile.name,
    checkboxValue: state.profile.checkbox,
});

const mapDispatchToProps = (dispatch) => ({
    changeChecked: () => dispatch(toggleCheckbox),
    setName: (newName) => dispatch(changeName(newName)),
});

export const ConnectedProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);