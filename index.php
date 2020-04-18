<?php

$dsn = "mysql:host=localhost;dbname=suer;charset=utf8";

$opt = array(
    PDO::ATTR_ERRMODE  => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
);

// Проверка корректности подключения
try { $pdo = new PDO($dsn, 'root', '', $opt); }
catch (PDOException $e) { die('Подключение не удалось: ' . $e->getMessage()); }

// Формируем запрос
$sql = "SELECT * FROM item";
$result = $pdo->query($sql);

// Формируем запрос
$sql2 = "SELECT DISTINCT `option` FROM item";
$result2 = $pdo->query($sql2);
$item = array();
$empty = array();

$i = 0;

while($row = $result2->fetch()) {
    $name = 'empty';
    $option = $row['option'];
    $empty[$name][$option][] = '';
}

//var_dump($empty);

// Перебор и вывод результатов
while ($row = $result->fetch()) {
    $name = $row['model'];
    $option = $row['option'];
    $item[$name][$option][] = $row['value'];
}

//var_dump(array_merge($item['STG79L'], $empty['empty']));
var_dump($item['STG79L']);
echo '<br><br><br>';
var_dump($empty['empty']);

foreach ($item as $name => $values) {
    $item[$name] = array_merge($empty['empty'], $item[$name]);
}
echo '<br><br><br>';

var_dump($item['STG79L']);


echo '<div>';
foreach ($item as $name => $values ) {
    $i = 0;

    $list = '';
    foreach ($values as $valueName => $value) {
        $optionValues = '';
        foreach ($value as $val) {
            $optionValues .= '<div class="res__card-row-item">'.$val.'</div>';
        }
        $list .= '<div class="res__card-row" data-row="'.++$i.'">'.$optionValues.'</div>';
    }
    $file = file_get_contents('item-template.pug');
    $file = str_replace('{item-name}', $name, $file);
    $file = str_replace('{list}', $list, $file);
    echo $file;
}
echo '</div>';