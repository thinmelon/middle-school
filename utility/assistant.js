/**
 * 标题文字长度超过_num，滚动显示
 * @param _title
 * @param _obj
 * @param _num
 */
function showTitleForMarquee(_title, _obj, _num) {
    if (_title.length > _num) {
        _obj.innerHTML = '<marquee>' + _title + '</marquee>';
    } else {
        _obj.innerHTML = _title;
    }
}

var jsonUtils = {
    stringify: function (json) {
        var count = 0,
            jStr = '{ ';

        for (var item in json) {
            if (count++ > 0) {
                jStr += ',\'' + item + '\':\'' + json[item] + '\'';
            } else {
                jStr += '\'' + item + '\':\'' + json[item] + '\'';
            }
        }
        jStr += ' }';

        return jStr;
    },

    parse: function (jStr) {
        return eval('(' + jStr + ')');
    },

    toJson: function (data) {
        var p,
            arr = [],
            str = '';

        if (typeof data === 'object') {
            if (data instanceof Array) {
                return data.toJson();
            } else {
                for (p in data) {
                    if (typeof data[p] === 'function') break;
                    switch (typeof data[p]) {
                        case 'number':
                            str = data[p];
                            break;
                        case 'boolean':
                            str = data[p];
                            break;
                        case 'string':
                            str = '"' + data[p].replace(/"/g, '\\\"') + '"';
                            break;
                        case 'object':
                            str = data[p].toJson();
                            break;
                    }
                    arr.push(p + ':' + str);
                }
                return '{' + arr.join(', ') + '}';
            }
        } else return 'not object';
    }
};

/*----------------------------------------- URL 解析器 ---------------------------------------*/

/**
 * 解析URL
 * @returns {Array}
 */
function parseRequestUrl() {

    var _url = window.location.search;
    var _request = [];

    if (_url.indexOf('?') !== -1) {
        var _str = _url.substr(1);
        var _subStrs = _str.split('&');

        for (var i = 0; i < _subStrs.length; i++) {
            _request[_subStrs[i].split('=')[0]] = decodeURIComponent(_subStrs[i].split('=')[1]);
            // console.info("key: " + _subStrs[i].split("=")[0] + ",value:" + _subStrs[i].split("=")[1]);
        }
    }

    return _request;

}

function parseUrlPrefix() {
    var prefix = window.location.href;

    if (prefix.indexOf('?') !== -1) {
        prefix = prefix.substr(0, prefix.indexOf('?'));
    }

    return prefix;
}

/**
 *
 * @param _event
 * @returns {string}
 */
function getKeyCode(_event) {
    var keycode = _event.keyCode | _event.which,
        code = '';

    switch (keycode) {
        case 1:
        case 38: //other browsers
        case 65362: //��
        case 87:
            code = 'KEY_UP';
            break;
        case 2:
        case 40: //other browsers
        case 65364: //��
        case 83:
            code = 'KEY_DOWN';
            break;
        case 3:
        case 37: //other browsers
        case 65361: //��
        case 65:
            code = 'KEY_LEFT';
            break;
        case 4:
        case 39: //other browsers
        case 65363: //��
        case 68:
            code = 'KEY_RIGHT';
            break;
        case 13:
        case 65293: //ȷ��
            code = 'KEY_SELECT';
            break;
        //case 340:
        case 640:
        case 283:
        case 8: //other browsers
        case 27: //�ȸ���������ؼ�����ҳ�����⣬��ESC���ݴ�
        case 65367: //����
            code = 'KEY_BACK';
            break;
        //case 339:
        case 340:
            code = 'KEY_EXIT';
            break;
        case 372:
        case 25: //��ǰ��ҳ
        case 33:
        case 306:
            code = 'KEY_PAGE_UP';
            break;
        case 373:
        case 26: //���ҳ
        case 34:
        case 307:
            code = 'KEY_PAGE_DOWN';
            break;
        case 513: //right [Ctrl]
        case 65360: //�˵�
        case 72:
            code = 'KEY_MENU';
            break;
        case 595: //[+]
        case 63561: //������
        case 61:
            code = 'KEY_VOLUME_UP';
            break;
        case 596: //[-]
        case 63562: //������
        case 45:
            code = 'KEY_VOLUME_DOWN';
            break;
        case 597: //[.]
        case 63563: //����
        case 67:
            code = 'KEY_VOLUME_MUTE';
            break;
        case 32:
            code = 'KEY_F1';
            break;
        case 33:
            code = 'KEY_F2';
            break;
        case 34:
            code = 'KEY_F3';
            break;
        case 35:
            code = 'KEY_F4';
            break;
        case 49:
            code = 'KEY_NUMBER1';
            break;
        case 50:
            code = 'KEY_NUMBER2';
            break;
        case 51:
            code = 'KEY_NUMBER3';
            break;
        case 52:
            code = 'KEY_NUMBER4';
            break;
        case 53:
            code = 'KEY_NUMBER5';
            break;
        case 54:
            code = 'KEY_NUMBER6';
            break;
        case 55:
            code = 'KEY_NUMBER7';
            break;
        case 56:
            code = 'KEY_NUMBER8';
            break;
        case 57:
            code = 'KEY_NUMBER9';
            break;
        case 48:
            code = 'KEY_NUMBER0';
            break;
        case 65307:
            code = 'KEY_TRACK';
            break;
        case 36: // ϲ��
        case 76:
            code = 'KEY_FAV';
            break;
        case 72: // �ؿ�
            code = 'KEY_PALYBACK';
            break;
        case 320://red
        case 832:
            code = 'KEY_RED';
            break;
        case 321://green
        case 833:
            code = 'KEY_GREEN';
            break;
        case 322://yellow
        case 834:
            code = 'KEY_YELLOW';
            break;
        case 323: //blue
        case 835:
            code = 'KEY_BLUE';
            break;
        case 11001:
        case 10901:
            code = 'PLAY_END';
            break;
        case 5210:
        case 5209:
            code = 'IPANEL_PLAY_END';
            break;
        case 5226:
            code = 'IP_PLAY_5226';
            break;
        default:
            code = keycode;
            break;

    }
    return code;
}

/*----------------------------------------- 视频返回结果 解析器 ---------------------------------------*/
/**
 * 适用xml文件和dom文档
 * @param frag:dom对象, xml文件数据
 * @returns 返回一个可直接被引用的数据对象
 */
function parseDom(frag) {

    var i,
        j,
        tags = [],
        nodes,
        obj = {},
        childs = getChilds(frag),
        len = childs.length,
        attrs = frag.attributes;

    //document.getElementById("debug-message").innerHTML += "<br/>" + " ==>     parseDom";
    if (attrs !== null) {
        for (i = 0; i < attrs.length; i++) {
            //document.getElementById('debug-message').innerHTML += 'KEY: ' + attrs[i].nodeName + '  VALUE:  ' + attrs[i].nodeValue;
            obj[attrs[i].nodeName] = attrs[i].nodeValue;
        }
    }
    if (len === 0) {
        return obj;
    }
    else {
        for (i = 0; i < len; i++) {
            if (!inArray(childs[i].nodeName, tags)) {
                tags.push(childs[i].nodeName);
            }
        }

        for (i = 0; i < tags.length; i++) {
            nodes = getChildByTag(tags[i]);
            obj[tags[i]] = [];
            for (j = 0; j < nodes.length; j++) {
                obj[tags[i]].push(getValue(nodes[j]));
            }
        }
    }

    return obj;

    /**
     * 判断是否存在于数组
     * @param a
     * @param arr
     * @returns {boolean}
     */
    function inArray(a, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == a)
                return true;
        }
        return false;
    }

    /**
     * 获取非文本类型子节点
     * nodeType:1(元素element),2:(属性attr),3:(文本text),8:(注释comments),9:(文档documents)
     * @param node
     * @returns {Array}
     */
    function getChilds(node) {
        var c = node.childNodes;
        var a = [];
        if (c !== null) {
            for (var i = 0; i < c.length; i++) {
                if (c[i].nodeType !== 3)
                    a.push(c[i]);
            }
        }
        return a;
    }

    /**
     * 根据节点名来获取元素集合
     * @param tag
     * @returns {Array}
     */
    function getChildByTag(tag) {
        var i,
            a = [];
        for (i = 0; i < len; i++) {
            if (childs[i].nodeName === tag)
                a.push(childs[i]);
        }
        return a;
    }

    /**
     * 获取节点的文本，如果存在子节点则递归
     * @param node
     * @returns {*}
     */
    function getValue(node) {
        var i,
            c = getChilds(node),
            obj_arr = {};

        if (c.length === 0) {
            if (node.firstChild) {
                obj_arr.value = node.firstChild.nodeValue;
            }
            var attrs = node.attributes;
            if (attrs !== null) {
                for (i = 0; i < attrs.length; i++) {
                    obj_arr[attrs[i].nodeName] = attrs[i].nodeValue;
                }
            }
            return obj_arr;
        } else {
            return parseDom(node);
        }
    }
}
