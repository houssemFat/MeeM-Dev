var locale = (function() {
    var lang = {};
    lang.extend = function() {
        for (var index in arguments) {
            var obj = arguments[index];
            for (var key in obj) {
                this[key] = obj[key];
            };
        }

    };
    var welcome = {
        'The idea' : 'الفكرة',
        'Features' : 'الميزات',
        'Servicces' : 'الخدمات',
    };

    var messages = {
        '404 not found' : 'خطا في الصفحة',
        'Sorry, an error has occured, Requested page not found!' : 'اسف هذه الصفحة غير موجودة',
        'Take Me Home' : 'الرئيسية',
        'Contact Us' : 'اتصل بنا',
    };
    
    lang.extend(messages);
    var general = {
        'add' : 'إضافة',
        'View' : '',
        'manage' : 'إدارة',
        'Welcome!' : 'مرحبا!',
        'Close' : 'غلق',
        'Save' : 'حفظ',
        'Send' : 'إرسال',
        'Cancel' : 'إلغاء',
        'invite' : 'دعوة',
        'Next' : 'التالي',
        'Colors' : 'الألوان',
        'quick search' : 'بحث سريع',
    };
    lang.extend(general);

    lang.extend({
        /* account */
        "register" : "إنشاء حساب",
        "try again" : "حاول مرة أخرى",
        "saveCourse" : "التحق بالدرس",
        "Enter" : "دخول",
        "course_login_required" : "Please log in to access to this course ",
        /* common */
        "an error has occurred, try again" : "لقد حدث خطأ، حاول مرة أخرى",
        /* nots */
        "Theses fields are required" : "يرجى ملء هذه الحقول",
    });
    lang.extend(errors);
    /** errors */
    var errors = {/* teacher course lab */
        "error_field_empty" : ".هذا الحقل \'1%\' ليس فارغا",
        "error_field_length" : "الحقل \"1%\" يجب أن يحتوي على ما لا يقل عن \'2%\' أحرف",
        "error_date" : "يرجى تحديد تاريخ صالح",
        "error_date_comp" : "يجب أن يكون تاريخ البدء أكبر من تاريخ الانتهاء",
        "minimum_day_before_task" : "يجب إنشاء المهمة قبل 4 أيام",
        "Course edit" : 'تعديل الدرس',
        "Title" : "العنوان",
        "about" : "معلومات",
        "start" : "بداية الدورة",
        "end" : "نهاية الدورة",
        "update" : 'تعديل',
        "the course *1* has been successfully saved" : "تم حفظ الدرس *1* بنجاح",
        "beta" : "تحميل"
    };
    lang.extend(errors);
    // inbox
    var menu = {
        'Content' : 'المحتوى',
        'Work' : 'العمل',
        'Discussion' : 'مناقشة',
        'Tools' : 'أدوات',
        "General" : "فكرة عامة",
        "media" : "فيديو",
        "Documents" : "وثائق",
        "Tools" : "أدوات",
        "Statistics" : "إحصائيات",
        "Forum" : "المنتدى",
        "Students" : "الطلاب",
    };
    lang.extend(menu);

    var statistics = {
        'statistics' : 'إحصائيات'
    };
    lang.extend(statistics);

    // inbox
    var inbox = {
        'inbox' : 'البريد',
        'compose' : 'إنشاء',
        'sent' : 'أرسلت',
        'received' : 'تلقى' ,
    };
    lang.extend(inbox);
    
    return lang;
}).call();
var dashboard = {
    'dashboard' : 'الرئيسية',

};
var lists = {
    'List of' : 'قائمة',
    'list is empty' : 'قائمة فارغة',
    'Total' : 'إجمالي',
};
// inbox
var courses = {
    'Courses' : 'الدروس',
    'last update' : 'اخر تحديث',
    'social media links' : 'وصلات وسائل الاعلام الاجتماعية',
    
};
// inbox
var chapters = {
    'Chapters' : 'الفصول',
    'last update' : 'اخر تحديث',
};
// collaborators
var collaborators = {
    'teams' : 'فرق',
    'members' : 'أعضاء',
    'calendar' : 'جدول',
    'progress' : 'التقدم',
    'staff' : 'طاقم العمل'
};
// video
var videos = {
    'Media' : 'فيديو',
    'Title' : 'العنوان',
    'Description' : 'الوصف',
    'Source url' : 'رابط المصدر',
    'Files' : 'ملفات',
    'Video' : 'فيديو',
    'Scenario' : 'السيناريو',
    'Videos' : 'أشرطة الفيديو',
    "please specify a link to your video" : "يرجى تحديد رابط للفيديو الخاص بك",
    "use a third party" : "استخدام خادم مخصص",
    "video's content respect the policy" : "الروابط والمحتوى يجب أن تتوافق مع شروط الاستخدام",
    "Due to number of access, our storage video is limited  to 20 Mega byte for teaser and all other videos are stored in special servers" : "نظرا لعدد من الوصول، لدينا شريط فيديو التخزين يقتصر على 20 ميجا بايت س للدعابة ويتم تخزين جميع مقاطع الفيديو في الخوادم الخاصة",
    "upload the video" : "تحميل الفيديو",
    "upload" : "تحميل",
};
// peers
var peers = {
    'Peers' : 'تصليح الاقران',
};

