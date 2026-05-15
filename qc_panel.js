// QC Panel Logic - qc_panel.js v2.8.0
// MV3 CSP-compatible (no inline handlers)

// ── SVG Icons ──
const QC_ICONS = {
  list: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  headphones: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
  download: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  import: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="18"/><line x1="15" y1="15" x2="12" y2="18"/></svg>`,
  folder: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  refresh: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  palette: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0 0 18h1.2a2.3 2.3 0 0 0 0-4.6H12a2.4 2.4 0 0 1 0-4.8h1.8A4.2 4.2 0 0 0 18 7.4 4.4 4.4 0 0 0 13.6 3H12Z"/><circle cx="6.5" cy="11.5" r="1"/><circle cx="9.5" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/><circle cx="17.5" cy="11.5" r="1"/></svg>`,
  save: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13"/><polyline points="7 3 7 8 15 8"/></svg>`,
  search: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  alert: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  note: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  play: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  undo: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>`,
  user: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  building: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18"/><path d="M9 3v18"/><path d="M6 7h1"/><path d="M6 11h1"/><path d="M12 7h1"/><path d="M17 7h1"/></svg>`,
  clock: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  check: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevron: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  bar_chart: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  calendar: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:3px"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  lock: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
};

// type: 'yn'   → Y(pts) / N(0)
// type: 'ynp'  → Y(pts) / P1(pts*0.5) / N(0)
// type: 'ynpp' → Y / P1(partial1) / P2(partial2) / N(0)
// type: 'yna'  → Y(pts) / N(0) / NA(không tính vào maxTotal)
// ── Multi-group Scorecard Registry ──
// type: 'yn'   → Y(pts) / N(0)
// type: 'ynp'  → Y(pts) / P1(partial or pts*0.5) / N(0)
// type: 'ynpp' → Y / P1(partial1) / P2(partial2) / N(0)
// type: 'yna'  → Y(pts) / N(0) / NA(tính như Y)

// Shared criteria templates to reduce duplication
var _VOICE_CRITERIA = [
  {
    group: '1. HEART TOUCHING – Mở lòng đón, Chạm trái tim', items: [
      { id: 'h1_1', name: '1.1 Chào mở đầu', pts: 5, type: 'yn',
        tooltips: { Y: "- Sử dụng câu chào chuẩn\n- Thái độ thân thiện, niềm nở", N: "- Không dùng câu chào chuẩn\n- Chào với giọng điệu uể oải, mệt mỏi" } }
    ]
  },
  {
    group: '2. EMPATHY – Nghe từ tâm, Hiểu thấu cảm', items: [
      { id: 'h2_1', name: '2.1 Lắng nghe', pts: 10, type: 'ynp',
        tooltips: { Y: "- Lắng nghe và tiếp nhận chính xác thông tin KH cung cấp.\n- Nhận biết và thể hiện sự kết nối phù hợp với tình huống, cảm xúc của KH.\n- Kiên nhẫn, tạo cơ hội cho KH bày tỏ, chia sẻ", P1: "- Thiếu kiên nhẫn: ngắt lời không phù hợp (1 lần)", N: "- Hỏi lại thông tin KH đã cung cấp hoặc thiếu tập trung.\n- Không kết nối cảm xúc phù hợp.\n- Thiếu kiên nhẫn: ngắt lời từ 2 lần" } },
      { id: 'h2_2', name: '2.2 Ngôn Từ', pts: 10, type: 'ynp',
        tooltips: { Y: "- Sử dụng từ ngữ tích cực, đơn giản, dễ hiểu.\n- Khéo léo dẫn dắt, khuyến khích KH thực hiện theo các bước đề xuất.", P1: "- Lặp từ không cần thiết\n- Không có kính ngữ, câu từ mang tính ra lệnh (1 lần)", N: "- Dùng từ ngữ tiêu cực.\n- Yêu cầu KH thực hiện mà không giải thích lý do.\n- Không có kính ngữ, ra lệnh (từ lần 2)" } },
      { id: 'h2_3', name: '2.3 Ngữ Điệu & Giọng nói', pts: 10, type: 'ynp',
        tooltips: { Y: "- Giọng nói chân thành, ấm áp\n- Ngữ điệu nhẹ nhàng, mềm mỏng.\n- Phát âm rõ ràng, dễ nghe\n- Tốc độ vừa phải, ngắt nghỉ phù hợp", P1: "- Nói quá nhanh/chậm, ngắt nghỉ chưa phù hợp\n- Phát âm không rõ, nói khó nghe", N: "- Ngữ điệu đều đều, cứng nhắc.\n- Nhấn giọng không phù hợp ngữ cảnh." } },
      { id: 'h2_4', name: '2.4 Gọi tên khách hàng', pts: 2, type: 'yn',
        tooltips: { Y: "- Gọi tên KH ít nhất 2 lần, danh xưng phù hợp.", N: "- Không gọi tên KH phù hợp hoặc danh xưng không phù hợp." } }
    ]
  },
  {
    group: '3. ATTENTIVE ACTIONS – Vững đồng hành, Giúp tận tâm', items: [
      { id: 'h3_1', name: '3.1 Quản lý cuộc gọi', pts: 10, type: 'ynp',
        tooltips: { Y: "- Chủ động tư vấn, giải thích tận tâm\n- Đặt câu hỏi chính xác, thu thập thông tin cần thiết\n- Tư vấn ngắn gọn, rõ ràng, súc tích.\n- Xử lý linh hoạt, kiểm soát tình huống hiệu quả.\n- Thao tác hệ thống nhanh, lịch sự khi yêu cầu KH chờ\n- Kiểm tra lại với KH để đảm bảo đã hỗ trợ.", P1: "- Để tạp âm trong cuộc gọi.\n- Để khoảng lặng từ 6s 1 lần hoặc từ 4s quá 2 lần.\n- Không xin phép/cảm ơn khi yêu cầu KH chờ\n- Chưa chuyển nhạc chờ khi hướng dẫn KH chờ\n- Chờ máy quá 60 giây không tương tác lại", N: "- Thụ động tư vấn, chỉ hỗ trợ khi KH hỏi.\n- Tư vấn lan man, dài dòng.\n- Rập khuôn, máy móc, để KH dẫn dắt.\n- Chờ máy lâu quá 60 giây hoặc từ 3 lần/vấn đề.\n- Không kiểm tra/xác nhận đã hỗ trợ triệt để.\n- Vi phạm từ 2 tiêu chí P1" } },
      { id: 'h3_2', name: '3.2 Nhập Liệu', pts: 7, type: 'yn',
        tooltips: { Y: "- Ghi nhận và nhập liệu trên hệ thống đúng quy định", N: "- Nhập liệu chưa đúng quy định" } }
    ]
  },
  {
    group: '4. RELIABLE RESOLUTION – Trao giải pháp, Nhận niềm tin', items: [
      { id: 'h4_1', name: '4.1 Xác minh thông tin', pts: 5, type: 'yna',
        tooltips: { Y: "- Xác minh thông tin đúng quy định", N: "- Xác minh chưa đúng quy định", NA: "- Không cần XMTT" } },
      { id: 'h4_2', name: '4.2 Giải Pháp', pts: 30, type: 'ynpp', partial1: 20, partial2: 15,
        tooltips: { Y: "- Cung cấp phương án tối ưu, rõ ràng, triệt để\n- Kiên trì thuyết phục để đạt đồng thuận của KH.", P1: "Dành cho cuộc gọi có từ 1 vấn đề\n- Cung cấp thiếu 1 thông tin\n- Thông tin không rõ ràng, gây nhầm lẫn\n- Thông tin sai nhưng có đính chính/khắc phục\n- Phương án chưa tối ưu, triệt để", P2: "Dành cho cuộc gọi có từ 2 vấn đề\n- Cung cấp thiếu 1 thông tin\n- Thông tin không rõ ràng, gây nhầm lẫn\n- Thông tin sai nhưng có đính chính/khắc phục\n- Phương án chưa tối ưu, triệt để", N: "- Cung cấp sai thông tin\n- Vi phạm từ 2 lần hoặc từ 2 tiêu chí\n- Hỗ trợ sai hướng xử lý, sai quy trình" } }
    ]
  },
  {
    group: '5. THANKFUL CLOSING – Khép vấn đề, Mở kết nối', items: [
      { id: 'h5_1', name: '5.1 Tư vấn KS / KM / cảnh báo…', pts: 3, type: 'yna',
        tooltips: { Y: "- Thực hiện tư vấn khảo sát/giới thiệu KM theo quy định từng thời kì.", N: "- Không thực hiện hoặc chưa chính xác", NA: "- Không cần thực hiện/chưa có cơ hội" } },
      { id: 'h5_2', name: '5.2 Chào kết thúc', pts: 5, type: 'yna',
        tooltips: { Y: "- Kết thúc bằng lời cảm ơn/chúc chân thành kèm mong muốn đồng hành với KH cá nhân hóa", N: "- Thực hiện chưa đạt yêu cầu", NA: "- Chưa có cơ hội thực hiện" } }
    ]
  }
];

var _VOICE_ERROR_CODES = {
  'h1_1': { N: ['N-1.1.1 Không dùng câu chào chuẩn', 'N-1.1.2 Giọng điệu uể oải'] },
  'h2_1': { P1: ['P1-2.1.1 Ngắt lời không phù hợp'], N: ['N-2.1.1 Hỏi lại thông tin', 'N-2.1.2 Thiếu tập trung', 'N-2.1.3 Không kết nối cảm xúc'] },
  'h2_2': { P1: ['P1-2.2.1 Lặp từ', 'P1-2.2.2 Không có kính ngữ/ra lệnh (1 lần)'], N: ['N-2.2.1 Từ ngữ tiêu cực', 'N-2.2.2 Ra lệnh không giải thích', 'N-2.2.3 Không kính ngữ/ra lệnh (từ 2 lần)'] },
  'h2_3': { P1: ['P1-2.3.1 Nói quá nhanh/chậm', 'P1-2.3.2 Phát âm không rõ'], N: ['N-2.3.1 Ngữ điệu cứng nhắc', 'N-2.3.2 Nhấn giọng không phù hợp'] },
  'h2_4': { N: ['N-2.4.1 Không gọi tên KH', 'N-2.4.2 Danh xưng không phù hợp'] },
  'h3_1': { P1: ['P1-3.1.1 Để tạp âm', 'P1-3.1.2 Khoảng lặng quá dài', 'P1-3.1.3 Chờ máy lâu 60-90s'], N: ['N-3.1.1 Thụ động tư vấn', 'N-3.1.2 Tư vấn lan man', 'N-3.1.3 Rập khuôn', 'N-3.1.4 Chờ máy >90s', 'N-3.1.5 Không kiểm tra/xác nhận'] },
  'h3_2': { N: ['N-3.2.1 Nhập liệu chưa đúng quy định'] },
  'h4_1': { N: ['N-4.1.1 Xác minh sai quy định'] },
  'h4_2': { P1: ['P1-4.2.1 Thiếu thông tin', 'P1-4.2.2 Không rõ ràng', 'P1-4.2.3 Chưa tối ưu'], P2: ['P2-4.2.1 Thiếu thông tin', 'P2-4.2.2 Không rõ ràng', 'P2-4.2.3 Chưa tối ưu'], N: ['N-4.2.1 Sai thông tin', 'N-4.2.2 Vi phạm từ 2 tiêu chí', 'N-4.2.3 Sai hướng xử lý'] },
  'h5_1': { N: ['N-5.1.1 Không tư vấn hoặc sai'] },
  'h5_2': { N: ['N-5.2.1 Chào kết thúc chưa đạt'] }
};

// Shared autofail base (items common to all groups)
var _BASE_AUTOFAIL = [
  '1.1 Ngôn từ không phù hợp (ra lệnh, bắt bẻ, áp đặt, hỏi ngược KH, đổ lỗi...)',
  '1.2 Khuyến khích/thách thức KH gây bất lợi thương hiệu FE CREDIT',
  '1.3 Thái độ thờ ơ, vô cảm với vấn đề KH',
  '1.4 Kết thúc hỗ trợ khi KH vẫn còn thắc mắc/khiếu nại/bức xúc',
  '2.1 Xác minh sai quy định (trường hợp rủi ro cao)',
  '2.2 Xác minh sai dẫn đến không hỗ trợ KH',
  '2.3 Cung cấp thông tin chi tiết khoản vay/thẻ khi chưa xác định chính chủ',
  '2.4 Cung cấp thông tin cá nhân KH cho đơn vị khác khi không được phép',
  '2.5 Cung cấp/liệt kê câu hỏi xác minh hoặc câu trả lời cho KH',
  '3.1 Không hỗ trợ yêu cầu KH dù vấn đề có thể hỗ trợ',
  '3.2 Cung cấp sai khoản tiền/phí (Loan ≥30k; Card không giới hạn)',
  '3.3 Hứa hẹn hỗ trợ khi quy trình không được phép mà không đính chính',
  '4.1 Tạo ticket nhưng không chuyển đi để xử lý',
  '4.2 Tạo ticket chuyển đi nhưng nhập sai code/subcode/property/remark',
  '4.3 Tạo ticket chuyển PBLQ khi không thỏa điều kiện',
  '4.4 Không tạo ticket khi thông tin cần chuyển đi xử lý',
  '5. Gian lận (tín hiệu kém, lỗi hệ thống…)',
];

function _buildAutofail(extras) {
  // Insert extras at the right positions. extras is an object like {after_1_4: [...], after_4_4: [...], ...}
  var result = _BASE_AUTOFAIL.slice(0, 4); // 1.1-1.4
  if (extras.after_1_4) result = result.concat(extras.after_1_4);
  result = result.concat(_BASE_AUTOFAIL.slice(4, 9)); // 2.1-2.5
  if (extras.after_2_5) result = result.concat(extras.after_2_5);
  result = result.concat(_BASE_AUTOFAIL.slice(9, 12)); // 3.1-3.3
  result = result.concat(_BASE_AUTOFAIL.slice(12, 16)); // 4.1-4.4
  if (extras.after_4_4) result = result.concat(extras.after_4_4);
  result.push(_BASE_AUTOFAIL[16]); // 5. Gian lan
  return result;
}

// ── IB: Inbound ──
var _IB_CRITERIA = _VOICE_CRITERIA;
var _IB_WOW = [
  'Được KH khen ngợi (KH chủ động khen trong cuộc gọi)',
  'Cung cấp thông tin hiệu quả (hỗ trợ ngoài quy trình mang lại hiệu quả)',
  'Kỹ năng điều hướng KH (kiểm soát cảm xúc KH từ tiêu cực sang tích cực)',
  'Kỹ năng thuyết phục (thuyết phục KH giữ thẻ thành công)',
  'Hỗ trợ nhiệt tình, tận tâm (cảm nhận thiện cảm & sự hài lòng của KH)',
];
var _IB_AUTOFAIL = _buildAutofail({
  after_1_4: ['1.5 Im lặng từ 8s để KH tự gác máy', '1.6 Không chuyển TL hỗ trợ khi KH mất bình tĩnh / dùng ngôn từ thiếu văn hóa'],
  after_4_4: ['4.5 Không thực hiện chuyển line đúng quy định', '4.6 Chờ máy 90s+ không tương tác lại → rớt call', '4.7 Yêu cầu KH giữ máy quá 4 phút mà không tương tác'],
});

// ── CARE ──
var _CARE_CRITERIA = _VOICE_CRITERIA;
var _CARE_WOW = [
  'Được KH khen ngợi (KH chủ động khen trong cuộc gọi)',
  'Cung cấp thông tin hiệu quả (hỗ trợ ngoài quy trình mang lại hiệu quả)',
  'Kỹ năng điều hướng KH (kiểm soát cảm xúc KH từ tiêu cực sang tích cực)',
  'Kỹ năng thuyết phục (thuyết phục KH hợp tác thanh toán dù KH khiếu nại đúng)',
  'Hỗ trợ nhiệt tình, tận tâm (cảm nhận thiện cảm & sự hài lòng của KH)',
];
var _CARE_AUTOFAIL = _buildAutofail({
  after_1_4: ['1.5 Im lặng từ 8s để KH tự gác máy'],
  after_4_4: ['4.5 Không thực hiện chuyển line đúng quy định'],
});

// ── CHAT ──
var _CHAT_CRITERIA = [
  _VOICE_CRITERIA[0], // 1. HEART TOUCHING (same)
  {
    group: '2. EMPATHY – Nghe từ tâm, Hiểu thấu cảm', items: [
      { id: 'h2_1', name: '2.1 Cá nhân hóa', pts: 15, type: 'ynp',
        tooltips: { Y: "- Thể hiện sự đồng cảm, kết nối cảm xúc và quan tâm đến tình huống của KH.\n- Hỗ trợ KH có sự điều chỉnh phù hợp ngữ cảnh, lịch sử tương tác, đặc điểm của KH.", P1: "- Vi phạm 1 lần các tiêu chí trên", N: "- Vi phạm từ 2 lần trên 1 tiêu chí\n- Vi phạm từ 2 tiêu chí" } },
      _VOICE_CRITERIA[1].items[1], // 2.2 Ngôn Từ (same)
      { id: 'h2_3', name: '2.3 Ngữ pháp', pts: 10, type: 'ynp',
        tooltips: { Y: "- Đúng chính tả, viết hoa đúng quy định.\n- Đúng dấu câu\n- Ngắt câu, ý phù hợp\n- Sử dụng kính ngữ, chủ ngữ, vị ngữ phù hợp", P1: "- Vi phạm 2 lần trên 1 tiêu chí\n- Vi phạm 2 tiêu chí", N: "- Vi phạm từ 3 lần trên 1 tiêu chí\n- Vi phạm từ 3 tiêu chí" } },
      _VOICE_CRITERIA[1].items[3], // 2.4 Gọi tên KH (same)
    ]
  },
  {
    group: '3. ATTENTIVE ACTIONS – Vững đồng hành, Giúp tận tâm', items: [
      { id: 'h3_1', name: '3.1 Quản lý tương tác', pts: 10, type: 'ynp',
        tooltips: { Y: "- Đặt câu hỏi chính xác, thu thập thông tin cần thiết\n- Tư vấn ngắn gọn, rõ ràng, mạch lạc\n- Tương tác trình tự phù hợp ngữ cảnh\n- Chủ động dẫn dắt, kiểm soát tình huống hiệu quả.\n- Thao tác hệ thống nhanh, lịch sự khi yêu cầu KH chờ\n- Kiểm tra lại với KH để đảm bảo đã hỗ trợ", P1: "- Đặt câu hỏi/tư vấn dư thừa, lan man\n- Tương tác trình tự không phù hợp\n- Để KH dẫn dắt trong đoạn chat\n- Chờ máy quá 120 giây/lần hoặc từ 3 lần/vấn đề\n- Không cảm ơn khi quay lại\n- Không kiểm tra/xác nhận đã hỗ trợ", N: "- Vi phạm từ 2 lần trên 1 tiêu chí\n- Vi phạm từ 2 tiêu chí" } },
      _VOICE_CRITERIA[2].items[1], // 3.2 Nhập Liệu (same)
    ]
  },
  // CHAT: skip 4.1 Xac minh, go directly to 4.1 Giai Phap
  {
    group: '4. RELIABLE RESOLUTION – Trao giải pháp, Nhận niềm tin', items: [
      { id: 'h4_2', name: '4.1 Giải Pháp', pts: 30, type: 'ynpp', partial1: 20, partial2: 15,
        tooltips: { Y: "- Cung cấp phương án tối ưu, rõ ràng, triệt để\n- Kiên trì thuyết phục để đạt đồng thuận của KH.", P1: "- Cung cấp thiếu 1 thông tin\n- Thông tin không rõ ràng, gây nhầm lẫn\n- Thông tin sai nhưng có đính chính/khắc phục\n- Phương án chưa tối ưu, triệt để", P2: "- Cung cấp thiếu 1 thông tin\n- Thông tin không rõ ràng, gây nhầm lẫn\n- Thông tin sai nhưng có đính chính/khắc phục\n- Phương án chưa tối ưu, triệt để", N: "- Cung cấp sai thông tin\n- Vi phạm từ 2 lần hoặc từ 2 tiêu chí\n- Hỗ trợ sai hướng xử lý, sai quy trình" } }
    ]
  },
  _VOICE_CRITERIA[4], // 5. THANKFUL CLOSING (same)
];
var _CHAT_WOW = [
  'Được KH khen ngợi (KH chủ động khen trong cuộc gọi)',
  'Cung cấp thông tin hiệu quả (hỗ trợ ngoài quy trình mang lại hiệu quả)',
  'Kỹ năng điều hướng KH (kiểm soát cảm xúc KH từ tiêu cực sang tích cực)',
  'Hỗ trợ nhiệt tình, tận tâm (cảm nhận thiện cảm & sự hài lòng của KH)',
];
var _CHAT_AUTOFAIL = _buildAutofail({
  after_1_4: ['1.5 Im lặng từ 8s để KH tự gác máy'],
  after_4_4: ['4.5 Không thực hiện chuyển line đúng quy định'],
});
var _CHAT_ERROR_CODES = Object.assign({}, _VOICE_ERROR_CODES, {
  'h2_1': { P1: ['P1-2.1.1 Thiếu đồng cảm/cá nhân hóa'], N: ['N-2.1.1 Không đồng cảm', 'N-2.1.2 Không cá nhân hóa'] },
  'h2_3': { P1: ['P1-2.3.1 Lỗi chính tả 2 lần', 'P1-2.3.2 Vi phạm 2 tiêu chí'], N: ['N-2.3.1 Lỗi chính tả từ 3 lần', 'N-2.3.2 Vi phạm từ 3 tiêu chí'] },
  'h3_1': { P1: ['P1-3.1.1 Tư vấn dư thừa', 'P1-3.1.2 Trình tự không phù hợp', 'P1-3.1.3 Chờ máy >120s'], N: ['N-3.1.1 Vi phạm từ 2 lần', 'N-3.1.2 Vi phạm từ 2 tiêu chí'] },
  'h4_1': undefined, // CHAT has no 4.1 Xac minh
  'h4_2': { P1: ['P1-4.1.1 Thiếu thông tin', 'P1-4.1.2 Không rõ ràng', 'P1-4.1.3 Chưa tối ưu'], P2: ['P2-4.1.1 Thiếu thông tin', 'P2-4.1.2 Không rõ ràng', 'P2-4.1.3 Chưa tối ưu'], N: ['N-4.1.1 Sai thông tin', 'N-4.1.2 Vi phạm từ 2 tiêu chí', 'N-4.1.3 Sai hướng xử lý'] },
});

// ── ECOM: Email ──
var _ECOM_CRITERIA = [
  {
    group: '1. HEART TOUCHING – Mở lòng đón, Chạm trái tim', items: [
      { id: 'h1_1', name: '1.1 Chào mở đầu', pts: 2, type: 'yn',
        tooltips: { Y: "- Sử dụng câu chào chuẩn.\n- Sử dụng tiêu đề rõ ràng, chính xác", N: "- Chưa đạt 1 trong các tiêu chí trên." } }
    ]
  },
  {
    group: '2. EMPATHY – Nghe từ tâm, Hiểu thấu cảm', items: [
      { id: 'h2_1', name: '2.1 Cá nhân hóa', pts: 15, type: 'ynp',
        tooltips: { Y: "- Thể hiện sự đồng cảm, kết nối cảm xúc và quan tâm đến tình huống của KH.\n- Hỗ trợ KH có sự điều chỉnh phù hợp ngữ cảnh, lịch sử tương tác, đặc điểm của KH.", P1: "- Vi phạm 1 lần các tiêu chí trên", N: "- Vi phạm từ 2 lần trên 1 tiêu chí\n- Vi phạm từ 2 tiêu chí" } },
      _VOICE_CRITERIA[1].items[1], // 2.2 Ngôn Từ
      { id: 'h2_3', name: '2.3 Ngữ pháp', pts: 10, type: 'ynp',
        tooltips: { Y: "- Đúng chính tả, viết hoa đúng quy định.\n- Đúng dấu câu\n- Ngắt câu, ý phù hợp\n- Sử dụng kính ngữ, chủ ngữ, vị ngữ phù hợp", P1: "- Vi phạm 2 lần trên 1 tiêu chí\n- Vi phạm 2 tiêu chí", N: "- Vi phạm từ 3 lần trên 1 tiêu chí\n- Vi phạm từ 3 tiêu chí" } },
      _VOICE_CRITERIA[1].items[3], // 2.4 Gọi tên KH
    ]
  },
  {
    group: '3. ATTENTIVE ACTIONS – Vững đồng hành, Giúp tận tâm', items: [
      { id: 'h3_1', name: '3.1 Trình bày', pts: 10, type: 'ynp',
        tooltips: { Y: "- Cấu trúc, bố cục rõ ràng (mở đầu, nội dung chính, kết thúc)\n- Phản hồi theo trình tự phù hợp ngữ cảnh và yêu cầu KH.\n- Định dạng email đồng nhất và chuyên nghiệp.", P1: "- Thứ tự trình bày không phù hợp ngữ cảnh\n- Font/cỡ/màu chữ không đồng nhất.\n- Khoảng trắng không phù hợp (từ lần 2)", N: "- Vi phạm từ 2 lần các tiêu chí\n- Cấu trúc, bố cục không rõ ràng, khó theo dõi" } },
      { id: 'h3_2', name: '3.2 Nhập Liệu', pts: 7, type: 'yn',
        tooltips: { Y: "- Ghi nhận nhập liệu đúng quy định, file đính kèm KH lên hệ thống\n- Copy đúng, đủ email (tiêu đề, email KH, email cc)", N: "- Vi phạm 1 trong các tiêu chí trên" } }
    ]
  },
  {
    group: '4. RELIABLE RESOLUTION – Trao giải pháp, Nhận niềm tin', items: [
      { id: 'h4_1', name: '4.1 Xác nhận vấn đề', pts: 5, type: 'yn',
        tooltips: { Y: "- Xác nhận đầy đủ, chính xác, rõ ràng từng yêu cầu của KH", N: "- Vi phạm tiêu chí trên" } },
      { id: 'h4_2', name: '4.2 Giải Pháp', pts: 30, type: 'ynpp', partial1: 20, partial2: 15,
        tooltips: { Y: "- Cung cấp phương án tối ưu, rõ ràng, triệt để", P1: "- Cung cấp thiếu 1 thông tin\n- Thông tin không rõ ràng, gây nhầm lẫn\n- Thông tin sai nhưng có đính chính/khắc phục\n- Phương án chưa tối ưu, triệt để", P2: "- Cung cấp thiếu 1 thông tin\n- Thông tin không rõ ràng, gây nhầm lẫn\n- Thông tin sai nhưng có đính chính/khắc phục\n- Phương án chưa tối ưu, triệt để", N: "- Cung cấp sai thông tin\n- Vi phạm từ 2 lần hoặc từ 2 tiêu chí\n- Hỗ trợ sai hướng xử lý, sai quy trình" } }
    ]
  },
  {
    group: '5. THANKFUL CLOSING – Khép vấn đề, Mở kết nối', items: [
      { id: 'h5_1', name: '5.1 Tư vấn KM / khảo sát…', pts: 3, type: 'yna',
        tooltips: { Y: "- Thực hiện tư vấn khảo sát/giới thiệu KM theo quy định.", N: "- Không thực hiện hoặc chưa chính xác", NA: "- Không cần thực hiện/chưa có cơ hội" } },
      { id: 'h5_2', name: '5.2 Chào kết thúc', pts: 3, type: 'yn',
        tooltips: { Y: "- Kết thúc bằng lời cảm ơn/chúc chân thành\n- Chữ ký đúng chuẩn", N: "- Thực hiện chưa đạt yêu cầu" } }
    ]
  }
];
var _ECOM_WOW = _CHAT_WOW; // Same as CHAT (4 items, no card retention)
var _ECOM_AUTOFAIL = _buildAutofail({
  // NO 1.5 for ECOM
  after_2_5: ['2.6 Cung cấp sai thông tin hợp đồng cho KH khác'],
  // NO 4.5 for ECOM
});
var _ECOM_ERROR_CODES = Object.assign({}, _VOICE_ERROR_CODES, {
  'h1_1': { N: ['N-1.1.1 Không dùng câu chào chuẩn', 'N-1.1.2 Tiêu đề không rõ ràng'] },
  'h2_1': { P1: ['P1-2.1.1 Thiếu đồng cảm/cá nhân hóa'], N: ['N-2.1.1 Không đồng cảm', 'N-2.1.2 Không cá nhân hóa'] },
  'h2_3': { P1: ['P1-2.3.1 Lỗi chính tả 2 lần', 'P1-2.3.2 Vi phạm 2 tiêu chí'], N: ['N-2.3.1 Lỗi chính tả từ 3 lần', 'N-2.3.2 Vi phạm từ 3 tiêu chí'] },
  'h3_1': { P1: ['P1-3.1.1 Thứ tự không phù hợp', 'P1-3.1.2 Định dạng không đồng nhất'], N: ['N-3.1.1 Bố cục không rõ ràng', 'N-3.1.2 Vi phạm từ 2 lần'] },
  'h4_1': { N: ['N-4.1.1 Xác nhận chưa đầy đủ'] },
});

