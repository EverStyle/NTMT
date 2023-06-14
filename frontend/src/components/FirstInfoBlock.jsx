import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AdminNotification from '../screens/AdminNotification';
import Slider from './Slider';
import { CSSTransition } from 'react-transition-group';
import React, { useEffect, useState } from "react";
import './FirstInfoBlock.css';
function FirstInfoBlock() {

  const [subblockMount, showSubblockMount] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await new Promise((resolve) => setTimeout(resolve, 50));
      showSubblockMount(true);
    }
    fetchData();
  }, []);

  return (
    <CSSTransition
      in={subblockMount}
      timeout={300}
      classNames="subblock_mount"
      mountOnEnter
      unmountOnExit
    >
      <div >
        <div className="title">
          Новости техникума
        </div>
        {/* <div className='personal_block_container'>
        <div className='personal_block' >
          Уведомления
        </div>
        <div className='personal_block'>
          Расписание
        </div>
        <div className='personal_block'>
          Файлы
        </div>
        <div className='personal_block'>
          Зачетная книжка
        </div>
        <div className='personal_block'>
          Учебный план
        </div>
      </div> */}
        <Slider></Slider>
        <div>
          <div className="title">
            О техникуме
          </div>
          <div className="img_block">









          </div>
          <div className="small_text_block">
            Техникум основан в конце 1931 года с целью подготовки специалистов для строящегося Уралвагонзавода.
          </div>
          <div className="small_text_block">
            В 1931 года проведен набор учащихся в вагоностроительный техникум по специальностям «Вагоностроение», «Технология машиностроения».
            Контингент учащихся 60-70 человек.
          </div>
          <div className="small_text_block">
            В июле 1933 года контингент учащихся около 150 человек.
          </div>
          <div className="small_text_block">
            В августе 1933 года приказом заместителя наркома тяжелого машиностроения Пятакова техникум ликвидирован как «карликовый».
          </div>
          <div className="small_text_block">
            Постановлением Совета Народных Комиссаров СССР №1742 от 8 августа 1935 года повторно создан на базе Уралвагонстроя как Машиностроительный Вечерний
            Техникум без отрыва от производства в составе трех отделений:
            сварочного, литейного и сборочно-монтажного. Осенний набор 1935 года утвержден в количестве 150 человек.
          </div>
          <div className="small_text_block">
            С 1938 года начата подготовка специалистов с отрывом от производства в составе двух отделений: дневного и вечернего.
          </div>
          <div className="small_text_block">
            В годы Великой Отечественной войны техникум перешел на подготовку техников-механиков танков, 120 его учащихся ушли добровольцами на фронт.
          </div>
          <div className="small_text_block">
            Приказом №135 от 07.09.1941 года по техникуму, согласно распоряжению областных организаций,
            учеба студентов дневного и вечернего отделений прекращена до 20.09.1941 года. «Все студенты считаются
            мобилизованными и направляются на уборочную кампанию в колхозы Свердловской области».
          </div>
          <div className="small_text_block">
            В период производственной практики в 1942 году все учащиеся «приравниваются» к рабочим. Рабочий день - 12 часов.
          </div>
          <div className="small_text_block">
            Приказом №155 от 05.03.1947 года Министерства Транспортного машиностроения
            Союза ССР отмечена значительная работа Нижне-Тагильского машиностроительного техникума за годы Великой Отечественной
            войны по подготовке специалистов, и за лучшие показатели деятельности коллектива техникуму оставлено на вечное хранение
            переходящее Красное знамя Народного комиссариата танковой промышленности СССР.
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default FirstInfoBlock;