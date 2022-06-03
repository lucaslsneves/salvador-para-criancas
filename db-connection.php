<?php
$mysqli = new mysqli("127.0.0.1", "root", "root", "salvador-para-criancas");
$result = $mysqli->query("SELECT DATABASE()");
$row = $result->fetch_row();
$mysqli->select_db("salvador-para-criancas");
