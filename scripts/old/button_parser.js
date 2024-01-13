//  реализована функция, на вход которой подаётся пост, на выходе массив вида [<текст поста без кнопок>, <массив кнопок>]
//  кнопки в тексте поста выделены в []
function parser (post) {
    post = post.split('[');
    text = post[0].trim();
    buttons = [];
    for (let i = 1; i < post.length; i++) {
        string = post[i].split(']');
        text += ' ' + string[1].trim();
        buttons.push(string[0]);
    }
    text = text.trim();
    return [text, buttons];
}
