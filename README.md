# Monitoring System

Веб-система регистраций отклонений показаний датчиков от утвержденных технологических карт.
Описание: веб-интерфейс позволяет добавлять/изменять/удалять технологические ограничения для датчиков желаемых участков производства, а также вести запись отклонений с возможностью просмотра графиков показаний по интересующему периоду выхода за ограничения.

<img src="https://github.com/vladconq/Fullstack-Monitoring-System/blob/master/Screen.png" width="750">

Бэкенд реализован через Django Rest Framework. Для запуска необходимо зайти в папку backend и прописать команду в терминале: python manage.py runserver

API принимает следующие запросы:

1. GET - http://127.0.0.1:8000/api/limitations-list/str:type_of_technological_section/ - запрос возвращает список технологических ограничений рассматриваемого типа технологического участка. Возможные типы технологического участка:
diffusion (Диффузионное отделение)
residue (Выпарка)
vacuum (Вакуум-аппараты)
saturation (Сатурация)
filtration (Фильтрация)
pulp (ЖСО)
2. POST - http://127.0.0.1:8000/api/limitation-create/ - запрос создает новое технологическое ограничение. Структура тела запроса при этом выглядит следующим образом:
```
{
    "id_sensor": "",
    "type_of_technological_section": "",
    "description": "",
    "min_limit": ,
    "max_limit": ,
    "averaging": ,
    "date_begin": ,
    "date_end": 
}
```
3. PUT - http://127.0.0.1:8000/api/limitation-update/str:id_sensor/ - запрос позволяет обновить данные по имеющемуся ID в базе. В качестве id_sensor может выступать T1, T2, T3, T4, W1 и т.д. В теле запроса указывается обновленная структура данных.

4. DELETE - http://127.0.0.1:8000/api/limitation-delete/str:id_sensor/ - запрос удаляет данные указанного идентификатора из базы данных.
