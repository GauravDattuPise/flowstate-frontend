import React, { useCallback, useEffect, useState } from 'react'
import { Button, Grid, TextField } from "@mui/material"
import axios from "axios"
import "./FlowState.css"
import Table from '../table/Table';
import toast from 'react-hot-toast';

const FlowState = () => {

    const [allUserData, setAllUserData] = useState([]);

    useEffect(() => {
        // console.log(allUserData);// it is printing infinitely

        // calculateData();
    }, []);

    // state for inputs
    const [inputs, setInputs] = useState({
        name: "",
        age: "",
        mobile: "",
        score: "",
        total: "",
        hrv: "",
        percentage: "",
        calBaseFocus: "",
        newHrv: "",
        calActivityFlowState: ""
    });

    // handle input change fuction
    function handleChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // handle form submit
   async function handleSubmit(e) {
        try {
            e.preventDefault();

            const userObj = {
                name: inputs.name,
                age: inputs.age,
                mobile: inputs.mobile,
                score: inputs.score,
                total: inputs.total,
                hrv: inputs.hrv,
                percentage: inputs.percentage,
                calBaseFocus: inputs.calBaseFocus,
                newHrv: inputs.newHrv,
                calActivityFlowState: inputs.calActivityFlowState
            }

            // setting new user to array
            setAllUserData((prevState) => [...prevState, userObj]);

            // sending data to backend

            const res = await axios.post("http://localhost:5000/flowstate/createFlowState", userObj);
            if(res.data.status){
                toast.success("flow state saved successfully");

                // reseting user inputs
                setInputs({
                    name: "",
                    age: "",
                    mobile: "",
                    score: "",
                    total: "",
                    hrv: "",
                    percentage: "",
                    calBaseFocus: "",
                    newHrv: "",
                    calActivityFlowState: ""
                });
            }

        } catch (error) {
            console.log("error in creating flow state", error);
            toast.error("could not save flowstate data")
        }
    }

    // calculate
    const calculateData = useCallback(() => {

        // set %
        if (inputs.score !== "" && inputs.total !== "") {
            setInputs((prevState) => ({
                ...prevState,
                percentage: inputs.score / inputs.total * 100
            }))
        } else {
            setInputs((prevState) => ({
                ...prevState,
                percentage: ""
            }))
        }

        // set calculate base focus
        if (inputs.hrv !== "" && inputs.percentage !== "") {
            setInputs((prevState) => ({
                ...prevState,
                calBaseFocus: 100 * inputs.hrv / inputs.percentage
            }))
        } else {
            setInputs((prevState) => ({
                ...prevState,
                calBaseFocus: ""
            }))
        }

        // set calculated activity flow state
        if (inputs.calBaseFocus !== "" && inputs.newHrv !== "") {
            setInputs((prevState) => ({
                ...prevState,
                calActivityFlowState: inputs.newHrv * 100 / inputs.calBaseFocus
            }))
        } else {
            setInputs((prevState) => ({
                ...prevState,
                calActivityFlowState: ""
            }))
        }
    },[inputs])

    useEffect(() => {
        calculateData();
    }, [inputs]);

    return (
        <div>
            <div className='conatainer'>
                <form className='subContainer' onSubmit={handleSubmit}>
                    <Grid container >
                        <Grid item xs={12} sm={8} md={6} xl={6}  >
                            <div className='firstGrid'>
                                <div><h1>Base flow state</h1></div>
                                <div>
                                    <TextField
                                        className='firsGridFirstRow'
                                        placeholder="Name"
                                        name='name'
                                        value={inputs.name}
                                        type='text'
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        className='firsGridFirstRow'
                                        placeholder='Age'
                                        name='age'
                                        type='number'
                                        value={inputs.age}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        className='firsGridFirstRow'
                                        placeholder="Mobile No"
                                        name='mobile'
                                        value={inputs.mobile}
                                        type='number'
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <TextField
                                        className='firstGridSecondRow'
                                        placeholder="Score"
                                        name='score'
                                        value={inputs.score}
                                        type='number'
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        className='firstGridSecondRow'
                                        placeholder='Total'
                                        name='total'
                                        value={inputs.total}
                                        type='number'
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        className='firstGridSecondRow'
                                        placeholder=" %"
                                        name='percentage'
                                        value={inputs.percentage}
                                        type='number'
                                    // onChange={handleChange}
                                    />
                                    <TextField
                                        className='firstGridSecondRow'
                                        placeholder="HRV"
                                        name='hrv'
                                        value={inputs.hrv}
                                        type='number'
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <TextField
                                        className='firstGridThirdRow'
                                        type='number'
                                        placeholder="Calculated Base Focus"
                                        name='calBaseFocus'
                                        value={inputs.calBaseFocus}
                                    // onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6} xl={6} >
                            <div className='secondGrid'>
                                <div><h1>Post Activity Flow State</h1></div>
                                <div>
                                    <TextField
                                        className='secondGridFirstRow'
                                        placeholder="Calculated Base Focus"
                                        name='calBaseFocus'
                                        value={inputs.calBaseFocus}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        className='secondGridFirstRow'
                                        placeholder='New HRV'
                                        name='newHrv'
                                        value={inputs.newHrv}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <TextField
                                        className='secondGridSecondRow'
                                        placeholder="Calculated Activity Flow State"
                                        name='calActivityFlowState'
                                        value={inputs.calActivityFlowState}
                                        // onChange={handleChange}
                                        type='number'
                                    />
                                </div>
                                <div>
                                    <Button
                                        className='buttonStyle'
                                        variant='contained'
                                        size='large'
                                        type='submit'
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Table user={allUserData} />
        </div>

    )
}

export default FlowState