// tasks
var tasks = {
    "Tasks" : "المهام",
    "task" : "المهمة",
};
// quizzes
var quizzes = {
    'Text' : 'السؤال',
    'Explanation' : 'توضيح',
    'Max Attempts' : 'محاولات كحد أقصى',
    'Note' : 'علامة',
    'Quiz type' : 'نوع الاختبار',
    'Multiple' : 'متعدد',
    'Unique' : 'واحد',
    'Unique + Choices' : 'إضافة محاولة الذاتي',
    'Choices' : 'الخيارات',
    'Quiz' : 'اختبار',
    'Quizzes' : 'إمتحانات موجزة',
    'new exam' : 'امتحان جديد'
};

// classroom
var classroom = {
    'Try searching for students or send invitation it by email' : 'حاول البحث عن الطلاب أو إرسال دعوة عن طريق البريد الإلكتروني',
    'invite students' : 'دعوة الطلاب',
    'send invitations' : 'إرسال',
    'Message' : 'الرسالة',
    'add email' : 'إضافة البريد الإلكتروني',
    "I'm currently giving a free course and i'm happy to send you an invitation to join this course (*1*)!" : "!(*1*) أنا أقدم حاليا في دورة مجانية وأنا سعيد لنرسل لك دعوة للانضمام إلى هذه الدورة",
};
// documents
var documents = {
    'add file' : 'ض',
};

// comments
var comments = {
    'Comments' : 'تعليقات',
    'new comment' : 'تعليق جديد',
};

// statistics
var statistics = {
    'Statistics' : 'احصائىات',
    'weekly' : 'اسبوعي',
    'monthly' : 'شهري',
    'daily' : 'يومى',
};

// Syllabus
var syllabus = {
    'Syllabus' : 'المنهج',
    'Chapter' : '',
    'The step' : 'الباب',
    
};

// statistics
var tours = {
    'discover' : 'اكتشف',
    'tour.dashboard' : '! هذه هي الصفحة الرئيسية، ويحتوي على كل المعلومات الجديدة عن الدورات والفصل والطلاب والمتعاونين.',
    'tour.courses' : 'الفصول، وأشرطة الفيديو، وتعيين، والطلاب، والمهام، ومسابقات والإحصاءات وأكثر من ذلك.',
    'tour.inbox' : 'هذا هو صندوق البريد الوارد، ويحتوي على كل ما تبذلونه من الرسائل المرسلة والمستلمة والخاصة والعامة، يمكنك البقاء على اتصال مع الموظفين والطلاب دورتك.',
    'tour.collaborators' : 'التعاون هو المفتاح الرئيسي لنجاح العمل. مع ميم العمل في دورة مع المهام الأخرى، والجماعات، وتحديد المهام والملاحظات يمكن القيام به بسهولة.'
};

var settings = {
    'Settings' : 'الإعدادات',
    'general' : 'عام',
    'emails' : 'البريد الإلكتروني',
    'password' : 'كلمة السر',
    'notifications' :'التنبيهات',
    'accounts' : 'الحسابات',
    'accounts' : 'الحسابات',
    'pro services' : 'خدمات متطورة',
    'Country' : 'البلد',
    'City' : 'المدينة',
    'Region' : 'المنطقة',
    'Postcode' : 'الرمز البريدي',
    'FullAddress' : 'العنوان الكامل',
    
};
var scheduler = {
    'scheduler' : 'جدول العمل'
};

locale.extend(courses, chapters, 
        collaborators, videos, documents, quizzes, comments, peers, tasks, statistics, syllabus, classroom, lists, tours, dashboard, scheduler);
locale.extend(settings);
// attach global variable
__CONFIG__.Tr = locale;