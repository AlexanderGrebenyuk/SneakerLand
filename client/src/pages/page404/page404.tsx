import React from 'react';
import './styles/page404.css'; 

type Page404Props = {};

const Page404 = ({}: Page404Props): JSX.Element => {
  return (
    <>
  <div id='oopss'>
    <div id='error-text'>
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
        <span>упс, 404</span>
        <p className="p-a">
           Друг, такой страницы не существует</p>
        <p className="p-b">
            Вернись на главную плз
        </p>
        <a href='http://localhost:5173/sneakers' className="back">... Back to главная</a>
    </div>
</div>
    </>
  );
};

export default Page404;
