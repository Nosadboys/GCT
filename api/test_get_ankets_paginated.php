<?php 
    require_once 'param.php';
    
    
    session_start();
    // Определение количества записей на странице
$limit = 20;

// Получение номера текущей страницы
//$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$page=1; // это тестирую, интересная штука
header("Content-Type: application/json; charset=UTF-8");
// Вычисление значений параметров "offset" и "limit"
$offset = ($page - 1) * $limit;

// Запрос для получения записей со смещением $offset и ограничением $limit
$anket_prof = queryMysql("SELECT anket_id, user_id FROM profileankets LIMIT $offset, $limit")->fetchAll(PDO::FETCH_ASSOC);
$res = [];

foreach ($anket_prof as $row) {
    // Обработка данных на текущей итерации
    $anket = queryMysql("SELECT * FROM ankets WHERE id  = '{$row['anket_id']}'")->fetch(PDO::FETCH_ASSOC);
    $userdat = queryMysql("SELECT username, email FROM users WHERE id  = '{$row['user_id']}'")->fetch(PDO::FETCH_ASSOC);
    $profile = queryMysql("SELECT name, surname, country, date_of_birth, gender, bio, game_platforms, discord_url, platforms_url FROM profiles WHERE user_id  = '{$row['user_id']}'")->fetch(PDO::FETCH_ASSOC);

    // Добавляем данные в массив результата
    $res[] = array_merge($anket, $profile, $userdat);
}

// Определение количества записей в таблице
$total_rows = queryMysql("SELECT COUNT(*) FROM profileankets")->fetchColumn();

// Вычисление общего количества страниц
$total_pages = ceil($total_rows / $limit);

// Генерация HTML-кода для пагинации
$pagination = '';
if ($total_pages > 1) {
    $pagination .= '<ul class="pagination">';
    for ($i = 1; $i <= $total_pages; $i++) {
        if ($i == $page) {
            $pagination .= '<li class="page-item active"><a class="page-link" href="#">' . $i . '</a></li>';
        } else {
            $pagination .= '<li class="page-item"><a class="page-link" href="?page=' . $i . '">' . $i . '</a></li>';
        }
    }
    $pagination .= '</ul>';
}

// Выводим результаты и пагинацию на страницу
echo json_encode(array('data' => $res, 'pagination' => $pagination));

// Пагинация - это метод организации постраничного вывода больших объемов данных. 
// Если количество записей в базе данных, которые нужно вывести на страницу, достаточно велико, то их невозможно отобразить полностью на одной странице.
// В этом случае применяется пагинация: данные разбиваются на части (обычно по 10 или 20 записей), которые выводятся на нескольких страницах.

// В коде, для реализации пагинации используется цикл for, который проходит по всем страницам и формирует HTML-код для отображения ссылок на каждую страницу.

// Для этого сначала определяется общее количество страниц $total_pages, которое вычисляется из количества записей в базе данных и количества записей на одной странице. 
// Затем создается пустая строка $pagination, в которую добавляется HTML-код для отображения ссылок на каждую страницу.

// Цикл for проходит по всем страницам от 1 до $total_pages. 
// Если текущая страница соответствует номеру страницы в цикле, то ссылка на эту страницу помечается как активная (<li class="page-item active">).
// Если же текущая страница не соответствует номеру страницы в цикле, то ссылка на эту страницу формируется соответствующим образом (<li class="page-item">). НО тут уже сомнения по связи с фронтиком

// HTML-код для всех ссылок на страницы объединяется в одну строку $pagination, которая выводится на экран.

// Например, если есть 100 записей в базе данных, и нужно отобразить по 20 записей на странице, 
// то общее количество страниц будет равно 5. Пагинация позволит пользователю переключаться между этими 5 страницами и показывать по 20 записей на каждой странице.