// ── F2F: Face-to-Face ──
var _F2F_CRITERIA = _VOICE_CRITERIA;
// Override 3.1 name for F2F
_F2F_CRITERIA = _VOICE_CRITERIA.map(function(g) {
  if (g.group.indexOf('ATTENTIVE') >= 0) {
    return {
      group: g.group,
      items: g.items.map(function(it) {
        if (it.id === 'h3_1') {
          return { id: 'h3_1', name: '3.1 Quản lý tương tác F2F', pts: 10, type: 'ynp',
            tooltips: { Y: "- Chủ động tư vấn, giải thích tận tâm\n- Đặt câu hỏi chính xác, thu thập thông tin\n- Tư vấn ngắn gọn, rõ ràng, súc tích.\n- Điều hướng và kiểm soát tình huống hiệu quả.\n- Chủ động hỗ trợ KH trong thao tác/chuẩn bị hồ sơ\n- Kiểm tra lại để đảm bảo đã hỗ trợ đầy đủ.", P1: "- Để khách hàng chờ lâu mà không tương tác.\n- Tư vấn lan man hoặc chưa đúng trọng tâm.\n- Thiếu chủ động trong hỗ trợ.", N: "- Thụ động tư vấn, chỉ hỗ trợ khi KH hỏi.\n- Tư vấn rập khuôn, máy móc, không phù hợp ngữ cảnh.\n- Để KH dẫn dắt tình huống.\n- Không xác nhận lại việc hỗ trợ với KH.\n- Vi phạm từ 2 tiêu chí P1." } };
        }
        return it;
      })
    };
  }
  return g;
});
var _F2F_WOW = [
  'Được KH khen ngợi (KH chủ động khen ngợi nhân viên)',
  'Cung cấp thông tin hiệu quả (hỗ trợ ngoài quy trình mang lại hiệu quả)',
  'Kỹ năng điều hướng KH (kiểm soát cảm xúc KH từ tiêu cực sang tích cực)',
  'Kỹ năng thuyết phục (thuyết phục KH đồng thuận giải pháp hoặc tiếp tục sử dụng sản phẩm)',
  'Hỗ trợ nhiệt tình, tận tâm (tạo thiện cảm & sự hài lòng cho KH)',
];
var _F2F_AUTOFAIL = _buildAutofail({
  // NO 1.5 for F2F
  // NO 4.5 for F2F
});

// ── OB: Outbound ──
var _OB_CRITERIA = _VOICE_CRITERIA;
var _OB_WOW = [
  'Được KH khen ngợi (KH chủ động khen trong cuộc gọi)',
  'Cung cấp thông tin hiệu quả (hỗ trợ ngoài quy trình mang lại hiệu quả)',
  'Kỹ năng điều hướng KH (kiểm soát cảm xúc KH từ tiêu cực sang tích cực)',
  'Kỹ năng thuyết phục (thuyết phục KH giữ thẻ thành công)',
  'Offer thành công hạn mức cao hơn nhu cầu ban đầu của KH',
  'Hỗ trợ nhiệt tình, tận tâm (cảm nhận thiện cảm & sự hài lòng của KH)',
];
var _OB_AUTOFAIL = _buildAutofail({
  after_1_4: ['1.5 Im lặng từ 8s để KH tự gác máy'],
  after_4_4: ['4.5 Không thực hiện chuyển line đúng quy định'],
});

// ── F2F+OB ──
var _F2FOB_CRITERIA = _VOICE_CRITERIA;
var _F2FOB_WOW = [
  'Được KH khen ngợi (KH chủ động khen ngợi nhân viên trong cuộc gọi/email/chat/phiên F2F)',
  'Cung cấp thông tin hiệu quả (hỗ trợ ngoài quy trình mang lại hiệu quả hơn cho KH)',
  'Kỹ năng điều hướng KH (kiểm soát cảm xúc KH từ tiêu cực sang tích cực)',
  'Kỹ năng thuyết phục (thuyết phục KH giữ thẻ thành công – IB + F2F + OB)',
  'Hỗ trợ nhiệt tình, tận tâm (tạo thiện cảm & sự hài lòng cho KH)',
];
var _F2FOB_AUTOFAIL = _buildAutofail({
  after_1_4: ['1.5 Im lặng từ 8s để KH tự gác máy (trừ Ecom + F2F)', '1.6 Không chuyển TL hỗ trợ khi KH mất bình tĩnh hoặc dùng ngôn từ thiếu văn hóa'],
  after_4_4: ['4.5 Không thực hiện chuyển line đúng quy định (trừ Ecom)', '4.6 Chờ máy 90s+ không tương tác lại → rớt call', '4.7 Yêu cầu KH giữ máy quá 4 phút mà không tương tác'],
});

// ── SP ──
var _SP_CRITERIA = _VOICE_CRITERIA;
var _SP_WOW = _CARE_WOW; // Same WOW as CARE
var _SP_AUTOFAIL = _buildAutofail({
  after_1_4: ['1.5 Im lặng từ 8s để KH tự gác máy'],
  after_4_4: ['4.5 Không thực hiện chuyển line đúng quy định'],
});

// ── Master Registry ──
var QC_SCORECARDS = {
  IB:     { label: 'IB - Inbound',   criteria: _IB_CRITERIA,     wowFactors: _IB_WOW,     autofailFactors: _IB_AUTOFAIL,     errorCodes: _VOICE_ERROR_CODES },
  CARE:   { label: 'CARE',           criteria: _CARE_CRITERIA,   wowFactors: _CARE_WOW,   autofailFactors: _CARE_AUTOFAIL,   errorCodes: _VOICE_ERROR_CODES },
  CHAT:   { label: 'CHAT',           criteria: _CHAT_CRITERIA,   wowFactors: _CHAT_WOW,   autofailFactors: _CHAT_AUTOFAIL,   errorCodes: _CHAT_ERROR_CODES },
  ECOM:   { label: 'EMAIL',         criteria: _ECOM_CRITERIA,   wowFactors: _ECOM_WOW,   autofailFactors: _ECOM_AUTOFAIL,   errorCodes: _ECOM_ERROR_CODES },
  F2F:    { label: 'F2F',            criteria: _F2F_CRITERIA,    wowFactors: _F2F_WOW,    autofailFactors: _F2F_AUTOFAIL,    errorCodes: _VOICE_ERROR_CODES },
  F2FOB:  { label: 'F2FOB',        criteria: _F2FOB_CRITERIA,  wowFactors: _F2FOB_WOW,  autofailFactors: _F2FOB_AUTOFAIL,  errorCodes: _VOICE_ERROR_CODES },
  OB:     { label: 'OB - Outbound',  criteria: _OB_CRITERIA,     wowFactors: _OB_WOW,     autofailFactors: _OB_AUTOFAIL,     errorCodes: _VOICE_ERROR_CODES },
  SP:   { label: 'SP',             criteria: _SP_CRITERIA,   wowFactors: _SP_WOW,   autofailFactors: _SP_AUTOFAIL,   errorCodes: _VOICE_ERROR_CODES },
};

// Backward-compatible aliases (default to IB)
var QC_CRITERIA = QC_SCORECARDS.IB.criteria;
var WOW_FACTORS = QC_SCORECARDS.IB.wowFactors;
var AUTOFAIL_FACTORS = QC_SCORECARDS.IB.autofailFactors;
var QC_ERROR_CODES = QC_SCORECARDS.IB.errorCodes;

// ── Helper functions ──
function _getActiveScorecard(group) {
  return QC_SCORECARDS[group || 'IB'] || QC_SCORECARDS.IB;
}
function _getCriteriaForGroup(group) { return _getActiveScorecard(group).criteria; }
function _getWowForGroup(group) { return _getActiveScorecard(group).wowFactors; }
function _getAutofailForGroup(group) { return _getActiveScorecard(group).autofailFactors; }
function _getErrorCodesForGroup(group) { return _getActiveScorecard(group).errorCodes; }

const QC_THEMES = [
  {
    id: 'forest',
    label: 'Rừng Xanh',
    description: 'Mặc định, sạch mắt và cân bằng.',
    swatch: 'linear-gradient(135deg, #0d3821 0%, #00b359 100%)',
    headerBg: 'linear-gradient(135deg, #1d5f46 0%, #4ba471 100%)',
    accent: '#00b359',
    borderAccent: 'rgba(0, 179, 89, 0.35)',
    selectedBg: 'rgba(0, 179, 89, 0.08)'
  },
  {
    id: 'ocean',
    label: 'Biển Ngọc',
    description: 'Teal xanh biển, mát và hiện đại.',
    swatch: 'linear-gradient(135deg, #13364c 0%, #1db4ae 100%)',
    headerBg: 'linear-gradient(135deg, #135878 0%, #31bdb7 100%)',
    accent: '#1db4ae',
    borderAccent: 'rgba(29, 180, 174, 0.35)',
    selectedBg: 'rgba(29, 180, 174, 0.08)'
  },
  {
    id: 'sunset',
    label: 'Hoàng Hôn',
    description: 'Cam đất ấm, nổi bật nhưng vẫn dễ đọc.',
    swatch: 'linear-gradient(135deg, #5d2d1a 0%, #ff914d 100%)',
    headerBg: 'linear-gradient(135deg, #a84f24 0%, #ffb067 100%)',
    accent: '#ff914d',
    borderAccent: 'rgba(255, 145, 77, 0.35)',
    selectedBg: 'rgba(255, 145, 77, 0.10)'
  },
  {
    id: 'rose',
    label: 'Hồng Đào',
    description: 'Tươi sáng, mềm hơn nhưng vẫn rõ ràng.',
    swatch: 'linear-gradient(135deg, #5b2039 0%, #e56799 100%)',
    headerBg: 'linear-gradient(135deg, #a63b67 0%, #f08eb0 100%)',
    accent: '#e56799',
    borderAccent: 'rgba(229, 103, 153, 0.35)',
    selectedBg: 'rgba(229, 103, 153, 0.10)'
  },
  {
    id: 'midnight',
    label: 'Đêm Xanh',
    description: 'Xanh đêm trầm, gọn và tập trung.',
    swatch: 'linear-gradient(135deg, #1a2346 0%, #7485ff 100%)',
    headerBg: 'linear-gradient(135deg, #33408f 0%, #8a97ff 100%)',
    accent: '#7485ff',
    borderAccent: 'rgba(116, 133, 255, 0.35)',
    selectedBg: 'rgba(116, 133, 255, 0.10)'
  }
];

// ── State ──
var qcState = {
  qcName: '',
  spinValue: '',          // Trường Spin chung (nhập 1 lần)
  phanLoai: '',           // Trường Phân loại chung (nhập 1 lần)
  spinFileName: '',       // Tên file SPIN đang gắn với thư mục làm việc
  exportFileName: 'ket_qua_QC.xlsx',
  exportFolderName: '',
  savedSpinHandle: null,
  savedDirHandle: null,
  savedExportHandle: null, // Thư mục xuất kết quả QC
  spinFileHandle: null,   // FileSystemFileHandle của SPIN gốc (đọc + ghi)
  spinRawHeaders: [],     // Toàn bộ headers file gốc
  spinAllRows: [],        // Toàn bộ rows (kể cả non-QC) để ghi ngược lại
  dirHandle: null,        // DATA TỔNG (export lock metadata)
  exportDirHandle: null,
  locks: {},
  spinData: [],           // Filtered rows (Chấm=QC) hiển thị UI
  scores: {},
  currentRecord: null,
  pendingBatch: [],       // [{action, recId, record, btn}]
  batchTimer: null,       // debounce timer
  _bgSyncRunning: false,  // Guard: ngăn background Excel sync chạy đồng thời
  selectedRecIds: {},     // { [recId]: true } tick chọn cho batch claim/unclaim
  activeTabId: 'qcTabImport',
  writeLockToken: '',
  restoreCurrentRecId: '',
  spinFileStamp: '',
  locksFileStamp: '',
  liveSyncTimer: null,
  liveSyncBusy: false,
  suppressNextSpinWatch: false,
  suppressNextLocksWatch: false,
  themeId: 'forest',
  autoReloadInFlight: null,
  lastAutoReloadAt: 0,
  autoReloadWakeBound: false,
};

var LIVE_SYNC_INTERVAL_MS = 2500;

// ── Storage helpers ──
function qcGet(k) { return new Promise(function (r) { chrome.storage.local.get(k, r); }); }
function qcSet(o) { return new Promise(function (r) { chrome.storage.local.set(o, r); }); }

function _getThemeById(themeId) {
  return QC_THEMES.find(function (theme) { return theme.id === themeId; }) || QC_THEMES[0];
}

function applySharedQcTheme(themeId) {
  var theme = _getThemeById(themeId);
  if (typeof document === 'undefined') return theme.id;
  var root = document.documentElement;
  if (root) root.setAttribute('data-qc-theme', theme.id);
  if (document.body) document.body.setAttribute('data-qc-theme', theme.id);
  return theme.id;
}

function applyQcTheme(themeId) {
  var theme = _getThemeById(themeId);
  qcState.themeId = theme.id;
  applySharedQcTheme(theme.id);
  var root = document.getElementById('qcTab');
  if (root) root.setAttribute('data-theme', theme.id);
  var btn = document.getElementById('qcThemeBtn');
  if (btn) {
    btn.title = 'Đổi theme (' + theme.label + ')';
    btn.setAttribute('aria-label', 'Đổi theme (' + theme.label + ')');
  }
}

function openThemePicker() {
  return showQcChoiceDialog({
    title: 'Chọn theme',
    subtitle: 'Đổi màu giao diện QC panel. Theme đang chọn sẽ được lưu cho lần mở sau.',
    icon: QC_ICONS.palette,
    options: QC_THEMES.map(function (theme) {
      return {
        value: theme.id,
        label: theme.label,
        description: theme.id === qcState.themeId ? 'Đang dùng. ' + theme.description : theme.description,
        swatch: theme.swatch,
        selected: theme.id === qcState.themeId
      };
    })
  }).then(function (choice) {
    if (!choice || !choice.value) return;
    var nextTheme = _getThemeById(choice.value);
    if (nextTheme.id === qcState.themeId) return;
    applyQcTheme(nextTheme.id);
    return _persistRuntimeStateNow()
      .then(function () {
        showQcToast(QC_ICONS.palette + 'Đã đổi theme: ' + nextTheme.label);
      })
      .catch(function () { });
  });
}

function _createEmptyScore() {
  return {
    group: '',
    criteria: {},
    itemNotes: {},
    wowNotes: {},
    afNotes: {},
    itemErrorCodes: {},
    wow: [],
    autofail: [],
    note: '',
    autoNote: '',
    manualNote: '',
    qcName: '',
    scoringDate: '',
    status: ''
  };
}

function _composeScoreNote(autoNote, manualNote) {
  var autoText = String(autoNote || '').trim();
  var manualText = String(manualNote || '').trim();
  if (autoText && manualText) return autoText + '\n\n' + manualText;
  return autoText || manualText;
}

function _extractManualNote(noteText, autoNote) {
  var fullText = String(noteText || '');
  var autoText = String(autoNote || '').trim();
  if (!fullText.trim()) return '';
  if (autoText && fullText.indexOf(autoText) === 0) {
    return fullText.slice(autoText.length).replace(/^\s+/, '');
  }
  return fullText;
}

function _mapHasText(map) {
  if (!map) return false;
  return Object.keys(map).some(function (key) {
    return !!String(map[key] || '').trim();
  });
}

function _createScoreSnapshot(sc) {
  return {
    criteria: Object.assign({}, (sc && sc.criteria) || {}),
    itemNotes: Object.assign({}, (sc && sc.itemNotes) || {}),
    wowNotes: Object.assign({}, (sc && sc.wowNotes) || {}),
    afNotes: Object.assign({}, (sc && sc.afNotes) || {}),
    itemErrorCodes: Object.assign({}, (sc && sc.itemErrorCodes) || {}),
    wow: Array.isArray(sc && sc.wow) ? sc.wow.slice() : [],
    autofail: Array.isArray(sc && sc.autofail) ? sc.autofail.slice() : [],
    note: String((sc && sc.note) || ''),
    autoNote: String((sc && sc.autoNote) || ''),
    manualNote: String((sc && sc.manualNote) || ''),
    qcName: String((sc && sc.qcName) || ''),
    scoringDate: String((sc && sc.scoringDate) || '')
  };
}

function _scoreHasProgress(sc) {
  if (!sc) return false;
  if (Object.keys(sc.criteria || {}).length > 0) return true;
  if (Array.isArray(sc.wow) && sc.wow.length > 0) return true;
  if (Array.isArray(sc.autofail) && sc.autofail.length > 0) return true;
  if (_mapHasText(sc.itemNotes)) return true;
  if (_mapHasText(sc.wowNotes)) return true;
  if (_mapHasText(sc.afNotes)) return true;
  if (_mapHasText(sc.itemErrorCodes)) return true;
  if (String(sc.manualNote || '').trim()) return true;
  if (String(sc.note || '').trim()) return true;
  return false;
}

function _scoreSnapshotSignature(sc) {
  return JSON.stringify(_createScoreSnapshot(sc));
}

function _getSavedScoreSnapshot(sc) {
  if (!sc) return null;
  if (sc.savedSnapshot) return _createScoreSnapshot(sc.savedSnapshot);
  if (String(sc.qcName || '').trim() && _scoreHasProgress(sc)) {
    return _createScoreSnapshot(sc);
  }
  return null;
}

function _getScoreVisualState(recId) {
  if (!recId || !qcState.scores[recId]) {
    return {
      hasProgress: false,
      isDraft: false,
      isSaved: false,
      isActiveDraft: false
    };
  }

  var sc = _normalizeScoreEntry(recId);
  var savedSnapshot = _getSavedScoreSnapshot(sc);
  var currentSignature = _scoreSnapshotSignature(sc);
  var savedSignature = savedSnapshot ? _scoreSnapshotSignature(savedSnapshot) : '';
  var hasProgress = _scoreHasProgress(sc);
  var isDirty = savedSnapshot ? currentSignature !== savedSignature : hasProgress;
  var isSaved = !!savedSnapshot && !isDirty && _scoreHasProgress(savedSnapshot);
  var isDraft = isDirty && (hasProgress || !!savedSnapshot);
  var isActiveDraft = isDraft && recId === _getCurrentRecId();

  return {
    hasProgress: hasProgress,
    isDraft: isDraft,
    isSaved: isSaved,
    isActiveDraft: isActiveDraft
  };
}

function _backfillSavedSnapshots() {
  var changed = false;
  Object.keys(qcState.scores || {}).forEach(function (recId) {
    var sc = _normalizeScoreEntry(recId);
    if (!sc) return;
    if (!sc.savedSnapshot && String(sc.qcName || '').trim() && _scoreHasProgress(sc)) {
      sc.savedSnapshot = _createScoreSnapshot(sc);
      changed = true;
    }
  });
  return changed;
}

function _buildAutoNoteText(sc) {
  var lines = [];
  var wowNotes = sc.wowNotes || {};
  var afNotes = sc.afNotes || {};
  var itemNotes = sc.itemNotes || {};
  var group = sc.group || 'IB';
  var scorecard = _getActiveScorecard(group);
  var wowFactors = scorecard.wowFactors;
  var autofailFactors = scorecard.autofailFactors;

  (sc.wow || []).forEach(function (i) {
    lines.push('WOW - ' + (wowFactors[i] || ''));
    if (wowNotes[i] && wowNotes[i].trim()) lines.push(wowNotes[i].trim());
    lines.push('');
  });

  (sc.autofail || []).forEach(function (i) {
    lines.push('AutoFail - ' + (autofailFactors[i] || ''));
    if (afNotes[i] && afNotes[i].trim()) lines.push(afNotes[i].trim());
    lines.push('');
  });

  scorecard.criteria.forEach(function (g) {
    g.items.forEach(function (item) {
      var v = sc.criteria[item.id];
      if ((v === 'N' || v === 'P1' || v === 'P2') && itemNotes[item.id] && itemNotes[item.id].trim()) {
        lines.push('[' + v + '] ' + item.name + ': ' + itemNotes[item.id].trim());
      }
    });
  });

  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  return lines.join('\n');
}

function _normalizeScoreEntry(recId) {
  if (!qcState.scores[recId]) qcState.scores[recId] = _createEmptyScore();
  var sc = qcState.scores[recId];
  if (!sc.group) sc.group = 'IB';
  if (!sc.criteria) sc.criteria = {};
  if (!sc.itemNotes) sc.itemNotes = {};
  if (!sc.wowNotes) sc.wowNotes = {};
  if (!sc.afNotes) sc.afNotes = {};
  if (!sc.itemErrorCodes) sc.itemErrorCodes = {};
  if (!Array.isArray(sc.wow)) sc.wow = [];
  if (!Array.isArray(sc.autofail)) sc.autofail = [];
  if (typeof sc.qcName !== 'string') sc.qcName = '';
  if (typeof sc.scoringDate !== 'string') sc.scoringDate = '';
  if (typeof sc.status !== 'string') sc.status = '';

  var autoNote = _buildAutoNoteText(sc);
  if (typeof sc.manualNote !== 'string') {
    sc.manualNote = _extractManualNote(sc.note || '', autoNote);
  }
  sc.autoNote = autoNote;
  sc.note = _composeScoreNote(autoNote, sc.manualNote);
  return sc;
}

function _getCurrentRecId() {
  return qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID'] || '').trim() : '';
}

var qcPersistTimer = null;
function _persistRuntimeStateNow() {
  return qcSet({
    'qc.scores': qcState.scores,
    'qc.qcName': qcState.qcName,
    'qc.spinValue': qcState.spinValue,
    'qc.phanLoai': qcState.phanLoai,
    'qc.currentRecId': _getCurrentRecId(),
    'qc.activeTab': qcState.activeTabId || 'qcTabImport',
    'qc.spinFileName': qcState.spinFileName || '',
    'qc.exportFileName': qcState.exportFileName || 'ket_qua_QC.xlsx',
    'qc.exportFolderName': qcState.exportFolderName || '',
    'qc.themeId': qcState.themeId || QC_THEMES[0].id
  });
}

function _schedulePersistRuntimeState() {
  if (qcPersistTimer) clearTimeout(qcPersistTimer);
  qcPersistTimer = setTimeout(function () {
    qcPersistTimer = null;
    _persistRuntimeStateNow().catch(function () { });
  }, 120);
}

var qcImportRefreshTimer = null;
function _scheduleImportTableRefresh() {
  if (qcImportRefreshTimer) clearTimeout(qcImportRefreshTimer);
  qcImportRefreshTimer = setTimeout(function () {
    qcImportRefreshTimer = null;
    renderImportTable();
  }, 60);
}

function _setCurrentRecord(record) {
  qcState.currentRecord = record || null;
  qcState.restoreCurrentRecId = _getCurrentRecId();
  _schedulePersistRuntimeState();
  _scheduleImportTableRefresh();
}

function _fileStamp(file) {
  if (!file) return '';
  return [file.lastModified || 0, file.size || 0].join(':');
}

function _rememberSpinFileStamp(file) {
  qcState.spinFileStamp = _fileStamp(file);
}

