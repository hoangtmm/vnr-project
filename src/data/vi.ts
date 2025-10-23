export const site = {
  title: 'Tổ chức & hoạt động tình báo (Hậu chiến)',
  slogan: 'Bảo vệ thành quả cách mạng, củng cố đất nước bằng trí tuệ và kỷ luật',
};

export const nav = [
  { path: '/', label: 'Trang chủ' },
    { path: '/story', label: 'Hành trình' }, // thêm dòng này
  { path: '/overview', label: 'Tổng quan' },
  { path: '/organization', label: 'Tổ chức' },
  { path: '/operations', label: 'Hoạt động' },
  { path: '/case-studies', label: 'Tình huống' },
  { path: '/figures', label: 'Nhân vật' },
  { path: '/documents', label: 'Tư liệu' },
  { path: '/about', label: 'Giới thiệu' },
];

export const timeline = [
  { year: '1975–1978', title: 'Ổn định an ninh', desc: 'Thiết lập bộ máy, rà soát mạng lưới, ưu tiên giữ vững trật tự xã hội.' },
  { year: '1979–1989', title: 'Bảo vệ biên giới', desc: 'Ứng phó thách thức khu vực, tiêu chuẩn hoá quy trình phản gián.' },
  { year: '1990–2005', title: 'Hội nhập & chuyển đổi', desc: 'Mở rộng hợp tác quốc tế, chuyên nghiệp hóa phân tích chiến lược.' },
  { year: '2006–nay', title: 'Số hoá tình báo', desc: 'An ninh mạng, mật mã, phân tích dữ liệu lớn, tự động hoá quy trình.' },
];

export const tags = ['Tổ chức', 'Nghiệp vụ', 'Pháp lý', 'Hợp tác', 'An ninh mạng'];

export const cards = [
  { id: 'org-model', title: 'Mô hình tổ chức', excerpt: 'Cấu trúc chỉ huy, phòng ban, phối hợp liên ngành.', tags: ['Tổ chức'] },
  { id: 'op-methods', title: 'Phương thức hoạt động', excerpt: 'Chu trình thu thập–phân tích–báo cáo, phản gián, bảo mật.', tags: ['Nghiệp vụ'] },
  { id: 'legal', title: 'Khung pháp lý', excerpt: 'Nguyên tắc lãnh đạo, pháp luật, chuẩn đạo đức.', tags: ['Pháp lý'] },
  { id: 'intl', title: 'Hợp tác quốc tế', excerpt: 'Cơ chế chia sẻ thông tin, điều ước, kênh phối hợp.', tags: ['Hợp tác'] },
  { id: 'cyber', title: 'An ninh mạng', excerpt: 'Bảo vệ hạ tầng số, SIGINT/OSINT, ứng phó sự cố.', tags: ['An ninh mạng'] },
];

/** Nội dung chi tiết cho các trang */
export const objectives = [
  'Bảo vệ độc lập, chủ quyền, toàn vẹn lãnh thổ.',
  'Giữ vững ổn định chính trị, trật tự an toàn xã hội.',
  'Hỗ trợ hoạch định chính sách đối nội/đối ngoại/kinh tế–quốc phòng.',
  'Phòng ngừa, phát hiện, vô hiệu hoá đe doạ: gián điệp, phá hoại, khủng bố, tội phạm có tổ chức.',
  'Xây dựng lực lượng tình báo chính quy, tinh nhuệ, hiện đại.',
];

export const principles = [
  'Sự lãnh đạo của Đảng, quản lý thống nhất của Nhà nước, thượng tôn pháp luật.',
  'Bí mật – chính xác – kịp thời – hiệu quả.',
  'Kết hợp công khai/bí mật; “phòng là chính, chống phải đúng”.',
  'Dựa vào dân, vì dân; tôn trọng quyền con người theo pháp luật.',
  'Hợp tác quốc tế bình đẳng, tuân thủ điều ước và pháp luật.',
];

