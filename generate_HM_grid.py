default = r'<div class="{classes}" id="{id}"><div></div></div>'


with open('HMChild.txt', 'w') as f:
    for i in range(1, 101, 1):
        to_add = []
        if i < 11:
            to_add.append('topEdge')
        if i % 10 == 1:
            to_add.append('leftEdge')
        if i % 10 == 0:
            to_add.append('rightEdge')
        if i > 90:
            to_add.append('bottomEdge')

        if (i < 11 and (i % 10 == 1)):
            to_add.append('topLeft')
        if (i < 11 and (i % 10 == 0)):
            to_add.append('topRight')
        if (i > 90 and (i % 10 == 1)):
            to_add.append('bottomLeft')
        if (i > 90 and (i % 10 == 0)):
            to_add.append('bottomRight')


        f.write(
            default.format(classes = f"SPCHild {" ".join(to_add)}", id=f"SP{i}") + '\n          '
        )