function _rememberLocksFileStamp(file) {
  qcState.locksFileStamp = _fileStamp(file);
}

function _requestHandlePermission(handle, requestIfNeeded) {
  if (!handle) return Promise.resolve(false);
  var descriptor = { mode: 'readwrite' };
  return handle.queryPermission(descriptor)
    .then(function (perm) {
      if (perm === 'granted') return true;
      if (!requestIfNeeded) return false;
      return handle.requestPermission(descriptor).then(function (nextPerm) { return nextPerm === 'granted'; });
    })
    .catch(function () { return false; });
}

function _restoreCurrentRecordView() {
  var activeRecId = _getCurrentRecId() || qcState.restoreCurrentRecId;
  var activeRecord = _findRecordByRecId(activeRecId);
  if (activeRecord) {
    _setCurrentRecord(activeRecord);
    renderScoringForm(activeRecord);
  }
}

function _stopLiveSyncWatcher() {
  if (qcState.liveSyncTimer) {
    clearInterval(qcState.liveSyncTimer);
    qcState.liveSyncTimer = null;
  }
}

function _startLiveSyncWatcher() {
  _stopLiveSyncWatcher();
  if (!qcState.spinFileHandle && !qcState.dirHandle) return;
  qcState.liveSyncTimer = setInterval(_checkForExternalUpdates, LIVE_SYNC_INTERVAL_MS);
}

// ── Loading bar ──
function _showLoadingBar(pct) {
  var bar = document.getElementById('qcLoadingBar');
  if (!bar) return;
  bar.style.opacity = '1';
  bar.style.width = (pct || 5) + '%';
}
function _hideLoadingBar() {
  var bar = document.getElementById('qcLoadingBar');
  if (!bar) return;
  bar.style.width = '100%';
  setTimeout(function () {
    bar.style.opacity = '0';
    setTimeout(function () { bar.style.width = '0%'; bar.style.background = 'linear-gradient(90deg,#5ba08a,#8cc8af,#ffd9c9)'; }, 350);
  }, 400);
}
function _flashLoadingBarDone(success) {
  var bar = document.getElementById('qcLoadingBar');
  if (!bar) return;
  bar.style.background = success ? '#4f927b' : '#d07a74';
  bar.style.width = '100%';
  setTimeout(function () {
    bar.style.opacity = '0';
    setTimeout(function () { bar.style.width = '0%'; bar.style.background = 'linear-gradient(90deg,#5ba08a,#8cc8af,#ffd9c9)'; }, 350);
  }, 600);
}

// ── Write lock: qc_write.lock – chống ghi đè đồng thời từ nhiều user ──
var LOCK_STALE_MS = 12000;
var LOCK_RETRY_DELAY = 250;
var LOCK_MAX_RETRIES = 8;

function _readWriteLockFile() {
  if (!qcState.dirHandle) return Promise.resolve(null);
  return qcState.dirHandle.getFileHandle('qc_write.lock', { create: false })
    .then(function (fh) { return fh.getFile(); })
    .then(function (f) { return f.text(); })
    .then(function (txt) {
      try { return JSON.parse(txt); } catch (e) { return null; }
    })
    .catch(function () { return null; });
}

function _writeLockFile(token) {
  if (!qcState.dirHandle) return Promise.resolve();
  return qcState.dirHandle.getFileHandle('qc_write.lock', { create: true })
    .then(function (fh) { return fh.createWritable(); })
    .then(function (w) {
      return w.write(JSON.stringify({ ts: Date.now(), by: qcState.qcName, token: token })).then(function () { return w.close(); });
    })
    .then(function () { return _readWriteLockFile(); })
    .then(function (data) { return !!(data && data.token === token); })
    .catch(function () { return false; });
}

function _acquireLock() {
  if (!qcState.dirHandle) return Promise.resolve();
  var retries = 0;
  var token = [Date.now(), Math.random().toString(36).slice(2), qcState.qcName || 'qc'].join(':');

  function attempt() {
    return _readWriteLockFile()
      .then(function (data) {
        if (data && data.token && data.token !== token && Date.now() - (data.ts || 0) < LOCK_STALE_MS) {
          if (retries++ >= LOCK_MAX_RETRIES) throw new Error('Có người đang lưu, thử lại sau vài giây');
          return new Promise(function (r) { setTimeout(r, LOCK_RETRY_DELAY); }).then(attempt);
        }
        return _writeLockFile(token).then(function (ok) {
          if (!ok) {
            if (retries++ >= LOCK_MAX_RETRIES) throw new Error('Không thể khóa file dùng chung');
            return new Promise(function (r) { setTimeout(r, LOCK_RETRY_DELAY); }).then(attempt);
          }
          qcState.writeLockToken = token;
          return token;
        });
      })
      .catch(function (e) {
        if (e && e.message) throw e;
        return _writeLockFile(token).then(function (ok) {
          if (!ok) throw new Error('Không thể tạo khóa ghi');
          qcState.writeLockToken = token;
          return token;
        });
      });
  }
  return attempt();
}

function _releaseLock() {
  if (!qcState.dirHandle) return Promise.resolve();
  var myToken = qcState.writeLockToken;
  qcState.writeLockToken = '';
  if (!myToken) return Promise.resolve();
  return _readWriteLockFile()
    .then(function (data) {
      if (!data || data.token === myToken) {
        return qcState.dirHandle.removeEntry('qc_write.lock').catch(function () { });
      }
    })
    .catch(function () { });
}

// ── Background Excel sync (JSON lock + ghi ngược SPIN) ──
function _bgSyncExcel() {
  if (!qcState.spinFileHandle) return;
  if (qcState._bgSyncRunning) return;
  qcState._bgSyncRunning = true;
  writeBackToSpinFile()
    .catch(function (e) {
      console.warn('[QC] Background Excel sync failed:', e && e.message ? e.message : e);
    })
    .finally(function () {
      qcState._bgSyncRunning = false;
    });
}

// ── Tự động sync khi mở lại extension ──
function _autoSyncOnStartup() {
  if (!qcState.spinFileHandle || !qcState.dirHandle || !qcState.spinAllRows.length) return;
  loadLocks().then(function () {
    var needsSync = _applyLocksToRows();
    if (needsSync) {
      renderImportTable();
      qcStatus('Đã tự đồng bộ lock file', 'ok');
      _bgSyncExcel(); // Ghi ngược lại Excel ở background
    }
  }).catch(function () { });
}

// ── Batch write: gom claim/unclaim → xử lý 1 lần ──
function _scheduleBatch() {
  if (qcState.batchTimer) clearTimeout(qcState.batchTimer);
  qcState.batchTimer = setTimeout(_flushBatch, 300); // 300ms (giảm từ 600ms)
}

function _flushBatch() {
  qcState.batchTimer = null;
  var batch = qcState.pendingBatch.slice();
  qcState.pendingBatch = [];
  if (!batch.length) return;
  var qcName = qcState.qcName.trim();
  if (!qcName) { qcStatus('Vui lòng điền tên QC trước', 'err'); _resetBatchBtns(batch); return; }
  if (qcState.dirHandle) { _flushBatchFast(batch, qcName); return; }   // Fast path: JSON lock
  if (qcState.spinFileHandle) { _flushBatchSlow(batch, qcName); return; } // Slow path: Excel
  qcStatus('Chưa liên kết file SPIN', 'err');
  _resetBatchBtns(batch);
}

// Fast path (~1-2s): ghi qc_locks.json + background sync Excel
function _flushBatchFast(batch, qcName) {
  _showLoadingBar(10);
  qcStatus('Đang xác nhận...', '');
  _acquireLock()
    .then(function () {
      _showLoadingBar(35);
      return loadLocks(); // Đọc JSON lock mới nhất tránh stale
    })
    .then(function () {
      _showLoadingBar(58);
      var today = new Date().toISOString().slice(0, 10);
      var claimed = [], unclaimed = [], conflicts = [], skipped = [];
      batch.forEach(function (op) {
        var lock = qcState.locks[op.recId];
        var takenBy = lock ? lock.qc : '';
        if (op.action === 'claim') {
          if (takenBy && takenBy !== qcName) {
            conflicts.push({ recId: op.recId, takenBy: takenBy });
          } else if (takenBy === qcName) {
            skipped.push(op.recId);
          } else {
            qcState.locks[op.recId] = { qc: qcName, locked_at: new Date().toISOString() };
            if (!qcState.scores[op.recId]) qcState.scores[op.recId] = _createEmptyScore();
            qcState.scores[op.recId].status = 'in-progress';
            claimed.push(op.recId);
          }
        } else if (op.action === 'unclaim') {
          if (lock && (lock.finalized || lock.adminUnlocked)) {
            skipped.push(op.recId);
          } else if (!takenBy || takenBy === qcName) {
            delete qcState.locks[op.recId];
            unclaimed.push(op.recId);
            delete qcState.scores[op.recId];
          } else {
            skipped.push(op.recId);
          }
        }
      });
      _applyLocksToRows();
      var hasChanges = claimed.length > 0 || unclaimed.length > 0;
      var res = { claimed: claimed, unclaimed: unclaimed, conflicts: conflicts, hasChanges: hasChanges };
      if (!hasChanges && !conflicts.length) return _releaseLock().then(function () { return res; });
      return saveLocks()
        .then(function (saved) {
          if (hasChanges && !saved) throw new Error('Không lưu được trạng thái nhận call');
          _showLoadingBar(82);
          return loadLocks().then(function () {
            var postConflicts = [];
            var confirmedClaimed = claimed.filter(function (recId) {
              var owner = qcState.locks[recId] && qcState.locks[recId].qc;
              if (owner === qcName) return true;
              postConflicts.push({ recId: recId, takenBy: owner || 'người khác' });
              return false;
            });
            var confirmedUnclaimed = unclaimed.filter(function (recId) {
              var owner = qcState.locks[recId] && qcState.locks[recId].qc;
              if (!owner) return true;
              postConflicts.push({ recId: recId, takenBy: owner });
              return false;
            });
            _applyLocksToRows();
            return _releaseLock().then(function () {
              return {
                claimed: confirmedClaimed,
                unclaimed: confirmedUnclaimed,
                conflicts: conflicts.concat(postConflicts),
                hasChanges: confirmedClaimed.length > 0 || confirmedUnclaimed.length > 0
              };
            });
          });
        });
    })
    .then(function (res) {
      return _finalizeBatchResult(res, qcName, { reloadLocks: true });
    })
    .then(function (res) {
      _resetBatchBtns(batch);
      qcState.selectedRecIds = {};
      renderImportTable();
      if (res.unclaimed.length > 0) {
        qcSet({ 'qc.scores': qcState.scores });
        renderExportSummary();
      }
      _schedulePersistRuntimeState();
      _renderBatchOutcome(res);
      _flashLoadingBarDone(true);
      if (res.hasChanges) _bgSyncExcel(); // Background sync Excel
    })
    .catch(function (e) {
      _releaseLock().catch(function () { });
      _flashLoadingBarDone(false);
      qcStatus('Lỗi xác nhận: ' + e.message, 'err');
      _resetBatchBtns(batch);
      if (qcState.spinFileHandle) {
        _loadSpinHandle(qcState.spinFileHandle, { silent: true })
          .catch(function () {
            loadLocks()
              .then(function () {
                _applyLocksToRows();
                renderImportTable();
              })
              .catch(function () { renderImportTable(); });
          });
        return;
      }
      loadLocks()
        .then(function () {
          _applyLocksToRows();
          renderImportTable();
        })
        .catch(function () { renderImportTable(); });
    });
}

// Slow path (fallback khi không có dirHandle): ghi thẳng vào Excel
function _flushBatchSlow(batch, qcName) {
  _showLoadingBar(10);
  qcStatus('Đang xử lý ' + batch.length + ' thao tác...', '');
  qcState.spinFileHandle.getFile()
    .then(function (file) { return parseSpinFile(file); })
    .then(function (result) {
      qcState.spinRawHeaders = result.headers;
      qcState.spinAllRows = result.allRows;
      qcState.spinData = result.rows;
      _deriveLocksFromData();
      _showLoadingBar(45);
      var today = new Date().toISOString().slice(0, 10);
      var claimed = [], unclaimed = [], conflicts = [], skipped = [];
      batch.forEach(function (op) {
        var freshRow = result.allRows.find(function (r) { return String(r['RECORDED_ID']).trim() === op.recId; });
        var takenBy = freshRow ? String(freshRow['QC SP'] || '').trim() : '';
        if (op.action === 'claim') {
          if (takenBy && takenBy !== qcName) { conflicts.push({ recId: op.recId, takenBy: takenBy }); }
          else if (takenBy === qcName) { skipped.push(op.recId); }
          else { _syncAllRows(op.recId, { 'QC SP': qcName, 'Date SP1': today }); qcState.locks[op.recId] = { qc: qcName, locked_at: new Date().toISOString() }; claimed.push(op.recId); }
        } else if (op.action === 'unclaim') {
          var lock = qcState.locks[op.recId];
          if (lock && (lock.finalized || lock.adminUnlocked)) { skipped.push(op.recId); }
          else if (!takenBy || takenBy === qcName) { _syncAllRows(op.recId, { 'QC SP': '', 'Date SP1': '' }); delete qcState.locks[op.recId]; delete qcState.scores[op.recId]; unclaimed.push(op.recId); }
          else { skipped.push(op.recId); }
        }
      });
      var hasChanges = claimed.length > 0 || unclaimed.length > 0;
      _showLoadingBar(70);
      return (hasChanges ? writeBackToSpinFile() : Promise.resolve(true))
        .then(function (saved) {
          if (hasChanges && !saved) throw new Error('Không ghi được file SPIN');
          return _finalizeBatchResult(
            { claimed: claimed, unclaimed: unclaimed, conflicts: conflicts, hasChanges: hasChanges },
            qcName,
            { reloadSpin: true }
          );
        });
    })
    .then(function (res) {
      _resetBatchBtns(batch);
      qcState.selectedRecIds = {};
      renderImportTable();
      if (res.unclaimed.length > 0) {
        qcSet({ 'qc.scores': qcState.scores });
        renderExportSummary();
      }
      _schedulePersistRuntimeState();
      _renderBatchOutcome(res);
      _flashLoadingBarDone(true);
    })
    .catch(function (e) {
      _flashLoadingBarDone(false);
      qcStatus('Lỗi batch: ' + e.message, 'err');
      _resetBatchBtns(batch);
      _loadSpinHandle(qcState.spinFileHandle, { silent: true })
        .catch(function () { renderImportTable(); });
    });
}

function _resetBatchBtns(batch) {
  batch.forEach(function (op) {
    var triggerEl = op.triggerEl || op.btn;
    if (triggerEl && triggerEl.parentNode) {
      if ('disabled' in triggerEl) triggerEl.disabled = false;
      triggerEl.style.opacity = '';
      triggerEl.style.cursor = '';
      triggerEl.style.pointerEvents = '';
    }
  });
}

function _pruneSelectedRecIds() {
  var valid = {};
  qcState.spinData.forEach(function (r) {
    var recId = String(r['RECORDED_ID'] || '').trim();
    if (recId) valid[recId] = true;
  });
  Object.keys(qcState.selectedRecIds || {}).forEach(function (recId) {
    if (!valid[recId]) delete qcState.selectedRecIds[recId];
  });
}

function _normalizeHeaderKey(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function _resolveDataDateColumnKey(row) {
  var keys = (qcState.spinRawHeaders && qcState.spinRawHeaders.length)
    ? qcState.spinRawHeaders.slice()
    : Object.keys(row || {});
  var exactTargets = ['ngaylaydata', 'ngaylaydl', 'ngaylaydulieu'];
  var partialTargets = ['ngaylaydata', 'laydata'];
  var i;

  for (i = 0; i < exactTargets.length; i++) {
    var exactTarget = exactTargets[i];
    var exactMatch = keys.find(function (key) {
      return _normalizeHeaderKey(key) === exactTarget;
    });
    if (exactMatch) return exactMatch;
  }

  for (i = 0; i < partialTargets.length; i++) {
    var partialTarget = partialTargets[i];
    var partialMatch = keys.find(function (key) {
      return _normalizeHeaderKey(key).indexOf(partialTarget) >= 0;
    });
    if (partialMatch) return partialMatch;
  }

  return '';
}

function _pad2(num) {
  return String(num).padStart(2, '0');
}

function _excelSerialToDateString(value) {
  if (typeof XLSX === 'undefined' || !XLSX.SSF || typeof XLSX.SSF.parse_date_code !== 'function') return '';
  var parsed = XLSX.SSF.parse_date_code(value);
  if (!parsed || !parsed.y || !parsed.m || !parsed.d) return '';
  return [parsed.y, _pad2(parsed.m), _pad2(parsed.d)].join('-');
}

function _normalizeDateFilterValue(value) {
  if (value === null || value === undefined || value === '') return '';
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return [value.getFullYear(), _pad2(value.getMonth() + 1), _pad2(value.getDate())].join('-');
  }

  if (typeof value === 'number' && isFinite(value)) {
    return _excelSerialToDateString(value);
  }

  var text = String(value).trim();
  if (!text) return '';

  if (/^\d+(\.\d+)?$/.test(text)) {
    var numeric = Number(text);
    if (isFinite(numeric)) {
      var fromSerial = _excelSerialToDateString(numeric);
      if (fromSerial) return fromSerial;
    }
  }

  var isoMatch = text.match(/(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);
  if (isoMatch) {
    return [isoMatch[1], _pad2(isoMatch[2]), _pad2(isoMatch[3])].join('-');
  }

  var dmyMatch = text.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
  if (dmyMatch) {
    var year = dmyMatch[3];
    if (year.length === 2) year = String(Number(year) + 2000);
    return [year, _pad2(dmyMatch[2]), _pad2(dmyMatch[1])].join('-');
  }

  var parsedDate = new Date(text);
  if (!isNaN(parsedDate.getTime())) {
    return [parsedDate.getFullYear(), _pad2(parsedDate.getMonth() + 1), _pad2(parsedDate.getDate())].join('-');
  }

  return '';
}

function _getRowDataDate(row) {
  var key = _resolveDataDateColumnKey(row);
  if (!key) return '';
  return _normalizeDateFilterValue(row ? row[key] : '');
}

function _updateDataDateFilterUi() {
  var input = document.getElementById('qcFilterDataDate');
  if (!input) return;
  var columnKey = _resolveDataDateColumnKey((qcState.spinData && qcState.spinData[0]) || null);
  var hasColumn = !!columnKey;
  input.disabled = !hasColumn;
  if (!hasColumn) input.value = '';
  input.title = hasColumn
    ? 'Lọc theo cột "' + columnKey + '"'
    : 'File SPIN hiện tại không có cột "Ngày lấy data"';
}

function _getFilteredRows() {
  var filterUser = (document.getElementById('qcFilterUser') || {}).value || '';
  var filterTeam = (document.getElementById('qcFilterTeam') || {}).value || '';
  var filterDataDate = (document.getElementById('qcFilterDataDate') || {}).value || '';
  var myName = (qcState.qcName || '').trim();
  var rows = qcState.spinData || [];
  // Hiện: open (chưa ai lấy) + call của mình đã lấy
  rows = rows.filter(function (r) {
    var recId = String(r['RECORDED_ID'] || '').trim();
    var lock = qcState.locks[recId] || (r['QC SP'] ? { qc: r['QC SP'] } : null);
    if (!lock) return true; // open
    if (myName && lock.qc === myName) return true; // của mình
    return false; // ẩn call của người khác
  });
  if (filterUser) rows = rows.filter(function (r) { return String(r['USER'] || '').toLowerCase().includes(filterUser.toLowerCase()); });
  if (filterTeam) rows = rows.filter(function (r) { return String(r['Team'] || '').toLowerCase().includes(filterTeam.toLowerCase()); });
  if (filterDataDate) rows = rows.filter(function (r) { return _getRowDataDate(r) === filterDataDate; });
  return rows;
}

function _selectedStats() {
  var myName = qcState.qcName.trim();
  var stats = { total: 0, canClaim: 0, canUnclaim: 0 };
  Object.keys(qcState.selectedRecIds || {}).forEach(function (recId) {
    if (!qcState.selectedRecIds[recId]) return;
    var r = qcState.spinData.find(function (row) { return String(row['RECORDED_ID'] || '').trim() === recId; });
    if (!r) return;
    stats.total++;
    var lock = qcState.locks[recId] || (r['QC SP'] ? { qc: r['QC SP'] } : null);
    if (!lock) stats.canClaim++;
    else if (myName && lock.qc === myName && !lock.finalized && !lock.adminUnlocked) stats.canUnclaim++;
  });
  return stats;
}

function _updateBulkSelectionUi() {
  var countEl = document.getElementById('qcBulkCount');
  var selectBtn = document.getElementById('qcBulkSelectVisibleBtn');
  var claimBtn = document.getElementById('qcBulkClaimBtn');
  var unclaimBtn = document.getElementById('qcBulkUnclaimBtn');
  var stats = _selectedStats();
  if (countEl) countEl.textContent = 'Tick: ' + stats.total;
  if (selectBtn) selectBtn.textContent = stats.total ? 'Tick +' : 'Tick';
  if (claimBtn) claimBtn.disabled = stats.canClaim === 0;
  if (unclaimBtn) unclaimBtn.disabled = stats.canUnclaim === 0;
}

function _runBulkAction(action) {
  var stats = _selectedStats();
  var myName = qcState.qcName.trim();
  if (!myName) { qcStatus('Vui lòng điền tên QC trước', 'err'); return; }
  var ops = [];
  if (action === 'claim') {
    if (!stats.total) { qcStatus('Chưa tick call nào', 'err'); return; }
    Object.keys(qcState.selectedRecIds || {}).forEach(function (recId) {
      if (!qcState.selectedRecIds[recId]) return;
      var r = qcState.spinData.find(function (row) { return String(row['RECORDED_ID'] || '').trim() === recId; });
      if (!r) return;
      var lock = qcState.locks[recId] || (r['QC SP'] ? { qc: r['QC SP'] } : null);
      if (!lock) ops.push({ action: 'claim', recId: recId, btn: null });
    });
  } else if (action === 'unclaim') {
    if (!stats.total) { qcStatus('Chưa tick call nào', 'err'); return; }
    Object.keys(qcState.selectedRecIds || {}).forEach(function (recId) {
      if (!qcState.selectedRecIds[recId]) return;
      var r = qcState.spinData.find(function (row) { return String(row['RECORDED_ID'] || '').trim() === recId; });
      if (!r) return;
      var lock = qcState.locks[recId] || (r['QC SP'] ? { qc: r['QC SP'] } : null);
      if (lock && lock.qc === myName && !lock.finalized && !lock.adminUnlocked) ops.push({ action: 'unclaim', recId: recId, btn: null });
    });
  }
  if (!ops.length) {
    qcStatus(action === 'claim' ? 'Không có call trống để nhận' : 'Không có call của bạn để trả', 'err');
    return;
  }
  qcState.pendingBatch = ops;
  _flushBatch(); // flush ngay để giảm round-trip ghi HDD dùng chung
}

// ── IndexedDB: persist FileSystemDirectoryHandle across sessions ──
function _idbOpen() {
  return new Promise(function (resolve, reject) {
    var req = indexedDB.open('qcPanel_v1', 1);
    req.onupgradeneeded = function (e) { e.target.result.createObjectStore('handles'); };
    req.onsuccess = function (e) { resolve(e.target.result); };
    req.onerror = function () { reject(req.error); };
  });
}
function idbSaveHandle(key, handle) {
  return _idbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction('handles', 'readwrite');
      tx.objectStore('handles').put(handle, key);
      tx.oncomplete = resolve;
      tx.onerror = function () { reject(tx.error); };
    });
  }).catch(function () { }); // silent fail
}
function idbGetHandle(key) {
  return _idbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction('handles', 'readonly');
      var req = tx.objectStore('handles').get(key);
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { reject(req.error); };
    });
  }).catch(function () { return null; });
}
function idbDeleteHandle(key) {
  return _idbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction('handles', 'readwrite');
      tx.objectStore('handles').delete(key);
      tx.oncomplete = resolve;
      tx.onerror = function () { reject(tx.error); };
    });
  }).catch(function () { });
}

// ── Status ──
function qcStatus(msg, type) {
  var el = document.getElementById('qcStatus');
  if (!el) return;
  el.innerHTML = msg;
  el.className = 'qc-status' + (type ? ' ' + type : '');
}

function _setWorkingDirectoryHandle(dirHandle) {
  qcState.dirHandle = dirHandle || null;
  qcState.savedDirHandle = dirHandle || qcState.savedDirHandle;
  if (dirHandle) {
    idbSaveHandle('dataFolder', dirHandle);
  }
  _startLiveSyncWatcher();
}

function _clearWorkingDirectoryHandle(forgetSaved) {
  qcState.dirHandle = null;
  qcState.locksFileStamp = '';
  qcState.writeLockToken = '';
  if (forgetSaved) {
    qcState.savedDirHandle = null;
    idbDeleteHandle('dataFolder');
  }
  _startLiveSyncWatcher();
}

function _setSpinHandle(handle) {
  qcState.spinFileHandle = handle || null;
  qcState.spinFileName = handle ? handle.name : '';
  qcState.savedSpinHandle = handle || qcState.savedSpinHandle;
  if (handle) idbSaveHandle('spinFile', handle);
  var refreshBtn = document.getElementById('qcRefreshBtn');
  if (refreshBtn) {
    refreshBtn.title = handle ? ('Đọc lại file SPIN: ' + handle.name) : 'Đọc lại file SPIN';
    refreshBtn.setAttribute('aria-label', refreshBtn.title);
  }
  _schedulePersistRuntimeState();
  _startLiveSyncWatcher();
}

function _setExportDirectoryHandle(handle) {
  qcState.exportDirHandle = handle || null;
  qcState.savedExportHandle = handle || qcState.savedExportHandle;
  qcState.exportFileName = qcState.exportFileName || 'ket_qua_QC.xlsx';
  if (handle) {
    qcState.exportFolderName = handle.name || qcState.exportFolderName;
    idbSaveHandle('exportFile', handle);
    _updateFolderStatus('qcExportFolderStatus', qcState.exportFolderName || handle.name);
  } else {
    _updateFolderStatus('qcExportFolderStatus', qcState.exportFolderName || 'Chưa chọn');
  }
  _persistRuntimeStateNow();
}