export const orgStructure = [
  {
    title: 'Cấp chiến lược',
    points: [
      'Định hướng chiến lược, mục tiêu, chính sách và phân bổ nguồn lực.',
      'Kiểm soát rủi ro, phê duyệt kế hoạch nghiệp vụ trọng yếu.',
    ],
  },
  {
    title: 'Khối nghiệp vụ',
    points: [
      'Phản gián; tình báo đối ngoại; phân tích–đánh giá chiến lược.',
      'Kỹ thuật nghiệp vụ: SIGINT/IMINT/OSINT; mật mã; bảo mật.',
    ],
  },
  {
    title: 'Bảo đảm & đào tạo',
    points: [
      'Hậu cần–kỹ thuật, tài chính, tư pháp nội bộ, chuẩn đạo đức.',
      'Đào tạo cán bộ, chuẩn năng lực, diễn tập định kỳ.',
    ],
  },
  {
    title: 'Phối hợp liên ngành',
    points: [
      'Công an, Quân đội, Ngoại giao, Hải quan, Biên phòng, Tài chính.',
      'Quy chế chia sẻ thông tin & điều phối chiến dịch.',
    ],
  },
  {
    title: 'Giám sát & kỷ luật',
    points: [
      'Cơ chế kiểm tra nội bộ nhiều tầng, nhật ký nghiệp vụ chuẩn hoá.',
      'Chế tài sai phạm; bảo vệ người tố cáo trong nội bộ.',
    ],
  },
];

export const opsDetails = [
  {
    title: 'Thu thập & sàng lọc',
    bullets: [
      'Tổ chức nguồn tin người và kỹ thuật; kiểm chứng đa nguồn.',
      'Phân loại độ mật, mức độ tin cậy; ghi nhật ký nghiệp vụ.',
    ],
  },
  {
    title: 'Phân tích & cảnh báo',
    bullets: [
      'Phân tích xu hướng, mô hình; xây dựng kịch bản rủi ro.',
      'Cảnh báo sớm cho lãnh đạo; khuyến nghị chính sách.',
    ],
  },
  {
    title: 'Phản gián & bảo vệ',
    bullets: [
      'Bảo vệ mục tiêu trọng yếu; phát hiện xâm nhập, cài cắm.',
      'Nghiệp vụ bẫy, lật; vô hiệu hoá mạng lưới đe doạ.',
    ],
  },
  {
    title: 'An ninh mạng',
    bullets: [
      'Bảo vệ hạ tầng; giám sát tín hiệu; ứng phó sự cố.',
      'Mật mã, phân vùng quyền truy cập, kiểm thử xâm nhập.',
    ],
  },
  {
    title: 'Hợp tác quốc tế',
    bullets: [
      'Kênh song/phương đa phương; chia sẻ theo điều ước.',
      'Diễn tập chung; chuẩn dữ liệu trao đổi.',
    ],
  },
];

export const caseStudies = [
  {
    id: 'cs-border-82',
    year: '1982',
    title: 'Phát hiện tuyến thu thập qua biên giới',
    context: 'Tăng cường vận chuyển bất hợp pháp và truyền tin qua biên giới.',
    action: 'Lập tổ liên ngành; nghiệp vụ bẫy trên tuyến hậu cần; đối sánh tín hiệu.',
    outcome: 'Vô hiệu hoá 3 điểm trung chuyển; thu giữ thiết bị mã hoá tự chế.',
    lesson: 'Kết hợp người–kỹ thuật và chia sẻ liên ngành rút ngắn thời gian xử lý.',
    lat: 21.0278,  // Hà Nội (ví dụ đặt làm điểm tham chiếu khu vực)
    lng: 105.8342,
  },
  {
    id: 'cs-econ-94',
    year: '1994',
    title: 'Bảo vệ đàm phán kinh tế trọng điểm',
    context: 'Đàm phán mở cửa thị trường, nguy cơ rò rỉ hồ sơ.',
    action: 'Phân tầng truy cập, thiết bị kiểm soát tín hiệu, “tài liệu mồi” xác thực nguồn.',
    outcome: 'Ngăn chặn rò rỉ; nâng cấp quy trình phân loại và theo dõi tài liệu.',
    lesson: 'Quản trị số hoá + quy chế truy cập là then chốt trong đàm phán nhạy cảm.',
    lat: 10.7769,  // TP.HCM
    lng: 106.7009,
  },
  {
    id: 'cs-cyber-17',
    year: '2017',
    title: 'Ứng phó tấn công có chủ đích (APT)',
    context: 'Chuỗi xâm nhập APT vào hạ tầng công vụ.',
    action: 'Cô lập vùng; săn lùng IOC; phối hợp quốc tế chia sẻ dấu hiệu tấn công.',
    outcome: 'Loại bỏ backdoor, bịt lỗ hổng chuỗi cung ứng; cập nhật baseline an ninh.',
    lesson: 'Giám sát liên tục + diễn tập định kỳ giúp giảm thiểu tổn thất.',
    lat: 16.0471,  // Đà Nẵng
    lng: 108.2060,
  },
];


