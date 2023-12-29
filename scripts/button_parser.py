#  реализована функция, на вход которой подаётся пост, на выходе массив вида [<текст поста без кнопок>, <массив кнопок>]
#  кнопки в тексте поста выделены в []
def parser(post: str) -> [str, [str]]:
    post = post.split('[')
    text = post[0].strip()
    buttons = []
    for i in range(1, len(post)):
        string = post[i].split(']')
        text += " " + string[1].strip()
        buttons.append(string[0])
    text = text.strip()
    return [text, buttons]