// Mở picker chọn thư mục để qc_locks.json có thể ghi (khi dùng file picker)
function _promptDirForLocks(spinHandle) {
  if (!window.showDirectoryPicker) return;
  var opts = { mode: 'readwrite' };
  if (spinHandle) opts.startIn = spinHandle;
  qcStatus('Chọn thư mục lưu qc_locks.json...', '');
  window.showDirectoryPicker(opts).then(function (dh) {
    return _requestHandlePermission(dh, true).then(function (ok) {
      if (ok) {
        _setWorkingDirectoryHandle(dh);
        qcStatus('Đã chọn thư mục: ' + dh.name, 'ok');
      }
    });
  }).catch(function () {});
}

function _findRecordByRecId(recId) {
  if (!recId) return null;
  var wanted = String(recId).trim();
  return qcState.spinData.find(function (row) { return String(row['RECORDED_ID'] || '').trim() === wanted; }) ||
    qcState.spinAllRows.find(function (row) { return String(row['RECORDED_ID'] || '').trim() === wanted; }) ||
    (qcState.scores[wanted] ? { RECORDED_ID: wanted, USER: '', Team: '', DURATION: '' } : null);
}

function _rebuildSpinDataFromAllRows() {
  qcState.spinData = qcState.spinAllRows.filter(function (r) {
    if (!r['RECORDED_ID'] || !String(r['RECORDED_ID']).trim()) return false;
    return String(r['Chấm'] || '').trim().toLowerCase() === 'qc';
  });
}

function _applyLocksToRows() {
  if (!qcState.spinAllRows.length) return false;
  var today = new Date().toISOString().slice(0, 10);
  var changed = false;
  qcState.spinAllRows.forEach(function (r) {
    var recId = String(r['RECORDED_ID'] || '').trim();
    if (!recId) return;
    var lock = qcState.locks[recId];
    if (lock && lock.qc) {
      var nextDate = lock.locked_at ? String(lock.locked_at).slice(0, 10) : today;
      if (String(r['QC SP'] || '').trim() !== lock.qc) {
        r['QC SP'] = lock.qc;
        changed = true;
      }
      if (String(r['Date SP1'] || '').trim() !== nextDate) {
        r['Date SP1'] = nextDate;
        changed = true;
      }
      return;
    }
    if (String(r['QC SP'] || '').trim()) {
      r['QC SP'] = '';
      changed = true;
    }
    if (String(r['Date SP1'] || '').trim()) {
      r['Date SP1'] = '';
      changed = true;
    }
  });
  _rebuildSpinDataFromAllRows();
  return changed;
}

function _findRecordRow(recId) {
  var targetId = String(recId || '').trim();
  if (!targetId) return null;
  var row = (qcState.spinData || []).find(function (r) {
    return String(r['RECORDED_ID'] || '').trim() === targetId;
  });
  if (row) return row;
  return (qcState.spinAllRows || []).find(function (r) {
    return String(r['RECORDED_ID'] || '').trim() === targetId;
  }) || null;
}

function _getRecordOwner(recId) {
  var targetId = String(recId || '').trim();
  if (!targetId) return '';
  var lock = qcState.locks[targetId];
  var lockOwner = lock && lock.qc ? String(lock.qc).trim() : '';
  var row = _findRecordRow(targetId);
  var rowOwner = row ? String(row['QC SP'] || '').trim() : '';
  if (qcState.dirHandle) return lockOwner || rowOwner;
  return rowOwner || lockOwner;
}

function _dedupeConflicts(conflicts) {
  var list = [];
  var seen = {};
  (conflicts || []).forEach(function (c) {
    if (!c || !c.recId) return;
    var recId = String(c.recId).trim();
    if (!recId) return;
    var takenBy = String(c.takenBy || c.qc || 'người khác').trim() || 'người khác';
    if (seen[recId]) {
      if (seen[recId].takenBy === 'người khác' && takenBy !== 'người khác') {
        seen[recId].takenBy = takenBy;
      }
      return;
    }
    var item = { recId: recId, takenBy: takenBy };
    seen[recId] = item;
    list.push(item);
  });
  return list;
}

function _normalizeBatchResult(res, qcName) {
  var next = {
    claimed: [],
    unclaimed: [],
    conflicts: _dedupeConflicts(res && res.conflicts)
  };

  ((res && res.claimed) || []).forEach(function (recId) {
    var owner = _getRecordOwner(recId);
    if (owner === qcName) {
      next.claimed.push(recId);
      return;
    }
    if (owner) next.conflicts.push({ recId: recId, takenBy: owner });
  });

  ((res && res.unclaimed) || []).forEach(function (recId) {
    var owner = _getRecordOwner(recId);
    if (!owner) {
      next.unclaimed.push(recId);
      return;
    }
    next.conflicts.push({ recId: recId, takenBy: owner });
  });

  next.conflicts = _dedupeConflicts(next.conflicts);
  next.hasChanges = next.claimed.length > 0 || next.unclaimed.length > 0;
  return next;
}

function _finalizeBatchResult(res, qcName, options) {
  var opts = options || {};
  var refreshTask = Promise.resolve();

  if (opts.reloadSpin && qcState.spinFileHandle) {
    refreshTask = _loadSpinHandle(qcState.spinFileHandle, { silent: true }).catch(function () { return false; });
  } else if (opts.reloadLocks && qcState.dirHandle) {
    refreshTask = loadLocks()
      .then(function () { _applyLocksToRows(); })
      .catch(function () { return false; });
  }

  return refreshTask.then(function () {
    return _normalizeBatchResult(res, qcName);
  });
}

function _renderBatchOutcome(res) {
  var msgs = [];
  if (res.claimed.length) msgs.push('<span style="vertical-align:-2px">' + QC_ICONS.check + '</span> Nhận ' + res.claimed.length + ' call');
  if (res.unclaimed.length) msgs.push('<span style="vertical-align:-2px">' + QC_ICONS.undo + '</span> Trả ' + res.unclaimed.length + ' call');

  var successText = msgs.map(function (m) { return m.replace(/<[^>]+>/g, ''); }).join(' | ');
  var conflictText = '';
  if (res.conflicts.length === 1) {
    conflictText = 'Call hiện đang do ' + res.conflicts[0].takenBy + ' giữ';
  } else if (res.conflicts.length > 1) {
    conflictText = res.conflicts.length + ' call đã có người giữ';
  }

  if (msgs.length) {
    showQcToast('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><polyline points="20 6 9 17 4 12"/></svg>' + msgs.join(' &nbsp;|&nbsp; '));
    qcStatus(conflictText ? (successText + ' | ' + conflictText) : successText, conflictText ? 'warn' : 'ok');
  } else if (conflictText) {
    qcStatus(conflictText, 'err');
  } else if (!res.hasChanges && !res.conflicts.length) {
    qcStatus('Không có thay đổi', '');
  }

  res.conflicts.forEach(function (c) {
    showQcToast(QC_SVG.warn.replace('stroke="currentColor"', 'stroke="#fff"').replace('margin-right:5px', 'margin-right:4px') + 'Call này đang do <b>' + c.takenBy + '</b>&nbsp;giữ: ' + c.recId.slice(0, 14) + '…', 'err');
  });
}

// ── Inner tab switching ──
function initQcTabs() {
  ['qcTabImport', 'qcTabScore', 'qcTabExport'].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', function () { switchQcTab(id); });
  });
}
function switchQcTab(tabId) {
  qcState.activeTabId = tabId;
  var map = { qcTabImport: 'qcImportSection', qcTabScore: 'qcScoreSection', qcTabExport: 'qcExportSection' };
  ['qcTabImport', 'qcTabScore', 'qcTabExport'].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.classList.toggle('active', id === tabId);
  });
  Object.keys(map).forEach(function (k) {
    var s = document.getElementById(map[k]);
    if (s) s.classList.toggle('active', k === tabId);
  });
  if (tabId === 'qcTabExport') renderExportSummary();
  _schedulePersistRuntimeState();
}

// ── Parse SPIN xlsx ──
function parseSpinFile(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var data = new Uint8Array(e.target.result);
        var wb = XLSX.read(data, { type: 'array', cellDates: false, cellNF: false, sheetStubs: false, dense: true });
        var ws = wb.Sheets[wb.SheetNames[0]];
        var rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        if (rows.length < 2) return reject(new Error('File không có dữ liệu'));
        var headers = rows[0].map(function (h) { return String(h).trim(); });
        var allRows = rows.slice(1).map(function (row) {
          var obj = {};
          headers.forEach(function (h, i) { obj[h] = (row[i] !== undefined) ? row[i] : ''; });
          return obj;
        });
        var filteredRows = allRows.filter(function (r) {
          if (!r['RECORDED_ID'] || !String(r['RECORDED_ID']).trim()) return false;
          return String(r['Chấm'] || '').trim().toLowerCase() === 'qc';
        });
        resolve({ headers: headers, allRows: allRows, rows: filteredRows });
      } catch (err) { reject(err); }
    };
    reader.onerror = function () { reject(new Error('Không đọc được file')); };
    reader.readAsArrayBuffer(file);
  });
}

// ── Derive locks từ cột "QC SP" trong spinData ──
function _deriveLocksFromData() {
  qcState.locks = {};
  qcState.spinData.forEach(function (r) {
    if (r['QC SP'] && String(r['QC SP']).trim()) {
      var recId = String(r['RECORDED_ID']).trim();
      qcState.locks[recId] = { qc: String(r['QC SP']).trim(), locked_at: r['Date SP1'] || '' };
    }
  });
}

// ── Áp kết quả parse vào state ──
function _applyParsedResult(result, fileName) {
  qcState.spinRawHeaders = result.headers;
  qcState.spinAllRows = result.allRows;
  qcState.spinData = result.rows;
  _deriveLocksFromData();
  var refreshBtn = document.getElementById('qcRefreshBtn');
  if (refreshBtn) {
    refreshBtn.title = fileName ? ('Đọc lại file SPIN: ' + fileName) : 'Đọc lại file SPIN';
    refreshBtn.setAttribute('aria-label', refreshBtn.title);
  }
  _updateDataDateFilterUi();
  renderImportTable();
  qcStatus('Đã load ' + result.rows.length + ' records (QC) / ' + result.allRows.length + ' tổng', 'ok');
}

function _listSpinFilesInDirectory(dirHandle) {
  return (async function () {
    var files = [];
    for await (var entry of dirHandle.entries()) {
      var name = entry[0];
      var handle = entry[1];
      if (handle.kind !== 'file') continue;
      if (!/\.xlsx$/i.test(name) || /^~\$/i.test(name)) continue;
      files.push({ name: name, handle: handle });
    }
    files.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return files;
  })();
}

function showQcChoiceDialog(title, subtitle, options) {
  return new Promise(function (resolve) {
    var config = (title && typeof title === 'object' && !Array.isArray(title))
      ? title
      : { title: title, subtitle: subtitle, options: options };
    var currentTheme = _getThemeById(qcState.themeId);
    var dialogTitle = config.title || '';
    var dialogSubtitle = config.subtitle || '';
    var dialogOptions = config.options || [];
    var dialogIcon = config.icon || QC_ICONS.folder;
    var dialogHeaderBg = config.headerBg || currentTheme.headerBg;
    var old = document.getElementById('qcChoiceOverlay');
    if (old) old.remove();
    var overlay = document.createElement('div');
    overlay.id = 'qcChoiceOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9998;display:flex;align-items:center;justify-content:center;padding:16px;animation:qcFadeIn .18s ease';
    overlay.innerHTML =
      '<div style="background:#fff;border-radius:14px;width:100%;max-width:360px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden">' +
      '<div style="background:' + dialogHeaderBg + ';color:#fff;padding:12px 16px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px">' +
      dialogIcon + dialogTitle +
      '</div>' +
      '<div style="padding:12px 16px 4px;font-size:12px;color:#64748b">' + dialogSubtitle + '</div>' +
      '<div style="padding:0 16px 12px;display:flex;flex-direction:column;gap:8px;max-height:280px;overflow-y:auto">' +
      dialogOptions.map(function (opt, idx) {
        return '<button type="button" data-choice-index="' + idx + '" style="border:1px solid ' + (opt.selected ? currentTheme.borderAccent : '#dbe5e1') + ';background:' + (opt.selected ? currentTheme.selectedBg : '#fff') + ';border-radius:12px;padding:10px 12px;text-align:left;font-size:12px;color:#334155;cursor:pointer;display:flex;align-items:center;gap:10px">' +
          (opt.swatch ? '<span style="width:28px;height:28px;border-radius:10px;background:' + opt.swatch + ';box-shadow:inset 0 0 0 1px rgba(255,255,255,.28),0 6px 12px rgba(15,23,42,.12);flex-shrink:0"></span>' : '') +
          '<span style="flex:1;min-width:0">' +
          '<div style="font-weight:700;color:#1f3a33">' + opt.label + '</div>' +
          (opt.description ? '<div style="margin-top:3px;font-size:11px;color:#64748b">' + opt.description + '</div>' : '') +
          '</span>' +
          (opt.selected ? '<span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:999px;background:' + currentTheme.headerBg + ';color:#fff;flex-shrink:0">' + QC_ICONS.check + '</span>' : '') +
          '</button>';
      }).join('') +
      '</div>' +
      '<div style="padding:10px 16px;border-top:1px solid #e2e8f0;background:#f8fafc">' +
      '<button id="qcChoiceCancel" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#475569;font-size:12px;font-weight:600;cursor:pointer">Hủy</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    if (!document.getElementById('qcKeyframes')) {
      var st = document.createElement('style'); st.id = 'qcKeyframes';
      st.textContent = '@keyframes qcFadeIn{from{opacity:0}to{opacity:1}}';
      document.head.appendChild(st);
    }
    function close(value) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity .15s';
      setTimeout(function () { overlay.remove(); resolve(value || null); }, 150);
    }
    overlay.querySelectorAll('[data-choice-index]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        close(dialogOptions[parseInt(btn.dataset.choiceIndex, 10)] || null);
      });
    });
    document.getElementById('qcChoiceCancel').addEventListener('click', function () { close(null); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(null); });
  });
}

function _chooseSpinFileFromDirectory(dirHandle) {
  return _listSpinFilesInDirectory(dirHandle).then(function (files) {
    if (!files.length) throw new Error('Thư mục này chưa có file .xlsx để làm SPIN');
    if (qcState.spinFileName) {
      files.sort(function (a, b) {
        if (a.name === qcState.spinFileName) return -1;
        if (b.name === qcState.spinFileName) return 1;
        return a.name.localeCompare(b.name);
      });
    }
    if (files.length === 1) return files[0].handle;
    return showQcChoiceDialog(
      'Chọn file SPIN',
      'Thư mục có ' + files.length + ' file Excel. Chọn file SPIN cần dùng.',
      files.map(function (file, idx) {
        return {
          label: file.name,
          handle: file.handle,
          description: idx === 0 && file.name === qcState.spinFileName ? 'File đang dùng lần trước' : ''
        };
      })
    ).then(function (choice) {
      if (!choice || !choice.handle) {
        var abortErr = new Error('Đã hủy chọn file SPIN');
        abortErr.name = 'AbortError';
        throw abortErr;
      }
      return choice.handle;
    });
  });
}

function _resolveLoadSpinOptions(successMsgOrOptions) {
  if (successMsgOrOptions && typeof successMsgOrOptions === 'object') return successMsgOrOptions;
  return { successMsg: successMsgOrOptions || '' };
}

function _loadSpinHandle(handle, successMsgOrOptions) {
  var options = _resolveLoadSpinOptions(successMsgOrOptions);
  _setSpinHandle(handle);
  if (!options.silent) {
    qcStatus(options.loadingMsg || 'Đang đọc file...', '');
    _showLoadingBar(20);
  }
  return handle.getFile()
    .then(function (file) {
      _rememberSpinFileStamp(file);
      return parseSpinFile(file).then(function (result) {
        if (!options.silent) _showLoadingBar(65);
        _applyParsedResult(result, handle.name || file.name);
        return loadLocks().then(function () {
          _applyLocksToRows();
          renderImportTable();
          _restoreCurrentRecordView();
          if (!options.silent) _hideLoadingBar();
          if (options.successMsg) qcStatus(options.successMsg, 'ok');
        });
      });
    })
    .catch(function (e) {
      if (!options.silent) _hideLoadingBar();
      throw e;
    });
}

function _tryReconnectSavedHandles() {
  var spinH = qcState.savedSpinHandle || qcState.spinFileHandle;
  var dirH = qcState.savedDirHandle || qcState.dirHandle;
  var reconnected = false;

  return Promise.resolve()
    .then(function () {
      if (!dirH) return false;
      return _requestHandlePermission(dirH, true).then(function (ok) {
        if (ok) {
          _setWorkingDirectoryHandle(dirH);
          reconnected = true;
        }
        return ok;
      });
    })
    .then(function () {
      if (!spinH) return false;
      return _requestHandlePermission(spinH, true).then(function (ok) {
        if (!ok) return false;
        return _loadSpinHandle(spinH, 'Đã kết nối lại SPIN đã lưu').then(function () {
          reconnected = true;
          return true;
        });
      });
    })
    .then(function (spinOk) {
      if (spinOk) return true;
      if (dirH && qcState.dirHandle) {
        return _restoreSpinFromDirectory(qcState.dirHandle).then(function (ok) {
          if (ok) reconnected = true;
          return ok;
        });
      }
      return reconnected;
    })
    .catch(function () { return false; });
}

function pickSpinAndDataFolder() {
  return window.showDirectoryPicker({ mode: 'readwrite' })
    .then(function (dirHandle) {
      _setWorkingDirectoryHandle(dirHandle);
      qcStatus('Đang quét file SPIN...', '');
      return _chooseSpinFileFromDirectory(dirHandle).then(function (spinHandle) {
        return _loadSpinHandle(spinHandle, 'Đã liên kết SPIN + thư mục làm việc: ' + dirHandle.name);
      });
    })
    .catch(function (e) {
    if (e.name !== 'AbortError') qcStatus('Lỗi: ' + e.message, 'err');
  });
}

function pickSpinFile() {
  if (!window.showOpenFilePicker) {
    return pickSpinAndDataFolder();
  }

  var pickerOptions = {
    multiple: false,
    types: [{
      description: 'Excel Workbook',
      accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }
    }]
  };

  var startHandle = qcState.savedSpinHandle || qcState.spinFileHandle || qcState.savedDirHandle || qcState.dirHandle;
  if (startHandle) pickerOptions.startIn = startHandle;

  return window.showOpenFilePicker(pickerOptions)
    .then(function (handles) {
      var spinHandle = handles && handles[0];
      if (!spinHandle) return false;

      qcStatus('Đang mở file SPIN...', '');
      _clearWorkingDirectoryHandle(true);

      return _requestHandlePermission(spinHandle, true)
        .then(function (ok) {
          return _loadSpinHandle(
            spinHandle,
            ok
              ? ('Đã liên kết file SPIN: ' + spinHandle.name)
              : ('Đã mở file SPIN: ' + spinHandle.name + ' (chưa cấp quyền ghi)')
          ).then(function () {
            if (!ok) {
              qcStatus('Đã mở file SPIN: ' + spinHandle.name + ' (chưa cấp quyền ghi)', 'warn');
            }
            // Nếu chưa có dirHandle (dùng file picker), mở picker chọn thư mục
            // để qc_locks.json + qc_write.lock có thể ghi được
            if (!qcState.dirHandle) {
              var savedDirH = qcState.savedDirHandle;
              if (savedDirH) {
                return _requestHandlePermission(savedDirH, true).then(function (dirOk) {
                  if (dirOk) _setWorkingDirectoryHandle(savedDirH);
                  else _promptDirForLocks(spinHandle);
                  return true;
                });
              } else {
                _promptDirForLocks(spinHandle);
              }
            }
            return true;
          });
        });
    })
    .catch(function (e) {
      if (e.name !== 'AbortError') qcStatus('Lỗi: ' + e.message, 'err');
      return false;
    });
}

function _resolveReloadSpinOptions(options) {
  if (!options || typeof options !== 'object') return { auto: false };
  return options;
}

// ── Reload từ spinFileHandle đã lưu (nút Refresh) ──
function reloadSpinFile(options) {
  var opts = _resolveReloadSpinOptions(options);
  var spinH = qcState.spinFileHandle || qcState.savedSpinHandle;
  var hasSavedLocation = !!(spinH || qcState.savedDirHandle || qcState.dirHandle);

  if (!hasSavedLocation) {
    if (!opts.auto) qcStatus('Chưa có file SPIN đã lưu. Hãy bấm Chọn SPIN trước', 'err');
    return Promise.resolve(false);
  }

  if (!opts.auto) qcStatus('Đang tìm file SPIN đã lưu...', '');

  function reconnectSavedSpin() {
    return _tryReconnectSavedHandles().then(function (ok) {
      if (!ok || !qcState.spinFileHandle) {
        if (!opts.auto) {
          qcStatus('Không tìm lại được file SPIN đã lưu. Hãy bấm Chọn SPIN để liên kết lại', 'err');
        }
        return false;
      }
      return true;
    });
  }

  if (!spinH) {
    return reconnectSavedSpin();
  }

  return _requestHandlePermission(spinH, true)
    .then(function (ok) {
      if (!ok) return reconnectSavedSpin();
      if (!opts.auto) qcStatus('Đang tải lại dữ liệu...', '');
      return _loadSpinHandle(spinH, 'Đã tải lại dữ liệu').then(function () { return true; });
    })
    .catch(function () {
      return reconnectSavedSpin();
    })
    .catch(function (e) {
      if (!opts.auto) qcStatus('Lỗi tải lại SPIN: ' + e.message, 'err');
      return false;
    });
}

function _autoReloadSpinOnOpen() {
  var hasSavedLocation = !!(qcState.spinFileHandle || qcState.savedSpinHandle || qcState.savedDirHandle || qcState.dirHandle);
  if (!hasSavedLocation) return Promise.resolve(false);
  return reloadSpinFile({ auto: true }).catch(function () { return false; });
}

function _isQcMainPanelActive() {
  var panel = document.getElementById('qcPanel');
  var btn = document.getElementById('mainTabQc');
  return !!(
    (panel && panel.classList.contains('active')) ||
    (btn && btn.classList.contains('active'))
  );
}

function requestQcPanelAutoReload(options) {
  var opts = options || {};
  var force = !!opts.force;
  var minGapMs = typeof opts.minGapMs === 'number' ? opts.minGapMs : 1500;
  var hasSavedLocation = !!(qcState.spinFileHandle || qcState.savedSpinHandle || qcState.savedDirHandle || qcState.dirHandle);
  if (!hasSavedLocation || !_isQcMainPanelActive()) return Promise.resolve(false);

  if (!force) {
    if (qcState.autoReloadInFlight) return qcState.autoReloadInFlight;
    if (qcState.lastAutoReloadAt && (Date.now() - qcState.lastAutoReloadAt) < minGapMs) {
      return Promise.resolve(false);
    }
  }

  qcState.lastAutoReloadAt = Date.now();
  var task = _autoReloadSpinOnOpen()
    .catch(function () { return false; })
    .finally(function () {
      if (qcState.autoReloadInFlight === task) qcState.autoReloadInFlight = null;
    });
  qcState.autoReloadInFlight = task;
  return task;
}

function _bindQcAutoReloadWakeEvents() {
  if (qcState.autoReloadWakeBound) return;
  qcState.autoReloadWakeBound = true;

  window.addEventListener('focus', function () {
    requestQcPanelAutoReload({ minGapMs: 1500 }).catch(function () { });
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      requestQcPanelAutoReload({ minGapMs: 1500 }).catch(function () { });
    }
  });

  // Lắng nghe signal từ admin page (mở khóa qua localStorage)
  window.addEventListener('storage', function (e) {
    if (e.key === 'qc.adminUnlock' && e.newValue) {
      try {
        var data = JSON.parse(e.newValue);
        if (data.recId) {
          // Cập nhật sc.status trong bộ nhớ
          if (qcState.scores[data.recId]) {
            qcState.scores[data.recId].status = 'admin-unlocked';
          }
          // Đánh dấu adminUnlocked trên lock local
          if (qcState.locks[data.recId]) {
            qcState.locks[data.recId].adminUnlocked = true;
          }
          // Reload locks từ file nếu có dirHandle
          var reloadPromise = qcState.dirHandle
            ? loadLocks().then(function () { _applyLocksToRows(); })
            : Promise.resolve();
          reloadPromise.then(function () {
            renderImportTable();
            showQcToast('Admin đã mở khóa: ' + data.recId.slice(0, 20) + '…');
          });
        }
      } catch (err) {}
    }
  });
}

// ── Ghi ngược lại file SPIN gốc ──
function writeBackToSpinFile() {
  if (!qcState.spinFileHandle) { qcStatus('Chưa liên kết file SPIN', 'err'); return Promise.resolve(false); }
  try {
    var headers = qcState.spinRawHeaders;
    var wsData = [headers];
    qcState.spinAllRows.forEach(function (r) {
      wsData.push(headers.map(function (h) { return r[h] !== undefined ? r[h] : ''; }));
    });
    var ws = XLSX.utils.aoa_to_sheet(wsData);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    var blob = new Blob([wbout], { type: 'application/octet-stream' });
    qcState.suppressNextSpinWatch = true;
    return qcState.spinFileHandle.createWritable()
      .then(function (w) { return w.write(blob).then(function () { return w.close(); }); })
      .then(function () {
        return qcState.spinFileHandle.getFile()
          .then(function (file) { _rememberSpinFileStamp(file); })
          .catch(function () { })
          .then(function () {
            qcState.suppressNextSpinWatch = false;
            return true;
          });
      })
      .catch(function (e) {
        qcState.suppressNextSpinWatch = false;
        qcStatus('Lỗi ghi file SPIN: ' + e.message, 'err');
        return false;
      });
  } catch (e) {
    qcState.suppressNextSpinWatch = false;
    qcStatus('Lỗi: ' + e.message, 'err');
    return Promise.resolve(false);
  }
}

