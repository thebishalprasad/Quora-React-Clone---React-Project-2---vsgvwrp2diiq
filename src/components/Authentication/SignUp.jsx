import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input
} from "@material-tailwind/react";
import { APP_TYPE, PROJECT_ID, SIGNUP_API } from "../Utils/Constant";

const SignUp = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        // Validation checks
        if (!formData.name) {
            toast.error('Name is mandatory');
            return;
        } else if (!formData.email) {
            toast.error('Email is mandatory');
            return;
        } else if (!validateEmail(formData.email)) {
            toast.error('Invalid email format');
            return;
        } else if (!formData.password) {
            toast.error('Password cannot be empty');
            return;
        } else if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        try {
            const body = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                appType: APP_TYPE,
            };

            const response = await axios.post(SIGNUP_API,
                JSON.stringify(body),
                {
                    headers: {
                        projectID: PROJECT_ID,
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status === 201) {
                const data = response.data;
                if (data.status === "success") {
                    localStorage.setItem("userInfo", JSON.stringify(data.data.user));
                    localStorage.setItem("token", data.token);
                    console.log("User information and token stored successfully.");
                    setOpen(false);
                    toast.success('Your account was created successfully');
                } else {
                    toast.error("API response status is not 'success'");
                }
            } else {
                toast.error("API response status is not 201");
            }
        } catch (err) {
            toast.error("Error occurred during sign-up: " + err.message);
        }
    };

    return (
        <>
            <p onClick={handleOpen} className="p-2 bg-gray-300 text-center rounded-xl cursor-pointer">Sign Up with email</p>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h5" color="black">
                            Sign Up
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Name
                        </Typography>
                        <Input label="Name" name="name" value={formData.name} onChange={handleChange} size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Email
                        </Typography>
                        <Input label="Email" name="email" value={formData.email} onChange={handleChange} size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Password
                        </Typography>
                        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} size="lg" />
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-end">
                        <p className="bg-[#2e69ff] p-2 rounded-3xl text-white cursor-pointer" variant="gradient" onClick={handleSubmit} fullWidth>
                            Sign Up
                        </p>
                    </CardFooter>
                </Card>
            </Dialog>
            <ToastContainer />
        </>
    );
}

export default SignUp;