export const figures = [
  {
    code: 'Đ/c A',
    period: '1976–1988',
    role: 'Chỉ huy tuyến phản gián',
    contribution: 'Tái cấu trúc quy trình kiểm chứng nguồn; xây mô hình đánh giá độ tin cậy.',
  },
  {
    code: 'Đ/c B',
    period: '1991–2003',
    role: 'Phân tích chiến lược',
    contribution: 'Thiết lập cơ chế cảnh báo sớm đa lĩnh vực; chuẩn hoá brief lãnh đạo.',
  },
  {
    code: 'Đ/c C',
    period: '2008–nay',
    role: 'An ninh mạng',
    contribution: 'Xây baseline Zero-Trust và chương trình săn mối đe doạ (Threat Hunting).',
  },
];

export const resources = [
  { id: 'doc-cycle', title: 'Chu trình phân tích tình báo', type: 'Quy trình', tags: ['Nghiệp vụ'], summary: 'Thu thập → sàng lọc → phân tích → báo cáo → phản hồi.' },
  { id: 'doc-legal', title: 'Nguyên tắc pháp lý & đạo đức', type: 'Chuẩn tắc', tags: ['Pháp lý'], summary: 'Thượng tôn pháp luật; quyền con người; giám sát & kỷ luật nội bộ.' },
  { id: 'doc-ci', title: 'Sổ tay phản gián', type: 'Cẩm nang', tags: ['Nghiệp vụ'], summary: 'Nhận diện xâm nhập; bẫy; quy trình khẩn cấp bảo vệ mục tiêu.' },
  { id: 'doc-cyber', title: 'Baseline an ninh mạng cơ quan', type: 'Tiêu chuẩn', tags: ['An ninh mạng'], summary: 'Phân vùng; quản lý khoá; giám sát tín hiệu; diễn tập sự cố.' },
  { id: 'doc-source', title: 'Quy tắc làm việc với nguồn tin', type: 'Quy tắc', tags: ['Nghiệp vụ'], summary: 'Bảo mật danh tính; đánh giá động cơ; chống thao túng.' },
  { id: 'doc-class', title: 'Phân loại & kiểm soát truy cập', type: 'Chính sách', tags: ['Pháp lý'], summary: 'Nhãn, thời hạn mật, ghi vết truy cập; quy trình giải mật.' },
  { id: 'doc-interop', title: 'Phối hợp liên ngành', type: 'Quy chế', tags: ['Hợp tác'], summary: 'Chuẩn dữ liệu, giao thức chia sẻ, kênh liên lạc an toàn.' },
  { id: 'doc-train', title: 'Khung đào tạo cán bộ', type: 'Chương trình', tags: ['Nghiệp vụ'], summary: 'Năng lực cốt lõi, đạo đức, kỹ thuật hiện đại, diễn tập.' },
  { id: 'doc-brief', title: 'Mẫu báo cáo/brief lãnh đạo', type: 'Biểu mẫu', tags: ['Nghiệp vụ'], summary: 'Cấu trúc kết luận–bằng chứng–khuyến nghị; mức độ tin cậy.' },
  { id: 'doc-crisis', title: 'Sổ tay ứng phó khủng hoảng', type: 'Quy trình', tags: ['Hợp tác'], summary: 'Kích hoạt ICS, thông tin công chúng, phối hợp quốc tế.' },
];