function pickExportFolder() {
  if (!window.showDirectoryPicker) {
    qcStatus('Trình duyệt không hỗ trợ chọn thư mục xuất', 'err');
    return Promise.resolve(null);
  }

  var pickerOptions = { mode: 'readwrite' };
  var startInHandle = qcState.exportDirHandle || qcState.savedExportHandle || qcState.dirHandle || qcState.savedDirHandle;
  if (startInHandle) pickerOptions.startIn = startInHandle;

  return window.showDirectoryPicker(pickerOptions)
    .then(function (handle) {
      return _requestHandlePermission(handle, true).then(function (ok) {
        if (!ok) {
          qcStatus('Chưa cấp quyền ghi cho thư mục xuất', 'err');
          return null;
        }
        _setExportDirectoryHandle(handle);
        qcStatus('Đã chọn nơi xuất: ' + handle.name, 'ok');
        return handle;
      });
    })
    .catch(function (e) {
      if (e.name !== 'AbortError') qcStatus('Lỗi chọn nơi xuất: ' + e.message, 'err');
      return null;
    });
}

function _updateFolderStatus(elId, name) {
  var el = document.getElementById(elId);
  if (el) { el.textContent = name; el.title = name; }
}

function _restoreSpinFromDirectory(dirHandle) {
  if (!dirHandle) return Promise.resolve(false);
  return _listSpinFilesInDirectory(dirHandle).then(function (files) {
    if (!files.length) {
      _updateDataDateFilterUi();
      return false;
    }

    var matched = null;
    if (qcState.spinFileName) {
      matched = files.find(function (file) { return file.name === qcState.spinFileName; }) || null;
    }
    if (matched) {
      return _loadSpinHandle(matched.handle, 'Đã khôi phục SPIN: ' + matched.name).then(function () { return true; });
    }

    if (files.length === 1) {
      return _loadSpinHandle(files[0].handle, 'Đã khôi phục SPIN: ' + files[0].name).then(function () { return true; });
    }

    return _chooseSpinFileFromDirectory(dirHandle)
      .then(function (handle) {
        return _loadSpinHandle(handle, 'Đã khôi phục SPIN: ' + handle.name).then(function () { return true; });
      })
      .catch(function (e) {
        if (e && e.name !== 'AbortError') throw e;
        _updateDataDateFilterUi();
        return false;
      });
  });
}

// ── Try restore saved handles ──
function restoreSavedHandles() {
  return Promise.all([
    idbGetHandle('dataFolder'),
    idbGetHandle('spinFile'),
    idbGetHandle('exportFile'),
  ]).then(function (handles) {
    var dataH = handles[0], spinH = handles[1], exportH = handles[2];
    qcState.savedDirHandle = dataH || qcState.savedDirHandle;
    qcState.savedSpinHandle = spinH || qcState.savedSpinHandle;
    qcState.savedExportHandle = exportH || qcState.savedExportHandle;
    var tasks = [];

    if (dataH) {
      tasks.push(
        _requestHandlePermission(dataH, false).then(function (ok) {
          if (ok) {
            _setWorkingDirectoryHandle(dataH);
          }
        }).catch(function () { })
      );
    }

    if (exportH) {
      if (exportH.kind === 'directory') {
        tasks.push(
          _requestHandlePermission(exportH, false).then(function (ok) {
            _setExportDirectoryHandle(exportH);
            // Don't show warning - let user grant permission when they click export
            _updateFolderStatus('qcExportFolderStatus', exportH.name || qcState.exportFolderName);
          }).catch(function () {
            _setExportDirectoryHandle(exportH);
            _updateFolderStatus('qcExportFolderStatus', exportH.name || qcState.exportFolderName);
          })
        );
      } else {
        qcState.savedExportHandle = null;
        qcState.exportFolderName = '';
        _updateFolderStatus('qcExportFolderStatus', '⚠ Đã lưu kiểu cũ, chọn lại nơi xuất');
      }
    } else if (qcState.exportFolderName) {
      _updateFolderStatus('qcExportFolderStatus', qcState.exportFolderName);
    } else {
      _updateFolderStatus('qcExportFolderStatus', 'Chưa chọn');
    }

    return Promise.all(tasks).then(function () {
      // Ensure export folder is properly restored
      if (exportH && exportH.kind === 'directory' && !qcState.exportDirHandle) {
        _setExportDirectoryHandle(exportH);
      }
      
      if (spinH) {
        return _requestHandlePermission(spinH, false).then(function (ok) {
          if (!ok) {
            return false;
          }
          return _loadSpinHandle(spinH, 'Đã khôi phục SPIN: ' + spinH.name).then(function () { return true; });
        }).catch(function () { return false; }).then(function (restored) {
          if (restored) return true;
          return _restoreSpinFromDirectory(qcState.dirHandle);
        });
      }
      if (qcState.dirHandle) {
        return _restoreSpinFromDirectory(qcState.dirHandle);
      }
      _updateDataDateFilterUi();
      return false;
    }).then(function () { _autoSyncOnStartup(); });
  }).catch(function () { });
}

// ── Locks ──
function loadLocks() {
  if (!qcState.dirHandle) return Promise.resolve();
  return qcState.dirHandle.getFileHandle('qc_locks.json', { create: false })
    .then(function (fh) { return fh.getFile(); })
    .then(function (f) {
      _rememberLocksFileStamp(f);
      return f.text();
    })
    .then(function (t) { qcState.locks = JSON.parse(t); })
    .catch(function () {
      qcState.locksFileStamp = '__missing__';
      if (qcState.spinData && qcState.spinData.length) _deriveLocksFromData();
      else qcState.locks = {};
    });
}
function saveLocks() {
  if (!qcState.dirHandle) return Promise.resolve(false);
  qcState.suppressNextLocksWatch = true;
  return qcState.dirHandle.getFileHandle('qc_locks.json', { create: true })
    .then(function (fh) { return fh.createWritable(); })
    .then(function (w) { return w.write(JSON.stringify(qcState.locks, null, 2)).then(function () { return w.close(); }); })
    .then(function () {
      return qcState.dirHandle.getFileHandle('qc_locks.json', { create: false })
        .then(function (fh) { return fh.getFile(); })
        .then(function (file) { _rememberLocksFileStamp(file); })
        .catch(function () { })
        .then(function () {
          qcState.suppressNextLocksWatch = false;
          // Signal cho admin page biết locks đã thay đổi
          try {
            localStorage.setItem('qc.locksUpdated', JSON.stringify({ ts: Date.now() }));
            localStorage.removeItem('qc.locksUpdated');
          } catch (e) {}
          return true;
        });
    })
    .catch(function (e) {
      qcState.suppressNextLocksWatch = false;
      qcStatus('Lỗi lưu lock: ' + e.message, 'err');
      return false;
    });
}

function _checkForExternalUpdates() {
  if (qcState.liveSyncBusy) return;
  if (!qcState.spinFileHandle && !qcState.dirHandle) return;
  if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
  if (qcState._bgSyncRunning) return;

  qcState.liveSyncBusy = true;
  var changedBy = '';

  var spinTask = qcState.spinFileHandle
    ? qcState.spinFileHandle.getFile().then(function (file) {
        var nextStamp = _fileStamp(file);
        if (!qcState.spinFileStamp) {
          _rememberSpinFileStamp(file);
          return false;
        }
        if (nextStamp !== qcState.spinFileStamp) {
          _rememberSpinFileStamp(file);
          if (qcState.suppressNextSpinWatch) {
            qcState.suppressNextSpinWatch = false;
            return false;
          }
          changedBy = changedBy || 'spin';
          return true;
        }
        return false;
      }).catch(function () { return false; })
    : Promise.resolve(false);

  var lockTask = qcState.dirHandle
    ? qcState.dirHandle.getFileHandle('qc_locks.json', { create: false })
        .then(function (fh) { return fh.getFile(); })
        .then(function (file) {
          var nextStamp = _fileStamp(file);
          if (!qcState.locksFileStamp) {
            _rememberLocksFileStamp(file);
            return false;
          }
          if (nextStamp !== qcState.locksFileStamp) {
            _rememberLocksFileStamp(file);
            if (qcState.suppressNextLocksWatch) {
              qcState.suppressNextLocksWatch = false;
              return false;
            }
            changedBy = changedBy || 'locks';
            return true;
          }
          return false;
        })
        .catch(function () {
          if (qcState.locksFileStamp && qcState.locksFileStamp !== '__missing__') {
            qcState.locksFileStamp = '__missing__';
            changedBy = changedBy || 'locks';
            return true;
          }
          return false;
        })
    : Promise.resolve(false);

  Promise.all([spinTask, lockTask])
    .then(function (changes) {
      if (!changes[0] && !changes[1]) return;
      if (!qcState.spinFileHandle) return;
      return _loadSpinHandle(qcState.spinFileHandle, { silent: true }).then(function () {
        qcStatus(changedBy === 'spin' ? 'Đã tự cập nhật từ file SPIN mới hơn' : 'Đã tự đồng bộ call vừa được nhận/trả', 'ok');
      });
    })
    .catch(function () { })
    .finally(function () {
      qcState.liveSyncBusy = false;
    });
}

function saveSpinToFolder(rows) {
  if (!qcState.dirHandle) { qcStatus('Chưa chọn DATA TỔNG', 'err'); return Promise.resolve(false); }
  try {
    var wsData = [];
    if (rows.length > 0) {
      wsData.push(Object.keys(rows[0]));
      rows.forEach(function (r) { wsData.push(Object.values(r)); });
    }
    var ws = XLSX.utils.aoa_to_sheet(wsData);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    var blob = new Blob([wbout], { type: 'application/octet-stream' });
    var fileName = 'SPIN_QC_' + new Date().toISOString().slice(0, 10) + '.xlsx';
    return qcState.dirHandle.getFileHandle(fileName, { create: true })
      .then(function (fh) { return fh.createWritable(); })
      .then(function (w) { return w.write(blob).then(function () { return w.close(); }); })
      .then(function () { return true; })
      .catch(function (e) { qcStatus('Lỗi lưu file: ' + e.message, 'err'); return false; });
  } catch (e) { qcStatus('Lỗi: ' + e.message, 'err'); return Promise.resolve(false); }
}

// ── Sync spinData ↔ spinAllRows ──
function _syncAllRows(recId, updates) {
  // Cập nhật spinData (filtered)
  var si = qcState.spinData.findIndex(function (r) { return String(r['RECORDED_ID']).trim() === recId; });
  if (si >= 0) Object.assign(qcState.spinData[si], updates);
  // Cập nhật spinAllRows (full - để ghi lại file)
  var ai = qcState.spinAllRows.findIndex(function (r) { return String(r['RECORDED_ID']).trim() === recId; });
  if (ai >= 0) Object.assign(qcState.spinAllRows[ai], updates);
}

// ── Claim all records for a user (with lock) ──
function claimAllForUser(userData) {
  var qcName = qcState.qcName.trim();
  if (!qcName) { qcStatus('Vui lòng điền tên QC trước', 'err'); return Promise.resolve(false); }
  if (!qcState.spinFileHandle) { qcStatus('Vui lòng chọn file SPIN trước', 'err'); return Promise.resolve(false); }
  if (!userData) { qcStatus('Vui lòng chọn USER trước', 'err'); return Promise.resolve(false); }
  
  qcStatus('Đang xin quyền...', '');
  
  // 🔒 Lock file trước (ngăn user khác write cùng lúc)
  return _acquireLock()
    .then(function () {
      qcStatus('Đang đọc file...', '');
      return qcState.spinFileHandle.getFile();
    })
    .then(function (file) { return parseSpinFile(file); })
    .then(function (result) {
      qcStatus('Đang kiểm tra conflicts...', '');
      
      // Cập nhật state với data tươi nhất
      qcState.spinRawHeaders = result.headers;
      qcState.spinAllRows = result.allRows;
      qcState.spinData = result.rows;
      _deriveLocksFromData();
      
      // Tìm tất cả RECORDED_ID của USER này
      var recordsToClaimList = qcState.spinData.filter(function (r) {
        return String(r['USER']).trim() === userData;
      });
      
      if (recordsToClaimList.length === 0) {
        qcStatus('Không tìm thấy calls của ' + userData, 'err');
        _releaseLock().catch(function () { });
        return false;
      }
      
      // Kiểm tra xem có call nào bị người khác lấy không
      var conflicts = [];
      recordsToClaimList.forEach(function (r) {
        var rid = String(r['RECORDED_ID']).trim();
        var freshRow = result.allRows.find(function (row) {
          return String(row['RECORDED_ID']).trim() === rid;
        });
        var takenBy = freshRow ? String(freshRow['QC SP'] || '').trim() : '';
        if (takenBy && takenBy !== qcName) {
          conflicts.push({ recId: rid, qc: takenBy });
        }
      });
      
      if (conflicts.length > 0) {
        var msg = conflicts.map(function (c) { return c.recId.slice(0, 15) + ' (' + c.qc + ')'; }).join(', ');
        qcStatus('⚠️ Có call bị lấy rồi: ' + msg, 'err');
        _releaseLock().catch(function () { });
        return false;
      }
      
      // OK → Claim tất cả calls của USER này
      qcStatus('Đang lưu ' + recordsToClaimList.length + ' calls...', '');
      var today = new Date().toISOString().slice(0, 10);
      recordsToClaimList.forEach(function (r) {
        var rid = String(r['RECORDED_ID']).trim();
        _syncAllRows(rid, { 'QC SP': qcName });  // Update QC SP (chỉ tên, chưa ngày)
        qcState.locks[rid] = { qc: qcName, locked_at: new Date().toISOString() };
      });
      
      return writeBackToSpinFile();
    })
    .then(function (ok) {
      _releaseLock().catch(function () { });  // 🔓 Release lock
      
      if (ok) {
        qcStatus('✅ Đã nhận ' + recordsToClaimList.length + ' call của ' + userData, 'ok');
        renderImportTable();
      }
      return ok;
    })
    .catch(function (e) {
      _releaseLock().catch(function () { });  // 🔓 Release lock (even on error)
      console.error('Error in claimAllForUser:', e);
      qcStatus('Lỗi claim: ' + e.message, 'err');
      return false;
    });
}

// ── Claim record ──
function claimRecord(record) {
  var userData = String(record['USER']).trim();
  return claimAllForUser(userData);
}

// ── Unclaim record ──
function unclaimRecord(recId) {
  if (!qcState.spinFileHandle) { qcStatus('Chưa liên kết file SPIN', 'err'); return Promise.resolve(false); }
  
  qcStatus('Đang xin quyền...', '');
  return _acquireLock()
    .then(function () {
      qcStatus('Đang đọc file...', '');
      return qcState.spinFileHandle.getFile();
    })
    .then(function (file) { return parseSpinFile(file); })
    .then(function (result) {
      qcStatus('Đang trả call...', '');
      qcState.spinRawHeaders = result.headers;
      qcState.spinAllRows = result.allRows;
      qcState.spinData = result.rows;
      _deriveLocksFromData();
      
      // Xóa QC SP (ai lấy)
      _syncAllRows(recId, { 'QC SP': '' });
      delete qcState.locks[recId];
      
      return writeBackToSpinFile();
    })
    .then(function (ok) {
      _releaseLock().catch(function () { });  // 🔓 Release lock
      
      if (ok) { 
        qcStatus('✅ Đã trả: ' + recId.slice(0, 20), 'ok');
        renderImportTable();
      }
      return ok;
    })
    .catch(function (e) {
      _releaseLock().catch(function () { });  // 🔓 Release lock (even on error)
      qcStatus('Lỗi trả call: ' + e.message, 'err');
      return false;
    });
}

