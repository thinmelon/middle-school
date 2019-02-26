/**
 * 参数配置 *
 */

var cmsConfig = {
    serverUrl: 'http://10.184.255.10:8080/manage/web/',		    //  给机顶盒用的
    imgUrl: 'http://10.184.255.10:8080/manage/',
    backUrl: '',
    index_back_url: '',
    // environment: 'DEBUG',
    environment: 'PRODUCT',

    /**
     * 新时代 新征程
     */
    indexResourceIdArray: [
        {title: '新时代 新征程', resourceId: ''},
        // ---------------  菜单  ---------------  //
        {title: '专题学习', resourceId: '1221'},
        {title: '智慧党建', resourceId: '1222'},
        {title: '工作典型', resourceId: '1223'},
        // ---------------  列表  ---------------  //
        {title: '最新动态', resourceId: '1224'}
    ],

    /**
     * 教育动态
     */
    educationResourceIdArray: [
        {title: '教育动态', resourceId: ''},
        // ---------------  菜单  ---------------  //

        // ---------------  海报（播放视频）  ---------------  //
        {title: '海报图', resourceId: '1225'},

        // ---------------  列表  ---------------  //
        {title: '最新动态', resourceId: '1226'}
    ],

    /**
     * 校园文化
     */
    cultureResourceIdArray: [
        {title: '校园文化', resourceId: ''},
        // ---------------  菜单  ---------------  //
        {title: '书香校园', resourceId: '1227'},
        {title: '智慧校园', resourceId: '1228'},
        // ---------------  列表  ---------------  //
        {title: '最新动态', resourceId: '1229'}
    ],

    /**
     * 教师风采
     */
    teacherResourceIdArray: [
        {title: '教师风采', resourceId: ''},
        // ---------------  菜单  ---------------  //
        {title: '名师风采', resourceId: '1230'},
        {title: '教坛之星', resourceId: '1231'},
        // ---------------  列表  ---------------  //
        {title: '最新信息', resourceId: '1232'}
    ],


    /**
     * 名师课堂
     */
    classResourceIdArray: [
        {title: '名师课堂', resourceId: ''},

        // ---------------  菜单  ---------------  //
        {title: '教育讲坛', resourceId: '1233'},
        {title: '教研动态', resourceId: '1234'},
        {title: '培训进修', resourceId: '1235'},
        // ---------------  列表  ---------------  //
        {title: '最新动态', resourceId: '1246'}
    ],

    /**
     * 学生舞台
     */
    studentResourceIdArray: [
        {title: '学生舞台', resourceId: ''},

        // ---------------  菜单  ---------------  //

        // ---------------  海报（播放视频）  ---------------  //
        {title: '海报图', resourceId: '1237'},
        // ---------------  列表  ---------------  //
        {title: '文化旅游', resourceId: '1238'}
    ],

    /**
     * 特色校园
     */
    campusResourceIdArray: [
        {title: '专题专栏', resourceId: ''},
        // ---------------  海报（播放视频）  ---------------  //
        {title: '海报图', resourceId: '1239'},
        // ---------------  列表  ---------------  //
        {title: '最新动态', resourceId: '1240'}
    ],

    /**
     *  教育服务
     */
    serviceResourceIdArray: [
        {title: '教育服务', resourceId: ''},

        // ---------------  菜单  ---------------  //
        {title: '中考中招', resourceId: '1241'},
        {title: '高考高招', resourceId: '1242'},
        {title: '学生资助', resourceId: '1243'},
        {title: '社会实践', resourceId: '1244'},

        // ---------------  列表  ---------------  //
        {title: '最新动态', resourceId: '1245'}
    ],

    operator: '',
    weather: '',
    temperature: '',
    windScale: ''
};