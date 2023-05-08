import React from "react";
import { useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { userRoles } from "../../boot/contants";
import apiAccount from "../../api/account";

function Headers({ setToken, setUser, user }) {

  useEffect(async () => {
      try {
        const response = await apiAccount.info();
        setUser(response.data.message);
      } catch(error) {
        console.error(error);
        console.error('ERROR GET USER');
      }
  }, []);

  function logOut() {
    localStorage.removeItem('token');
    setToken('');
  }
  return (
    <header>
      <div className='header'>
        <Link to='/' className='logo'>
          <img
            className='logo-img'
            src='images/logo.png'
            alt='images/logo.png'
          />
        </Link>
        <div className='user'>
          <div className='user-profile'>
            <img
              className='user-icon'
              src='images/userProfile.svg'
              alt='images/userProfile.svg'
            />
            <p className='bio'>
              <span className='user-fio'>{ user.fio ? `${user.fio} /` : ''} </span>
              
              <span className='user-group'>{user.groupName ? user.groupName : userRoles[user.roleId]}</span>
            </p>
          </div>
          <div
              className='logout'
              onClick={() => logOut()}
          >
            <img
              className='logout-icon'
              src='images/logout.svg'
              alt='images/logout.svg'
            />
            <p className='btn-logout'>Выход</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Headers;