// ── Render import table ──
function renderImportTable() {
  var container = document.getElementById('qcImportTable');
  if (!container) return;
  var rows = _getFilteredRows();
  _pruneSelectedRecIds();

  if (!rows.length) {
    container.innerHTML = '<div class="qc-empty"><div class="qc-empty-icon">' + QC_ICONS.list + '</div>Không có dữ liệu</div>';
    _updateBulkSelectionUi();
    return;
  }
  var myName = qcState.qcName.trim();

  // Status config
  var STATUS_MAP = {
    'open':            { label: 'Open',        color: '#059669', bg: '#ecfdf5', border: '#6ee7b7' },
    'in-progress':     { label: 'In Progress', color: '#d97706', bg: '#fffbeb', border: '#fcd34d' },
    'completed':       { label: 'Tạm lưu',    color: '#2563eb', bg: '#eff6ff', border: '#93c5fd' },
    'resolved':        { label: 'Đã lưu',     color: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd' },
    'admin-unlocked':  { label: 'Mở khóa',    color: '#ea580c', bg: '#fff7ed', border: '#fdba74' }
  };

  function getStatus(recId, r) {
    var lock = qcState.locks[recId] || (r['QC SP'] ? { qc: r['QC SP'] } : null);
    var sc = qcState.scores[recId];
    if (!lock) return 'open';
    if (lock.finalized) return 'resolved';
    if (sc && sc.status) return sc.status;
    return 'in-progress';
  }

  function statusBadge(status) {
    var cfg = STATUS_MAP[status] || STATUS_MAP['open'];
    return '<span style="display:inline-flex;align-items:center;padding:2px 7px;border-radius:999px;font-size:9px;font-weight:700;white-space:nowrap;color:' + cfg.color + ';background:' + cfg.bg + ';border:1px solid ' + cfg.border + '">' + cfg.label + '</span>';
  }

  var html = '<div class="qc-table-wrap"><table class="qc-table"><thead><tr>' +
    '<th style="width:28px;text-align:center"><input type="checkbox" data-select-all title="Tick tất cả"></th>' +
    '<th style="width:56px;text-align:center;white-space:nowrap">ACT</th>' +
    '<th style="width:36px;text-align:center">STT</th>' +
    '<th>Tên</th>' +
    '<th>Team</th>' +
    '<th style="width:80px">Ngày</th>' +
    '<th style="width:72px;text-align:center">Status</th>' +
    '<th style="font-size:9px;color:#829195">SUB_CODE</th>' +
    '<th style="font-size:9px;color:#829195">RECORDED_ID</th>' +
    '</tr></thead><tbody>';

  rows.forEach(function (r, idx) {
    var recId = String(r['RECORDED_ID']).trim();
    var checked = qcState.selectedRecIds[recId] ? ' checked' : '';
    var scoringDate = r['Date SP1'] || '';
    var lock = qcState.locks[recId] || (r['QC SP'] ? { qc: r['QC SP'] } : null);
    var isMine = myName && lock && lock.qc === myName;
    var status = getStatus(recId, r);
    var isLocked = status === 'resolved';

    // ACT button: play cho open, edit cho call của mình
    var btn = '';
    if (!lock) {
      btn = '<button class="qc-btn sm primary" data-action="score" data-recid="' + recId + '" title="Nhận và chấm">' + QC_ICONS.play + '</button>';
    } else if (isMine && !isLocked) {
      btn = '<button class="qc-btn sm primary" data-action="score" data-recid="' + recId + '" title="Tiếp tục chấm">' + QC_ICONS.play + '</button>';
    } else if (isMine && isLocked) {
      btn = '<button class="qc-btn sm" data-action="view" data-recid="' + recId + '" title="Xem lại bài chấm" style="color:#7c3aed;border-color:#c4b5fd">' + QC_ICONS.note + '</button>';
    } else {
      btn = '<span style="font-size:9px;color:#829195">—</span>';
    }

    var rowClass = isMine ? 'claimed-by-me' : '';
    html += '<tr class="' + rowClass + '" data-row-select="1" data-row-recid="' + recId + '" title="Click cả hàng để tick chọn">' +
      '<td style="text-align:center"><input type="checkbox" data-select-recid="' + recId + '"' + checked + '></td>' +
      '<td style="text-align:center">' + btn + '</td>' +
      '<td style="text-align:center;font-size:11px;color:#64748b">' + (idx + 1) + '</td>' +
      '<td>' + (r['USER'] || '') + '</td>' +
      '<td>' + (r['Team'] || '') + '</td>' +
      '<td style="font-size:11px;color:#64748b">' + scoringDate + '</td>' +
      '<td style="text-align:center">' + statusBadge(status) + '</td>' +
      '<td style="font-size:9px;color:#64748b;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + (r['SUB_CODE'] || '') + '</td>' +
      '<td style="font-size:9px;color:#64748b;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="' + recId + '">' + recId.slice(0, 16) + '…</td></tr>';
  });
  html += '</tbody></table></div>';
  container.innerHTML = html;
  var selectAll = container.querySelector('[data-select-all]');
  if (selectAll) {
    var visibleRecIds = rows.map(function (r) { return String(r['RECORDED_ID'] || '').trim(); }).filter(Boolean);
    var checkedVisible = visibleRecIds.filter(function (id) { return !!qcState.selectedRecIds[id]; }).length;
    selectAll.checked = visibleRecIds.length > 0 && checkedVisible === visibleRecIds.length;
    selectAll.indeterminate = checkedVisible > 0 && checkedVisible < visibleRecIds.length;
    selectAll.disabled = visibleRecIds.length === 0;
  }
  _updateBulkSelectionUi();
}

// ── Render error codes dropdown cho N/P1/P2 ──
function _renderErrorCodesDropdown(itemId, selectedValue, itemErrorCodes, group, disabled) {
  var errorCodesSource = group ? _getErrorCodesForGroup(group) : QC_ERROR_CODES;
  var errorMap = errorCodesSource[itemId];
  if (!errorMap || !errorMap[selectedValue]) return '';
  
  var errorCodes = errorMap[selectedValue] || [];
  var selectedErrors = (itemErrorCodes && itemErrorCodes[itemId]) || [];
  if (typeof selectedErrors === 'string') selectedErrors = [selectedErrors];
  
  var html = '<div class="error-codes-dropdown" data-cid="' + itemId + '" style="padding:10px;background:linear-gradient(135deg, #fff5f3 0%, #fef9f7 100%);border:1px solid #e8b8ad;border-radius:6px;margin-top:6px;box-shadow:0 2px 4px rgba(0,0,0,0.04)">';
  html += '<div style="font-size:11px;font-weight:600;color:#8b5a52;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.3px">📌 Chọn lỗi:</div>';
  html += '<div style="display:flex;flex-direction:column;gap:6px">';
  
  errorCodes.forEach(function (code, idx) {
    var checked = selectedErrors.indexOf(code) >= 0;
    
    // Parse code: "N-1.1.1 Không dùng..." → "Không dùng..."
    var parts = code.split(' ');
    var textPart = parts.slice(1).join(' '); // "Không dùng..."
    
    html += '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:6px 8px;border-radius:4px;transition:all 0.2s ease;background:' + (checked ? 'rgba(229, 103, 153, 0.08)' : 'transparent') + ';border:1px solid ' + (checked ? '#e56799' : 'transparent') + ';font-size:12px;color:#5a4a4a;user-select:none" onmouseover="this.style.background=\'rgba(229, 103, 153, 0.06)\';" onmouseout="this.style.background=\'' + (checked ? 'rgba(229, 103, 153, 0.08)' : 'transparent') + '\';">' +
      '<input type="checkbox" class="error-code-check" data-cid="' + itemId + '" data-code="' + code.replace(/"/g, '&quot;') + '"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + ' style="width:16px;height:16px;cursor:pointer;accent-color:#e56799">' +
      '<span>' + textPart + '</span>' +
    '</label>';
  });
  
  html += '</div></div>';
  return html;
}

// ── Update dropdown khi chọn N/P1/P2 ──
function _updateErrorCodesDropdownUI(cid, val, sc) {
  var criteriaForm = document.getElementById('qcCriteriaForm');
  if (!criteriaForm) return;
  
  var noteWrap = criteriaForm.querySelector('[data-noteid="' + cid + '"]');
  if (!noteWrap) return;
  
  var existingDropdown = noteWrap.querySelector('.error-codes-dropdown');
  var newDropdownHtml = _renderErrorCodesDropdown(cid, val, (sc && sc.itemErrorCodes) || {}, sc && sc.group);
  
  if (existingDropdown && newDropdownHtml) {
    existingDropdown.outerHTML = newDropdownHtml;
  } else if (existingDropdown && !newDropdownHtml) {
    existingDropdown.remove();
  } else if (!existingDropdown && newDropdownHtml) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = newDropdownHtml;
    var textarea = noteWrap.querySelector('.n-note-input');
    if (textarea) {
      noteWrap.insertBefore(tempDiv.firstChild, textarea);
    } else {
      noteWrap.appendChild(tempDiv.firstChild);
    }
  }
}

// ── Màu nền ô preview [<] theo giá trị chọn ──
function _previewBgStyle(val) {
  if (val === 'Y') return 'background:#e3f6ec;color:#2f6a59;border-color:#9fd2bd;';
  if (val === 'NA') return 'background:#edf3ff;color:#4a668a;border-color:#c4d5f6;';
  if (val === 'N' || val === 'P1' || val === 'P2') return 'background:#fff0ec;color:#b8655c;border-color:#f3b7ad;';
  return '';
}

// ── Render scoring form ──
function renderScoringForm(record) {
  var recId = String(record['RECORDED_ID'] || '').trim();
  var scores = recId ? _normalizeScoreEntry(recId) : _createEmptyScore();
  var lock = recId ? qcState.locks[recId] : null;
  var isViewOnly = !!(lock && lock.finalized);

  var todayStr = new Date().toISOString().slice(0, 10);
  var savedDate = scores.scoringDate || todayStr;

  var infoEl = document.getElementById('qcCallInfo');
  if (infoEl) {
    var acc = String(record['ACCOUNTNUMBER'] || '—').trim();
    var accShort = acc ? (acc.length > 16 ? acc.substring(0, 16) + '...' : acc) : '—';
    var topMetaHtml = 
      '<span class="call-meta-item">' + QC_ICONS.user + ' ' + (record['USER'] || '—') + '</span>' +
      '<span class="call-meta-item">' + QC_ICONS.building + ' ' + (record['Team'] || '—') + '</span>' +
      (acc
        ? '<span class="call-meta-item interaction-chip" id="qcCopyAcc" title="Click để copy số tài khoản" Style="width:100px">' + accShort + '</span>'
        : '<span class="call-meta-item">—</span>');
    
    var bottomMetaHtml = 
      (record['INTERACTION_ID'] ? '<span class="call-meta-item interaction-chip" id="qcCopyIntId" title="Click để copy INTERACTION_ID">' +
        '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:3px"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
        String(record['INTERACTION_ID']).trim() + '</span>' : '<span class="call-meta-item">—</span>') +
      '<span class="call-meta-item call-date-wrap"><input type="date" id="qcScoringDate" class="scoring-date-input" value="' + savedDate + '" title="Đổi ngày chấm"></span>';
    
    infoEl.innerHTML =
      '<div class="call-meta call-meta-top">' + topMetaHtml + '</div>' +
      '<div class="call-meta call-meta-bottom">' + bottomMetaHtml + '</div>';
    
    var copyIntEl = document.getElementById('qcCopyIntId');
    if (copyIntEl) {
      copyIntEl.addEventListener('click', function () {
        var txt = String(record['INTERACTION_ID']).trim();
        navigator.clipboard.writeText(txt).then(function () {
          showQcToast(
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><polyline points="20 6 9 17 4 12"/></svg>' +
            'Đã copy'
          );
        }).catch(function () {
          showQcToast('Không copy được!', 'err');
        });
      });
    }
    var copyAccEl = document.getElementById('qcCopyAcc');
    if (copyAccEl) {
      copyAccEl.addEventListener('click', function () {
        navigator.clipboard.writeText(acc).then(function () {
          showQcToast(
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><polyline points="20 6 9 17 4 12"/></svg>' +
            'Đã copy số tài khoản'
          );
        }).catch(function () {
          showQcToast('Không copy được ACCOUNTNUMBER!', 'err');
        });
      });
    }
    var dateInp = document.getElementById('qcScoringDate');
    if (dateInp) {
      dateInp.addEventListener('change', function () {
        var rid = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
        if (!rid) return;
        var sc = _normalizeScoreEntry(rid);
        sc.scoringDate = dateInp.value;
        _schedulePersistRuntimeState();
        _scheduleImportTableRefresh();
      });
    }
  }

  var injectBar = document.getElementById('qcInjectBar');
  if (injectBar) {
    if (recId) {
      injectBar.style.display = 'flex';
      injectBar.style.alignItems = 'center';
      injectBar.style.gap = '6px';
      injectBar.style.minWidth = '0';
      injectBar.innerHTML = '<button class="inject-btn" id="qcInjectBtn" title="Tìm mã RECORDED_ID trong tab SpeechMiner" style="height:28px;padding:4px 8px;font-size:12px">' +
        QC_ICONS.search + ' Tìm SpeechMiner</button>' +
        '<div class="inject-id" id="qcCopyRecId" title="Click để copy RECORDED_ID" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:3px 6px;min-width:0;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">' +
        'ID: ' + recId + ' ' +
        '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.7"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></div>';

      var injBtn = document.getElementById('qcInjectBtn');
      if (injBtn) injBtn.addEventListener('click', function () { injectExternalId(recId); });

      var copyRecEl = document.getElementById('qcCopyRecId');
      if (copyRecEl) {
        copyRecEl.addEventListener('click', function () {
          navigator.clipboard.writeText(recId).then(function () {
            showQcToast(
              '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><polyline points="20 6 9 17 4 12"/></svg>' +
              'Đã copy mã cuộc gọi'
            );
          }).catch(function () {
            showQcToast('Không copy được!', 'err');
          });
        });
      }
    } else {
      injectBar.style.display = '';
      injectBar.style.alignItems = '';
      injectBar.style.gap = '';
      injectBar.style.minWidth = '';
      injectBar.innerHTML = '';
    }
  }

  var html = '';
  var currentCriteria = scores.criteria || {};
  var activeGroup = scores.group || 'IB';
  var activeScorecard = _getActiveScorecard(activeGroup);
  activeScorecard.criteria.forEach(function (group) {
    html += '<div class="criteria-group" style="margin:0 0 6px"><div class="criteria-group-title" style="padding:6px 10px;font-size:11px;line-height:1.2">' + group.group + '</div>';
    group.items.forEach(function (item) {
      var val = currentCriteria[item.id] || '';
      var note = (scores.itemNotes || {})[item.id] || '';
      var hasP1 = (item.type === 'ynp' || item.type === 'ynpp');
      var hasP2 = (item.type === 'ynpp');
      var hasNA = (item.type === 'yna');
      var showNote = (val === 'N' || val === 'P1' || val === 'P2');

      var ptsHint = '';
      if (hasP2) ptsHint = ' <span class="pts-hint">P1·' + item.partial1 + ' / P2·' + item.partial2 + '</span>';
      else if (hasP1) ptsHint = ' <span class="pts-hint">P1·' + Math.round(item.pts * 0.5) + '</span>';

      var mkBtn = function (bval, cls, lbl) {
        var ttip = '';
        if (item.tooltips && item.tooltips[bval]) {
          ttip = ' title="' + item.tooltips[bval].replace(/"/g, '&quot;') + '"';
        }
        var disabled = isViewOnly ? ' disabled' : '';
        return '<button class="opt-btn ' + cls + (val === bval ? ' active' : '') +
          '" data-cid="' + item.id + '" data-val="' + bval + '"' + ttip + disabled + '>' + lbl + '</button>';
      };

      var chevLeft = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:.5"><polyline points="15 18 9 12 15 6"/></svg>';
      var chevRight = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:.5"><polyline points="9 18 15 12 9 6"/></svg>';

      html +=
        '<div class="criteria-row" style="padding:5px 0">' +
        '<div class="criteria-name" style="font-size:12px;line-height:1.25">' + item.name + ' <span class="criteria-pts">' + item.pts + 'đ' + ptsHint + '</span></div>' +
        '<div class="criteria-opts">' +
        '<div class="opts-preview" data-preview-wrap="' + item.id + '" style="' + _previewBgStyle(val) + '">' +
        '<span class="opts-curr-val" data-preview-cid="' + item.id + '">' + val + '</span>' +
        '<span class="opts-icon">' + chevLeft + '</span>' +
        '</div>' +
        '<div class="opts-full">' +
        mkBtn('Y', 'y-btn', 'Y') +
        (hasP1 ? mkBtn('P1', 'p1-btn', 'P1') : '') +
        (hasP2 ? mkBtn('P2', 'p2-btn', 'P2') : '') +
        mkBtn('N', 'n-btn', 'N') +
        (hasNA ? mkBtn('NA', 'na-btn', 'N/A') : '') +
        '<span class="opts-icon" style="padding:0 4px">' + chevRight + '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="n-note-wrap' + (showNote ? ' n-note-visible' : '') + '" data-noteid="' + item.id + '">' +
        _renderErrorCodesDropdown(item.id, val, scores.itemErrorCodes, activeGroup, isViewOnly) +
        '<textarea class="n-note-input" data-cid="' + item.id + '" placeholder="Ghi chú: ' + item.name + '..." rows="2"' + (isViewOnly ? ' disabled' : '') + '>' + note + '</textarea>' +
        '</div>';
    });
    html += '</div>';
  });
  var formEl = document.getElementById('qcCriteriaForm');
  if (formEl) formEl.innerHTML = html;

  // WOW
  var wowEl = document.getElementById('qcWowList');
  if (wowEl) {
    var selWow = scores.wow || [];
    var wowNotes = scores.wowNotes || {};
    wowEl.innerHTML = activeScorecard.wowFactors.map(function (f, i) {
      var checked = selWow.indexOf(i) >= 0;
      var note = wowNotes[i] || '';
      var dis = isViewOnly ? ' disabled' : '';
      return '<div class="factor-item-wrap">' +
        '<label class="check-item"><input type="checkbox" data-wow="' + i + '"' + (checked ? ' checked' : '') + dis + '> ' + f + '</label>' +
        '<div class="factor-note-wrap wow-note-wrap' + (checked ? ' factor-note-visible' : '') + '" data-wow-noteid="' + i + '">' +
        '<textarea class="factor-note-input wow-note-input" data-wow="' + i + '" placeholder="Ghi chú: ' + f.slice(0, 30) + '..." rows="2"' + dis + '>' + note + '</textarea>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  // AutoFail checkboxes
  var afEl = document.getElementById('qcAfList');
  if (afEl) {
    var selAf = scores.autofail || [];
    var afNotes = scores.afNotes || {};
    afEl.innerHTML = activeScorecard.autofailFactors.map(function (f, i) {
      var checked = selAf.indexOf(i) >= 0;
      var note = afNotes[i] || '';
      var dis = isViewOnly ? ' disabled' : '';
      return '<div class="factor-item-wrap">' +
        '<label class="check-item af-item"><input type="checkbox" data-af="' + i + '"' + (checked ? ' checked' : '') + dis + '> ' + f + '</label>' +
        '<div class="factor-note-wrap af-note-wrap' + (checked ? ' factor-note-visible' : '') + '" data-af-noteid="' + i + '">' +
        '<textarea class="factor-note-input af-note-input" data-af="' + i + '" placeholder="Ghi chú: ' + f.slice(0, 30) + '..." rows="2"' + dis + '>' + note + '</textarea>' +
        '</div>' +
        '</div>';
    }).join('');
  }
  _updateAfBadge(scores.autofail || []);
  _updateWowBadge(scores.wow || []);

  var ne = document.getElementById('qcNoteError');
  if (ne) {
    ne.value = scores.note || '';
    if (isViewOnly) ne.disabled = true;
  }

  // Disable scoring date input & group selector trong view-only
  if (isViewOnly) {
    var dateInp = document.getElementById('qcScoringDate');
    if (dateInp) dateInp.disabled = true;
    var groupBtns = document.getElementById('qcGroupSelect');
    if (groupBtns) {
      groupBtns.querySelectorAll('.qc-group-btn').forEach(function (b) { b.disabled = true; });
    }
  } else {
    // Re-enable group buttons khi không phải view-only
    var groupBtns2 = document.getElementById('qcGroupSelect');
    if (groupBtns2) {
      groupBtns2.querySelectorAll('.qc-group-btn').forEach(function (b) { b.disabled = false; });
    }
  }

  // Ẩn/hiện nút Lưu & Tạm lưu
  var saveBtn = document.getElementById('qcSaveScoreBtn');
  var tempSaveBtn = document.getElementById('qcTempSaveBtn');
  if (saveBtn) saveBtn.style.display = isViewOnly ? 'none' : '';
  if (tempSaveBtn) tempSaveBtn.style.display = isViewOnly ? 'none' : '';

  // Banner "Chế độ xem" — hiển thị phía trên score bar
  var scoreBar = document.getElementById('qcScoreBar');
  var existingBanner = document.querySelector('.view-only-banner');
  if (isViewOnly && scoreBar) {
    if (!existingBanner) {
      var banner = document.createElement('div');
      banner.className = 'view-only-banner';
      banner.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:6px;padding:5px 10px;margin:0 6px 2px;border-radius:8px;background:linear-gradient(135deg,#fff7ed,#fef3e2);border:1px solid #fdba74;color:#c2410c;font-size:10px;font-weight:700;letter-spacing:0.02em';
      scoreBar.parentNode.insertBefore(banner, scoreBar);
    }
    var bannerEl = document.querySelector('.view-only-banner');
    bannerEl.innerHTML = '<span style="display:inline-flex;align-items:center">' + QC_ICONS.lock + '</span> Chế độ xem — Đã khóa, không thể chỉnh sửa';
  } else if (existingBanner) {
    existingBanner.remove();
  }

  updateScoreBar(recId);
}

function _updateAfBadge(arr) {
  var badge = document.getElementById('qcAfBadge');
  if (badge) {
    badge.textContent = arr.length > 0 ? arr.length + ' !' : '';
    badge.style.display = arr.length > 0 ? 'inline-flex' : 'none';
  }
}
function _updateWowBadge(arr) {
  var badge = document.getElementById('qcWowBadge');
  if (badge) {
    badge.textContent = arr.length > 0 ? arr.length + ' ★' : '';
    badge.style.display = arr.length > 0 ? 'inline-flex' : 'none';
  }
}

// ── Rebuild combined note: WOW → AutoFail → Criteria (N/P1/P2) ──
function rebuildCombinedNote(recId) {
  if (!recId) return;
  var sc = _normalizeScoreEntry(recId);
  sc.autoNote = _buildAutoNoteText(sc);
  sc.note = _composeScoreNote(sc.autoNote, sc.manualNote);
  var noteEl = document.getElementById('qcNoteError');
  if (noteEl) noteEl.value = sc.note;
  _schedulePersistRuntimeState();
  _scheduleImportTableRefresh();
}

// ── Score calculation ──
function calcScore(recId) {
  var sc = recId ? _normalizeScoreEntry(recId) : null;
  if (!sc) return { total: 0, maxTotal: 100, hasAutofail: false, group: '' };
  var group = sc.group || 'IB';
  var scorecard = _getActiveScorecard(group);
  var criteria = sc.criteria || {};
  var total = 0, maxTotal = 0;
  var hasAutofail = (sc.autofail || []).length > 0;

  scorecard.criteria.forEach(function (g) {
    g.items.forEach(function (item) {
      var val = criteria[item.id];
      if (val === 'NA') {
        maxTotal += item.pts;
        total += item.pts;
        return;
      }
      maxTotal += item.pts;
      if (val === 'Y') { total += item.pts; }
      else if (val === 'P1') { total += (item.partial1 !== undefined ? item.partial1 : Math.round(item.pts * 0.5)); }
      else if (val === 'P2') { total += (item.partial2 !== undefined ? item.partial2 : Math.round(item.pts * 0.33)); }
    });
  });

  if ((sc.wow || []).length > 0) total += 3;
  if (hasAutofail) total = 0;
  maxTotal += 3;

  return { total: total, maxTotal: maxTotal, hasAutofail: hasAutofail, group: group };
}

function getScoreToneClass(total) {
  return total < 90 ? 'score-low' : 'score-high';
}

function updateScoreBar(recId) {
  var el = document.getElementById('qcScoreBar');
  if (!el) return;
  var r = calcScore(recId);
  var toneClass = getScoreToneClass(r.total);
  
  // Update left side (score) only
  var scoreLeftEl = el.querySelector('.score-left');
  if (scoreLeftEl) {
    scoreLeftEl.innerHTML =
      '<div class="score-item ' + toneClass + '">' +
      '<div class="label" style="font-size:10px;line-height:1.1">Tổng điểm</div>' +
      '<div class="total">' + r.total + '<span class="score-total-max">/' + r.maxTotal + '</span></div>' +
      '</div>';
  }
}

// ── SVG helpers for modal/toast (inline, không phụ thuộc emoji) ──
var QC_SVG = {
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  save: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13"/><polyline points="7 3 7 8 15 8"/></svg>',
  warn: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  question: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  back: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><polyline points="15 18 9 12 15 6"/></svg>',
};

// ── Toast notification ──
function showQcToast(msg, type) {
  var old = document.getElementById('qcToast');
  if (old) old.remove();
  var t = document.createElement('div');
  t.id = 'qcToast';
  t.style.cssText = 'position:fixed;bottom:56px;left:50%;transform:translateX(-50%) translateY(20px);' +
    'background:' + (type === 'err' ? '#d07a74' : '#4f927b') + ';color:#fff;padding:9px 18px;border-radius:22px;' +
    'font-size:12px;font-weight:600;z-index:9999;pointer-events:none;opacity:0;' +
    'transition:all .25s ease;white-space:nowrap;box-shadow:0 12px 24px rgba(45,72,64,.22);' +
    'display:flex;align-items:center;gap:4px';
  t.innerHTML = msg; // dùng innerHTML để render SVG
  document.body.appendChild(t);
  setTimeout(function () { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; }, 30);
  setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)'; setTimeout(function () { t.remove(); }, 300); }, 2800);
}

// ── Confirm modal ──
function showQcConfirm(title, bodyHtml, onOk) {
  var old = document.getElementById('qcConfirmOverlay');
  if (old) old.remove();
  var overlay = document.createElement('div');
  overlay.id = 'qcConfirmOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9998;display:flex;align-items:center;justify-content:center;padding:16px;animation:qcFadeIn .18s ease';
  overlay.innerHTML =
    '<div style="background:#fff;border-radius:14px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden">' +
    '<div style="background:linear-gradient(135deg,#3b7c69,#5ba08a);color:#fff;padding:12px 16px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px">' +
    QC_SVG.question.replace('stroke="currentColor"', 'stroke="#fff"').replace('margin-right:5px', 'margin-right:0') + title +
    '</div>' +
    '<div style="padding:14px 16px;font-size:12px;color:#334155;max-height:280px;overflow-y:auto">' + bodyHtml + '</div>' +
    '<div style="display:flex;gap:8px;padding:10px 16px;border-top:1px solid #e2e8f0;background:#f8fafc">' +
    '<button id="qcConfirmOk" style="flex:1;padding:8px;border:none;border-radius:8px;background:#4f927b;color:#fff;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px">' +
    QC_SVG.check.replace('stroke="currentColor"', 'stroke="#fff"').replace('margin-right:5px', 'margin-right:0') + 'Xác nhận lưu' +
    '</button>' +
    '<button id="qcConfirmCancel" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#475569;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px">' +
    QC_SVG.back.replace('margin-right:5px', 'margin-right:0') + 'Quay lại' +
    '</button>' +
    '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  if (!document.getElementById('qcKeyframes')) {
    var st = document.createElement('style'); st.id = 'qcKeyframes';
    st.textContent = '@keyframes qcFadeIn{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(st);
  }
  function close() { overlay.style.opacity = '0'; overlay.style.transition = 'opacity .15s'; setTimeout(function () { overlay.remove(); }, 150); }
  document.getElementById('qcConfirmOk').addEventListener('click', function () { close(); onOk(); });
  document.getElementById('qcConfirmCancel').addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
}

// ── Alert modal (cảnh báo thôi, không cho lưu) ──
function showQcAlert(title, bodyHtml) {
  var old = document.getElementById('qcConfirmOverlay');
  if (old) old.remove();
  var overlay = document.createElement('div');
  overlay.id = 'qcConfirmOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9998;display:flex;align-items:center;justify-content:center;padding:16px;animation:qcFadeIn .18s ease';
  overlay.innerHTML =
    '<div style="background:#fff;border-radius:14px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden">' +
    '<div style="background:linear-gradient(135deg,#d59655,#ebb47a);color:#fff;padding:12px 16px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px">' +
    QC_SVG.warn.replace('stroke="currentColor"', 'stroke="#fff"').replace('margin-right:5px', 'margin-right:0') + title +
    '</div>' +
    '<div style="padding:14px 16px;font-size:12px;color:#334155;max-height:280px;overflow-y:auto">' + bodyHtml + '</div>' +
    '<div style="padding:10px 16px;border-top:1px solid #e2e8f0;background:#f8fafc">' +
    '<button id="qcAlertClose" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#475569;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px">' +
    QC_SVG.back.replace('margin-right:5px', 'margin-right:0') + 'Quay lại chấm tiếp' +
    '</button>' +
    '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  if (!document.getElementById('qcKeyframes')) {
    var st = document.createElement('style'); st.id = 'qcKeyframes';
    st.textContent = '@keyframes qcFadeIn{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(st);
  }
  function close() { overlay.style.opacity = '0'; overlay.style.transition = 'opacity .15s'; setTimeout(function () { overlay.remove(); }, 150); }
  document.getElementById('qcAlertClose').addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
}

// ── Temp save (không khóa, cho phép sửa sau) ──
function tempSaveCurrentScore() {
  if (!qcState.currentRecord) { qcStatus('Chưa chọn call để chấm', 'err'); return; }
  var recId = String(qcState.currentRecord['RECORDED_ID']).trim();
  var sc = _normalizeScoreEntry(recId);
  if (!sc.group) sc.group = 'IB'; // default nếu chưa có group
  var todayStr = new Date().toISOString().slice(0, 10);
  sc.scoringDate = (document.getElementById('qcScoringDate') || {}).value || todayStr;
  sc.qcName = qcState.qcName.trim();
  sc.status = 'completed';
  sc.savedSnapshot = _createScoreSnapshot(sc);
  sc.savedAt = new Date().toISOString();
  _persistRuntimeStateNow();
  saveLocks(); // Đảm bảo lock được ghi ra file
  updateScoreBar(recId);
  renderImportTable();
  renderExportSummary();
  showQcToast('Đã tạm lưu');
  qcStatus('Đã tạm lưu', 'ok');
}

// ── Save score (lưu + khóa) ──
function saveCurrentScore() {
  if (!qcState.currentRecord) { qcStatus('Chưa chọn call để chấm', 'err'); return; }
  var recId = String(qcState.currentRecord['RECORDED_ID']).trim();
  var sc = _normalizeScoreEntry(recId);
  var criteria = sc.criteria || {};
  var activeGroup = sc.group || 'IB';
  var activeScorecard = _getActiveScorecard(activeGroup);
  var errorCodesSource = _getErrorCodesForGroup(activeGroup);

  // Kiểm tra các mục chưa chọn
  var unchecked = [];
  activeScorecard.criteria.forEach(function (group) {
    group.items.forEach(function (item) {
      if (!criteria[item.id]) unchecked.push(item.name);
    });
  });

  // Kiểm tra các mục chọn N/P1/P2 nhưng chưa note
  var missingNote = [];
  activeScorecard.criteria.forEach(function (group) {
    group.items.forEach(function (item) {
      var v = criteria[item.id];
      if ((v === 'N' || v === 'P1' || v === 'P2') && !((sc.itemNotes || {})[item.id] || '').trim()) {
        missingNote.push(item.name + ' (' + v + ')');
      }
    });
  });

  // Kiểm tra các mục chọn N/P1/P2 nhưng chưa chọn mã lỗi
  var missingErrorCodes = [];
  activeScorecard.criteria.forEach(function (group) {
    group.items.forEach(function (item) {
      var v = criteria[item.id];
      if ((v === 'N' || v === 'P1' || v === 'P2')) {
        var errorMap = errorCodesSource[item.id];
        if (errorMap && errorMap[v]) {
          var selectedErrors = (sc.itemErrorCodes || {})[item.id];
          if (!selectedErrors || (Array.isArray(selectedErrors) && selectedErrors.length === 0) || selectedErrors === '') {
            missingErrorCodes.push(item.name + ' (' + v + ')');
          }
        }
      }
    });
  });

  // Có mục chưa chấm
  if (unchecked.length > 0) {
    var warnBody =
      '<div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:8px 10px;margin-bottom:10px;color:#92400e;font-size:12px;font-weight:700;display:flex;align-items:flex-start;gap:6px">' +
      QC_SVG.warn.replace('stroke="currentColor"', 'stroke="#92400e"').replace('margin-right:5px', 'margin-right:0;flex-shrink:0;margin-top:1px') +
      '<span>Chưa chấm tại ' + unchecked.length + ' mục mà đã đòi lưu rồi, vội thế!</span>' +
      '</div>' +
      '<ul style="margin:0;padding-left:18px;font-size:11px;color:#475569;line-height:1.9">' +
      unchecked.map(function (n) { return '<li>' + n + '</li>'; }).join('') +
      '</ul>';
    showQcAlert('Cảnh báo — Chưa chấm đủ', warnBody);
    return;
  }

  // Có mục chọn N/P1/P2 nhưng chưa note
  if (missingNote.length > 0) {
    var noteWarnBody =
      '<div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:8px 10px;margin-bottom:10px;color:#991b1b;font-size:12px;font-weight:700;display:flex;align-items:flex-start;gap:6px">' +
      QC_SVG.warn.replace('stroke="currentColor"', 'stroke="#991b1b"').replace('margin-right:5px', 'margin-right:0;flex-shrink:0;margin-top:1px') +
      '<span>Các mục sau bắt buộc phải ghi chú khi chọn N / P1 / P2:</span>' +
      '</div>' +
      '<ul style="margin:0;padding-left:18px;font-size:11px;color:#475569;line-height:1.9">' +
      missingNote.map(function (n) { return '<li>' + n + '</li>'; }).join('') +
      '</ul>';
    showQcAlert('Cảnh báo — Chưa ghi chú', noteWarnBody);
    return;
  }

  // Có mục chọn N/P1/P2 nhưng chưa chọn mã lỗi
  if (missingErrorCodes.length > 0) {
    var errorWarnBody =
      '<div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:8px 10px;margin-bottom:10px;color:#991b1b;font-size:12px;font-weight:700;display:flex;align-items:flex-start;gap:6px">' +
      QC_SVG.warn.replace('stroke="currentColor"', 'stroke="#991b1b"').replace('margin-right:5px', 'margin-right:0;flex-shrink:0;margin-top:1px') +
      '<span>Các mục sau bắt buộc phải chọn mã lỗi khi chọn N / P1 / P2:</span>' +
      '</div>' +
      '<ul style="margin:0;padding-left:18px;font-size:11px;color:#475569;line-height:1.9">' +
      missingErrorCodes.map(function (n) { return '<li>' + n + '</li>'; }).join('') +
      '</ul>';
    showQcAlert('Cảnh báo — Chưa chọn mã lỗi', errorWarnBody);
    return;
  }

  // Đã chấm đủ → mời xác nhận lưu
  var bodyHtml =
    '<div style="color:#4f927b;font-size:12px;display:flex;align-items:center;gap:5px;margin-bottom:6px">' +
    QC_SVG.check.replace('stroke="currentColor"', 'stroke="#4f927b"').replace('margin-right:5px', 'margin-right:0') +
    'Tất cả mục đã được chấm đầy đủ.' +
    '</div>' +
    '<div style="font-size:12px;color:#64748b">Xác nhận lưu điểm cho call này?</div>';

  showQcConfirm('Xác nhận lưu điểm', bodyHtml, function () {
    var ne = document.getElementById('qcNoteError');
    var finalScore = _normalizeScoreEntry(recId);
    finalScore.manualNote = ne ? _extractManualNote(ne.value, finalScore.autoNote || '') : finalScore.manualNote;
    finalScore.note = ne ? ne.value : _composeScoreNote(finalScore.autoNote, finalScore.manualNote);
    finalScore.qcName = qcState.qcName;
    var di = document.getElementById('qcScoringDate');
    finalScore.scoringDate = di ? di.value : new Date().toISOString().slice(0, 10);
    finalScore.savedSnapshot = _createScoreSnapshot(finalScore);
    finalScore.savedAt = new Date().toISOString();
    finalScore.status = 'resolved';
    _persistRuntimeStateNow();
    // Đánh dấu finalized trong lock (qc_locks.json)
    if (!qcState.locks[recId]) {
      qcState.locks[recId] = { qc: qcState.qcName, locked_at: finalScore.scoringDate };
    }
    qcState.locks[recId].finalized = true;
    qcState.locks[recId].finalized_at = finalScore.savedAt;
    delete qcState.locks[recId].adminUnlocked;
    // Ghi lock + điểm song song, đợi cả 2 xong mới render
    _showLoadingBar(30);
    Promise.all([
      saveLocks(),
      _writeScoresToSpin(recId, finalScore)
    ]).then(function (results) {
      var spinOk = results[1];
      if (spinOk) {
        _hideLoadingBar();
        qcStatus('Đã lưu và khóa: ' + recId.slice(0, 20), 'ok');
        showQcToast(QC_SVG.check.replace('margin-right:5px', 'margin-right:0') + 'Đã lưu điểm và khóa thành công!');
      } else {
        _hideLoadingBar();
        qcStatus('Lỗi ghi file SPIN', 'err');
      }
      renderImportTable();
      renderExportSummary();
    });
  });
}

// ── SpeechMiner inject ──
function injectExternalId(recId) {
  qcStatus('Đang tìm tab SpeechMiner...', '');
  chrome.runtime.sendMessage({ type: 'QC_INJECT_EXTERNAL_ID', recordedId: recId }, function (resp) {
    if (chrome.runtime.lastError || !resp || !resp.success) {
      qcStatus('Lỗi inject: ' + ((resp && resp.error) || (chrome.runtime.lastError && chrome.runtime.lastError.message) || '?'), 'err');
    } else {
      qcStatus('Đã inject External ID, đang tìm...', 'ok');
    }
  });
}

// ── Export summary ──
function renderExportSummary() {
  var el = document.getElementById('qcExportList');
  if (!el) return;
  var myName = qcState.qcName.trim();
  var scored = Object.keys(qcState.scores).filter(function (recId) {
    var sc = qcState.scores[recId];
    return sc.qcName === myName;
  });
  if (!scored.length) {
    el.innerHTML = '<div class="qc-empty"><div class="qc-empty-icon">' + QC_ICONS.bar_chart + '</div>Chưa có call nào được chấm bởi "' + myName + '"</div>';
    return;
  }

  // Build rows data
  var rows = scored.map(function (recId) {
    var sc = _normalizeScoreEntry(recId);
    var r = calcScore(recId);
    var rec = qcState.spinData.find(function (x) { return String(x['RECORDED_ID']).trim() === recId; }) || {};
    var sDate = sc.scoringDate || rec['Date SP1'];
    if (!sDate) {
      if (sc.criteria && Object.keys(sc.criteria).length > 0) sDate = new Date().toISOString().slice(0, 10);
    }
    return {
      recId: recId,
      user: rec['USER'] || '',
      team: rec['Team'] || '',
      date: sDate || '',
      total: r.total,
      maxTotal: r.maxTotal,
      hasAutofail: r.hasAutofail,
      hasWow: (sc.wow || []).length > 0,
      status: sc.status || ''
    };
  });

  // Filter
  var dateFilter = (document.getElementById('qcExportDateFilter') || {}).value || '';
  var searchQ = ((document.getElementById('qcExportSearch') || {}).value || '').trim().toLowerCase();

  if (dateFilter) {
    rows = rows.filter(function (r) { return r.date === dateFilter; });
  }
  if (searchQ) {
    rows = rows.filter(function (r) {
      return r.recId.toLowerCase().indexOf(searchQ) >= 0 ||
             r.user.toLowerCase().indexOf(searchQ) >= 0;
    });
  }

  if (!rows.length) {
    el.innerHTML = '<div class="qc-empty"><div class="qc-empty-icon">' + QC_ICONS.bar_chart + '</div>Không tìm thấy kết quả</div>';
    return;
  }

  var html = '<div class="qc-table-wrap"><table class="qc-table"><thead><tr>' +
    '<th style="width:32px;text-align:center">STT</th>' +
    '<th>Tên</th>' +
    '<th>Team</th>' +
    '<th style="width:80px">Ngày</th>' +
    '<th>Record ID</th>' +
    '<th style="width:70px;text-align:center">Điểm</th>' +
    '<th style="width:70px;text-align:center">Trạng thái</th>' +
    '</tr></thead><tbody>';

  rows.forEach(function (r, idx) {
    var shortId = r.recId.length > 24 ? r.recId.slice(0, 24) + '…' : r.recId;
    var dateDisplay = r.date ? r.date.replace(/-/g, '/').split('/').reverse().join('/') : '';
    var flags = '';
    if (r.hasAutofail) flags += '<span style="color:#dc2626;font-size:9px;font-weight:700">AF</span> ';
    if (r.hasWow) flags += '<span style="color:#d97706;font-size:9px;font-weight:700">WOW</span>';

    var statusBadge;
    if (r.status === 'resolved') {
      statusBadge = '<span style="display:inline-flex;align-items:center;gap:3px;font-size:9px;color:#7c3aed;font-weight:700">Đã lưu ' + QC_ICONS.lock + '</span>';
    } else if (r.status === 'admin-unlocked') {
      statusBadge = '<span style="display:inline-flex;align-items:center;gap:3px;font-size:9px;color:#ea580c;font-weight:700">Mở khóa ' + QC_ICONS.lock + '</span>';
    } else {
      statusBadge = '<span style="font-size:9px;color:#2563eb;font-weight:700">Tạm lưu</span>';
    }

    html += '<tr>' +
      '<td style="text-align:center;color:#94a3b8;font-weight:600">' + (idx + 1) + '</td>' +
      '<td style="font-weight:600">' + (r.user || '-') + '</td>' +
      '<td>' + (r.team || '-') + '</td>' +
      '<td>' + dateDisplay + '</td>' +
      '<td><code style="font-size:10px">' + shortId + '</code></td>' +
      '<td style="text-align:center;font-weight:700">' + r.total + '/' + r.maxTotal + 'đ ' + flags + '</td>' +
      '<td style="text-align:center">' + statusBadge + '</td>' +
      '</tr>';
  });

  html += '</tbody></table></div>';
  el.innerHTML = html;
}

// ── Format date helpers ──
function formatDateToDMY(dateStr) {
  if (!dateStr) return '';
  // dateStr format: yyyy-MM-dd → dd/mm/yyyy
  var parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return parts[2] + '/' + parts[1] + '/' + parts[0];
}

function _ensureExportFolderReady() {
  var handle = qcState.exportDirHandle || qcState.savedExportHandle;
  if (!handle || handle.kind !== 'directory') {
    return pickExportFolder().then(function (picked) {
      return picked || null;
    });
  }
  // Always request permission (requestIfNeeded=true) to re-grant if needed
  return _requestHandlePermission(handle, true).then(function (ok) {
    if (!ok) return null;
    _setExportDirectoryHandle(handle);
    return handle;
  }).catch(function () {
    // If permission request fails, try picking a new folder
    return pickExportFolder().then(function (picked) {
      return picked || null;
    });
  });
}

// ── Helper: tính điểm 1 criteria item ──
function _calcItemPts(it, val) {
  if (!val || val === 'N' || val === '') return 0;
  if (val === 'NA') return it.pts; // NA = không áp dụng nhưng như Y
  if (val === 'Y') return it.pts;
  if (val === 'P1') return it.partial1 !== undefined ? it.partial1 : Math.round(it.pts * 0.5);
  if (val === 'P2') return it.partial2 !== undefined ? it.partial2 : Math.round(it.pts * 0.33);
  return 0;
}

// ── Ghi điểm vào file SPIN (từ cột P trở đi) ──
function _writeScoresToSpin(recId, sc) {
  if (!qcState.spinAllRows || !qcState.spinRawHeaders) return;
  var group = sc.group || 'IB';
  var scorecard = _getActiveScorecard(group);
  var r = calcScore(recId);
  var crit = sc.criteria || {};

  // Các cột điểm cần ghi vào SPIN (từ cột Q, vì cột P = Group)
  // Q = Ngày chấm, R = Tổng điểm, S = Heart Touching, ...
  var scoreHeaders = [
    'Ngày chấm',
    'Tổng điểm',
    'Heart Touching', '1.1',
    'Empathy', '2.1', '2.2', '2.3', '2.4',
    'Attentive Actions', '3.1', '3.2',
    'Reliable Resolution', '4.1', '4.2',
    'Thankful Closing', '5.1', '5.2',
    'Điểm Plus', 'Điểm Plus chi tiết', 'Auto Fail', 'Note'
  ];
  // Thêm cột lỗi
  var allItemIds = ['h1_1', 'h2_1', 'h2_2', 'h2_3', 'h2_4', 'h3_1', 'h3_2', 'h4_1', 'h4_2', 'h5_1', 'h5_2'];
  allItemIds.forEach(function (id) { scoreHeaders.push(id + '.Lỗi'); });

  // Đảm bảo headers tồn tại
  scoreHeaders.forEach(function (h) {
    if (qcState.spinRawHeaders.indexOf(h) < 0) {
      qcState.spinRawHeaders.push(h);
    }
  });

  // Tìm row trong spinAllRows
  var row = null;
  for (var i = 0; i < qcState.spinAllRows.length; i++) {
    if (String(qcState.spinAllRows[i]['RECORDED_ID'] || '').trim() === recId) {
      row = qcState.spinAllRows[i];
      break;
    }
  }
  if (!row) return;

  // Helper tính điểm từng item
  function itemVal(id) { return crit[id] || ''; }
  function itemPts(id) {
    var it = null;
    scorecard.criteria.forEach(function (g) { g.items.forEach(function (item) { if (item.id === id) it = item; }); });
    if (!it) return 0;
    return _calcItemPts(it, crit[id] || '');
  }
  function groupPts(ids) {
    return ids.reduce(function (sum, id) { return sum + itemPts(id); }, 0);
  }
  function errCodes(id) {
    var errors = (sc.itemErrorCodes || {})[id];
    if (!errors) return '';
    var arr = typeof errors === 'string' ? [errors] : (Array.isArray(errors) ? errors : []);
    return arr.map(function (code) {
      var spaceIdx = code.indexOf(' ');
      return spaceIdx >= 0 ? code.slice(0, spaceIdx) : code;
    }).join('; ');
  }
  var wowFactors = _getWowForGroup(group);
  var afFactors = _getAutofailForGroup(group);
  var wowDetail = (sc.wow || []).map(function (i) { return wowFactors[i] || ''; }).join('; ');
  var afDetail = (sc.autofail || []).map(function (i) { return afFactors[i] || ''; }).join('; ');

  // Ghi dữ liệu (từ cột Q, cột P = Group đã có sẵn)
  row['Ngày chấm'] = formatDateToDMY(sc.scoringDate || new Date().toISOString().slice(0, 10));
  row['Tổng điểm'] = r.total;
  row['Heart Touching'] = groupPts(['h1_1']);
  row['1.1'] = itemVal('h1_1');
  row['Empathy'] = groupPts(['h2_1', 'h2_2', 'h2_3', 'h2_4']);
  row['2.1'] = itemVal('h2_1');
  row['2.2'] = itemVal('h2_2');
  row['2.3'] = itemVal('h2_3');
  row['2.4'] = itemVal('h2_4');
  row['Attentive Actions'] = groupPts(['h3_1', 'h3_2']);
  row['3.1'] = itemVal('h3_1');
  row['3.2'] = itemVal('h3_2');
  row['Reliable Resolution'] = groupPts(['h4_1', 'h4_2']);
  row['4.1'] = itemVal('h4_1') || '';
  row['4.2'] = itemVal('h4_2');
  row['Thankful Closing'] = groupPts(['h5_1', 'h5_2']);
  row['5.1'] = itemVal('h5_1');
  row['5.2'] = itemVal('h5_2');
  row['Điểm Plus'] = (sc.wow || []).length > 0 ? 3 : 0;
  row['Điểm Plus chi tiết'] = wowDetail;
  row['Auto Fail'] = afDetail;
  row['Note'] = sc.note || '';
  allItemIds.forEach(function (id) { row[id + '.Lỗi'] = errCodes(id); });

  // Đồng bộ lại spinData từ spinAllRows
  if (typeof _syncAllRows === 'function') {
    _syncAllRows();
  }
  // Lưu file SPIN nếu có handle
  if (typeof writeBackToSpinFile === 'function') {
    return writeBackToSpinFile().catch(function (e) { console.error('[QC] writeBack error:', e); return false; });
  }
  return Promise.resolve(true);
}

// ── Export to folder (fixed filename, overwrite) ──
function exportResults() {
  var myName = qcState.qcName.trim();
  var scored = Object.keys(qcState.scores).filter(function (recId) {
    var sc = qcState.scores[recId];
    return sc.qcName === myName;
  });
  if (!scored.length) { qcStatus('Chưa có call nào để xuất (của "' + myName + '")', 'err'); return; }
  qcStatus('Đang tạo file Excel...', '');

  _ensureExportFolderReady().then(function (exportDirHandle) {
    if (!exportDirHandle) {
      qcStatus('Chưa chọn nơi xuất hoặc chưa cấp quyền ghi', 'err');
      return;
    }
    exportDirHandle.getFileHandle(qcState.exportFileName || 'ket_qua_QC.xlsx', { create: true }).then(function (exportHandle) {
      // Build a union CRITERIA_MAP from all scorecards
      var CRITERIA_MAP = {};
      Object.keys(QC_SCORECARDS).forEach(function (key) {
        QC_SCORECARDS[key].criteria.forEach(function (g) { g.items.forEach(function (it) { if (!CRITERIA_MAP[it.id]) CRITERIA_MAP[it.id] = it; }); });
      });

      // Nhóm items theo group để tính tổng điểm nhóm
      // Group 1: h1_1 | Group 2: h2_1,h2_2,h2_3,h2_4 | Group 3: h3_1,h3_2 | Group 4: h4_1,h4_2 | Group 5: h5_1,h5_2
      var GROUP_IDS = [
        ['h1_1'],
        ['h2_1', 'h2_2', 'h2_3', 'h2_4'],
        ['h3_1', 'h3_2'],
        ['h4_1', 'h4_2'],
        ['h5_1', 'h5_2']
      ];
      var ERROR_EXPORT_ITEMS = [
        { id: 'h1_1', label: '1.1. Lỗi' },
        { id: 'h2_1', label: '2.1. Lỗi' },
        { id: 'h2_2', label: '2.2. Lỗi' },
        { id: 'h2_3', label: '2.3. Lỗi' },
        { id: 'h2_4', label: '2.4. Lỗi' },
        { id: 'h3_1', label: '3.1. Lỗi' },
        { id: 'h3_2', label: '3.2. Lỗi' },
        { id: 'h4_1', label: '4.1. Lỗi' },
        { id: 'h4_2', label: '4.2. Lỗi' },
        { id: 'h5_1', label: '5.1. Lỗi' },
        { id: 'h5_2', label: '5.2. Lỗi' }
      ];

      // Headers đúng theo ket_qua_QC.txt
      var headers = [
        'STT',
        'Spin',
        'Team',
        'ACCOUNT NUMBER',
        'USER',
        'Ngày chấm',
        'CREATE_TIME',
        'SUB_CODE',
        'DURATION',
        'RECORDED_ID',
        'INTERACTION_ID',
        'Phân loại',
        'QC SP',
        'Nhóm',
        'Tổng điểm',
        'Heart Touching – Mở lòng đón / Chạm trái tim',
        '1.1. Chào mở đầu',
        'Empathy – Nghe từ tâm / Hiểu thấu cảm',
        '2.1. Lắng nghe',
        '2.2. Ngôn từ',
        '2.3. Ngữ điệu (Giọng nói)',
        '2.4. Gọi tên khách hàng',
        'Attentive Actions – Vững đồng hành / Giúp tận tâm',
        '3.1. Quản lý cuộc gọi',
        '3.2. Nhập liệu',
        'Reliable Resolution – Trao giải pháp / Nhận tin cậy',
        '4.1. Xác minh thông tin',
        '4.2. Giải pháp',
        'Thankful Closing – Khép vấn đề / Mở kết nối',
        '5.1. Tư vấn khuyến mãi / khảo sát / …',
        '5.2. Chào kết thúc',
        'Điểm Plus',
        'Điểm Plus chi tiết',
        'Auto Fail',
        'Note'
      ].concat(ERROR_EXPORT_ITEMS.map(function (item) { return item.label; }));

      var dataRows = scored.map(function (recId, stt) {
        var sc = _normalizeScoreEntry(recId);
        var rec = qcState.spinData.find(function (x) { return String(x['RECORDED_ID']).trim() === recId; }) || {};
        var r = calcScore(recId);
        var crit = sc.criteria || {};

        // Giá trị chữ từng item (Y/N/P1/P2/N/A) - giữ nguyên N/A
        function itemVal(id) {
          var val = crit[id] || '';
          // Đảm bảo N/A không bị cắt thành NA
          return val === 'NA' ? 'N/A' : val;
        }

      // Lấy mã lỗi được chọn cho item, chỉ xuất phần mã như N-4.1.1
      function itemErrorCodes(id) {
        var errors = (sc.itemErrorCodes || {})[id];
        if (!errors) return '';
        
        var errorTexts = [];
        if (typeof errors === 'string') {
          errorTexts = [errors];
        } else if (Array.isArray(errors)) {
          errorTexts = errors;
        }
        
        // Tách chỉ lấy phần mã trước khoảng trắng đầu tiên
        var codesOnly = errorTexts.map(function (code) {
          var spaceIdx = code.indexOf(' ');
          return spaceIdx >= 0 ? code.slice(0, spaceIdx) : code;
        }).join('; ');
        
        return codesOnly;
      }

      // Tổng điểm từng nhóm (vẫn là số)
      function groupPts(ids) {
        return ids.reduce(function (sum, id) {
          var it = CRITERIA_MAP[id];
          if (!it) return sum;
          return sum + _calcItemPts(it, crit[id] || '');
        }, 0);
      }

      // ACCOUNT NUMBER: giữ nguyên text (không cắt số 0 đầu, không thêm khoảng trống)
      var accNum = String(rec['ACCOUNTNUMBER'] || '').trim();
      var accNumText = accNum;

        var wowPts = (sc.wow || []).length > 0 ? 3 : 0;
        var groupWow = _getWowForGroup(sc.group || 'IB');
        var groupAf = _getAutofailForGroup(sc.group || 'IB');
        var wowDetail = (sc.wow || []).map(function (i) { return groupWow[i] || ''; }).join('; ');
        var afDetail = (sc.autofail || []).map(function (i) { return groupAf[i] || ''; }).join('; ');
        var errorColumns = ERROR_EXPORT_ITEMS.map(function (item) { return itemErrorCodes(item.id); });

        return [
          stt + 1,                                                                              // STT
          qcState.spinValue || '',                                                              // Spin
          rec['Team'] || '',                                                                    // Team
          accNumText,                                                                           // ACCOUNT NUMBER (text)
          rec['USER'] || '',                                                                    // USER
          formatDateToDMY(sc.scoringDate || rec['Date SP1'] || new Date().toISOString().slice(0, 10)), // Ngày chấm
          rec['CREATE_TIME'] || '',                                                             // CREATE_TIME
          rec['SUB_CODE'] || '',                                                                // SUB_CODE
          rec['DURATION'] || '',                                                                // DURATION
          recId,                                                                                // RECORDED_ID
          rec['INTERACTION_ID'] || '',                                                          // INTERACTION_ID
          qcState.phanLoai || '',                                                               // Phân loại
          qcState.qcName,                                                                       // QC SP
          sc.group || '',                                                                        // Nhóm
          r.total,                                                                              // Tổng điểm
          groupPts(GROUP_IDS[0]),   // Heart Touching tổng (số)
          itemVal('h1_1'),          // 1.1 (Y/N/P1...)
          groupPts(GROUP_IDS[1]),   // Empathy tổng (số)
          itemVal('h2_1'),          // 2.1
          itemVal('h2_2'),          // 2.2
          itemVal('h2_3'),          // 2.3
          itemVal('h2_4'),          // 2.4
          groupPts(GROUP_IDS[2]),   // Attentive Actions tổng (số)
          itemVal('h3_1'),          // 3.1
          itemVal('h3_2'),          // 3.2
          groupPts(GROUP_IDS[3]),   // Reliable Resolution tổng (số)
          itemVal('h4_1'),          // 4.1
          itemVal('h4_2'),          // 4.2
          groupPts(GROUP_IDS[4]),   // Thankful Closing tổng (số)
          itemVal('h5_1'),          // 5.1
          itemVal('h5_2'),          // 5.2
          wowPts,                   // Điểm Plus (tổng)
          wowDetail,                // Điểm Plus chi tiết
          afDetail,                 // Auto Fail
          sc.note || ''             // Note
        ].concat(errorColumns);
      });

      var wsData = [headers].concat(dataRows);
      var ws = XLSX.utils.aoa_to_sheet(wsData);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'ket_qua_QC');
      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      var blob = new Blob([wbout], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      exportHandle.createWritable()
        .then(function (w) { return w.write(blob).then(function () { return w.close(); }); })
        .then(function () {
          _setExportDirectoryHandle(exportDirHandle);
          qcStatus('Đã xuất: ' + exportHandle.name + ' vào ' + (exportDirHandle.name || 'thư mục đã chọn'), 'ok');
          showQcToast(QC_SVG.save.replace('margin-right:5px', 'margin-right:0') + 'Đã lưu file ' + exportHandle.name + ' thành công!');
        })
        .catch(function (e) {
          qcStatus('Lỗi xuất: ' + e.message, 'err');
          showQcToast(QC_SVG.x.replace('margin-right:5px', 'margin-right:0') + 'Lỗi lưu file: ' + e.message, 'err');
        });
    }).catch(function (e) {
      qcStatus('Lỗi tạo file xuất: ' + e.message, 'err');
    });
  }).catch(function (e) {
    qcStatus('Lỗi tạo Excel: ' + e.message, 'err');
  });
}

// ── Build HTML ──
function buildQcPanelHtml() {
  return '<div id="qcTab" class="qc-theme-shell" data-theme="forest">' +
    '<div id="qcLoadingBar" class="qc-loading-bar"></div>' +

    // ── IMPORT ──
    '<div class="qc-section active" id="qcImportSection">' +
    '<div class="qc-toolbar qc-toolbar-grid qc-import-toolbar">' +
    '<div class="qc-import-topline">' +
    '<div class="qc-field qc-field-grow qc-import-name">' +
    '<label class="qc-label qc-import-label">Tên QC</label>' +
    '<input id="qcNameInput" class="qc-input qc-compact-input" placeholder="vd: huong.pham.13"/>' +
    '</div>' +
    '<button class="qc-btn secondary sm qc-compact-btn qc-spin-pick-btn" id="qcImportBtn">' + QC_ICONS.import + ' Chọn SPIN</button>' +
    '</div>' +
    '<div class="qc-import-inline-grid qc-import-meta-grid">' +
    '<input id="qcSpinInput" class="qc-input qc-compact-input" placeholder="Spin"/>' +
    '<input id="qcPhanLoaiInput" class="qc-input qc-compact-input" placeholder="Phân loại"/>' +
    '</div>' +
    '<div class="qc-import-bottomline">' +
    '<input id="qcFilterUser" class="qc-input qc-compact-input" placeholder="Lọc USER..."/>' +
    '<input id="qcFilterTeam" class="qc-input qc-compact-input" placeholder="Team"/>' +
    '<input id="qcFilterDataDate" type="date" class="qc-input qc-compact-input qc-date-filter-input" title="Lọc theo cột Ngày lấy data" aria-label="Lọc theo ngày lấy data" disabled />' +
    '<button class="qc-btn secondary sm qc-icon-btn qc-theme-btn" id="qcThemeBtn" title="Đổi theme" aria-label="Đổi theme">' + QC_ICONS.palette + '</button>' +
    '<button class="qc-btn secondary sm qc-icon-btn" id="qcRefreshBtn" title="Đọc lại file SPIN">' + QC_ICONS.refresh + '</button>' +
    '</div>' +
    '<div class="qc-action-row qc-bulk-action-row" style="margin-top:0;display:grid;grid-template-columns:1fr 1fr 0.8fr 1.05fr;gap:4px">' +
    '<button class="qc-btn success sm qc-compact-btn" id="qcBulkClaimBtn" disabled style="font-size:11px">' + QC_ICONS.check + ' Nhận</button>' +
    '<button class="qc-btn danger sm qc-compact-btn" id="qcBulkUnclaimBtn" disabled style="font-size:11px">' + QC_ICONS.undo + ' Trả</button>' +
    '<button class="qc-btn secondary sm qc-compact-btn" id="qcBulkClearBtn" title="Bỏ tick" style="min-width:30px">' +
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
    '</button>' +
    '<span id="qcBulkCount" class="folder-status-label qc-bulk-count" style="display:flex;align-items:center;justify-content:center;font-size:11px">Tick: 0</span>' +
    '</div>' +
    '</div>' +
    '<div class="qc-scroll" id="qcImportTable">' +
    '<div class="qc-empty"><div class="qc-empty-icon">' + QC_ICONS.import + '</div>Import file SPIN.xlsx để bắt đầu</div>' +
    '</div>' +
    '</div>' +

    // ── SCORE ──
    '<div class="qc-section" id="qcScoreSection">' +
    '<div class="qc-toolbar qc-toolbar-score" style="display:flex;align-items:center;gap:4px;padding:5px 6px 4px;flex-wrap:nowrap">' +
    '<div id="qcInjectBar" class="qc-inject-bar" style="min-height:0;flex:1;min-width:0"></div>' +
    '<div id="qcGroupSelect" class="qc-group-btns" style="display:flex;gap:3px;flex:0 0 auto">' +
    '<button class="qc-group-btn" data-group="IB">IB</button>' +
    '<button class="qc-group-btn" data-group="CARE">CARE</button>' +
    '<button class="qc-group-btn" data-group="CHAT">CHAT</button>' +
    '<button class="qc-group-btn" data-group="ECOM">EMAIL</button>' +
    '<button class="qc-group-btn" data-group="F2F">F2F</button>' +
    '<button class="qc-group-btn" data-group="F2FOB">F2FOB</button>' +
    '<button class="qc-group-btn" data-group="OB">OB</button>' +
    '<button class="qc-group-btn" data-group="SP">SP</button>' +
    '</div>' +
    '<button class="qc-btn secondary sm" id="qcTempSaveBtn" style="height:28px;padding:4px 8px;white-space:nowrap;flex:0 0 auto;font-size:11px">Tạm lưu</button>' +
    '<button class="qc-btn success sm" id="qcSaveScoreBtn" style="height:28px;padding:4px 10px;white-space:nowrap;flex:0 0 auto">' + QC_ICONS.save + ' Lưu</button>' +
    '</div>' +
    '<div id="qcScoreBar" class="score-bar qc-score-summary" style="margin:4px 6px 6px;padding:8px 10px;border-radius:12px">' +
      '<div class="score-left">' +
        '<div class="score-item score-low">' +
          '<div class="label">Tổng điểm</div>' +
          '<div class="total">0<span class="score-total-max">/103</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="score-divider"></div>' +
      '<div class="score-right" id="qcCallInfo">' +
        '<div class="call-meta call-meta-top">' +
          '<span class="call-meta-item">' + QC_ICONS.user + ' on.ly</span>' +
          '<span class="call-meta-item">' + QC_ICONS.building + ' IB01</span>' +
        '</div>' +
        '<div class="call-meta call-meta-bottom">' +
          '<span class="call-meta-item interaction-placeholder">l-2367606</span>' +
          '<span class="call-meta-item call-date-placeholder">04/18/20</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="qc-scroll" style="padding-top:2px">' +
    '<div id="qcCriteriaForm"></div>' +

    // WOW collapsible card
    '<div class="qc-card" id="qcWowCard">' +
    '<button class="wow-toggle-btn" id="qcWowToggle">' +
    '<span class="card-icon">' + QC_ICONS.star + '</span>' +
    '<span class="af-title-txt">WOW (+3đ nếu có)</span>' +
    '<span id="qcWowBadge" class="wow-badge" style="display:none"></span>' +
    '<span id="qcWowChevron" class="af-chevron">' + QC_ICONS.chevron + '</span>' +
    '</button>' +
    '<div class="af-body" id="qcWowBody" style="display:none">' +
    '<div class="check-list" id="qcWowList"></div>' +
    '</div>' +
    '</div>' +

    // AutoFail collapsible card
    '<div class="qc-card" id="qcAfCard">' +
    '<button class="af-toggle-btn" id="qcAfToggle">' +
    '<span class="card-icon">' + QC_ICONS.alert + '</span>' +
    '<span class="af-title-txt">Auto Fail</span>' +
    '<span id="qcAfBadge" class="af-badge" style="display:none"></span>' +
    '<span id="qcAfChevron" class="af-chevron">' + QC_ICONS.chevron + '</span>' +
    '</button>' +
    '<div class="af-body" id="qcAfBody" style="display:none">' +
    '<div class="check-list" id="qcAfList"></div>' +
    '</div>' +
    '</div>' +

    // Notes
    '<div class="qc-card">' +
    '<div class="qc-card-title"><span class="card-icon">' + QC_ICONS.note + '</span>Ghi chú tổng hợp</div>' +
    '<label class="qc-label qc-note-caption">Tự động từ WOW / AutoFail / N / P1 / P2</label>' +
    '<textarea id="qcNoteError" class="qc-textarea" style="min-height:240px;resize:vertical;overflow-y:auto" placeholder="Ghi chú tự động + có thể chỉnh sửa thêm..."></textarea>' +
    '</div>' +
    '</div>' +
    '</div>' +

    // ── EXPORT ──
    '<div class="qc-section" id="qcExportSection">' +
    '<div class="qc-toolbar" style="flex-wrap:wrap;gap:8px">' +
    '<input type="date" id="qcExportDateFilter" class="qc-input" style="width:140px" title="Lọc theo ngày">' +
    '<input type="text" id="qcExportSearch" class="qc-input" style="flex:1;min-width:120px" placeholder="Tìm theo tên, record ID...">' +
    '<button class="qc-btn secondary sm" id="qcExportRefreshBtn" title="Làm mới">' + QC_ICONS.refresh + '</button>' +
    '</div>' +
    '<div class="qc-scroll">' +
    '<div id="qcExportList"><div class="qc-empty"><div class="qc-empty-icon">' + QC_ICONS.bar_chart + '</div>Chưa có dữ liệu</div></div>' +
    '</div>' +
    '</div>' +

    '<div id="qcStatus" class="qc-status">Sẵn sàng</div>' +
    '</div>';
}

// ── Update QC name in file when changed ──
function updateQcNameInFile(oldName, newName) {
  if (!qcState.spinFileHandle) return;
  qcStatus('Đang cập nhật tên...', '');
  return qcState.spinFileHandle.getFile()
    .then(function (file) { return parseSpinFile(file); })
    .then(function (result) {
      // Cập nhật spinAllRows: tất cả record có QC SP = oldName → newName
      var updated = false;
      result.allRows.forEach(function (r) {
        if (String(r['QC SP'] || '').trim() === oldName) {
          r['QC SP'] = newName;
          updated = true;
        }
      });
      if (!updated) return;
      // Ghi lại file
      qcState.spinRawHeaders = result.headers;
      qcState.spinAllRows = result.allRows;
      qcState.spinData = result.rows;
      return writeBackToSpinFile().then(function (ok) {
        if (ok) {
          qcStatus('Đã cập nhật tên QC: ' + newName, 'ok');
          renderImportTable();
        }
      });
    })
    .catch(function (e) { qcStatus('Lỗi cập nhật: ' + e.message, 'err'); });
}

// ── Wire all events ──
function wireQcEvents() {
  // Import SPIN + Chọn Data folder (chung)
  var importBtn = document.getElementById('qcImportBtn');
  if (importBtn) importBtn.addEventListener('click', function () { pickSpinFile().catch(console.error); });

  // Refresh → đọc lại file SPIN gốc
  var refreshBtn = document.getElementById('qcRefreshBtn');
  if (refreshBtn) refreshBtn.addEventListener('click', function () { reloadSpinFile().catch(console.error); });

  var themeBtn = document.getElementById('qcThemeBtn');
  if (themeBtn) themeBtn.addEventListener('click', function () { openThemePicker().catch(console.error); });

  // QC name
  var nameInput = document.getElementById('qcNameInput');
  if (nameInput) {
    nameInput.addEventListener('input', function (e) {
      var oldName = qcState.qcName;
      var newName = e.target.value.trim();
      qcState.qcName = newName;
      qcSet({ 'qc.qcName': qcState.qcName });
      _schedulePersistRuntimeState();
      // Update tên QC trong file nếu có đổi
      if (oldName && newName && oldName !== newName) {
        updateQcNameInFile(oldName, newName);
      }
    });
  }

  // Spin input
  var spinInput = document.getElementById('qcSpinInput');
  if (spinInput) {
    spinInput.addEventListener('input', function (e) {
      qcState.spinValue = e.target.value.trim();
      qcSet({ 'qc.spinValue': qcState.spinValue });
      _schedulePersistRuntimeState();
    });
  }

  // Phân loại input
  var phanLoaiInput = document.getElementById('qcPhanLoaiInput');
  if (phanLoaiInput) {
    phanLoaiInput.addEventListener('input', function (e) {
      qcState.phanLoai = e.target.value.trim();
      qcSet({ 'qc.phanLoai': qcState.phanLoai });
      _schedulePersistRuntimeState();
    });
  }

  // Filters
  var fu = document.getElementById('qcFilterUser');
  var ft = document.getElementById('qcFilterTeam');
  var fd = document.getElementById('qcFilterDataDate');
  if (fu) fu.addEventListener('input', renderImportTable);
  if (ft) ft.addEventListener('input', renderImportTable);
  if (fd) {
    fd.addEventListener('input', renderImportTable);
    fd.addEventListener('change', renderImportTable);
  }

  // Table delegation (claim / unclaim / score)
  var tableContainer = document.getElementById('qcImportTable');
  if (tableContainer) {
    function openScoreForRecId(recId) {
      var rec = qcState.spinData.find(function (r) { return String(r['RECORDED_ID']).trim() === recId; });
      if (rec) {
        _setCurrentRecord(rec);
        // Pre-select group from score if already set
        var sc = _normalizeScoreEntry(recId);
        var groupBtns = document.getElementById('qcGroupSelect');
        if (groupBtns) {
          groupBtns.querySelectorAll('.qc-group-btn').forEach(function (b) {
            b.classList.toggle('active', sc.group && b.dataset.group === sc.group);
          });
        }
        renderScoringForm(rec);
        switchQcTab('qcTabScore');
      }
    }

    tableContainer.addEventListener('change', function (e) {
      var input = e.target;
      if (!input || input.type !== 'checkbox') return;
      if (input.dataset.selectRecid) {
        var rid = input.dataset.selectRecid;
        if (input.checked) qcState.selectedRecIds[rid] = true;
        else delete qcState.selectedRecIds[rid];
        _updateBulkSelectionUi();
        var all = tableContainer.querySelector('[data-select-all]');
        if (all) {
          var rowChecks = tableContainer.querySelectorAll('input[type="checkbox"][data-select-recid]');
          var total = rowChecks.length, checked = 0;
          rowChecks.forEach(function (cb) { if (cb.checked) checked++; });
          all.checked = total > 0 && checked === total;
          all.indeterminate = checked > 0 && checked < total;
        }
        return;
      }
      if (input.dataset.selectAll !== undefined) {
        var rowChecks = tableContainer.querySelectorAll('input[type="checkbox"][data-select-recid]');
        rowChecks.forEach(function (cb) {
          cb.checked = input.checked;
          var rid = cb.dataset.selectRecid;
          if (!rid) return;
          if (input.checked) qcState.selectedRecIds[rid] = true;
          else delete qcState.selectedRecIds[rid];
        });
        input.indeterminate = false;
        _updateBulkSelectionUi();
      }
    });

    tableContainer.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (btn) {
        var action = btn.dataset.action, recId = btn.dataset.recid;
        if (!recId) return;

        if (action === 'score') {
          // Claim record: set lock → mở form chấm, background sync ghi file SPIN
          var myName = qcState.qcName.trim();
          if (!myName) { qcStatus('Vui lòng điền tên QC trước', 'err'); return; }
          if (!qcState.scores[recId]) qcState.scores[recId] = _createEmptyScore();
          var sc = qcState.scores[recId];
          if (sc.status !== 'admin-unlocked') {
            qcState.locks[recId] = { qc: myName, locked_at: new Date().toISOString() };
            sc.status = 'in-progress';
          }
          // Đọc Group từ cột P của file SPIN
          var row = qcState.spinData.find(function (r) { return String(r['RECORDED_ID']).trim() === recId; });
          if (row) {
            var groupFromSpin = String(row['Group'] || row['Nhóm'] || '').trim().toUpperCase();
            if (groupFromSpin && QC_SCORECARDS[groupFromSpin]) {
              sc.group = groupFromSpin;
            }
          }
          if (!sc.group) sc.group = 'IB'; // default
          _applyLocksToRows();
          _persistRuntimeStateNow();
          saveLocks(); // Ghi lock ra qc_locks.json ngay
          _bgSyncExcel();
          renderImportTable();
          openScoreForRecId(recId);
          return;
        }
        if (action === 'view') {
          // View-only: mở form chấm ở chế độ xem (không claim, không sửa)
          var rec = qcState.spinData.find(function (r) { return String(r['RECORDED_ID']).trim() === recId; });
          if (rec) {
            _setCurrentRecord(rec);
            var sc = _normalizeScoreEntry(recId);
            var groupBtns = document.getElementById('qcGroupSelect');
            if (groupBtns) {
              groupBtns.querySelectorAll('.qc-group-btn').forEach(function (b) {
                b.classList.toggle('active', sc.group && b.dataset.group === sc.group);
              });
            }
            renderScoringForm(rec);
            switchQcTab('qcTabScore');
          }
          return;
        }
        return;
      }

      if (e.target.closest('input, button, textarea, select, label, a')) return;

      var row = e.target.closest('tr[data-row-select][data-row-recid]');
      if (!row) return;

      var checkbox = row.querySelector('input[type="checkbox"][data-select-recid]');
      if (checkbox) checkbox.click();
    });
  }

  var bulkSelectVisibleBtn = document.getElementById('qcBulkSelectVisibleBtn');
  if (bulkSelectVisibleBtn) {
    bulkSelectVisibleBtn.addEventListener('click', function () {
      var rows = _getFilteredRows();
      rows.forEach(function (r) {
        var recId = String(r['RECORDED_ID'] || '').trim();
        var lock = qcState.locks[recId] || (r['QC SP'] ? { qc: r['QC SP'] } : null);
        if (recId && !lock) qcState.selectedRecIds[recId] = true;
      });
      renderImportTable();
      qcStatus('Đã tick các call trống đang lọc', 'ok');
    });
  }
  var bulkClaimBtn = document.getElementById('qcBulkClaimBtn');
  if (bulkClaimBtn) bulkClaimBtn.addEventListener('click', function () { _runBulkAction('claim'); });
  var bulkUnclaimBtn = document.getElementById('qcBulkUnclaimBtn');
  if (bulkUnclaimBtn) bulkUnclaimBtn.addEventListener('click', function () { _runBulkAction('unclaim'); });
  var bulkClearBtn = document.getElementById('qcBulkClearBtn');
  if (bulkClearBtn) {
    bulkClearBtn.addEventListener('click', function () {
      qcState.selectedRecIds = {};
      renderImportTable();
      qcStatus('Đã bỏ tick', '');
    });
  }

  // Save score
  var saveBtn = document.getElementById('qcSaveScoreBtn');
  if (saveBtn) saveBtn.addEventListener('click', saveCurrentScore);

  // Temp save
  var tempSaveBtn = document.getElementById('qcTempSaveBtn');
  if (tempSaveBtn) tempSaveBtn.addEventListener('click', tempSaveCurrentScore);

  // Group selector (button-based)
  var groupBtns = document.getElementById('qcGroupSelect');
  if (groupBtns) {
    groupBtns.addEventListener('click', function (e) {
      var btn = e.target.closest('.qc-group-btn');
      if (!btn) return;
      var group = btn.dataset.group;
      if (!group) return;
      var recId = _getCurrentRecId();
      if (!recId) return;
      var sc = _normalizeScoreEntry(recId);
      sc.group = group;
      // Update active state
      groupBtns.querySelectorAll('.qc-group-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.group === group);
      });
      _schedulePersistRuntimeState();
      if (qcState.currentRecord) {
        renderScoringForm(qcState.currentRecord);
      }
    });
  }

  // Criteria: opt-btn click handler (table-based, no radio)
  var criteriaForm = document.getElementById('qcCriteriaForm');
  if (criteriaForm) {
    criteriaForm.addEventListener('click', function (e) {
      var btn = e.target.closest('.opt-btn[data-cid]');
      if (!btn || btn.disabled) return;
      var cid = btn.dataset.cid, val = btn.dataset.val;
      if (!cid || !val) return;
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      var sc = _normalizeScoreEntry(recId);

      if ((sc.criteria || {})[cid] === val) {
        // Bấm lại đúng nút đang chọn → bỏ chọn
        delete sc.criteria[cid];
        // Xóa active khỏi tất cả nút cùng nhóm
        criteriaForm.querySelectorAll('.opt-btn[data-cid="' + cid + '"]').forEach(function (b) {
          b.classList.remove('active');
        });
        // Cập nhật text preview và màu
        var preview = criteriaForm.querySelector('.opts-curr-val[data-preview-cid="' + cid + '"]');
        if (preview) {
          preview.textContent = '';
          var pw = criteriaForm.querySelector('[data-preview-wrap="' + cid + '"]');
          if (pw) pw.style.cssText = '';
        }
        if (sc.itemNotes) sc.itemNotes[cid] = '';
        var noteWrap = criteriaForm.querySelector('[data-noteid="' + cid + '"]');
        if (noteWrap) noteWrap.classList.remove('n-note-visible');
        // Xóa dropdown
        var dropdown = noteWrap ? noteWrap.querySelector('.error-codes-dropdown') : null;
        if (dropdown) dropdown.remove();
        rebuildCombinedNote(recId);
        updateScoreBar(recId);
        return;
      }

      // Chọn bình thường: cập nhật state
      sc.criteria[cid] = val;
      criteriaForm.querySelectorAll('.opt-btn[data-cid="' + cid + '"]').forEach(function (b) {
        b.classList.toggle('active', b.dataset.val === val);
      });
      // Cập nhật text preview và màu
      var preview = criteriaForm.querySelector('.opts-curr-val[data-preview-cid="' + cid + '"]');
      if (preview) {
        preview.textContent = val;
        var pw = criteriaForm.querySelector('[data-preview-wrap="' + cid + '"]');
        if (pw) pw.style.cssText = _previewBgStyle(val);
      }
      // Show/hide note for N, P1, P2
      var noteWrap = criteriaForm.querySelector('[data-noteid="' + cid + '"]');
      var showNote = (val === 'N' || val === 'P1' || val === 'P2');
      if (noteWrap) noteWrap.classList.toggle('n-note-visible', showNote);
      if (!showNote && sc.itemNotes) sc.itemNotes[cid] = '';
      // Update error codes dropdown ngay
      _updateErrorCodesDropdownUI(cid, val, sc);
      rebuildCombinedNote(recId);
      updateScoreBar(recId);
    });

    criteriaForm.addEventListener('input', function (e) {
      var ta = e.target;
      if (!ta.classList.contains('n-note-input')) return;
      var cid = ta.dataset.cid;
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId || !cid) return;
      var sc = _normalizeScoreEntry(recId);
      sc.itemNotes[cid] = ta.value;
      rebuildCombinedNote(recId);
    });

    // Error codes: checkbox delegation
    criteriaForm.addEventListener('change', function (e) {
      var chk = e.target;
      if (!chk.classList.contains('error-code-check') || chk.disabled) return;
      var cid = chk.dataset.cid;
      var code = chk.dataset.code;
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId || !cid || !code) return;
      var sc = _normalizeScoreEntry(recId);
      if (!sc.itemErrorCodes[cid]) sc.itemErrorCodes[cid] = [];
      if (typeof sc.itemErrorCodes[cid] === 'string') sc.itemErrorCodes[cid] = [sc.itemErrorCodes[cid]];
      
      var idx = sc.itemErrorCodes[cid].indexOf(code);
      if (chk.checked) {
        if (idx < 0) sc.itemErrorCodes[cid].push(code);
      } else {
        if (idx >= 0) sc.itemErrorCodes[cid].splice(idx, 1);
      }
      if (sc.itemErrorCodes[cid].length === 0) delete sc.itemErrorCodes[cid];
      rebuildCombinedNote(recId);
      updateScoreBar(recId);
    });
  }

  // WOW: checkbox + note textarea delegation
  var wowList = document.getElementById('qcWowList');
  if (wowList) {
    wowList.addEventListener('change', function (e) {
      var input = e.target;
      if (input.type !== 'checkbox' || input.dataset.wow === undefined) return;
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      var sc = _normalizeScoreEntry(recId);
      var arr = sc.wow, idx = parseInt(input.dataset.wow, 10);
      if (input.checked) { if (arr.indexOf(idx) < 0) arr.push(idx); }
      else { var i = arr.indexOf(idx); if (i >= 0) arr.splice(i, 1); }
      // Show/hide note
      var wrap = wowList.querySelector('[data-wow-noteid="' + idx + '"]');
      if (wrap) wrap.classList.toggle('factor-note-visible', input.checked);
      if (!input.checked) {
        sc.wowNotes[idx] = '';
      }
      _updateWowBadge(sc.wow);
      rebuildCombinedNote(recId);
      updateScoreBar(recId);
    });
    wowList.addEventListener('input', function (e) {
      var ta = e.target;
      if (!ta.classList.contains('wow-note-input')) return;
      var idx = parseInt(ta.dataset.wow, 10);
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      var sc = _normalizeScoreEntry(recId);
      sc.wowNotes[idx] = ta.value;
      rebuildCombinedNote(recId);
    });
  }

  // WOW toggle
  var wowToggle = document.getElementById('qcWowToggle');
  var wowBody = document.getElementById('qcWowBody');
  var wowChevron = document.getElementById('qcWowChevron');
  if (wowToggle && wowBody) {
    wowToggle.addEventListener('click', function () {
      var open = wowBody.style.display !== 'none';
      wowBody.style.display = open ? 'none' : 'block';
      if (wowChevron) wowChevron.style.transform = open ? '' : 'rotate(180deg)';
    });
  }

  // AutoFail toggle
  var afToggle = document.getElementById('qcAfToggle');
  var afBody = document.getElementById('qcAfBody');
  var afChevron = document.getElementById('qcAfChevron');
  if (afToggle && afBody) {
    afToggle.addEventListener('click', function () {
      var open = afBody.style.display !== 'none';
      afBody.style.display = open ? 'none' : 'block';
      if (afChevron) afChevron.style.transform = open ? '' : 'rotate(180deg)';
    });
  }

  // AutoFail: checkbox + note delegation
  var afList = document.getElementById('qcAfList');
  if (afList) {
    afList.addEventListener('change', function (e) {
      var input = e.target;
      if (input.type !== 'checkbox' || input.dataset.af === undefined) return;
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      var sc = _normalizeScoreEntry(recId);
      var arr = sc.autofail, idx = parseInt(input.dataset.af, 10);
      if (input.checked) { if (arr.indexOf(idx) < 0) arr.push(idx); }
      else { var j = arr.indexOf(idx); if (j >= 0) arr.splice(j, 1); }
      // Show/hide note
      var wrap = afList.querySelector('[data-af-noteid="' + idx + '"]');
      if (wrap) wrap.classList.toggle('factor-note-visible', input.checked);
      if (!input.checked) {
        sc.afNotes[idx] = '';
      }
      _updateAfBadge(sc.autofail);
      rebuildCombinedNote(recId);
      updateScoreBar(recId);
    });
    afList.addEventListener('input', function (e) {
      var ta = e.target;
      if (!ta.classList.contains('af-note-input')) return;
      var idx = parseInt(ta.dataset.af, 10);
      var recId = qcState.currentRecord ? String(qcState.currentRecord['RECORDED_ID']).trim() : '';
      if (!recId) return;
      var sc = _normalizeScoreEntry(recId);
      sc.afNotes[idx] = ta.value;
      rebuildCombinedNote(recId);
    });
  }

  var noteError = document.getElementById('qcNoteError');
  if (noteError) {
    noteError.addEventListener('input', function (e) {
      var recId = _getCurrentRecId();
      if (!recId) return;
      var sc = _normalizeScoreEntry(recId);
      sc.manualNote = _extractManualNote(e.target.value, sc.autoNote || '');
      sc.note = e.target.value;
      _schedulePersistRuntimeState();
      _scheduleImportTableRefresh();
    });
  }

  // Export
  var expRefBtn = document.getElementById('qcExportRefreshBtn');
  if (expRefBtn) expRefBtn.addEventListener('click', renderExportSummary);
  var expDateFilter = document.getElementById('qcExportDateFilter');
  if (expDateFilter) expDateFilter.addEventListener('change', renderExportSummary);
  var expSearch = document.getElementById('qcExportSearch');
  if (expSearch) expSearch.addEventListener('input', renderExportSummary);

}

