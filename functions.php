<?php
function tank_scripts_styles()
{
    if (is_single()) {


        wp_enqueue_style('single', get_template_directory_uri() . '/assets/css/single.css',
            array(),
            null
            , false);


        wp_enqueue_script('news',
            get_template_directory_uri() . '/assets/js/news.js',
            array(),
            null
            , false);

        wp_enqueue_script('to-events',
            get_template_directory_uri() . '/assets/js/to-events.js',
            array(),
            null
            , [
                'in_footer' => true,
                'strategy' => 'async',
            ]);

    }


    wp_enqueue_style('foobox-free-min',
        get_template_directory_uri() . '/assets/css/foobox.free.min.css',
        array(),
        null
        , false);


    wp_enqueue_style('footer',
        get_template_directory_uri() . '/assets/css/footer.css',
        array(),
        null
        , false);

    wp_enqueue_style('header',
        get_template_directory_uri() . '/assets/css/header.css',
        array(),
        null
        , false);

    wp_enqueue_style('news-list',
        get_template_directory_uri() . '/assets/css/news-list.css',
        array(),
        null
        , false);

    wp_enqueue_style('style',
        get_template_directory_uri() . '/assets/css/style.css',
        array(),
        null
        , false);
    wp_enqueue_style('style-min',
        get_template_directory_uri() . '/assets/css/style.min.css',
        array(),
        null
        , false);
    wp_enqueue_style('style-blocks',
        get_template_directory_uri() . '/assets/css/style-blocks.css',
        array(),
        null
        , false);


    if (!is_admin()) {
        wp_deregister_script('jquery');
        wp_register_script('jquery', ('http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'), false, null, true);
        wp_enqueue_script('jquery');
    }

    wp_enqueue_script('jquery-migrate',
        get_template_directory_uri() . '/assets/js/jquery-migrate.min.js',
        array('jquery'),
        null
        , false);
    wp_enqueue_script('foobox-free-min',
        get_template_directory_uri() . '/assets/js/foobox.free.min.js',
        array('jquery'),
        null
        , false);
    wp_register_script('swiper', 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js');
    wp_enqueue_script('swiper');


    wp_register_style('swiper', 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css');
    wp_enqueue_style('swiper');

    wp_register_style('font', 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap');
    wp_enqueue_style('font');
    wp_register_script('swiper', 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js');
    wp_enqueue_script('swiper');

    wp_register_script('js-cookie', 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.2/js.cookie.min.js');
    wp_enqueue_script('js-cookie');


    wp_enqueue_script('int-cookie',
        get_template_directory_uri() . '/assets/js/int-cookie.js',
        array(),
        null
        , true);

    wp_enqueue_script('blocks',
        get_template_directory_uri() . '/assets/js/blocks.js',
        array(),
        null
        , [
            'in_footer' => true,
            'strategy' => 'async',
        ]);


    wp_enqueue_script('news-slider',
        get_template_directory_uri() . '/assets/js/news-slider.js',
        array(),
        null
        , [
            'in_footer' => true,
            'strategy' => 'async',
        ]);


    wp_enqueue_script('countdown',
        get_template_directory_uri() . '/assets/js/countdown.js',
        array(),
        null
        , [
            'in_footer' => true,
            'strategy' => 'async',
        ]);


    wp_enqueue_script('header-news',
        get_template_directory_uri() . '/assets/js/header-news.js',
        array(),
        null
        , [
            'in_footer' => true,
            'strategy' => 'async',
        ]);

    wp_enqueue_script('main',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        null
        , [
            'in_footer' => true,
            'strategy' => 'async',
        ]);

    wp_enqueue_script('news-page',
        get_template_directory_uri() . '/assets/js/news-page.js',
        array('main'),
        null
        , [
            'in_footer' => true,
            'strategy' => 'async',
        ]);

    wp_enqueue_script('support-form',
        get_template_directory_uri() . '/assets/js/support-form.js',
        array(),
        null
        , [
            'in_footer' => true,
            'strategy' => 'async',
        ]);

}

add_action('wp_enqueue_scripts', 'tank_scripts_styles');


function tank_setup()
{

    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('post-formats', array('image', 'video'));

}

add_action('after_setup_theme', 'tank_setup');


function tank_custom_init()
{
    register_post_type('article', array(
        'labels' => array(
            'name' => 'Стати',
            'singular_name' => 'Статья',
            'all_items' => 'Все статьи',
        ),
        'public' => true,
        'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'page-attributes', 'post-formats'),
        'show_in_rest' => true,
        'menu_position' => 2,

        // добавит поддержку меток к custom post type
        'taxonomies' => array('post_tag', 'category'),
        'menu_icon' => 'dashicons-book',
    ));
}

add_action('init', 'tank_custom_init');
function russian_date($tdate = '')
{
    if (substr_count($tdate, '---') > 0) return str_replace('---', '', $tdate);

    $treplace = array(
        "Январь" => "января",
        "Февраль" => "февраля",
        "Март" => "марта",
        "Апрель" => "апреля",
        "Май" => "мая",
        "Июнь" => "июня",
        "Июль" => "июля",
        "Август" => "августа",
        "Сентябрь" => "сентября",
        "Октябрь" => "октября",
        "Ноябрь" => "ноября",
        "Декабрь" => "декабря",

        "January" => "января",
        "February" => "февраля",
        "March" => "марта",
        "April" => "апреля",
        "May" => "мая",
        "June" => "июня",
        "July" => "июля",
        "August" => "августа",
        "September" => "сентября",
        "October" => "октября",
        "November" => "ноября",
        "December" => "декабря",

        "Sunday" => "воскресенье",
        "Monday" => "понедельник",
        "Tuesday" => "вторник",
        "Wednesday" => "среда",
        "Thursday" => "четверг",
        "Friday" => "пятница",
        "Saturday" => "суббота",

        "Sun" => "вос.",
        "Mon" => "пон.",
        "Tue" => "вт.",
        "Wed" => "ср.",
        "Thu" => "чет.",
        "Fri" => "пят.",
        "Sat" => "суб.",

        "th" => "",
        "st" => "",
        "nd" => "",
        "rd" => ""
    );
    return strtr($tdate, $treplace);
}

add_filter('get_post_time', 'russian_date');
add_filter('get_post_modified_time', 'russian_date');
add_filter('get_the_modified_time', 'russian_date');
add_filter('get_the_modified_date', 'russian_date');
add_filter('get_comment_date', 'russian_date');
add_filter('get_comment_time', 'russian_date');
add_filter('get_the_date', 'russian_date');
add_filter('get_the_time', 'russian_date');


add_action('wp_ajax_nopriv_ba_ajax_search', 'tank_search');

add_action('wp_ajax_ba_ajax_search', 'tank_search');


function tank_search()
{
    $main_post_s = $_POST['term'];
    $order = $_POST['type_post_date'];
    $tag = $_POST['type_post'];
    if ($tag === 'general') {
        $tag = null;
    }
    $args = array(
        'post_type' => 'article',
        'tag' => $tag,
        's' => $main_post_s,
        'orderby' => 'post_date',
        'order' => $order,
    );
    $query = new WP_Query;
    $my_posts = $query->query($args);

    $html = '';

    foreach ($my_posts as $key => $value) {
        $tags = wp_get_post_tags($value->ID);
        if ($tags) {
            $t = '';
            foreach ($tags as $tag) {
                if ($tag->name == "all") {
                    $answer = 'ВСЕ';
                } elseif ($tag->name == 'event') {
                    $answer = 'СОБЫТИЕ';
                } elseif ($tag->name == 'video') {
                    $answer = 'ВИДЕО';
                } elseif ($tag->name == 'general') {
                    $answer = 'ОБЩИЕ';
                } elseif ($tag->name == 'common-questions') {
                    $answer = 'FAQ';
                } else {
                    $answer = $tag->name;
                }
                $t .= "<div class='tag'>" .
                    $answer. "</div>";
            }
        }
        $html .= "<div class='result_item clear'>
    <div class='search-item-block'>
        <div class='date-tag-wrapper'>
            <div class='search-item-date'>" . get_the_date('n F, Y', $value->ID) . "</div>
          " . $t . "
        </div>
                    <a class='href-search' href=" . the_post_thumbnail_url('full') . " >
                <div class='search-item-title'>" . $value->post_title . "</div>
            </a>
                <div class='search-item-desc'><p>" . $value->post_excerpt . "</p>
</div>";
    }


    echo $html;
    wp_die();

}