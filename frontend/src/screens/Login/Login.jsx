import React, {useState} from "react";
import $api from "../../api/index";
import Select from '@mui/material/Select'
import {Button, Card, CardContent, IconButton, InputAdornment, MenuItem, TextField,} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({setToken, setUser}) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('2');
    const [errors, setErrors] = useState({
        login: false,
        password: false,
    });


    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setRole(event.target.value)
    };

    const validate = () => {
        setErrors({
            login: !login.trim(),
            password: !password.trim(),
        });
        return login.trim() && password.trim();
    }

    const handleEnterClick = async (event) => {
        if (event.key === 'Enter') {
            await logIn();
        }
    }

    async function logIn() {
        const valid = await validate();
        if (valid) {
            try {
                const request = {
                    login: login,
                    password: password,
                    type: role,
                };
                const response = await $api.login(request);
                setUser(response.data.message);
                setToken(response.data.message.token);
            } catch (error) {
                console.error(error);
                console.error('ERROR LOG IN');
                toast.error('Произошла ошибка при входе в личный кабинет. Попробуйте позже или обратитесь в техподдержку');
            }
        } else {
            toast.error('Пожалуйста, заполните выделенные поля');
        }
    }

    return (
        <div className="loginPage">
            <div className="login-wrapper">
                <Card sx={{padding: 5}}>
                    <CardContent>
                        <div className="flex flex-col items-center">
                            <div className="login-wrapper__title">
                                Вход в систему
                            </div>
                            <form onSubmit={logIn} className="form">
                                <div className="w-full md:w-96">
                                    <div className='mb-4'>
                                        <TextField
                                            size="small"
                                            style={{minWidth: '100%'}}
                                            label="Введите логин"
                                            error={errors.login}
                                            required={true}
                                            onKeyUp={e => handleEnterClick(e)}
                                            onChange={e => setLogin(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <TextField
                                            size="small"
                                            style={{minWidth: '100%'}}
                                            value={password}
                                            label="Введите пароль"
                                            type={showPassword ? 'text' : 'password'}
                                            error={errors.password}
                                            required={true}
                                            onKeyUp={e => handleEnterClick(e)}
                                            onChange={e => setPassword(e.target.value)}
                                            props = {
                                                {endAdornment:
                                                <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>}
                                            }

                                        
                                        />
                                    </div>


                                    

                                    <div className="mb-5">
                                        <Select
                                            size="small"
                                            value={role}
                                            style={{minWidth: '100%'}}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="2">Студент/Преподаватель</MenuItem>
                                            <MenuItem value="1">Родитель</MenuItem>
                                        </Select>
                                    </div>

                                    <div>
                                        <Button
                                            style={{minWidth: '100%'}}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => logIn()}
                                        >
                                            Войти
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{width: '500px'}}
            />
        </div>
    );
}

export default Login;