function _restoreDraftState() {
  var recId = qcState.restoreCurrentRecId || '';
  var record = _findRecordByRecId(recId);
  if (record) {
    _setCurrentRecord(record);
    renderScoringForm(record);
  } else {
    _setCurrentRecord(null);
    renderScoringForm({ RECORDED_ID: '', USER: '', Team: '', DURATION: '' });
  }
  switchQcTab(qcState.activeTabId || (record ? 'qcTabScore' : 'qcTabImport'));
}

// ── Initialize ──
function initQcPanel() {
  return qcGet(['qc.scores', 'qc.qcName', 'qc.spinValue', 'qc.phanLoai', 'qc.currentRecId', 'qc.activeTab', 'qc.spinFileName', 'qc.exportFileName', 'qc.exportFolderName', 'qc.themeId']).then(function (d) {
    if (d['qc.scores']) qcState.scores = d['qc.scores'];
    if (_backfillSavedSnapshots()) _schedulePersistRuntimeState();
    if (d['qc.qcName']) {
      qcState.qcName = d['qc.qcName'];
      var el = document.getElementById('qcNameInput');
      if (el) el.value = qcState.qcName;
    }
    if (d['qc.spinValue']) {
      qcState.spinValue = d['qc.spinValue'];
      var elSpin = document.getElementById('qcSpinInput');
      if (elSpin) elSpin.value = qcState.spinValue;
    }
    if (d['qc.phanLoai']) {
      qcState.phanLoai = d['qc.phanLoai'];
      var elPl = document.getElementById('qcPhanLoaiInput');
      if (elPl) elPl.value = qcState.phanLoai;
    }
    if (d['qc.currentRecId']) qcState.restoreCurrentRecId = d['qc.currentRecId'];
    if (d['qc.activeTab']) qcState.activeTabId = d['qc.activeTab'];
    if (d['qc.spinFileName']) qcState.spinFileName = d['qc.spinFileName'];
    if (d['qc.exportFolderName']) qcState.exportFolderName = d['qc.exportFolderName'];
    qcState.exportFileName = 'ket_qua_QC.xlsx';
    if (d['qc.themeId']) qcState.themeId = d['qc.themeId'];
    applyQcTheme(qcState.themeId);
    initQcTabs();
    wireQcEvents();
    _bindQcAutoReloadWakeEvents();
    renderScoringForm({ RECORDED_ID: '', USER: '', Team: '', DURATION: '' });
    // Restore saved folder handles from IndexedDB
    return restoreSavedHandles()
      .then(function () { return requestQcPanelAutoReload({ force: true, minGapMs: 0 }); })
      .then(function () { _restoreDraftState(); });
  });
}
