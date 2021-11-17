import React from "react";
import { connect } from "react-redux";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { toggleCheckbox } from "../store/profile/actions";

export const Profile = ({ checkboxValue, changeChecked }) => {

    const handleChange = () => {
        changeChecked();
    };

    return (
        <div className="profile">
            <h3>Profile</h3>
            <FormControlLabel className="label" control={<Checkbox checked={checkboxValue} onChange={handleChange}/>} label="Click!" />
        </div>
    );
};

const mapStateToProps = (state) => ({
    checkboxValue: state.profile.checkbox,
});

const mapDispatchToProps = (dispatch) => ({
    changeChecked: () => dispatch(toggleCheckbox),
});

export const ConnectedProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);